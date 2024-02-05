import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css";

const ScheduleColumn = (props) => (
    <td>
        <table>
            {props.entry.map((entry) => <tr><td>{entry.name} <br/> {entry.position} <br/> {entry.start} <br/> {entry.end} </td></tr>)}
        </table>
    </td>
)

export default function Schedule() {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        var responses = [];

        async function getSchedule() {
            const HOSTNAME = "http://localhost:5000"

            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            for (let [i, day] of days.entries()) {
                const response = await fetch(HOSTNAME + "/schedule/day/" + day);

                if (!response.ok) {
                    const message = `An error occurred: ${response.statusText}`;
                    window.alert(message);
                    return;
                }

                responses[i] = await response.json();

                if (responses[i][0] != null) {
                    const get_user_response = await fetch(HOSTNAME + "/users/" + responses[i][0].user_id);

                    if (!get_user_response.ok) {
                        const message = `An error occurred: ${get_user_response.statusText}`;
                        window.alert(message);
                        return;
                    }

                    const user = await get_user_response.json();

                    responses[i][0].name = user.name;
                    responses[i][0].position = user.position;
                }
            }
            
            setSchedule(responses);
        }

        getSchedule();

        return;
    }, [schedule.length]);

    function mapSchedule() {
        return schedule.map((entry) => {
            return (
                <ScheduleColumn 
                    entry={entry}
                />
            )
        });
    }

    return (
        <div>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        {mapSchedule()}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}