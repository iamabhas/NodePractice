import { createAccessToken } from "../utils/createAccessToken.js";
import sendResponse from "../utils/responseHandler.js";
import userModel from "../models/authDB.js";

export const SignUp = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    await userModel.userSignUp(username, password, role);
    sendResponse(
      res,
      201,
      "success",
      `User '${username}' registered as ${role} !`
    );
  } catch (error) {
    sendResponse(res, error.statusCode || 500, "error", error.message);
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.userLogin(username, password);
    const accessToken = createAccessToken(user._id, user.username, user.role);

    res.status(200).json({
      message: `User '${username}' logged in !`,
      accessToken,
      role: user.role,
    });
  } catch (error) {
    sendResponse(res, error.statusCode || 500, "error", error.message);
  }
};

export const Logout = async (req, res) => {
  try {
    if (!req.user || !req.user.username) {
      return sendResponse(res, 401, "fail", "User is not authenticated.");
    }

    const { username } = req.user;
    sendResponse(
      res,
      200,
      "success",
      `User '${username}' logged out successfully!`
    );
  } catch (error) {
    console.error("Logout error:", error);
    sendResponse(res, 500, "error", "Cannot logout. Please try again!");
  }
};
