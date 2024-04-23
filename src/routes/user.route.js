import express from "express";
import {
  changePassword,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verify.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", verifyToken, logoutUser);

userRouter.post("/change-password", verifyToken, changePassword);

export default userRouter;
