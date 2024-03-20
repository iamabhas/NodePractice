import { createAccessToken } from "../utils/createToken.js";
import userModel from "../models/authDB.js";

export const SignUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    await userModel.userSignUp(username, password);
    res.status(201).json({
      message: `User '${username}' registered !`,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ status: error.status, error: error.message });
  }
};

export const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.userLogin(username, password);
    const accessToken = createAccessToken(user._id, user.username);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: `User '${username}' logged in !`,
      accessToken,
    });
  } catch (error) {
    res
      .status(error.statusCode || 500)
      .json({ status: error.status, error: error.message });
  }
};

export const Logout = async (req, res) => {
  try {
    if (!req.user || !req.user.username) {
      return res.status(401).json({ message: "User is not authenticated." });
    }

    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    const { username } = req.user;
    res
      .status(200)
      .json({ message: `User '${username}' logged out successfully!` });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Cannot logout. Please try again!" });
  }
};
