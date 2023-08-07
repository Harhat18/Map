import React, { useState } from "react";
import "../../src/App.css";

import DisplayPosition from "../components/DisplayPosition";
import DataTable from "../components/DataTable";
import MapComponent from "../components/MapComponent";
import DownloadButton from "../components/DownloadButton";
import useApi from "../hook/useApi";

function MapView() {
  const { markers, loading, setMarkers } = useApi();

  const [map, setMap] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);

  return (
    <div className="container">
      <div className="mapContainer">
        <MapComponent
          center={[37.79, 29.06]}
          zoom={13}
          markers={markers}
          selectedMarkerId={selectedMarkerId}
          setMap={setMap}
        />
      </div>
      <div className="content">
        <div>
          {map ? <DisplayPosition map={map} setMarkers={setMarkers} /> : null}
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <DataTable
              map={map}
              markers={markers}
              setMarkers={setMarkers}
              loading={loading}
              setSelectedMarkerId={setSelectedMarkerId}
            />
          )}
        </div>
        <div className="downloadContainer">
          {markers.length > 0 && (
            <div className="downloadContainer">
              <DownloadButton markers={markers} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MapView;
