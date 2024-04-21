const hostName = "http://localhost:5050";

const headers = {
  "Access-Control-Allow-Origin": true,
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};

test("test user login", async () => {
  const response = await fetch(hostName + "/api/session", {
    method: "POST",
    body: JSON.stringify({ email: "maxschneider@vt.edu", password: "1234" }),
    headers: headers,
    credentials: "include",
  });

  const result = await response.json();

  expect(result.firstName).toBe("Max");
});
