import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { lazy,Suspense } from "react";


const App = lazy(()=>import( "./App.jsx") )
const Home = lazy(()=>import( "./components/Home.jsx") )
const ProductList = lazy(()=>import( "./components/ProductList.jsx") )
const ProductDetails = lazy(()=>import( "./components/ProductDetails.jsx") )
const Cart = lazy(()=>import( "./components/Cart.jsx") )
const NotFound = lazy(()=>import( "./components/NotFound.jsx") )
const Ordersuccess = lazy(()=>import( "./components/Ordersuccess.jsx") )
const Checkout = lazy(()=>import( "./components/Checkout.jsx") )





const appRoute = createBrowserRouter([
  {
    path:"/",
    element:  <Suspense fallback={<LoadingSpinner />}>
   <App/>
    </Suspense>   ,
    errorElement:<NotFound/>,
    children:[
      {
        path:"/",
        element:<Suspense fallback={<LoadingSpinner />}><Home/></Suspense>

    },
    {
      path:"/Products",
      element:<Suspense fallback={<LoadingSpinner />}><ProductList/></Suspense>,
      children:[{
        path:"/Products/:search",
        element:<Suspense fallback={<LoadingSpinner />}><ProductList/></Suspense>
      }]
     
    
    },
    {
      path:"/ProductDetails/:id",
      element:<Suspense fallback={<LoadingSpinner />}><ProductDetails/></Suspense>
    },
    {
  path:"/Cart",
  element:<Suspense fallback={<LoadingSpinner />}><Cart/></Suspense>
},

{
  path:"/Checkout",
  element:<Suspense fallback={<LoadingSpinner />}><Checkout/></Suspense>
},

{
  path:"/Order-success",
  element:<Suspense fallback={<LoadingSpinner />}><Ordersuccess/></Suspense>
}

    
  ]
},

])


// Render app
createRoot(document.getElementById("root")).render(
  <React.StrictMode>

      <RouterProvider router={appRoute} ></RouterProvider>

  </React.StrictMode>
);
