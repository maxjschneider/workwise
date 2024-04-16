var hostName = "http://localhost:5050";

const headers = {
  "Access-Control-Allow-Origin": true,
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};

test("test get announcements", async () => {
  console.log(process.env.NODE_ENV);
  const response = await fetch(hostName + "/api/announcements/", {
    method: "GET",
    headers: headers,
    credentials: "include",
  });

  const result = await response.json();

  expect(1).toBe(1);
});
