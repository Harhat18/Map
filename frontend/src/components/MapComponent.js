import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const MapComponent = ({ markers, center, zoom, selectedMarkerId, setMap }) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} opacity={1}></Marker>
      {markers.map((marker) => (
        <Marker
          key={marker._id}
          position={[marker.lat, marker.lng]}
          opacity={selectedMarkerId === marker._id ? 1 : 0}
        ></Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
