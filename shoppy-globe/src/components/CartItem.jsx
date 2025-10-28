

import { removeItemFromDB,updateQuantityInDB } from "../utils/cartApis.js";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function CartItem(props) {
  // Initialize Redux dispatch and navigation hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      {/* Main container for a single cart item */}
      <div className="grid grid-cols-2 sm:grid-cols-3 props.items-start sm:gap-4 gap-6">
        {/* Left section: Product image and details */}
        <div className="col-span-2 flex props.items-start gap-4">
          {/* Product thumbnail */}
          <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-3 rounded-md">
            <img
              src={props.item.thumbnail}
              alt={props.item.title}
              className="w-full h-full object-contain"
              onClick={() => navigate(`/ProductDetails/${props.item.productID}`)}
              loading="lazy"
            />
          </div>

          {/* Product title, brand, and price */}
          <div className="flex flex-col">
            <h3 className="text-base font-semibold text-slate-900">
              {props.item.title}
            </h3>
            <p className="text-sm font-medium text-slate-500 mt-2">
              {props.item.brand}
            </p>

            {/* Display total price based on quantity */}
            <h4 className="text-base font-semibold text-slate-900 mt-3">
              ₹{props.item.price}
            </h4>
          </div>
        </div>

        {/* Right section: Remove button and quantity controls */}
        <div className="sm:ml-auto max-sm:flex max-sm:justify-between text-end mx-2 flex-row-reverse max-sm:gap-4 max-sm:col-span-full">
          {/* Remove item button */}
          <button
            type="button"
            onClick={() => {
              dispatch(removeItemFromDB(props.item.productID))}}
            className="mt-3 font-semibold text-red-500 text-xs cursor-pointer mr-2"
          >
            <i className="fa-solid fa-trash text-red-700 text-[16px] text-end"></i>
          </button>

          {/* Quantity adjustment buttons */}
          <div className="flex props.items-center px-2 w-20 py-1.5 border border-gray-300 text-slate-900 text-xs font-medium rounded-md sm:mt-6">
            {/* Decrease quantity (disabled when qty = 1) */}
            <button
              onClick={() => dispatch(updateQuantityInDB(props.item.productID,-1))}
              className={
                props.qty === 1 ? "cursor-not-allowed" : "cursor-pointer"
              }
              disabled={props.qty === 1}
            >
              <i className="fa-solid fa-minus font-bold"></i>
            </button>

            {/* Quantity display */}
            <span className="mx-3">{props.qty}</span>

            {/* Increase quantity (disabled when qty = 5) */}
            <button
              onClick={() => dispatch(updateQuantityInDB(props.item.productID,1))}
              className={
                props.qty === props.item.stock ? "cursor-not-allowed" : "cursor-pointer"
              }
              disabled={props.qty === props.item.stock}
            >
              <i className="fa-solid fa-plus font-bold"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Divider line between items */}
      <hr className="border-gray-300 mt-3" />
    </div>
  );
}

export default CartItem;
