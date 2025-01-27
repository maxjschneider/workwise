import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getUser } from "../util/user";
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

export default function StaffDirectory() {
  const [staffList, setStaffList] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [show, setShow] = useState({ visible: false, message: "Error" });

  useEffect(() => {
    fetchData();
  }, []);

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
            <th>Position</th>
            <th>First</th>
            <th>Last</th>
            <th>Level</th>
            <th>Email</th>
            {currentUser.level === 2 ? <th></th> : null}
          </tr>
        </thead>
        <tbody>
          {staffList.map((entry) => {
            return (
              <tr key={entry._id}>
                <td>{entry.position}</td>
                <td>{entry.firstName}</td>
                <td>{entry.lastName}</td>
                <td>
                  <EmployeeLevel
                    user={entry}
                    currentUser={currentUser}
                    setShow={setShow}
                  />
                </td>
                <td>{entry.email}</td>
                {currentUser.level === 2 ? (
                  <td>
                    <DeleteButton
                      user={entry}
                      currentUser={currentUser}
                      setShow={setShow}
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
