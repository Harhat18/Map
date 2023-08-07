import { useCallback } from "react";
export function useHandleDelete(markers, setMarkers) {
  return useCallback(
    (markerId) => {
      const updatedMarkers = markers.filter(
        (marker) => marker._id !== markerId
      );
      setMarkers(updatedMarkers);
    },
    [markers, setMarkers]
  );
}
