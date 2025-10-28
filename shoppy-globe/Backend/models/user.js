import mongoose from "mongoose";

// Define the schema for users 
const userSchema = new mongoose.Schema({
   userID: { type: String, default: function() { return this._id.toString(); } }, // Mapping document id to userID
    firstName : String,
    lastName: String,
    email:{type: String, required:true, unique:true},
    phoneNumber : Number,
    password: String
})


// Create the user model based on the schema
const user = mongoose.model("user", userSchema);

export default user;