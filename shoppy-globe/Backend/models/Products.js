import mongoose from "mongoose";

// Define the schema for product items
  const ProductSchema = new  mongoose.Schema({
      id : Number,
       title :  String ,
       description :  String ,
       category : String ,
       price : Number,
       discountPercentage : Number,
       rating : Number,
       stock : Number,
       tags : Array,
       brand :  String ,
       sku : String ,
       weight : Number,
       dimensions :Object,
       warrantyInformation :  String ,
       shippingInformation :  String ,
       availabilityStatus : String ,
       reviews : Array,
       returnPolicy : String ,
       minimumOrderQuantity : Number,
       meta : Object,
       images : Array,
       thumbnail : String 
    
  })

// Create the product model based on the schema
  const products = mongoose.model("Product", ProductSchema);

  export default products;