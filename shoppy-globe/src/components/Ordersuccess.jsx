
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useEffect } from "react";

function Ordersuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

    useEffect(() => {
    
    dispatch(clearCart());

    setTimeout(() => {
   
    navigate("/");
  }, 5000);


  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 pt-25">
      {/* Success Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-10 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 sm:w-26 sm:h-26 flex items-center justify-center rounded-full ">
            {/* <i className="fa-solid fa-check text-green-600 text-4xl"></i> */}
            <img src="../src/assets/success.png" alt="" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
          Order Placed Successfully!
        </h2>

        {/* Message */}
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
          Thank you for shopping with us. Your order has been confirmed and will
          be delivered soon. You’ll receive an update once your items are
          shipped.
        </p>

        {/* Order Details */}
        <div className="bg-gray-100 p-4 rounded-lg text-left mb-6">
          <h4 className="text-slate-800 font-semibold mb-2 flex items-center gap-2">
            <i className="fa-solid fa-receipt text-blue-600"></i> Order Summary
          </h4>
          <ul className="text-slate-600 text-xs sm:text-sm space-y-1">
            <li>Order ID : <span className="font-medium  text-slate-900">#ORD12345</span></li>
            <li>Payment Method : <span className="font-medium  text-slate-900">Cash on Delivery</span></li>
            <li>Estimated Delivery : <span className="font-medium  text-slate-900">3–5 business days</span></li>
          </ul>
        </div>


        
      </div>

     
    </div>
  );
}

export default Ordersuccess;
