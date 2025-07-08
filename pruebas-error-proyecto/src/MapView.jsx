// src/components/MapView.jsx
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-gpx";


// Coordenadas simuladas para una ruta de montaña
const rutaMontana = [
  [41.1176, 1.2543], // Punto inicio
  [41.1200, 1.2600],
  [41.1230, 1.2650],
  [41.1265, 1.2705], // Punto final
];

// Icono personalizado
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [25, 25],
});

const MapView = () => {
  return (
    <MapContainer
      center={[41.1189, 1.2445]} // Tarragona
      zoom={13}
      style={{ height: "80vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Ruta en línea roja */}
      <Polyline positions={rutaMontana} color="red" weight={4} />

      {/* Marcadores */}
      <Marker position={rutaMontana[0]} icon={customIcon}>
        <Popup>Inicio de ruta</Popup>
      </Marker>

      <Marker position={rutaMontana[rutaMontana.length - 1]} icon={customIcon}>
        <Popup>Mirador final</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
