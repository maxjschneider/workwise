const headers = {
    "Access-Control-Allow-Origin": true,
    "Content-Type": "application/json", 
    "Access-Control-Allow-Credentials": true
} 

export const clockIn = async () => {
    const response = await fetch(process.env.REACT_APP_HOSTNAME + '/api/session', {
        method: "GET",
        headers: headers,
        credentials: "include"
      }
    );

    const { user } = await response.json();

    return fetch(process.env.REACT_APP_HOSTNAME + "/api/clockin", {
      method: "POST",
      body: JSON.stringify({ user_id: user.user_id}),
      headers: headers,
      credentials:"include"
    })
};