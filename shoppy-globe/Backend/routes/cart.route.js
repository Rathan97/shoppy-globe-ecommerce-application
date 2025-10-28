import { fetchItems, addItem, updateQuantity, removeItem, clearCart } from "../controllers/cart.controller.js";
import { verifyToken } from "../middlleware/authmiddleware.js";

// Function to define all cart-related routes
function cartRoutes(router){
    // Route to fetch all cart items for the logged-in user
    router.get("/api/cart/", verifyToken, fetchItems);

    // Route to add a new item to the user's cart
    router.post("/api/cart/", verifyToken, addItem);

    // Route to update the quantity of an item in the cart
    router.put("/api/cart/", verifyToken, updateQuantity);

    // Route to remove an item from the user's cart
    router.delete("/api/cart/", verifyToken, removeItem);

    // Route to clear all items from the user's cart
    router.delete("/api/cart/clear", verifyToken, clearCart);
}

export default cartRoutes;
