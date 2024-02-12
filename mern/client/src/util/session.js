export const signup = user => (
    fetch(process.env.REACT_APP_HOSTNAME + "/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json"
      } 
    })
);
  
export const login = user => (
    fetch(process.env.REACT_APP_HOSTNAME + "/api/session", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Access-Control-Allow-Origin": true,
        "Content-Type": "application/json"
      } 
    })
);
  
export const logout = () => (
    fetch(process.env.REACT_APP_HOSTNAME + "/api/session", { 
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json"
        }
     })
);

export const checkLoggedIn = async () => {
    const response = await fetch(process.env.REACT_APP_HOSTNAME + '/api/session');
    const { user } = await response.json();
    let preloadedState = {};

    if (user) {
      preloadedState = {
        session: user
      };
    }

    return preloadedState;
};