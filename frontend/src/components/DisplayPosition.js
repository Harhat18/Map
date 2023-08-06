import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const center = [37.79, 29.06];
const zoom = 13;

export default function DisplayPosition({ map, setMarkers }) {
  const [position, setPosition] = useState(() => map.getCenter());
  console.log(position.lat.toFixed(2), position.lng.toFixed(2));
  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  const savePositionToServer = useCallback(async () => {
    try {
      const response = await axios.post(
        "https://map-6zjpqkpbi-harunhatib18-gmailcom.vercel.app/api/points",
        {
          id: Math.random(),
          lat: position.lat.toFixed(2),
          lng: position.lng.toFixed(2),
        }
      );
      console.log("Position saved:", response.data);
      setMarkers((prevMarkers) => [...prevMarkers, response.data]);
    } catch (error) {
      console.error("Error saving position:", error);
    }
  }, [position.lat, position.lng]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return (
    <div>
      <p>
        latitude: {position.lat.toFixed(2)} longitude: {position.lng.toFixed(2)}
        <button onClick={onClick} className="centerButton">
          Sıfırla
        </button>
      </p>

      <button
        className="saveButton"
        onClick={savePositionToServer}
        type="button"
      >
        Konumu Kaydet
      </button>
    </div>
  );
}
