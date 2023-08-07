import { useCallback, useEffect, useState } from "react";
import { useOnMove } from "../hook/useOnMove";
import { useSavePosition } from "../hook/useSavePosition";
import { useGetMyPosition } from "../hook/useGetMyPosition";

const zoom = 13;

export default function DisplayPosition({ map, setMarkers }) {
  const [position, setPosition] = useState(() => map.getCenter());
  const handleOnMove = useOnMove(map, setPosition);
  const handleSavePosition = useSavePosition(position, setMarkers);
  const handleGetMyPosition = useGetMyPosition(map);

  useEffect(() => {
    map.on("move", handleOnMove);
    return () => {
      map.off("move", handleOnMove);
    };
  }, [map, handleOnMove]);

  return (
    <div>
      <div className="positonContainer">
        <p className="positonText">
          latitude: {position.lat.toFixed(2)} - longitude:
          {position.lng.toFixed(2)}
        </p>
        <button
          className="positonButton"
          onClick={handleGetMyPosition}
          type="button"
        >
          Konumuma Git
        </button>
      </div>
      <button className="saveButton" onClick={handleSavePosition} type="button">
        Konumu Kaydet
      </button>
    </div>
  );
}
