import express from "express";
import verifyToken from "../middlewares/verify.middleware.js";
import {
  createExpense,
  deleteExpense,
  generateReport,
  getAllExpenses,
  getExpenses,
  updateExpense,
} from "../controllers/expense.controller.js";

const router = express.Router();

router.post("/create-expense", verifyToken, createExpense);

router.get("/get-expenses", verifyToken, getExpenses);

router.patch("/update-expense", verifyToken, updateExpense);

router.delete("/delete-expense/:id", verifyToken, deleteExpense);

router.get("getall-expenses", verifyToken, getAllExpenses);

router.get("/generate-report", verifyToken, generateReport);

export default router;
