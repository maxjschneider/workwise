export const signup = user => (
    fetch("api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {"Access-Control-Allow-Origin": true}
    })
);
  
export const login = user => (
    fetch("api/session", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {"Access-Control-Allow-Origin": true}
    })
);
  
export const logout = () => (
    fetch("api/session", { 
        method: "DELETE",
        headers: {"Access-Control-Allow-Origin": true}
     })
);