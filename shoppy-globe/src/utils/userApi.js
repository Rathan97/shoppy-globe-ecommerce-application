import { toast } from "react-toastify";
import { clearCart } from "../redux/cartSlice.js";

/*  USER SIGNUP API */
// Function to handle user registration
export const userSignupApi = async (userDetails) => {
    const API_URL = "http://localhost:5100/register";
  try {
    // Send POST request to backend with user details
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    });

    // Parse JSON response safely
    const data = await res.json().catch(() => ({}));

    // Handle unsuccessful responses
    if (!res.ok) {
      toast.error(data.message || "Signup failed. Please try again.");
      return null;
    }

    // On success, show toast notification
    toast.success(data.message || "Signup successful!");

    // Save user first name in localStorage if returned by backend
    if (data.user.name) {
      localStorage.setItem("firstName", data.user.name);
    }

    // Save authentication token in localStorage if returned
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    // Return response data
    return data;
  } catch (err) {
    // Catch network or other errors
    console.error("Signup error:", err);
    toast.error("Network error, please check your connection.");
    return null;
  }
};

/* USER LOGIN API */
// Function to handle user login
export const userLoginApi = async (LoginDetails) => {
    const API_URL = "http://localhost:5100/Login";
  try {
    // Send POST request to backend with login credentials
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(LoginDetails),
    });

    // Parse JSON response safely
    const data = await res.json().catch(() => ({}));

    // Handle unsuccessful responses
    if (!res.ok) {
      toast.error(data.message || "Login failed. Please try again.");
      return null;
    }

    // On success, show toast notification
    toast.success(data.message || "Login successful!");

    // Save user first name in localStorage if returned
    if (data.user.name) {
      localStorage.setItem("firstName", data.user.name);
    }

    // Save authentication token in localStorage if returned
    if (data.token) {
        localStorage.removeItem("token"); // Remove old token
        localStorage.setItem("token", data.token);
    }

    // Return response data
    return data;
  } catch (err) {
    // Catch network or other errors
    console.error("Login error:", err);
    toast.error("Network error, please check your connection.");
    return null;
  }
};

/*  USER LOGOUT API */
// Function to handle user logout
export const userLogoutApi = (dispatch,navigate) => {
  // Remove user data from localStorage
  localStorage.removeItem("firstName");
  localStorage.removeItem("token");
    dispatch(clearCart());


  // Show success toast
  toast.success("Logout successfull");

  // Redirect to login page after short delay
  setTimeout(() => {
    navigate("/Login");
  }, 500);
};
