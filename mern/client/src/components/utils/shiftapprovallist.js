import { useEffect, useState } from "react";

import { getUnapprovedShifts } from "../../util/manager";
import { getTime } from "../../util/timeConvert";
import { Check } from "react-bootstrap-icons";
import { X } from "react-bootstrap-icons";

export default function ShiftApprovalList() {
  const [shifts, setShifts] = useState();

  const updateShifts = async () => {
    const unapproved = await getUnapprovedShifts();

    setShifts(unapproved);
  };

  const processShift = async (id, approved) => {
    console.log(id + " " + approved);
  };

  useEffect(() => {
    updateShifts();
  }, []);

  return (
    <>
      <table
        className="table table-striped table-bordered px-5"
        style={{ marginTop: 20 }}
      >
        <thead>
          <tr>
            <th scope="col" className="col-1">
              Name
            </th>
            <th scope="col" className="col-1">
              Start/End Time
            </th>
            <th scope="col" className="col-1">
              Hours Worked
            </th>
            <th scope="col" className="col-1">
              Approve/Deny
            </th>
          </tr>
        </thead>

        <tbody>
          {shifts !== undefined
            ? shifts.map((entry, i) => {
                return (
                  <tr key={i}>
                    <td>{entry.firstName + " " + entry.lastName}</td>
                    <td>{getTime(entry.start) + " - " + getTime(entry.end)}</td>
                    <td>{entry.hoursWorked.toFixed(3)}</td>
                    <td className="d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-success col-3 mx-3"
                        onClick={() => processShift(entry.user_id, true)}
                      >
                        <Check />
                      </button>

                      <button
                        className="btn btn-danger col-3 mx-3"
                        onClick={() => processShift(entry.user_id, false)}
                      >
                        <X />
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </>
  );
}
