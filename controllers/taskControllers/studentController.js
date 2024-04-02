import Task from "../../models/taskDB.js";
import sendResponse from "../../utils/responseHandler.js";

export const addTask = async (req, res) => {
  const { taskTitle, taskDescription } = req.body;
  const missingFields = !taskTitle || !taskDescription;

  if (req.user.role === "teacher") {
    return sendResponse(res, 400, "fail", "Teachers cannot add tasks !");
  }

  if (missingFields) {
    return sendResponse(
      res,
      400,
      "fail",
      "Either Task Title or Task Description missing!"
    );
  }
  try {
    const task = await Task.create({
      taskTitle,
      taskDescription,
      userId: req.user.id.toString(),
    });
    sendResponse(res, 201, "success", "Task added!", { task });
  } catch (err) {
    sendResponse(res, 400, "error", err.message);
  }
};

export const getTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const tasks = await Task.find({ userId });
    sendResponse(res, 200, "success", "Tasks fetched successfully.", {
      tasksCount: tasks.length,
      tasks,
    });
  } catch (err) {
    sendResponse(res, 400, "fail", err.message);
  }
};

export const markAsComplete = async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.user.id.toString();

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { completed: true },
      { new: true }
    );
    if (!updatedTask) {
      return sendResponse(
        res,
        404,
        "fail",
        "No task found with that ID for the current user."
      );
    }
    sendResponse(res, 200, "success", "Task marked as complete!", {
      updatedTask,
    });
  } catch (err) {
    sendResponse(res, 500, "fail", err.message);
  }
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.user.id.toString();
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });
    if (!deletedTask) {
      return sendResponse(
        res,
        404,
        "fail",
        "No task found with that ID for current user."
      );
    }
    sendResponse(res, 200, "success", "Task deleted!", { deletedTask });
  } catch (error) {
    sendResponse(res, 500, "fail", error.message);
  }
};
