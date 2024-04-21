var hostName = "http://localhost:5050";

const headers = {
  "Access-Control-Allow-Origin": true,
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};

test("test announcement system", async () => {
  await fetch(hostName + "/api/announcements/post", {
    method: "POST",
    body: JSON.stringify({
      id: "661eee011ec7eae109c71de3",
      message: "test",
    }),
    headers: headers,
    credentials: "include",
  });

  await new Promise((r) => setTimeout(r, 1000));

  var response = await fetch(hostName + "/api/announcements/", {
    method: "GET",
    headers: headers,
    credentials: "include",
  });

  var result = await response.json();

  // give server a moment to update
  expect(result[0].message).toBe("test");

  await fetch(hostName + "/api/announcements/delete", {
    method: "POST",
    body: JSON.stringify({ id: result[0]._id }),
    headers: headers,
    credentials: "include",
  });

  var response = await fetch(hostName + "/api/announcements/", {
    method: "GET",
    headers: headers,
    credentials: "include",
  });

  var result = await response.json();

  expect(result.length).toBe(0);
});
