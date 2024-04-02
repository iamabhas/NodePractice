import express from "express";
import validateToken from "../middlewares/apiAuth.js";
import {
  addTask,
  getTasks,
  markAsComplete,
  deleteTask,
} from "../controllers/taskControllers/studentController.js";
import {
  getTasksForApproval,
  markAsApproved,
  getStudents,
} from "../controllers/taskControllers/teacherController.js";

const tasksRouter = express.Router();

//student routes
tasksRouter.post("/addTask", validateToken, addTask);
tasksRouter.get("/getTasks", validateToken, getTasks);
tasksRouter.patch("/completeTask/:taskId", validateToken, markAsComplete);
tasksRouter.delete("/deleteTask/:taskId", validateToken, deleteTask);

//teacher routes
tasksRouter.get("/getAllTasks", validateToken, getTasksForApproval);
tasksRouter.patch("/approveTask/:taskId", validateToken, markAsApproved);
tasksRouter.get("/getStudents", validateToken, getStudents);

export default tasksRouter;
