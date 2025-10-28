import { useNavigate, useLocation } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { subtotal, shipping, tax, total, items } = location.state || {};

  return (
    <div className=" inset-0 p-4 flex justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full  overflow-auto pt-20">
      <div className="modal-content w-full max-w-2xl bg-white shadow-lg rounded-lg sm:p-8 p-4 relative">
        {/* Header */}
        <div className="flex items-center pb-3 border-b border-gray-300">
          <button
            onClick={() => navigate("/Cart")}
            className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left text-lg"></i>
            <span className="font-medium text-slate-700 text-sm">Back</span>
          </button>
          <h3 className="text-slate-900 sm:text-xl text-lg font-semibold flex-1 text-center pr-14 sm:pr-20">
            Order Details
          </h3>
        </div>

        {/* Order Summary */}
        <div className="my-3">
          {/* Order Items */}
          <div className="space-y-4 mb-8">
            {items?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b border-gray-300 pb-3"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 p-2 rounded-md">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="sm:text-base text-sm font-semibold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="sm:text-sm  text-xs text-slate-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="text-slate-900 text-xs sm:text-sm font-semibold">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Delivery Details */}
          <div className="mt-0">
            <form>
              <h4 className="text-lg text-slate-900 font-semibold mb-6">
                Delivery Details
              </h4>
              <div className="grid md:grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <input
                  type="text"
                  placeholder="First Name"
                  className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="number"
                  placeholder="Phone No."
                  className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="Address Line"
                  className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="State"
                  className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                />
              </div>

              <div className="bg-gray-100 rounded p-6">
                <ul className="text-slate-500 font-medium divide-y divide-gray-300">
                  <li className="flex flex-wrap gap-4 text-sm pb-4">
                    Subtotal{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm py-4">
                    Shipping{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      ₹{shipping.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-sm py-4">
                    Tax{" "}
                    <span className="ml-auto font-semibold text-slate-900">
                      ₹{tax.toFixed(2)}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 text-[15px] pt-4 font-semibold text-slate-900">
                    Total <span className="ml-auto ">₹{total.toFixed(2)}</span>
                  </li>
                </ul>
              </div>

              {/* Payment Section */}
              <div className="mt-8">
                <h4 className="text-lg text-slate-900 font-semibold mb-6">
                  Payment
                </h4>
                <div className="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="method"
                      className="w-5 h-5 cursor-pointer"
                      id="cod"
                      checked
                      readOnly
                    />
                    <label
                      htmlFor="cod"
                      className="ml-4 flex items-center gap-3 cursor-pointer"
                    >
                      <i className="fa-solid fa-money-bill-wave text-green-600 text-2xl"></i>
                      <span className="text-slate-800 font-medium text-sm">
                        Cash on Delivery
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 pt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => navigate("/Order-success")}
            className="px-4 py-2.5 rounded-md text-white text-sm font-medium border-0 outline-0 tracking-wide bg-blue-600 hover:bg-blue-700 active:bg-blue-600 cursor-pointer"
          >
            Place Order
          </button>
          <button
            type="button"
            onClick={() => navigate("/Products")}
            className="px-4 py-2.5 rounded-md text-slate-900 text-sm font-medium border-0 outline-0 tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200 cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
