import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {

  // Accessing items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Calculating total quantity of all cart items
  const totalItems = cartItems.reduce((acc, item) => acc + (item.quantity ?? 1), 0);

  const navigate = useNavigate();

  // State to handle search input
  const [searchTerm, setSearchTerm] = useState("");

  // Handle Enter key press in search bar
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/Products/${searchTerm}`);
    }
  };

  // Handle mobile menu toggle (for small screens)
  useEffect(() => {
    const button = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");
    const toggleMenu = () => menu.classList.toggle("hidden");
    button?.addEventListener("click", toggleMenu);
    return () => button?.removeEventListener("click", toggleMenu);
  }, []);

  return (

    <div className="fixed z-10 w-full">
      {/* Main navigation bar */}
      <nav className="w-full bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center w-full">

            {/* Left Section: Logo and brand name */}
            <div className="flex items-center space-x-6 ">
              <Link to="/" className="flex items-center">
                <img
                  className="h-13 w-auto mt-1"
                  src="../src/assets/brandicon.png"
                  alt="Logo"
                />
                <span className="text-lg sm:text-xl font-bold">ShoppyGlobe</span>
              </Link>
            </div>

            {/* Middle Section: Desktop navigation links */}
            <div className="hidden md:flex items-center">
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

            {/* Right Section: Search bar, cart icon, and mobile menu button */}
            <div className="flex items-center space-x-4">

              {/* Search input field */}
              <div className="relative w-28 sm:w-40 md:w-52 lg:w-64">
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Search..."
                  onChange={(e)=> setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
                </div>
              </div>

              {/* Cart icon with item count (visible only on medium and larger screens) */}
              <Link
                to="/Cart"
                className="relative hidden md:inline-flex items-center text-gray-200 hover:text-white"
              >
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                <span className="absolute -top-2 -right-2 text-white bg-red-500 text-xs rounded-full px-1.5">
                  {totalItems}
                </span>
              </Link>

              {/* Mobile Menu Button (visible only on small screens) */}
              <button
                id="mobile-menu-button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                <i className="text-[18px] fa-solid fa-bars"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu (visible only when toggled) */}
        <div
          id="mobile-menu"
          className="hidden md:hidden px-4 pb-4 space-y-2 w-full bg-gray-900"
        >
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
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
