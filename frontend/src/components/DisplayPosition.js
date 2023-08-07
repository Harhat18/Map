import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const zoom = 13;

export default function DisplayPosition({ map, setMarkers }) {
  const [position, setPosition] = useState(() => map.getCenter());

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  const savePositionToServer = useCallback(async () => {
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
  }, [position.lat, position.lng, setMarkers]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  const getMyPosition = useCallback(() => {
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
  }, [map]);

  return (
    <div>
      <div className="positonContainer">
        <p className="positonText">
          latitude: {position.lat.toFixed(2)} - longitude:{" "}
          {position.lng.toFixed(2)}
        </p>
        <button className="positonButton" onClick={getMyPosition} type="button">
          Konumuma Git
        </button>
      </div>
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
