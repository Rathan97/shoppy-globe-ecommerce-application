import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userLogoutApi } from "../utils/userApi";
import { useDispatch } from "react-redux";

// Navbar component manages the website's navigation bar
function Navbar() {

  // State for controlling dropdown visibility (user menu)
  const [open, setOpen] = useState(false);

  // Retrieve logged-in user's first name from localStorage
  const firstName = localStorage.getItem("firstName");
   
  // Get cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total quantity of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity ?? 1), 0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handles user logout action and redirects accordingly
  const handleLogout = () => {
    userLogoutApi(dispatch,navigate);
  };

  // Handles mobile menu toggle functionality (for small screens)
  useEffect(() => {
    const button = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");
    const toggleMenu = () => menu.classList.toggle("hidden");
    button?.addEventListener("click", toggleMenu);
    return () => button?.removeEventListener("click", toggleMenu);
  }, []);

  return (

    <div className="fixed z-100 w-full">
      {/* Navigation bar container */}
      <nav className="w-full bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center w-full">

            {/* Left section: Logo and brand name */}
            <div className="flex items-center space-x-6 ">
              <Link to="/" className="flex items-center ">
                <img
                  className="h-9 w-auto "
                  src="../src/assets/brandicon1.png"
                  alt="Logo"
                />
                <span className=" ml-2 text-lg sm:text-xl font-bold">ShoppyGlobe</span>
              </Link>
            </div>

            {/* Right section: Navigation links, user menu, cart, and buttons */}
            <div className="flex items-center space-x-4">

              {/* Main navigation links (visible on large screens) */}
              <div className="hidden lg:flex items-center">
                <Link
                  to="/"
                  className="text-white hover:bg-gray-700 px-4 transition rounded-sm py-1.5 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/Products"
                  className="text-white hover:bg-gray-700 px-4 transition rounded-sm py-1.5 text-sm font-medium"
                >
                  Products
                </Link>
              </div>

              {/* User menu dropdown (visible on hover) */}
              <div
                className="relative text-left hidden lg:inline-block "
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                {/* User greeting and icon */}
                <div className="flex items-center cursor-pointer px-2 py-1 hover:text-blue-600 transition">
                  <i className="fa-regular fa-user text-sm"></i>
                  <span className="ml-1 text-sm font-bold ">
                    Hello, {firstName ? firstName : "Guest"}
                  </span>
                </div>

                {/* Dropdown menu visible only when logged in */}
                {open && firstName && (
                  <div className="absolute right-0  w-30  bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <button
                      onClick={handleLogout}
                      className="block w-[70%] mx-auto my-2 bg-blue-600  text-center text-white b font-bold px-4 py-2 text-sm hover:bg-blue-700 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Cart icon with item count (hidden on small screens) */}
              <Link
                to="/Cart"
                className="relative hidden lg:inline-flex items-center text-gray-200 hover:text-white"
              >
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                <span className="absolute -top-2 -right-2 text-white bg-red-500 text-xs rounded-full px-1.5">
                  {totalItems}
                </span>
              </Link>

              {/* Login button (visible on large screens) */}
              <Link to="/Login">
                <button
                  className="px-4 py-2 text-sm hidden lg:inline-flex rounded-full font-medium cursor-pointer tracking-wide text-white border border-gray-500 bg-transparent hover:bg-white hover:text-blue-700 transition-all"
                >
                  Login
                </button>
              </Link>

              {/* Signup button (visible on large screens) */}
              <Link to="/register">
                <button
                  className="px-4 py-2 text-sm hidden lg:inline-flex rounded-full font-medium cursor-pointer bg-blue-600 tracking-wide text-white border border-gray-500  hover:bg-white hover:text-blue-700 transition-all"
                >
                  Signup
                </button>
              </Link>

              {/* Mobile menu button (visible only on small screens) */}
              <button
                id="mobile-menu-button"
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <i className="text-[18px] fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile navigation menu (visible when toggled) */}
        <div
          id="mobile-menu"
          className="hidden lg:hidden px-4 pb-4 space-y-2 w-full bg-gray-900"
        >
          {/* User greeting in mobile view */}
          <div className="flex items-center cursor-pointer px-2 py-1  text-gray-300 hover:text-white">
            <i className="fa-regular fa-user text-sm"></i>
            <span className="ml-1 text-sm font-bold ">
              Hello, {firstName ? firstName : "Guest"}
            </span>
          </div>

          {/* Navigation links in mobile view */}
          <Link
            to="/"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/Products"
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
          >
            Products
          </Link>
          <Link
            to="/Cart"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
          >
            <i className="fa-solid fa-cart-shopping mr-2"></i> Cart
          </Link>

          {/* Login and signup buttons for mobile view */}
          <Link to="/Login">
            <button
              className="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border  bg-transparent hover:bg-white hover:text-blue-900 transition-all"
            >
              Login
            </button>
          </Link>

          <Link to="/register">
            <button
              className="px-4 py-2 text-sm ml-2 rounded-full font-medium cursor-pointer bg-blue-600 tracking-wide text-white border border-gray-500  hover:bg-white hover:text-blue-700 transition-all"
            >
              Signup
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
