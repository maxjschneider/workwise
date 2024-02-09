import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.css";

const getTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", { hour:"numeric", minute:"2-digit", timeZone:"UTC" });
}

const ScheduleColumn = (props) => (
    <td>
        <table>
            <tbody>
                {props.entry.map((entry, i) => <tr key={i}><td><h6 style={{fontSize:15}}>{entry.name} (<i>{entry.position}</i>)</h6>{getTime(entry.start)} - {getTime(entry.end)}</td></tr>)}
            </tbody>
        </table>
    </td>
)

export default function Schedule() {
    const [schedule, setSchedule] = useState([]);
    const HOSTNAME = "http://localhost:5000"

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        var responses = [];
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        for (let [i, day] of days.entries()) {
            const response = await fetch(HOSTNAME + "/api/schedule/day/" + day, 
                {headers: {"Access-Control-Allow-Origin": true}}
            );

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            
            responses[i] = await response.json();

            if (responses[i][0] != null) {
                console.log(responses[i][0].user_id);
                console.log(day);
                console.log();
                const get_user_response = await fetch(HOSTNAME + "/api/users/" + responses[i][0].user_id);

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


    return (
        <div>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th scope="col" className="col-1">Sunday</th>
                        <th scope="col" className="col-1">Monday</th>
                        <th scope="col" className="col-1">Tuesday</th>
                        <th scope="col" className="col-1">Wednesday</th>
                        <th scope="col" className="col-1">Thursday</th>
                        <th scope="col" className="col-1">Friday</th>
                        <th scope="col" className="col-1">Saturday</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        { 
                            schedule.map((entry) => {
                                return (
                                    <ScheduleColumn 
                                        key={entry.name} 
                                        entry={entry}
                                    />
                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )

    /*
    
    async function insertEntry() {
        const res = await fetch(HOSTNAME + "/api/schedule/", {
            method: "POST", 
            body: JSON.stringify({
                user_id: "65c00cd36f2337b1c2302aea", 
                day: "Tueday",
                start: new Date("1970-01-01T08:30:00.000+00:00"), 
                end: new Date("1970-01-01T12:30:00.000+00:00"),
                enabled: true
            }),
            headers: {
                "Access-Control-Allow-Origin": true,
                "Content-Type": "application/json"
            }
        });

        const resp = await res.json();
        console.log(resp);
    }*/
}