import { useMap } from "react-leaflet";

export default function MapCenter() {
  const map = useMap();
  console.log("map center:", map.getCenter());
  return null;
}
