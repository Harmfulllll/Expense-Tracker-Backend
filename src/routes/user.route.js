import express from "express";
import {
  changePassword,
  deleteUser,
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateBudget,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verify.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", verifyToken, logoutUser);

userRouter.patch("/change-password", verifyToken, changePassword);

userRouter.delete("/delete/:id", verifyToken, deleteUser);

userRouter.patch("/update-budget", verifyToken, updateBudget);

userRouter.get("/get-all-users", verifyToken, getAllUsers);

export default userRouter;
