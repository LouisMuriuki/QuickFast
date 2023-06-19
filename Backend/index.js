import Connect from "./mongo/Connect.js";
import express from "express";
import cors from "cors"
const app = express();

app.use(cors())

// app.use("/api/v1/auth",);
// app.use("/api/v1/users",);

const StartServer = () => {
  try {
    // Connect("");
    app.listen(5000, () => {
      console.log("server is up");
    });
  } catch (error) {
    console.log(error)
  }
};

StartServer()
