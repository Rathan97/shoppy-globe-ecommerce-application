import { useState, useEffect } from "react";

function useProducts(url) {
  // State to store fetched data
  const [data, setData] = useState(null);

  // State to store error messages
  const [error, setError] = useState(null);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Flag to prevent state update if component is unmounted
    let isMounted = true;

    // Reset loading and error state before fetch
    setLoading(true);
    setError(null);

    // Fetch data from provided URL
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data..");
        return res.json();
      })
      .then((json) => {
        if (isMounted) setData(json); // Update data if component is still mounted
      })
      .catch((err) => {
        if (isMounted) setError(err.message); // Update error if component is still mounted
      })
      .finally(() => {
        if (isMounted) setLoading(false); // Set loading to false after fetch
      });

    // Cleanup function to mark component as unmounted
    return () => {
      isMounted = false;
    };
  }, [url]);

  // Return data, error, and loading status
  return { data, error, loading };
}

export default useProducts;
