const headers = {
  "Access-Control-Allow-Origin": true,
  "Content-Type": "application/json", 
  "Access-Control-Allow-Credentials": true
} 

export const register = user => (
    fetch(process.env.REACT_APP_HOSTNAME + "/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: headers,
      credentials:"include"
    })
);
  
export const login = user => (
    fetch(process.env.REACT_APP_HOSTNAME + "/api/session", {
      method: "POST",
      body: JSON.stringify(user),
      headers: headers,
      credentials:"include"
    })
);
  
export const logout = () => (
    fetch(process.env.REACT_APP_HOSTNAME + "/api/session", { 
        method: "DELETE",
        headers: headers,
        credentials:"include"
     })
);

export const checkLoggedIn = async () => {
    const response = await fetch(process.env.REACT_APP_HOSTNAME + '/api/session', {
        method: "GET",
        headers: headers,
        credentials: "include"
      }
    );
    const { user } = await response.json();
    let preloadedState = {};

    if (user) {
      preloadedState = {
        session: user
      };
    }

    return preloadedState;
};