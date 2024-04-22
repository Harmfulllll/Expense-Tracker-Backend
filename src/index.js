import express from "express";
import dotenv from "dotenv";
import cors from "cors";

/* Import from other files */
import dbconnect from "./database/db.js";

/* Configuaration */
dotenv.config();

/* initialize app */
const app = express();

/* middlewares */

/* cors setup */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

/* Routes */

let port = process.env.PORT || 8080;

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
