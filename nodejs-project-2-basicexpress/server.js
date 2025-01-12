import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import posts from "./routes/posts.js";
import logger from "./middlerware/logger.js";
import errorHandler from "./middlerware/error.js";
import notFound from "./middlerware/notFound.js";
const port = process.env.PORT || 8000;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Request Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger middler
app.use(logger);

// setup static folder /* For server side UI rendering */
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/posts", posts);

// Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
