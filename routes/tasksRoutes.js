import express from "express";
import validateToken from "../middlewares/apiAuth.js";
import {
  addTask,
  getTasks,
  markAsComplete,
  deleteTask,
} from "../controllers/tasksController.js";

const tasksRouter = express.Router();

tasksRouter.post("/addTask", validateToken, addTask);
tasksRouter.get("/getTasks", validateToken, getTasks);
tasksRouter.patch("/completeTask/:taskId", validateToken, markAsComplete);
tasksRouter.delete("/deleteTask/:taskId", validateToken, deleteTask);

export default tasksRouter;
