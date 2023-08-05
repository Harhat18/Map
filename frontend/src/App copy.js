import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapCenter from "./components/MapCenter";
import MapLocale from "./components/MapLocale";
import MapZoom from "./components/MapZoom";
function MapView() {
  const [markers, setMarkers] = useState([]);

  const onMove = (e) => {
    const { lat, lng } = e.target.getCenter();
    console.log("zzz", lat, lng);
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/points")
      .then((response) => setMarkers(response.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDownload = () => {
    const jsonData = JSON.stringify(markers);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Poin.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="container">
      <div className="map-container">
        <MapContainer
          center={[37.79, 29.06]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100vh", width: "100vh" }}
          onmoveend={onMove}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker) => (
            <Marker key={marker._id} position={[marker.lat, marker.lng]}>
              <Popup>{marker.title}</Popup>
            </Marker>
          ))}
          <MapCenter />
          <MapLocale />
          <MapZoom />
        </MapContainer>
      </div>
      <div className="content">
        <button className="save-button"> Mevcut Konumu Kaydet</button>
        <table className="data-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Konum</th>
              <th>Tarih</th>
              <th>Sil</th>
            </tr>
          </thead>
          <tbody>
            {markers.map((marker) => (
              <tr key={marker._id}>
                <td></td>
                <td>{[marker.lat, "-", marker.lng]}</td>
                <td>
                  {marker.createdAt.slice(0, 10)} -{" "}
                  {marker.createdAt.slice(11, 19)}
                </td>
                <td>
                  <button className="delete-button">SİL</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="downloadContainer">
          <button className="download-button" onClick={handleDownload}>
            {" "}
            İndir
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapView;
