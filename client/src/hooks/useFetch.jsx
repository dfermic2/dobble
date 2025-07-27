import { useEffect, useState } from "react";

function useFetch(endpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Could not fetch data!");
        }
        const parsedData = await response.json();
        setData(parsedData);
      } catch (e) {
        console.log("Could not fetch data from server", e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, isLoading, error };
}

export default useFetch;
