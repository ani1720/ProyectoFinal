import React, { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import coordenadas from './coordenadas.json';

function App() {
  const mapRef = useRef(null);
  const [ruta, setRuta] = React.useState([]);
  const [puntosClave, setPuntosClave] = React.useState([]);

  const obtenerRuta = async () => {
    try {
      const body = {
        coordinates: coordenadas.ruta
      };

      const response = await fetch("https://api.openrouteservice.org/v2/directions/foot-walking/geojson", {
        method: "POST",
        headers: {
          'Accept': 'application/json, application/geo+json',
          'Content-Type': 'application/json',
          'Authorization': 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjcwNGMxOTg0NGQ1MjQ5YjliOWJhMjE0NjE0MzUyNjlmIiwiaCI6Im11cm11cjY0In0='
        },
         
        body: JSON.stringify(body)
      });
       console.log("Coordenadas enviadas:", JSON.stringify(body));

      if (!response.ok) throw new Error("Error al obtener la ruta");

      const data = await response.json();
      console.log("Respuesta ORS:", data);

      const geometry = data.features[0].geometry.coordinates;

      setRuta(geometry);
      setPuntosClave([
        coordenadas.ruta[0],
        ...coordenadas.ruta.slice(1, -1),
        coordenadas.ruta[coordenadas.ruta.length - 1]
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Ruta desde JSON</h1>
      <button onClick={obtenerRuta}>Mostrar Ruta</button>
      <MapContainer
        center={[41.118895, 1.257472]}
        zoom={16}
        style={{ height: "400px", width: "60%", marginTop: "1rem" }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcadores solo en puntos clave */}
        {puntosClave.map((pos, idx) => (
          <Marker key={idx} position={[pos[1], pos[0]]} />
        ))}

        {/* Línea de la ruta */}
        {ruta.length > 0 && (
          <Polyline
            positions={ruta.map(coord => [coord[1], coord[0]])}
            color="blue"
          />
        )}
      </MapContainer>
    </div>
  );
}

export default App;
