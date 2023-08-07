import React from "react";

function DataTable({ markers, loading, map, setSelectedMarkerId, setMarkers }) {
  const handleDelete = (markerId) => {
    const updatedMarkers = markers.filter((marker) => marker._id !== markerId);
    setMarkers(updatedMarkers);
  };

  const handleTableRowClick = (marker) => {
    setSelectedMarkerId(marker._id);
    if (map) {
      map.setView([marker.lat, marker.lng], 13);
    }
  };

  return (
    <div className="tableContainer">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="dataTable">
          <thead>
            <tr>
              <th>Id</th>
              <th>Konum</th>
              <th>Tarih</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {markers.length === 0 ? (
            <p className="emptyTable">Kayıtlı Konum Bulunmamaktadır.</p>
          ) : (
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
                      className="goButton"
                      onClick={() => handleTableRowClick(marker)}
                    >
                      Göster
                    </button>
                  </td>
                  <td>
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(marker._id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
    </div>
  );
}

export default DataTable;
