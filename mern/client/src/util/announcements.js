const headers = {
  "Access-Control-Allow-Origin": true,
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};

export const getAnnouncements = async () => {
  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/announcements/",
    {
      method: "GET",
      headers: headers,
      credentials: "include",
    }
  );

  const result = await response.json();
  return result;
};

export const postAnnouncement = async (id, message) => {
  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/announcements/post",
    {
      method: "POST",
      body: JSON.stringify({ id: id, message: message }),
      headers: headers,
      credentials: "include",
    }
  );

  const result = await response.json();
  return result;
};

export const deleteAnnouncement = async (id) => {
  const response = await fetch(
    process.env.REACT_APP_HOSTNAME + "/api/announcements/delete",
    {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: headers,
      credentials: "include",
    }
  );

  const result = await response.json();
  return result;
};
