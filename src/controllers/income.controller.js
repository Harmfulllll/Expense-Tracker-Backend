import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import incomeModel from "../models/income.model.js";

const createIncome = async (req, res) => {
  try {
    const { title, description, amount, category, date } = req.body;
    if (!title || !amount || !category || !date) {
      return res.json(new apiError(400, "All fields are required"));
    }
    const newIncome = await incomeModel.create({
      title,
      description,
      amount,
      category,
      date,
      user: req.user._id,
    });
    return res.json(
      new apiResponse(201, "Income created successfully", newIncome)
    );
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};

const getIncome = async (req, res) => {
  try {
    let income = [];
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    if (req.query.category) {
      income = await incomeModel
        .find({ user: req.user._id, category: req.query.category })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      income = await incomeModel
        .find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }
    if (!income.length) return res.json(new apiError(200, "No income found"));
    return res.json(
      new apiResponse(200, "Income fetched successfully", income)
    );
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};

const getAllIncomes = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.json(
        new apiError(403, "You are not authorized to perform this action")
      );
    }
    let incomes = [];
    const page = parseInt(req, query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    if (req.query.category) {
      incomes = await incomeModel
        .find({ category: req.query.category })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    } else {
      incomes = await incomeModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }
    if (!incomes.length) {
      return +res.json(new apiError(200, "No incomes found"));
    }
    return res.json(
      new apiResponse(200, "Incomes fetched successfully", incomes)
    );
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};

const updateIncome = async (req, res) => {
  try {
    const { title, description, amount, category, date } = req.body;
    if (!title || !amount || !category || !date) {
      return res.json(new apiError(400, "All fields are required"));
    }
    const income = await incomeModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        amount,
        category,
        date,
      },
      { new: true }
    );
    if (!income) {
      return res.json(new apiError(404, "Income not found"));
    }
    return res.json(
      new apiResponse(200, "Income updated successfully", income)
    );
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};

const deleteIncome = async (req, res) => {
  try {
    const deletedIncome = await incomeModel.findByIdAndDelete(req.params.id);
    if (!deletedIncome) {
      return res.json(new apiError(404, "Income not found"));
    }
    return res.json(
      new apiResponse(200, "Income deleted successfully", deletedIncome)
    );
  } catch (error) {
    return res.json(new apiError(500, error.message));
  }
};
export { createIncome, getIncome, getAllIncomes, updateIncome, deleteIncome };
