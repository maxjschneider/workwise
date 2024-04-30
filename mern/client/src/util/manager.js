const headers = {
  "Access-Control-Allow-Origin": true,
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};

export const getUnapprovedShifts = async () => {
  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/timeclock/unapproved",
    {
      method: "GET",
      headers: headers,
      credentials: "include",
    }
  );

  const result = await response.json();
  return result;
};

export const processShift = async (_id, approved) => {
  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/timeclock/process",
    {
      method: "POST",
      body: JSON.stringify({ _id: _id, approved: approved }),
      headers: headers,
      credentials: "include",
    }
  );

  const result = await response.json();
  return result;
};

export const getAllUsers = async () => {
  const response = await fetch(process.env.REACT_APP_HOSTNAME + "/api/users", {
    method: "GET",
    headers: headers,
    credentials: "include",
  });

  const result = await response.json();
  return result;
};

export const getUserShifts = async (id) => {
  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/timeclock/user/" + id,
    {
      method: "GET",
      headers: headers,
      credentials: "include",
    }
  );

  const result = await response.json();
  return result;
};

export const updateUserShiftEntry = async (_id, update) => {
  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/timeclock/update",
    {
      method: "POST",
      body: JSON.stringify({ _id: _id, update: update }),
      headers: headers,
      credentials: "include",
    }
  );

  const status = await response.json();

  return status;
};

export const deleteScheduleEntry = async (_id) => {
  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/schedule/delete",
    {
      method: "POST",
      body: JSON.stringify({ _id: _id }),
      headers: headers,
      credentials: "include",
    }
  );

  const status = await response.json();

  return status;
};
