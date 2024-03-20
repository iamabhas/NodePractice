import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config.js";
import cookieParser from "cookie-parser";

//Routes
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/", authRouter);

app.get("/", (req, res) => {
  res.json({ status: true, message: "Node JS Application" });
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
