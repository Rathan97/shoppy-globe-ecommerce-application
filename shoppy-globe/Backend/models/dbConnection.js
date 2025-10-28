import mongoose from "mongoose";

// Connect to the local MongoDB database named "shoppyglobe"
mongoose.connect("mongodb://127.0.0.1:27017/shoppyglobe");

// Get the default connection
const db = mongoose.connection;

// Event listener for successful connection
db.on("open", () => {
    console.log("Database connection successful");
});

// Event listener for connection errors
db.on("error", () => {
    console.log("Database connection failed");
});

// Event listener for when the database gets disconnected
db.on("disconnected", () => {
    console.log("Database Disconnected");
});

export default db;
