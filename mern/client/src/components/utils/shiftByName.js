import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

import Form from "react-bootstrap/Form";

import { getAllUsers } from "../../util/manager";
import { useEffect, useState } from "react";

const ShiftEditor = () => {
  const [users, setUsers] = useState(null);

  const fetchData = async () => {
    const res = await getAllUsers();
    setUsers(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!users) return null;

  return (
    <div>
      <h1 className="py-5">View Shifts By Employee</h1>

      <Form style={{ width: "25%" }}>
        <Form.Group className="mb-3" controlId="day">
          <Form.Select defaultValue="" required>
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
        </Form.Group>
      </Form>
    </div>
  );
};

export default ShiftEditor;
