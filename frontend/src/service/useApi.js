import { useEffect, useState } from "react";
import axios from "axios";

function useApi() {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:4000/api/points")
        .then((response) => {
          setMarkers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }, 1000);
  }, []);

  return { markers, loading, setMarkers, setLoading };
}

export default useApi;
