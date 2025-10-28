import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLoginApi } from "../utils/userApi.js";
import { userRedirectIfLoggedIn } from "./UserRedirect.jsx";
import { toast } from "react-toastify";

function Login() {
  // Initialize React Router navigation
  const navigate = useNavigate();

  // Redirect user to home if already logged in
  userRedirectIfLoggedIn();

  // Manage form field values
  const [fields, setFields] = useState({
    email: '',
    password: '',
    Remember: false,
  });

  // Manage validation errors
  const [error, setError] = useState({});

  // Handle form field changes dynamically
  function handleChange(e) {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  }

  // Validate input fields before submitting
  const validateInput = () => {
    const newError = {};

    // Email validation
    if (!fields.email.trim()) newError.email = "Email is Required";
    else if (!/\S+@\S+\.\S+/.test(fields.email))
      newError.email = "Invalid email format";

    // Password validation
    if (!fields.password.trim()) newError.password = "Password is Required";
    else if (fields.password.length < 8)
      newError.password = "Password must be at least 8 characters";

    // Update error state
    setError(newError);

    // Return true if no errors found
    return Object.keys(newError).length === 0;
  };

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Proceed only if all validations pass
    if (validateInput()) {
      const result = await userLoginApi(fields);

      // If login successful, navigate to home page
      if (result) {
        navigate("/");
      }
    } else {
      // Show warning toast if validation fails
      toast.warn("Please fill all required fields correctly.");
    }
  };

  // JSX for login form UI
  return (
    <div className="flex justify-center items-center bg-slate-100 h-full md:min-h-screen">
      <form className="bg-white rounded-2xl p-6 relative z-10 [box-shadow:0_2px_16px_-3px_rgba(6,81,237,0.3)] mt-25 mb-10 w-70 sm:w-80">
        <div className="flex flex-col items-center justify-center sm:mb-8 mb-5 w-full text-center">

          {/* Circular icon container */}
          <div className="bg-blue-600 text-white sm:w-16 sm:h-16 w-12 h-12 flex items-center justify-center rounded-full shadow-md">
            <i className="fa-solid fa-arrow-right-to-bracket sm:text-[26px] text-[20px]"></i>
          </div>

          {/* Welcome heading */}
          <h1 className="mt-3 text-2xl font-semibold text-gray-800">
            Welcome Back
          </h1>
        </div>

        {/* Input Fields Section */}
        <div className="space-y-6">
          {/* Email input */}
          <div>
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
                value={fields.email}
                onChange={handleChange}
                className="w-full text-slate-900 text-sm border-b border-slate-300 focus:border-blue-600 px-2 py-3 pr-8 outline-none"
                placeholder="Enter email"
              />
              <i className="fa-regular fa-envelope pr-4"></i>
            </div>
            {error.email && (
              <p className="text-red-500 text-sm mt-1.5 ml-1">{error.email}</p>
            )}
          </div>

          {/* Password input */}
          <div>
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                value={fields.password}
                onChange={handleChange}
                className="w-full text-slate-900 text-sm border-b border-slate-300 focus:border-blue-600 px-2 py-3 pr-8 outline-none"
                placeholder="Enter password"
              />
              <i className="fa-solid fa-eye-slash pr-4"></i>
            </div>
            {error.password && (
              <p className="text-red-500 text-sm mt-1 ml-1 ">
                {error.password}
              </p>
            )}
          </div>

          {/* Remember me checkbox */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="Remember"
                type="checkbox"
                onChange={handleChange}
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="text-slate-600 ml-3 block text-sm"
              >
                Remember me
              </label>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-2 px-4 text-[15px] font-medium tracking-wider rounded-md cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Sign in
          </button>

          {/* Redirect to Signup */}
          <p className="text-slate-600 text-sm text-center mt-6">
            Don't have an account
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
