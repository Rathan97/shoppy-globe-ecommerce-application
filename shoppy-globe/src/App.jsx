import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import appStore from "./redux/store.js";
import Header from "./components/Header";

import Footer from "./components/Footer.jsx";
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={appStore}>
      <Header />

      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        
        className="custom-toast-container"
        toastClassName="custom-toast"
      />
    </Provider>
  );
}

export default App;
