import express from "express";
import { SignUp, Login, Logout } from "../controllers/authController.js";
import validateToken from "../middleware/apiAuth.js";

const authRouter = express.Router();
authRouter.post("/signup", SignUp);
authRouter.post("/login", Login);
authRouter.post("/logout", validateToken, Logout);

export default authRouter;
