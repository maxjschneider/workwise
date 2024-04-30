import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { deleteUserFromAll, getUser } from "../util/user";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

import { updateUser } from "../util/user";

function StatusAlert(props) {
  if (props.show.visible) {
    const variant = props.show.message.toUpperCase().includes("SUCCESS")
      ? "success"
      : "danger";

    return (
      <Alert
        variant={variant}
        onClose={() => props.setShow({ show: false, message: "" })}
        dismissible
      >
        <Alert.Heading>
          {variant === "danger" ? "An unexpected error occured" : "Success!"}
        </Alert.Heading>
        <p>{props.show.message}</p>
      </Alert>
    );
  }
}

function EmployeeLevel(props) {
  const onChange = (e) => {
    e.preventDefault();

    updateUser(props.user._id, { level: e.target.value }).then(
      (result) => props.setShow({ visible: true, message: result }),
      (result) => props.setShow({ visible: true, message: result })
    );
  };

  if (props.currentUser.level === 2) {
    return (
      <Form.Select
        onChange={onChange}
        defaultValue={props.user.level}
        required
        disabled={window.getState().session.userId === props.user._id}
      >
        <option value="0">Employee</option>
        <option value="1">Manager</option>
        <option value="2">Administrator</option>
      </Form.Select>
    );
  }
}

function DeleteButton(props) {
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: DELETE THE USER
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserFromAll(props.user._id).then(() => {
        props.fetchData();
      });
    }
  };

  if (props.currentUser.level === 2) {
    return (
      <Button
        variant="danger"
        onClick={handleSubmit}
        disabled={window.getState().session.userId === props.user._id}
      >
        Delete
      </Button>
    );
  }
}

function addNum({ user, setShow }) {
  const validNumber = new RegExp("^[0-9]{10}$");
  const enteredNumber = prompt(
    "Please enter your 10 digit phone number with no spaces"
  );
  if (!validNumber.test(enteredNumber)) {
    alert("Invalid number! Please try again!");
  } else {
    console.log("Valid number:", enteredNumber);
    updateUser(user._id, { phoneNumber: enteredNumber })
      .then((result) => {
        console.log("Update result:", result);
        setShow({ visible: true, message: result });
        setTimeout(() => {
          setShow({ visible: false, message: result });
        }, 2000); //reload after 2 second delay
      })
      .catch((error) => {
        console.error("Update error:", error);
        setShow({
          visible: true,
          message: "Failed to update phone number",
        });
      });
  }
}

export default function StaffDirectory() {
  const [staffList, setStaffList] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [show, setShow] = useState({ visible: false, message: "Error" });

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddNum = ({ user, setShow }) => {
    addNum({ user, setShow });
    fetchData();
  };

  async function fetchData() {
    const currentUser = await getUser();
    setCurrentUser(currentUser);

    const userResponse = await fetch(
      process.env.REACT_APP_HOSTNAME + "/api/users/"
    );

    if (!userResponse.ok) {
      const message = `An error occurred: ${userResponse.statusText}`;
      window.alert(message);
      return;
    }

    const user = await userResponse.json();
    user.sort((a, b) => b.level - a.level);
    setStaffList(user);
  }

  return (
    <Container>
      <StatusAlert show={show} setShow={setShow} />

      <Table striped bordered>
        <thead>
          <tr className="black-row">
            {
              //<th>Position</th>
            }

            <th>First</th>
            <th>Last</th>
            {currentUser.level === 2 ? <th>Level</th> : null}
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((entry) => {
            return (
              <tr key={entry._id}>
                {
                  //<td>{entry.position}</td>
                }
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                {currentUser.level === 2 ? (
                  <td>
                    {/* i have no idea what the code below does */}
                    <EmployeeLevel
                      user={entry}
                      currentUser={currentUser}
                      setShow={setShow}
                    />
                  </td>
                ) : null}
                <td>{entry.email}</td>
                <td>
                  {entry.phoneNumber != null ? (
                    <>
                      {/* make the phone number look nicee */}(
                      {String(entry.phoneNumber).substring(0, 3)}){" "}
                      {String(entry.phoneNumber).substring(3, 6)}-
                      {String(entry.phoneNumber).substring(6, 10)}
                    </>
                  ) : (
                    // dont display anything if no number
                    entry.phoneNumber
                  )}
                  {currentUser.level >= 1 ? (
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleAddNum({ user: entry, setShow: setShow })
                      }
                      style={{
                        borderRadius: "10px",
                        padding: "3px 4px",
                        fontSize: "10px",
                        float: "right",
                        height: "30px",
                        width: "40px",
                      }}
                    >
                      {/*display edit if number is included*/}
                      {entry.phoneNumber == null ? "Add" : "Edit"}
                    </Button>
                  ) : null}
                </td>
                {currentUser.level === 2 ? (
                  <td>
                    <DeleteButton
                      user={entry}
                      currentUser={currentUser}
                      setShow={setShow}
                      fetchData={fetchData}
                    />
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
