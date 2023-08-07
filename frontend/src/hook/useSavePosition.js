import { useCallback } from "react";
import axios from "axios";

export function useSavePosition(position, setMarkers) {
  return useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/points", {
        id: Math.random(),
        lat: position.lat.toFixed(2),
        lng: position.lng.toFixed(2),
      });
      console.log("Position saved:", response.data);
      setMarkers((prevMarkers) => [...prevMarkers, response.data]);
    } catch (error) {
      console.error("Error saving position:", error);
    }
  }, [position, setMarkers]);
}
