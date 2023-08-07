import React from "react";

function DownloadButton({ markers }) {
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

  return (
    <div className="downloadContainer">
      <button className="downloadButton" onClick={handleDownload}>
        İndir
      </button>
    </div>
  );
}

export default DownloadButton;
