import jwt from "jsonwebtoken";
import config from "../config.js";
import userModel from "../models/authDB.js";
import sendResponse from "../utils/responseHandler.js";

const validateToken = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return sendResponse(
      res,
      401,
      "fail",
      "You are not allowed to access this route. Please log in!"
    );
  }

  try {
    const decoded = jwt.verify(token, config.accessTokenSecret);
    const user = await userModel.findOne({ _id: decoded.id }).select("_id");

    if (!user) {
      return sendResponse(res, 401, "fail", "No user found with this ID.");
    }

    req.user = { id: decoded.id, username: decoded.username };
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return sendResponse(
        res,
        403,
        "fail",
        "Invalid token. Please log in again!"
      );
    } else if (err.name === "TokenExpiredError") {
      return sendResponse(
        res,
        403,
        "fail",
        "Your token has expired. Please log in again!"
      );
    } else {
      return sendResponse(
        res,
        500,
        "error",
        "An error occurred during authentication. Please try again!"
      );
    }
  }
};

export default validateToken;
