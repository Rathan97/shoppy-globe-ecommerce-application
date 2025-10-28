const LoadingSpinner = () => {
  return (
    // Main container centers the spinner vertically and horizontally
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 z-[2000]">

      {/* Spinner Wrapper */}
      <div className="relative w-12 h-12">

        {/* Animated Circular Spinner */}
        <div className="absolute w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
