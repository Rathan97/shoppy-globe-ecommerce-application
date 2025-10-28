import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, ".env") });

import express from "express";
import cors from "cors";

// Import database connection
import "./models/dbConnection.js";

// Import route modules
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import userRoutes from "./routes/user.route.js";

// Initialize Express app
const app = express();
const port = 5100;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Initialize router
const router = express.Router();
app.use("/", router);

// Define routes using imported route modules
userRoutes(router);
productRoutes(router);
cartRoutes(router);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
