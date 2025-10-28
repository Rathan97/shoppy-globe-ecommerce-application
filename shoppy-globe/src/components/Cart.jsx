import { useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem.jsx";


function Cart() {

  const navigate = useNavigate();

  const productsCart = useSelector((store) => store.cart.items);
  console.log(productsCart)

  // Use quantity fallback to 1 when missing
  const subtotal = productsCart.reduce((acc, item) => {
    const qty = item.quantity ?? 1;
    return acc + Number(item.price) * qty;
  }, 0);

  

  const shipping = productsCart.length > 0 ? 2 : 0; // maintain your rule
  const tax = subtotal * 0.02;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    navigate("/Checkout", {
      state: { subtotal, shipping, tax, total, items:productsCart },
    });
  };


  

  return (
    <div className="max-w-5xl max-lg:max-w-2xl mx-auto bg-white px-4  pt-25 pb-12 mb-10 min-h-screen">
      <div className="border-b border-gray-300 pb-4  ">
        <h2 className="text-slate-900 text-2xl font-semibold">Your Cart</h2>
        <p className="text-sm text-slate-600 mt-2">Review the popular and trending items in your cart.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 mt-12">
        <div className="lg:col-span-2 space-y-4">
          {productsCart.length === 0 ? (
            <p className="text-center text-slate-600 mt-10">Your cart is empty.</p>
          ) : (
            productsCart.map((item) => {
              const qty = item.quantity ?? 1;
               return <CartItem key = {item.id} qty={qty} item={item} />
             
            })
          )}
        </div>

        {/* Order Details */}
        <div className="bg-gray-100 rounded-md p-4 h-max">
          <h3 className="text-base text-slate-900 font-semibold mb-4">Order Details</h3>

          <ul className="text-slate-500 font-medium mt-6 space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">
              Subtotal <span className="ml-auto font-semibold text-slate-900">₹{subtotal.toFixed(2)}</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Shipping <span className="ml-auto font-semibold text-slate-900">₹{shipping.toFixed(2)}</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              Tax <span className="ml-auto font-semibold text-slate-900">₹{tax.toFixed(2)}</span>
            </li>
            <hr className="border-gray-300" />
            <li className="flex flex-wrap gap-4 text-sm text-slate-900">
              Total <span className="ml-auto font-semibold">₹{total.toFixed(2)}</span>
            </li>
          </ul>

          <div className="mt-8 space-y-3">
            <button type="button" onClick={handleCheckout} className="  text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-blue-700 hover:bg-blue-600 text-white rounded-md  " disabled={productsCart.length === 0 ?  true : false}  >
              Checkout
            </button>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="text-sm px-4 py-2.5 w-full font-medium tracking-wide bg-transparent text-slate-900 border border-gray-300 rounded-md cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
