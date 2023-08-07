import React from "react";
import { useHandleTableRowClick } from "../hook/useHandleTableRowClick";
import { useHandleDelete } from "../hook/useHandleDelete";

function DataTable({ markers, loading, map, setSelectedMarkerId, setMarkers }) {
  const handleDelete = useHandleDelete(markers, setMarkers);
  const handleTableRowClick = useHandleTableRowClick(map, setSelectedMarkerId);

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
