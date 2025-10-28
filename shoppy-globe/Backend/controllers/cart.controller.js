import cart from "../models/cart.js";
import "../models/dbConnection.js";
import products from "../models/Products.js";

// Fetch all items in the user's cart
export const fetchItems = async (req, res) => {
  try {
    const  userID  = req.user.userID; 

    // Validate that userID is present
    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Query cart collection for user's items
    const data = await cart.find({ userID });

    // If cart is empty, return empty array with message
    if (!data || data.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        items: [],
      });
    }

    // Return fetched cart items
    return res.status(200).json({
      success: true,
      message: "Cart items fetched successfully",
      items: data,
    });
  } catch (error) {
    // Handle server errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Add item to cart
export const addItem = async (req, res) => {
   const  userID  = req.user.userID;
  const {  productID, title, thumbnail, brand, price, quantity } = req.body;

  // Validate required fields
  if (!userID || !productID || !title || !thumbnail || !brand || !price) {
    return res.status(400).json({
      success: false,
      message: "Bad Request — Missing required fields",
    });
  }

  try {
    // Check if product exists in products collection
    const existingProduct = await products.findOne({ id: productID });
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found in products collection",
      });
    }

    // Check if item already exists in user's cart
    const existingItem = await cart.findOne({ userID, productID });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      // Prevent exceeding stock
      if (existingProduct.stock && newQuantity > existingProduct.stock) {
        return res.status(400).json({
          success: false,
          message: "Cannot exceed available stock",
        });
      }

      // Update quantity if item exists
      existingItem.quantity = newQuantity;
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Quantity updated successfully",
        item: existingItem,
      });
    }

    // Create new cart item if not exists
    const newItem = await cart.create({
      userID,
      productID,
      title,
      thumbnail,
      brand,
      price,
      quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Item added to cart successfully",
      item: newItem,
    });
  } catch (err) {
    // Handle server errors
    return res.status(500).json({
      success: false,
      message: "Error occurred while adding item to cart",
      error: err.message,
    });
  }
};

// Update quantity in the cart
export const updateQuantity = async (req, res) => {
  try {
    const { productID, quantity } = req.body;

    // Validate required fields
    if (!productID || typeof quantity !== "number") {
      return res.status(400).json({
        success: false,
        message: "Invalid request — productID and quantity required",
      });
    }

    // Find the existing cart item
    const existingItem = await cart.findOne({ productID });

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in the cart",
      });
    }

    const newQuantity = existingItem.quantity + quantity;

    // Validate quantity limits
    if (newQuantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be less than 0",
      });
    }

    if (existingItem.stock && newQuantity > existingItem.stock) {
      return res.status(400).json({
        success: false,
        message: "Cannot exceed available stock",
      });
    }

    // Update and save quantity
    existingItem.quantity = newQuantity;
    await existingItem.save();

    return res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      item: existingItem,
    });
  } catch (e) {
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Error updating quantity",
      error: e.message,
    });
  }
};

// Remove item from cart
export const removeItem = async (req, res) => {
   const  userID  = req.user.userID;
  const { productID } = req.body;

  // Validate required fields
  if (!userID || !productID) {
    return res.status(400).json({
      success: false,
      message: "Bad Request — Missing userID or productID",
    });
  }

  try {
    // Delete the cart item
    const deletedItem = await cart.findOneAndDelete({ userID, productID });
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in the cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item deleted from the cart successfully",
      userID:userID
    });
  } catch (e) {
    // Handle errors
    return res.status(500).json({
      success: false,
      message: "Error deleting item from the cart",
      error: e.message,
    });
  }
};

// Clear entire cart for a user
export const clearCart = async (req, res) => {
   const  userID  = req.user.userID;

  // Validate userID
  if (!userID) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    // Delete all cart items for the user
    const result = await cart.deleteMany({ userID });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No items found in the cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (e) {
    // Handle errors
    return res.status(500).json({
      success: false,
      message: "Error while clearing the cart",
      error: e.message,
    });
  }
};
