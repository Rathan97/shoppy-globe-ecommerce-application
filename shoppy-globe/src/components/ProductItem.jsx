import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToDB } from "../utils/cartApis.js";


function ProductItem({ product }) {

  const dispatch = useDispatch();

  const addToCart = (item) => {

  
    dispatch(addItemToDB(item));
    

  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <i key={i} className="fa-solid fa-star text-yellow-400"></i>
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <i
            key={i}
            className="fa-solid fa-star-half-stroke text-yellow-400"
          ></i>
        );
      } else {
        stars.push(
          <i key={i} className="fa-regular fa-star text-yellow-400"></i>
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-64 h-[420px] flex flex-col hover:shadow-lg transition-shadow duration-300 ">
      {/* Image */}
      <Link to={`/ProductDetails/${product.id}`}>
        <div className="h-40 w-full bg-gray-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="flex flex-col gap-2">
          <Link to={`/ProductDetails/${product.id}`}>
            {" "}
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {product.title}
            </h2>
          </Link>
          <p className="text-sm text-gray-600">{product.category}</p>

          <div className="flex items-center">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-gray-600 text-sm ml-2">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          {/* Description — 2 lines max */}
          <p
            className="text-gray-600 text-sm overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Bottom Section (Pinned to Bottom) */}
        <div className="mt-auto pt-3">
          {/* Price section side by side */}
          <div className="flex items-center justify-start gap-2 mb-3">
            <span className="text-lg font-bold text-green-600">
              ₹{product.price}
            </span>
            {product.discountPercentage && (
              <span className="text-sm text-gray-500 line-through">
                ₹
                {(
                  product.price /
                  (1 - product.discountPercentage / 100)
                ).toFixed(0)}
              </span>
            )}
          </div>

          {/* Add to Cart button */}
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-[#FFD814] text-gray-900 py-2 rounded-full font-semibold hover:bg-[#F7CA00] transition-colors duration-200 cursor-pointer"
          >
            <i className="fa-solid fa-cart-shopping mr-2"></i>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
