import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Props {
  position: [number, number] | null;
  onChange: (lat: number, lng: number) => void;
  draggable?: boolean;
  defaultCenter?: [number, number];
}

function MarkerEvents({ pos, onChange }: { pos: [number, number]; onChange: (lat:number,lng:number)=>void }) {
  const markerRef = useRef<L.Marker | null>(null);
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.on('dragend', () => {
        const latlng = markerRef.current!.getLatLng();
        onChange(latlng.lat, latlng.lng);
      });
    }
  }, [onChange]);
  return (
    <Marker
      draggable={true}
      position={pos}
      ref={(m) => (markerRef.current = m as unknown as L.Marker)}
    />
  );
}

export default function Map({ position, onChange, defaultCenter = [-8.04756, -34.877] }: Props) {
  const center = position ?? defaultCenter;

  function Locate() {
    useMapEvents({
      click(e) {
        onChange(e.latlng.lat, e.latlng.lng);
      }
    });
    return null;
  }

  return (
    <MapContainer center={center} zoom={13} style={{ height: 360, borderRadius: 8 }}>
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position && <MarkerEvents pos={position} onChange={onChange} />}
      <Locate />
    </MapContainer>
  );
}
