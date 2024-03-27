import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config.js";

//Routes
import authRouter from "./routes/authRoutes.js";
import tasksRouter from "./routes/tasksRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/", [authRouter, tasksRouter]);

app.get("/", (req, res) => {
  res.json({ status: "success", message: "Node JS Application" });
});

//db and server connection
mongoose
  .connect(config.mongodbPort)
  .then(() => {
    app.listen(config.serverPort, () => {
      console.log(
        `db connection success | Server listening on port ${config.serverPort}...`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
