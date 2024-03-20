import config from "../config.js";
import jwt from "jsonwebtoken";

export const createAccessToken = (id, username) => {
  return jwt.sign({ id, username }, config.accessTokenSecret, {
    expiresIn: "15m",
  });
};
