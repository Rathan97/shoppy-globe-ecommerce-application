import {
  setCart,
  addItemLocal,
  removeItem,
  updateQuantity,
  clearCart,
} from "../redux/cartSlice.js";
import { toast } from "react-toastify";

// Base API URL for cart-related endpoints
const API_URL = "http://localhost:5100/api/cart";

/* FETCH CART ITEMS */
// Thunk to fetch cart data from backend
export const fetchDataFromDB = (navigate) => async (dispatch) => {
  const token = localStorage.getItem("token");

  // Redirect to login if token is missing
  if (!token) {
    toast.info("Please log in to view your cart");
    navigate("/Login");
    return;
  }

  try {
    // Fetch cart data from API with Authorization header
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();

    // Handle unauthorized or forbidden responses
    if (res.status === 401 || res.status === 403) {
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("firstName");
      localStorage.removeItem("token");
      navigate("/Login");
      return;
    }

    // Handle other API errors
    if (!res.ok) {
      toast.error(data.message || "Failed to fetch cart");
      console.error("Failed to fetch cart:", data.message);
      return;
    }

    // If cart is empty, update Redux store and show toast
    if (data.message === "Cart is Empty") {
      toast.info("Your cart is empty");
      dispatch(setCart([]));
    } else {
      // Otherwise, set cart items in Redux store
      dispatch(setCart(data.items));
    }
  } catch (err) {
    toast.error(err.message || "Error fetching cart");
    console.error("Error fetching cart:", err.message);
  }
};

/*  ADD ITEM TO CART */
// Thunk to add a product to the cart
export const addItemToDB = (item) => async (dispatch) => {
  // Create modified item object for backend
  const modifiedItem = {
    ...item,
    productID: item.id,
    quantity: 1,
  };

  try {
    // Send POST request to add item
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(modifiedItem),
    });

    const data = await res.json();

    // Handle API errors
    if (!res.ok) {
      toast.error(data.message || "Server error adding item");
      console.error("Server error adding item:", data.message);
      return;
    }

    // If item returned, update Redux store
    if (data.item) {
      toast.success("Item added to cart");
      dispatch(addItemLocal(data.item));
    } else {
      toast.error("No item returned from server");
      console.warn("No item returned from server:", data);
    }
  } catch (err) {
    toast.error(err.message || "Error adding item");
    console.error("Error adding item:", err.message);
  }
};

/*  UPDATE ITEM QUANTITY */
// Thunk to update quantity of a cart item
export const updateQuantityInDB = (productID, quantity) => async (dispatch) => {
  try {
    // Send PUT request to update quantity
    const res = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ productID, quantity }),
    });

    const data = await res.json();

    // Handle API errors
    if (!res.ok) {
      toast.error(data.message || "Error updating quantity");
      console.error("Error updating quantity:", data.message);
      return;
    }

    // Update Redux store if item returned
    if (data.item) {
      dispatch(updateQuantity({ productID, quantity: data.item.quantity }));
    }
  } catch (err) {
    toast.error(err.message || "Error updating quantity");
    console.error("Error updating quantity:", err.message);
  }
};

/*  REMOVE ITEM */
// Thunk to remove a cart item
export const removeItemFromDB = (productID) => async (dispatch) => {
  try {
    // Send DELETE request with productID
    const res = await fetch(API_URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ productID }),
    });

    const data = await res.json();

    // Handle API errors
    if (!res.ok) {
      toast.error(data.message || "Error removing item.");
      console.error("Error removing item:", data.message);
      return;
    }

    // Update Redux store and show success toast
    dispatch(removeItem({ productID, userID: data.userID }));
    toast.success("Item removed from cart");
  } catch (err) {
    toast.error(err.message || "Error removing item.");
    console.error("Error removing item:", err.message);
  }
};

/*  CLEAR ENTIRE CART */
// Thunk to clear all items from the cart
export const clearCartFromDB = () => async (dispatch) => {
  try {
    // Send DELETE request to /clear endpoint
    const res = await fetch(`${API_URL}/clear`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    // Handle API errors
    if (!res.ok) {
      toast.error(data.message || "Error clearing cart");
      console.error("Error clearing cart:", data.message);
      return;
    }

    // Clear Redux store cart state
    dispatch(clearCart());
  } catch (err) {
    toast.error(err.message || "Error clearing cart.");
    console.error("Error clearing cart:", err.message);
  }
};
