import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import materialRoutes from "./routes/MaterialsRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware: allows us to accept JSON data in the req.body
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api", materialRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Sever is running on port " + PORT);
});
