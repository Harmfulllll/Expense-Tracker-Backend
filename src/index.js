import express from "express";
import dotenv from "dotenv";
import cors from "cors";

/* Import from other files */
import dbconnect from "./database/db.js";

/* Import routes */
import userRoutes from "./routes/user.route.js";
import expenseRoutes from "./routes/expense.route.js";

/* Configuaration */
dotenv.config();

/* initialize app */
const app = express();

/* middlewares */
app.use(express.json());

/* cors setup */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

/* Routes */
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

const port = process.env.PORT || 8080;

/* DB connection */
dbconnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
