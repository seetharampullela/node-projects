import express from "express";
import { connectDB } from "./config/db.js";
import routes from "./routes/product.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json()); // Middleware: allows us to accept JSON data in the req.body
const PORT = process.env.PORT || 5000;
// console.log("configDotenv", PORT);

// Routes
app.use("/api/products", routes);

app.listen(PORT, () => {
  connectDB();
  console.log("Sever is running on port " + PORT);
});
