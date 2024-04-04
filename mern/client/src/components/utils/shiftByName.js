import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { getAllUsers, getUserShifts } from "../../util/manager";
import { useEffect, useState } from "react";
import { updateUserShiftEntry } from "../../util/manager";
import { getTime } from "../../util/timeConvert";

const ShiftEditor = () => {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (var i = 0; i < e.target.length - 1; i += 2) {
      var startValue = e.target[i].value;
      var endValue = e.target[i + 1].value;

      // skip empty inputs
      if (startValue === "" || endValue === "") continue;

      var start = new Date("01/01/1970 " + e.target[i].value);
      var end = new Date("01/01/1970 " + e.target[i + 1].value);

      if (start === "Invalid Date" || end === "Invalid Date") continue;

      start.setHours(start.getHours() - 4);
      end.setHours(end.getHours() - 4);

      setCurrentMessage(
        await updateUserShiftEntry(e.target[i].id, { start: start, end: end })
      );
    }
  };

  const fetchData = async () => {
    const res = await getAllUsers();
    setUsers(res);
  };

  const fetchUserShifts = async (e) => {
    const id = e.target.value;

    const res = await getUserShifts(id);
    setCurrentUser(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!users) return null;

  return (
    <div>
      <h1 className="py-5">View/Edit Shifts By Employee</h1>

      <Form.Select
        style={{ width: "25%", marginBottom: "25px" }}
        onChange={fetchUserShifts}
        defaultValue=""
        required
      >
        <option value="" disabled>
          Employee
        </option>

        {users.map((user) => {
          return (
            <option key={user._id} value={user._id}>
              {user.firstName + " " + user.lastName}
            </option>
          );
        })}
      </Form.Select>

      {!currentUser ? (
        <>No user selected.</>
      ) : (
        <Form onSubmit={handleSubmit}>
          {currentUser.map((entry) => {
            return (
              <Row xs={4} key={entry._id}>
                <Form.Group as={Col} controlId={entry._id}>
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={getTime(entry.start)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="startTimeMinutes">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control type="text" placeholder={getTime(entry.end)} />
                </Form.Group>
              </Row>
            );
          })}
          <Button style={{ marginTop: "20px" }} variant="primary" type="submit">
            Save Changes
          </Button>

          <p style={{ marginTop: "20px" }}>{currentMessage}</p>
          <p>
            Please enter all times in 24 hour <i>mm:hh</i> format.
          </p>
        </Form>
      )}

      <div style={{ marginTop: "200px" }}></div>
    </div>
  );
};

export default ShiftEditor;
