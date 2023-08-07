import { useCallback } from "react";

export function useOnMove(map, setPosition) {
  return useCallback(() => {
    setPosition(map.getCenter());
  }, [map, setPosition]);
}
