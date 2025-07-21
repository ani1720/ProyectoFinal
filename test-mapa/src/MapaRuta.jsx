// src/MapaRuta.jsx
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapaRuta({ coordenadas }) {
  if (!coordenadas || coordenadas.length === 0) return null;

  return (
    <MapContainer center={coordenadas[0].slice().reverse()} zoom={15} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline positions={coordenadas.map(c => [c[1], c[0]])} color="blue" />

      {coordenadas.map((c, idx) => (
        <Marker position={[c[1], c[0]]} key={idx}>
          <Popup>Punto {idx + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapaRuta;
