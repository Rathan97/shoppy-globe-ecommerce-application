import user from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import "../models/dbConnection.js";

// Handle user signup
export const userSignup = async (req, res) => {

    try {
        const { firstName, lastName, email, phoneNumber, password } = req.body;

        // Validate required fields
        if (!firstName, !lastName, !email, !phoneNumber, !password) {
            return res.status(400).json({ success: false, message: "All fields are required.." })
        }

        // Check if user already exists
        const existedUser = await user.findOne({ email })
        if (existedUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in the database
        const newUser = await user.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword
        })

        // Generate JWT token
        const token = jwt.sign({ userID: newUser.userID, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

        // Send response with token and user info
        res.status(201).json({
            success: true,
            message: "User registered Successfully",
            user: { id: newUser.userID, name: newUser.firstName, email: newUser.email },
            token
        });

    } catch (err) {
        // Handle server errors
        return res.status(500).json({ success: false, message: "Sign up failed", err: err.message })
    }
};

// Handle user login
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email, !password) {
            return res.status(400).json({ success: false, message: "All fields are required.." })
        }

        // Check if user exists
        const existedUser = await user.findOne({ email });
        if (!existedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, existedUser.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" })
        }

        // Generate JWT token
        const token = jwt.sign({ userID: existedUser.userID, email: existedUser.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })

        // Send response with token and user info
        res.status(201).json({
            status: true,
            message: "Login Successfull",
            user: { userID: existedUser.userID, name: existedUser.firstName, email: existedUser.email },
            token
        })

    } catch (err) {
        // Handle server errors
        return res.status(500).json({ success: false, message: "Login Failed", err: err.message })
    }
}
