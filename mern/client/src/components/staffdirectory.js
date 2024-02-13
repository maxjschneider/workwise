import React, { useState, useEffect } from "react"
import { Table } from 'react-bootstrap';


export default function StaffDirectory() {
    const [staffList, setStaffList] = useState([]);
    const HOSTNAME = "http://localhost:5000"

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {

        const userResponse = await fetch(HOSTNAME + "/api/users/");

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
            <Table striped bordered>
              <thead>
                <tr className="black-row">
                  <th>Position</th>
                  <th>First</th>
                  <th>Last</th>
                  <th>Level</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {staffList.map((entry) => {
                    return (
                        <tr key={entry._id}>
                            <td>{entry.position}</td>
                            <td>{entry.firstName}</td>
                            <td>{entry.lastName}</td>
                            <td>{entry.level}</td>
                            <td>{entry.email}</td>
                        </tr>
                    )
                })}
              </tbody>
            </Table>
    )
}