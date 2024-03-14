import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ShiftApprovalList from "./utils/shiftapprovallist";

import { updateUserScheduleEntry } from "../util/user";
import { getTime, getMilitaryTime } from "../util/timeConvert";

function EditButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    var day = e.target[0].value;
    var start = new Date("01/01/1970 " + e.target[1].value);
    var end = new Date("01/01/1970 " + e.target[2].value);

    start.setHours(start.getHours() - 5);
    end.setHours(end.getHours() - 5);

    if (start !== "Invalid date") {
      updateUserScheduleEntry(props.entry._id, { start: start });
    }

    if (end !== "Invalid date") {
      updateUserScheduleEntry(props.entry._id, { end: end });
    }

    updateUserScheduleEntry(props.entry._id, { day: day });
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          borderRadius: "10px",
          padding: "3px 4px",
          fontSize: "10px",
        }}
      >
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="day">
              <Form.Select defaultValue="" required>
                <option value="" disabled>
                  Please Select a Day
                </option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Form.Select>
            </Form.Group>

            <Row xs={4}>
              <Form.Group as={Col} controlId="startTimeHours">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={getMilitaryTime(props.entry.start)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="startTimeMinutes">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={getMilitaryTime(props.entry.end)}
                />
              </Form.Group>
            </Row>

            <p className="my-2">
              <i>Times must be inputted in 24 hour time.</i>
            </p>

            <br />

            <Button variant="secondary mx-2" onClick={handleClose}>
              Close
            </Button>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const ScheduleColumn = (props) => (
  <td>
    <table>
      <tbody>
        {props.entry.map((entry) => (
          <tr key={entry._id}>
            <td>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* Left side of the container */}
                <div>
                  <h6 style={{ fontSize: 15, margin: 0 }}>
                    {entry.firstName + " " + entry.lastName}
                    <br /> (<i>{entry.position}</i>)
                  </h6>
                  {getTime(entry.start)} - {getTime(entry.end)}
                </div>
                {/* Right side of the container */}
                <EditButton entry={entry} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </td>
);

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    var responses = [];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    for (let [i, day] of days.entries()) {
      const response = await fetch(
        process.env.REACT_APP_HOSTNAME + "/api/schedule/day/" + day,
        { headers: { "Access-Control-Allow-Origin": true } }
      );

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      responses[i] = await response.json();
    }

    setSchedule(responses);
  }

  return (
    <div className="container-xxl">
      <h1>Weekly Calendar</h1>

      <table
        className="table table-striped table-bordered px-5"
        style={{ marginTop: 20 }}
      >
        <thead>
          <tr>
            <th scope="col" className="col-1">
              Sunday
            </th>
            <th scope="col" className="col-1">
              Monday
            </th>
            <th scope="col" className="col-1">
              Tuesday
            </th>
            <th scope="col" className="col-1">
              Wednesday
            </th>
            <th scope="col" className="col-1">
              Thursday
            </th>
            <th scope="col" className="col-1">
              Friday
            </th>
            <th scope="col" className="col-1">
              Saturday
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {schedule.map((entry, i) => {
              return <ScheduleColumn key={i} entry={entry} />;
            })}
          </tr>
        </tbody>
      </table>

      <h1 className="py-5">Recent Shifts</h1>

      <ShiftApprovalList />
    </div>
  );
}
