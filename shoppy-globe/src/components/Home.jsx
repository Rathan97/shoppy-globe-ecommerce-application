  import ProductItem from "./ProductItem";
  import dummyData from "../utils/dummydata";
  import { Link } from "react-router-dom";

   


function Home() {

 



  return (

    <div>
    <section className="bg-white w-full h-screen pt-20 lg:pt-0 lg:grid lg:place-content-center">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 sm:py-0 md:grid md:grid-cols-2 md:items-center x md:gap-6 lg:px-8 lg:py-10">
        
        {/* Text Section */}
        <div className="max-w-prose text-center  md:text-left flex flex-col justify-center h-full">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Upgrade Your Style with{' '}
            <strong className="text-indigo-600">Premium Products</strong>
          </h1>

          <p className="mt-4 text-base text-gray-700 sm:text-lg lg:text-xl">
            Discover the latest trends and top-quality items in fashion, electronics, and home essentials. 
            Shop now and enjoy exclusive deals delivered right to your door.
          </p>

          <div className="mt-6 text-center lg:text-left md:text-left">
            <Link
              to="/Products"
              className="inline-block rounded-full bg-indigo-600 px-6 py-2 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-indigo-700"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Image Section (hidden on small screens) */}
        <div className="mt-8 md:mt-0 flex justify-center items-center">
          <img
            src="../src/assets/hero-image.jpg"
            alt="Hero"
            className="w-full max-w-md md:max-w-lg lg:max-w-xl h-[200px] md:h-[400px] lg:h-[500px] object-contain"
          />
        </div>

      </div>
    </section>

   <section
  id="Projects"
  className="min-h-screen bg-white pt-20 pb-10 flex flex-col items-center justify-center"
>
  {/* Section Header */}
  <div className="flex items-center justify-center mb-10 w-full px-4">
    <div className="flex-grow border-t border-gray-300"></div>
    <span className="mx-4 font-bold text-gray-900 text-2xl md:text-3xl">
      Top Products
    </span>
    <div className="flex-grow border-t border-gray-300"></div>
  </div>

  {/* Products Grid */}
  <div
    className="
      grid gap-10
      grid-cols-1 md:grid-cols-2 lg:grid-cols-4
      justify-items-center
      w-full max-w-screen-xl px-6
    "
  >
    {dummyData.map((item, idx) => (
     <ProductItem key={idx}  product={item} /> 
    ))}
  </div>
</section>


      </div>


  );
}

export default Home;
