import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  getAnnouncements,
  postAnnouncement,
  deleteAnnouncement,
} from "../util/announcements";

const HomePage = () => {
  const [announcements, setAnnouncements] = useState(null);

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);

    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    return dd + "/" + mm + "/" + yyyy;
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    await postAnnouncement(e.target[0].id, e.target[0].value);
    fetchData();
  };

  const handlePostDelete = async (e) => {
    await deleteAnnouncement(e.target.id);
    fetchData();
  };

  const fetchData = async () => {
    const res = await getAnnouncements();
    setAnnouncements(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!announcements) return null;

  return (
    <Container>
      <Row style={{ marginTop: "15%" }} className="justify-content-md-center">
        <Col>
          <h1>Welcome to WorkWise</h1>
        </Col>
        <Col>
          <h1>Recent Announcements</h1>

          <table
            className="table table-bordered px-5"
            style={{ marginTop: 20 }}
          >
            <tbody>
              {window.getState().session.level >= 1 ? (
                <tr>
                  <td>
                    <Form style={{ margin: "3%" }} onSubmit={handlePostSubmit}>
                      <Form.Group
                        className="mb-3"
                        controlId={window.getState().session.userId}
                      >
                        <Form.Label>
                          <h4>Create a New Announcement</h4>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Enter a message here..."
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit">
                        Post Announcement
                      </Button>
                    </Form>
                  </td>
                </tr>
              ) : null}

              {announcements.toReversed().map((entry) => {
                return (
                  <tr key={entry._id}>
                    <td>
                      <div style={{ margin: "3%" }}>
                        <h3>{entry.firstName + " " + entry.lastName}</h3>
                        <h5 style={{ color: "DimGray" }}>
                          {getFormattedDate(entry.date)}
                        </h5>

                        <p>{entry.message}</p>

                        {window.getState().session.level >= 1 ? (
                          <Button
                            id={entry._id}
                            onClick={handlePostDelete}
                            variant="danger"
                          >
                            Delete
                          </Button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
