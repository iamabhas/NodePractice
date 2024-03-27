import config from "../config.js";
import jwt from "jsonwebtoken";

export const createAccessToken = (id, username, role) => {
  return jwt.sign({ id, username, role }, config.accessTokenSecret, {
    expiresIn: "1d",
  });
};
