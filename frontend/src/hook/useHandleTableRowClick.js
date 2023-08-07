import { useCallback } from "react";
export function useHandleTableRowClick(map, setSelectedMarkerId) {
  return useCallback(
    (marker) => {
      setSelectedMarkerId(marker._id);
      if (map) {
        map.setView([marker.lat, marker.lng], 13);
      }
    },
    [map, setSelectedMarkerId]
  );
}
