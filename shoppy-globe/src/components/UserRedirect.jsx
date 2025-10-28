// hooks/useRedirectIfLoggedIn.js

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Custom hook to redirect users to the home page if they are already logged in
export const userRedirectIfLoggedIn = () => {
  const navigate = useNavigate();

  // Ref to ensure the toast message is shown only once
  const hasShownToast = useRef(false);

  useEffect(() => {
    // Prevents the effect from running multiple times
    if (hasShownToast.current) return;

    hasShownToast.current = true;

    // Retrieve token from localStorage to check login status
    const token = localStorage.getItem("token");

    // If token exists, show info toast and redirect to homepage
    if (token) {
      toast.info("You are already logged in");
      navigate("/");
    }
  }, [navigate]);
};
