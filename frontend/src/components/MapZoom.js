import { useMapEvent } from "react-leaflet";

export default function MapZoom() {
  const map = useMapEvent("click", () => {
    map.setView([37.79, 29.06], map.getZoom());
  });
  return null;
}
