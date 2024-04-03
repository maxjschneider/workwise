import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

import Form from "react-bootstrap/Form";

import { getAllUsers, getUserShifts } from "../../util/manager";
import { useEffect, useState } from "react";

const ShiftEditor = () => {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

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
      <h1 className="py-5">View Shifts By Employee</h1>

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
        currentUser.map((entry) => {
          return <div key={entry._id}>{entry._id}</div>;
        })
      )}

      <div style={{ marginTop: "200px" }}></div>
    </div>
  );
};

export default ShiftEditor;
