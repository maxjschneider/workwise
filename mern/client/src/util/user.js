const headers = {
  "Access-Control-Allow-Origin": true,
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};

export const clockIn = async () => {
  const user_id = window.getState().session.userId;

  return fetch(process.env.REACT_APP_HOSTNAME + "/api/timeclock/clockin", {
    method: "POST",
    body: JSON.stringify({ user_id: user_id }),
    headers: headers,
    credentials: "include",
  });
};

export const clockOut = async () => {
  const user_id = window.getState().session.userId;

  return fetch(process.env.REACT_APP_HOSTNAME + "/api/timeclock/clockout", {
    method: "POST",
    body: JSON.stringify({ user_id: user_id }),
    headers: headers,
    credentials: "include",
  });
};

export const isClockedIn = async () => {
  const user_id = window.getState().session.userId;

  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/users/" + user_id,
    {
      method: "GET",
      headers: headers,
      credentials: "include",
    }
  );

  const user = await response.json();

  return user;
};

export const getUser = async () => {
  const user_id = window.getState().session.userId;

  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/users/" + user_id,
    {
      method: "GET",
      headers: headers,
      credentials: "include",
    }
  );

  const user = await response.json();

  return user;
};

// hours, isclockedin, and shifts
export const getUserStatus = async () => {
  const user_id = window.getState().session.userId;

  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/users/status/" + user_id,
    {
      method: "GET",
      headers: headers,
      credentials: "include",
    }
  );

  const status = await response.json();

  return status;
};

// to change day to monday, update = { day : "Monday" }
export const updateUserScheduleEntry = async (_id, update) => {
  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/schedule/update",
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

export const updateUser = async (_id, update) => {
  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/users/update",
    {
      method: "POST",
      body: JSON.stringify({ _id: _id, update: update }),
      headers: headers,
      credentials: "include",
    }
  );

  const result = await response.json();

  return result;
};
