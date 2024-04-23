import mongoose from "mongoose";

const incomeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["salary", "business", "gift", "others"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestams: true }
);

export default mongoose.model("Income", incomeSchema);
