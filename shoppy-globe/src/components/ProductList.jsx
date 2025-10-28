import { useEffect, useState } from "react";
import useProducts from "../utils/useProducts.js";
import { setProducts } from "../redux/productSlice.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ProductItem from "./ProductItem.jsx";
import { filterProducts } from "../redux/productSlice";
import { useParams } from "react-router-dom";
import ErrorMessage from "./Errormessage.jsx";

function ProductList() {
  const { search } = useParams();
  const dispatch = useDispatch();

  const filtertedData = useSelector((state) => state.product.filtertedProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const [productsData, setproductsData] = useState(null);
  const { data, error, loading } = useProducts(
    "http://127.0.0.1:5100/api/products"
  );



 

  // Set products in state and Redux store after fetching
  useEffect(() => {
    if (data ) {
      setproductsData(data);
      dispatch(setProducts(data));
    }
  }, [data, dispatch]);

  // Apply search from URL after products are loaded
  useEffect(() => {
    if (data ) {
      dispatch(filterProducts(search || ""));
    }
  }, [search, data, dispatch]);

  // Handle search input enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(filterProducts(searchTerm));
    }
  };

  // Show error message if error occurs
  if (error) return <ErrorMessage error={error} />;

  // Skeleton loader for loading state
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-64 h-[420px] flex flex-col animate-pulse">
      <div className="h-40 w-full bg-gray-200"></div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="flex flex-col gap-3">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>

          <div className="flex items-center gap-2 mt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-200 rounded-full"></div>
            ))}
          </div>

          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>

        <div className="mt-auto pt-3 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-5 bg-gray-200 rounded w-10"></div>
          </div>
          <div className="h-9 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-25 pb-10">
      {/* Search Bar */}
      <div className="relative w-60 sm:w-40 md:w-74 lg:w-100 mx-auto">
        <input
          type="text"
          className="w-full  text-gray-700 rounded-3xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 border border-gray-300 focus:ring-indigo-500 shadow-md"
          placeholder="Search by title or category..."
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
        </div>
      </div>

      {/* Products Grid Section */}
      <section
        id="Projects"
        className="pt-15 flex flex-col items-center justify-center"
      >
        <div
          className="
            grid gap-10
            grid-cols-1 md:grid-cols-2 lg:grid-cols-4
            justify-items-center
            w-full max-w-screen-xl px-6
          "
        >
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            : filtertedData.map((item, idx) => (
                <ProductItem key={idx} product={item} />
              ))}
        </div>
      </section>
    </div>
  );
}

export default ProductList;
