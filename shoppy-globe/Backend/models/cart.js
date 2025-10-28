import mongoose from "mongoose";


// Define the schema for cart items
const cartSchema = new mongoose.Schema({
    userID: String,
    productID : Number,
     title :  String ,
     thumbnail : String ,
      brand :  String ,
      price : Number,
      quantity :{type:Number,
                default:1
      }

})

// Create the cart model based on the schema
const cart = mongoose.model("cart",cartSchema);

export default cart;