import Task from "../../models/taskDB.js";
import userModel from "../../models/authDB.js";
import sendResponse from "../../utils/responseHandler.js";

export const getTasksForApproval = async (req, res) => {
  if (req.user.role === "student") {
    return sendResponse(res, 400, "fail", "Students cannot fetch all tasks !");
  }

  try {
    const tasks = await Task.find({});
    sendResponse(
      res,
      200,
      "success",
      "Tasks fetched successfully for approval.",
      { tasksCount: tasks.length, tasks }
    );
  } catch (err) {
    sendResponse(res, 400, "fail", err.message);
  }
};

export const markAsApproved = async (req, res) => {
  const taskId = req.params.taskId;
  if (req.user.role === "student") {
    return sendResponse(res, 400, "fail", "Students cannot approve a task !");
  }
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { approved: true },
      { new: true }
    );
    if (!updatedTask) {
      return sendResponse(res, 404, "fail", "No task found with that ID !");
    }
    if (!updatedTask.completed) {
      return sendResponse(
        res,
        404,
        "fail",
        "Cannot approve uncompleted task !"
      );
    }
    sendResponse(res, 200, "success", "Task marked as approved!", {
      updatedTask,
    });
  } catch (err) {
    sendResponse(res, 500, "fail", err.message);
  }
};

export const getStudents = async (req, res) => {
  if (req.user.role === "student") {
    return sendResponse(
      res,
      400,
      "fail",
      "Students cannot fetch other students !"
    );
  }

  try {
    const students = await userModel.find(
      { role: "student" },
      { username: 1, _id: 1 }
    );
    return sendResponse(
      res,
      200,
      "success",
      "Students fetched successfully",
      students
    );
  } catch (err) {
    return sendResponse(res, 500, "error", "An error occurred", err.message);
  }
};
