import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProducts from "../utils/useProducts";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import ErrorMessage from './Errormessage.jsx';

function ProductDetails() {
  const { id } = useParams();
     const dispatch = useDispatch();
  const { data, error, loading } = useProducts(`https://dummyjson.com/products/${id}`);
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");








  const addToCart=(item)=>{
    dispatch(addItem(item));


  }

  useEffect(() => {
    if (data) {
      setProductData(data);
      if (data.images && data.images.length > 0) {
        setMainImage(data.images[0]);
      }
    }
  }, [data]);


  // if (!productData) return null;

  
  const handleImageChange = (src) => {
    setMainImage(src);
  };

  // ⭐ Rating stars renderer
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<i key={i} className="fa-solid fa-star text-yellow-400"></i>);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<i key={i} className="fa-solid fa-star-half-stroke text-yellow-400"></i>);
      } else {
        stars.push(<i key={i} className="fa-regular fa-star text-yellow-400"></i>);
      }
    }
    return stars;
  };

      


const Skeleton = () => (
    <div className="bg-white min-h-screen pt-20 p-3 animate-pulse">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="w-full h-[350px] bg-gray-200 rounded-lg mb-4"></div>
            <div className="flex gap-3 justify-center">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-md"></div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2 px-4 mt-10 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-24 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (error) return <ErrorMessage error={error} />;
  if (loading || !productData) return <Skeleton />;

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    category,
    images = [],
    warrantyInformation ,
    shippingInformation ,
    availabilityStatus ,
    returnPolicy ,
    reviews
  } = productData;





  return (
    <div className="bg-white min-h-screen pt-20 p-3">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4  ">
          {/* 🖼️ Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8 flex flex-col items-center md:mt-14">
            <div className="w-full h-[250px] md:h-[350px] flex justify-center items-center shadow rounded-lg  mb-4">
              <img
                src={mainImage}
                alt={title}
                className="h-full object-contain  rounded-lg"
                loading="lazy"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 py-4 justify-center overflow-x-auto">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-md cursor-pointer border border-gray-200 transition duration-300 ${
                      mainImage === img
                        ? "opacity-100 border-indigo-500"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    onClick={() => handleImageChange(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 📋 Product Details */}
          <div className="w-full md:w-1/2 px-4 md:mt-8">
            <h2 className="text-2xl  lg:text-3xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 text-sm sm:text-base  mb-4 capitalize">Category: {category}</p>

            {/* Price & Discount */}
            <div className="mb-4">
              <span className="text-2xl text-red-600 font-bold mr-2">₹{price.toFixed(0)}</span>
              {discountPercentage && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{(price / (1 - discountPercentage / 100)).toFixed(0)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex  items-center text-xs sm:text-sm md:text-base mb-4">
              {renderStars(rating)}
              <span className="ml-2  text-gray-600">({rating}) </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm sm:text-base mb-6">{description}</p>

            

            {/* ℹ️ Extra Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm sm:text-base md:text-base text-gray-700 mb-6">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-shield-halved text-green-500"></i>
              <span>
                <strong>Warranty :</strong> {warrantyInformation}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-truck text-green-500"></i>
              <span>
                <strong>Shipping :</strong> {shippingInformation}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check-circle text-green-500"></i>
              <span>
                <strong>Availability : </strong> {availabilityStatus}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-solid fa-rotate-left text-green-500"></i>
              <span>
                <strong>Return Policy :</strong> {returnPolicy}
              </span>
            </div>
          </div>


            {/* 🛒 Add to Cart */}
            <div className="flex space-x-4 my-6">
              <button onClick={()=>addToCart(data)} className="bg-yellow-400 flex gap-2 items-center text-black font-medium px-6 py-2 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2">
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                Add to Cart
              </button>
            </div>

                

          </div>
        </div>
      </div>

                {/* Reviews Section */}
{/* Reviews Section */}
<div className="mt-10  ">
  <h3 className="text-xl sm:text-2xl  font-bold mb-10 text-center">Customer Reviews</h3>
  {reviews.length === 0 && <p className="text-gray-600">No reviews yet.</p>}
  <div className="space-y-4 mb-20">
    {reviews.map((rev, idx) => (
      <div key={idx} className="flex items-start space-x-4 ml-5 sm:ml-10  ">
        {/* Rounded User Icon */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <i className="fa-solid fa-user text-gray-400 text-sm sm:text-xl md:text-2xl"></i>
          </div>
        </div>

        <div className="flex-1">
          <p className="flex items-baseline text-[12px] sm:text-base ">
            <span className="font-bold">{rev.reviewerName}</span>
            <span className="ml-2 text-gray-500 text-[10px]  sm:text-sm">Verified Buyer</span>
          </p>

          <div className="flex items-center text-[10px] sm:text-xs mt-1.5">
            {renderStars(rev.rating)}
          </div>

          <p className="mt-2 text-[11px] sm:text-sm text-gray-700">{rev.comment}</p>
          <p className="mt-1 text-[10px] sm:text-sm md:text-sm text-gray-500">
            {new Date(rev.date).toLocaleDateString()}
          </p>

          {/* Horizontal line between reviews except after the last one */}
          {idx < reviews.length - 1 && <hr className="mt-4 border-t border-gray-300" />}
        </div>
      </div>
    ))}
  </div>
</div>



    </div>
  );
}

export default ProductDetails;
