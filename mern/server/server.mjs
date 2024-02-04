import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import users from "./routes/users.mjs";
import schedule from "./routes/schedule.mjs";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", users);
app.use("/schedule", schedule);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});