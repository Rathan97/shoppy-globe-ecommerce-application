import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userSignupApi } from '../utils/userApi.js';
import { userRedirectIfLoggedIn } from './UserRedirect.jsx';
import { toast } from 'react-toastify';

// Signup component handles user registration and form validation
function Signup() {

  // Redirect if user is already logged in
  userRedirectIfLoggedIn();

  const navigate = useNavigate();

  // State to manage form input fields
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  // State to store validation errors
  const [error, setError] = useState({});

  // Updates form fields when user types in input fields
  function handleChange(e) {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  }

  // Validates input fields before submission
  const validateInput = () => {
    const newError = {};

    // Validations for each input field
    if (!fields.firstName.trim()) newError.firstName = "First Name is Required";
    if (!fields.lastName.trim()) newError.lastName = "Last Name is Required";

    if (!fields.email.trim()) newError.email = "Email is Required";
    else if (!/\S+@\S+\.\S+/.test(fields.email))
      newError.email = "Invalid email format";

    if (!fields.phoneNumber.trim()) newError.phoneNumber = "Phone Number is Required";
    else if (!/^[0-9]{10}$/.test(fields.phoneNumber))
      newError.phoneNumber = "Phone number must be 10 digits..!";

    if (!fields.password.trim()) newError.password = "Password is Required";
    else if (fields.password.length < 8)
      newError.password = "Password must be at least 8 characters";

    if (!fields.confirmPassword.trim()) newError.confirmPassword = "Confirm Password is Required";
    else if (fields.password !== fields.confirmPassword)
      newError.confirmPassword = "Passwords do not match..!";

    if (!fields.termsAccepted)
      newError.termsAccepted = "Please accept terms and conditions";

    setError(newError);

    // Returns true if no validation errors
    return Object.keys(newError).length === 0;
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInput()) {
      // Call API to register new user
      const result = await userSignupApi(fields);
      if (result) {
        navigate("/");
      }
    } else {
      // Show warning toast if validation fails
      toast.warn("Please fill all required fields correctly.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <div className="bg-white grid lg:grid-cols-2 items-center gap-8 max-w-6xl md:w-[85%] w-[90%] shadow-lg mt-20 lg:mt-15 mb-10 rounded-lg ">

        {/* Signup Form Section */}
        <form className="lg:max-w-lgs w-full bg-white p-8 rounded-2xl ">
          <h1 className="text-slate-900 text-2xl md:text-3xl font-semibold mb-8 text-center">
            Create an Account
          </h1>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* First Name */}
            <div>
              <label className="text-slate-900 text-sm mb-2 block">First Name</label>
              <input
                name="firstName"
                type="text"
                value={fields.firstName}
                onChange={handleChange}
                className="bg-gray-100 rounded-md w-full text-slate-900 text-sm px-4 py-2.5 focus:bg-transparent focus:border focus:border-blue-600 outline-none transition-all"
                placeholder="Enter first name"
              />
              {error.firstName && (<p className='text-red-500 text-[12px] mt-1'>{error.firstName}</p>)}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-slate-900 text-sm mb-2 block">Last Name</label>
              <input
                name="lastName"
                type="text"
                value={fields.lastName}
                onChange={handleChange}
                className="bg-gray-100 rounded-md w-full text-slate-900 text-sm px-4 py-2.5 focus:bg-transparent focus:border focus:border-blue-600 outline-none transition-all"
                placeholder="Enter last name"
              />
              {error.lastName && (<p className='text-red-500 text-[12px] mt-1'>{error.lastName}</p>)}
            </div>

            {/* Email */}
            <div>
              <label className="text-slate-900 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                value={fields.email}
                onChange={handleChange}
                className="bg-gray-100 rounded-md w-full text-slate-900 text-sm px-4 py-2.5 focus:bg-transparent focus:border focus:border-blue-600 outline-none transition-all"
                placeholder="Enter email"
              />
              {error.email && (<p className='text-red-500 text-[12px] mt-1'>{error.email}</p>)}
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-slate-900 text-sm mb-2 block">Phone Number</label>
              <input
                name="phoneNumber"
                type="tel"
                value={fields.phoneNumber}
                onChange={handleChange}
                className="bg-gray-100 rounded-md w-full text-slate-900 text-sm px-4 py-2.5 focus:bg-transparent focus:border focus:border-blue-600 outline-none transition-all"
                placeholder="Enter phone number"
              />
              {error.phoneNumber && (<p className='text-red-500 text-[12px] mt-1'>{error.phoneNumber}</p>)}
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-900 text-sm mb-2 block">Password</label>
              <input
                name="password"
                type="password"
                value={fields.password}
                onChange={handleChange}
                className="bg-gray-100 rounded-md w-full text-slate-900 text-sm px-4 py-2.5 focus:bg-transparent focus:border focus:border-blue-600 outline-none transition-all"
                placeholder="Enter password"
              />
              {error.password && (<p className='text-red-500 text-[12px] mt-1'>{error.password}</p>)}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-slate-900 text-sm mb-2 block">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={fields.confirmPassword}
                onChange={handleChange}
                className="bg-gray-100 rounded-md w-full text-slate-900 text-sm px-4 py-2.5 focus:bg-transparent focus:border focus:border-blue-600 outline-none transition-all"
                placeholder="Confirm password"
              />
              {error.confirmPassword && (<p className='text-red-500 text-[12px] mt-1'>{error.confirmPassword}</p>)}
            </div>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-center mt-6">
            <input
              id="terms"
              name="termsAccepted"
              type="checkbox"
              className="h-4 w-4 shrink-0 border-gray-300 rounded"
              onClick={handleChange}
            />
            <label htmlFor="terms" className="ml-3 block text-sm text-slate-600">
              I accept the Terms and Conditions
            </label>
          </div>
          {error.termsAccepted && (<p className='text-red-500 text-[12px] mt-1'>{error.termsAccepted}</p>)}

          {/* Register Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-3 px-6 text-sm text-white tracking-wide bg-blue-600 hover:bg-blue-700 focus:outline-none rounded-md transition-all"
            >
              Register
            </button>
          </div>

          {/* Redirect to Login */}
          <p className="text-sm text-slate-600 mt-6 text-center">
            Already have an account?
            <Link to="/Login" className="text-blue-600 font-semibold hover:underline ml-1">
              Login here
            </Link>
          </p>
        </form>

        {/* Right-side Image Section */}
        <div className="h-full justify-center hidden lg:flex">
          <img
            src="https://readymadeui.com/login-image.webp"
            className="w-full max-w-md h-auto object-contain rounded-2xl"
            alt="signup visual"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
