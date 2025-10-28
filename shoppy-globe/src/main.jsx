import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { lazy, Suspense } from "react";

// Lazy-loaded components
const App = lazy(() => import("./App.jsx"));
const Home = lazy(() => import("./components/Home.jsx"));
const ProductList = lazy(() => import("./components/ProductList.jsx"));
const ProductDetails = lazy(() => import("./components/ProductDetails.jsx"));
const Cart = lazy(() => import("./components/Cart.jsx"));
const NotFound = lazy(() => import("./components/NotFound.jsx"));
const Ordersuccess = lazy(() => import("./components/Ordersuccess.jsx"));
const Checkout = lazy(() => import("./components/Checkout.jsx"));

// Define application routes
const appRoute = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      // Home page route
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },

      // Products list route with optional search parameter
      {
        path: "/Products",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductList />
          </Suspense>
        ),
        children: [
          {
            path: "/Products/:search",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <ProductList />
              </Suspense>
            ),
          },
        ],
      },

      // Product details page
      {
        path: "/ProductDetails/:id",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProductDetails />
          </Suspense>
        ),
      },

      // Cart page
      {
        path: "/Cart",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Cart />
          </Suspense>
        ),
      },

      // Checkout page
      {
        path: "/Checkout",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Checkout />
          </Suspense>
        ),
      },

      // Order success page
      {
        path: "/Order-success",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Ordersuccess />
          </Suspense>
        ),
      },
    ],
  },
]);

// Render the application
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={appRoute}></RouterProvider>
  </React.StrictMode>
);
