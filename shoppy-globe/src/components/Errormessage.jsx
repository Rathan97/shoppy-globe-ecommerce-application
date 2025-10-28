const ErrorMessage = ({ error }) => {
  // ================= Determine error message, icon, and color based on error type =================
  let message = "Something went wrong!";
  let icon = "fa-triangle-exclamation";
  let color = "text-yellow-500";

  if (error?.message?.includes("Network Error") || !navigator.onLine) {
    message = "No internet connection. Please check your network.";
    icon = "fa-wifi";
    color = "text-red-500";
  } else if (error?.response?.status === 404) {
    message = "Requested data not found (404).";
    icon = "fa-circle-xmark";
    color = "text-orange-500";
  } else if (error?.response?.status === 500) {
    message = "Server error. Please try again later.";
    icon = "fa-server";
    color = "text-purple-500";
  } else if (error?.message) {
    message = error.message;
  }

  return (
    // ================= Error Display Section =================
    <div className=" bg-white flex flex-col items-center justify-center text-center   min-h-screen">
      {/* ---- Error Image ---- */}
      <img src="../src/assets/Error.jpg" alt="error" className="h-[150px] sm:h-[200px]" />

      {/* ---- Error Icon and Message ---- */}
      <div className="  flex flex-row items-center justify-center text-center">
        <i className={`fa-solid ${icon} ${color} sm:text-2xl  text-xl mb-4 mt-3 `}></i>
        <p className="text-gray-800 font-semibold sm:text-lg text-md ml-1">{message}</p>
      </div>

      {/* ---- Retry Button ---- */}
      <button
        onClick={() => window.location.reload()}
        className="  px-4 py-1 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorMessage;
