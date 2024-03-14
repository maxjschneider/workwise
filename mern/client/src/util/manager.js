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
