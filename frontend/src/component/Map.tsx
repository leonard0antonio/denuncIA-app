import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapWrapper } from "../styles/map.styles";

Reflect.deleteProperty(L.Icon.Default.prototype, "_getIconUrl");
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapEventsProps {
  onClick: (lat: number, lng: number) => void;
}

function MapEvents({ onClick }: MapEventsProps) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapProps {
  position: [number, number] | null;
  onChange: (lat: number, lng: number) => void;
  defaultCenter?: [number, number];
}

export default function Map({
  position,
  onChange,
  defaultCenter = [-8.04756, -34.877],
}: MapProps) {
  const center = position ?? defaultCenter;

  return (
    <MapWrapper>
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {position && (
          <Marker
            position={position}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const p = e.target.getLatLng();
                onChange(p.lat, p.lng);
              },
            }}
          />
        )}
        <MapEvents onClick={onChange} />
      </MapContainer>
    </MapWrapper>
  );
}
