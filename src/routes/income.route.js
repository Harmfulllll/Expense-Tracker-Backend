import express from "express";

import verifyToken from "../middlewares/verify.middleware.js";
/* import from income controller */
import {
  createIncome,
  deleteIncome,
  getAllIncomes,
  getIncome,
  updateIncome,
} from "../controllers/income.controller.js";

/**
 * Express router instance for handling income routes.
 */
const router = express.Router();

router.post("/create-income", verifyToken, createIncome);

router.get("/get-incomes", verifyToken, getIncome);

router.patch("/update-income", verifyToken, updateIncome);

router.delete("/delete-income/:id", verifyToken, deleteIncome);

router.get("/getall-incomes", verifyToken, getAllIncomes);

export default router;
