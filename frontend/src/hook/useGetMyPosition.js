import { useCallback } from "react";

export function useGetMyPosition(map, zoom) {
  return useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], zoom);
        },
        (error) => {
          console.error("Error getting current position:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [map, zoom]);
}
