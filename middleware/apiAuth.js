import jwt from "jsonwebtoken";
import config from "../config.js";
import createAppError from "../controllers/errorController.js";
import userModel from "../models/authDB.js";

const validateToken = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(
      createAppError(
        "You are not allowed to access this route . Please log in !",
        401
      )
    );
  }

  try {
    const decoded = jwt.verify(token, config.accessTokenSecret);
    const user = await userModel.findOne({ _id: decoded.id }).select("_id");

    if (!user) {
      return next(createAppError("No user found with this ID.", 401));
    }

    req.user = { id: decoded.id, username: decoded.username };
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return next(createAppError("Invalid token. Please log in !", 403));
    } else if (err.name === "TokenExpiredError") {
      return next(
        createAppError("Your token has expired. Please log in again !", 403)
      );
    } else {
      return next(
        createAppError(
          "An error occurred during authentication. Please try again.",
          500
        )
      );
    }
  }
};

export default validateToken;
