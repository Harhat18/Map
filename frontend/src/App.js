import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import DisplayPosition from "./components/DisplayPosition";

function MapView() {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/points")
      .then((response) => setMarkers(response.data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDelete = (markerId) => {
    const updatedMarkers = markers.filter((marker) => marker._id !== markerId);
    setMarkers(updatedMarkers);
  };

  const handleDownload = () => {
    const jsonData = JSON.stringify(markers);
    const blob = new Blob([jsonData], { type: "json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Konum.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleTableRowClick = (marker) => {
    setSelectedMarkerId(marker._id);
    if (map) {
      map.setView([marker.lat, marker.lng], 13);
    }
  };
  return (
    <div className="container">
      <div className="map-container">
        <MapContainer
          center={[37.79, 29.06]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "100vh", width: "100vh" }}
          ref={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker) => (
            <Marker
              key={marker._id}
              position={[marker.lat, marker.lng]}
              opacity={selectedMarkerId === marker._id ? 1 : 0}
            ></Marker>
          ))}
        </MapContainer>
      </div>
      <div className="content">
        <div>
          {map ? <DisplayPosition map={map} setMarkers={setMarkers} /> : null}
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Konum</th>
                <th>Tarih</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {markers.map((marker, index) => (
                <tr
                  key={marker._id}
                  onClick={() => handleTableRowClick(marker)}
                >
                  <td>{index + 1}</td>
                  <td>{[marker.lat, "-", marker.lng]}</td>
                  <td>
                    {marker.datetime.slice(0, 10)} -{" "}
                    {marker.datetime.slice(11, 16)}
                  </td>
                  <td>
                    <button
                      className="go-button"
                      onClick={() => handleTableRowClick(marker)}
                    >
                      Göster
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(marker._id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="downloadContainer">
          <button className="download-button" onClick={handleDownload}>
            İndir
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapView;
