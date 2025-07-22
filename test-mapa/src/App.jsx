// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import '../public/data/Rutas.json'
import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const App = () => {
  const mapRef = useRef(null);
  const [rutaSeleccionada, setRutaSeleccionada] = useState(null);

  useEffect(() => {
    // Crear mapa solo una vez
    
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([41.117, 1.25], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }

    // Cargar Rutas.json
    fetch("/data/Rutas.json")
      .then((res) => res.json())
      .then((rutas) => {
        setRutaSeleccionada(rutas[0]); // Por ahora cargamos la primera ruta
      })
      .catch((error) => console.error("Error al cargar Rutas.json:", error));
  }, []);

  useEffect(() => {
    if (rutaSeleccionada) {
      obtenerRuta(rutaSeleccionada.coordenadasJSON);
    }
  }, [rutaSeleccionada]);

  const obtenerRuta = async (coordenadasURL) => {
    try {
      const response = await fetch(coordenadasURL);
      const data = await response.json();

      const coordenadas = data.ruta.map((punto) => punto.coordenadas);

      // Dibujar marcadores
      coordenadas.forEach((coord, idx) => {
        L.marker(coord.reverse()).addTo(mapRef.current).bindPopup(data.ruta[idx].nombre);
        coord.reverse(); // Volver a invertir para ORS (lon, lat)
      });

      // Enviar coordenadas a ORS
      const orsResponse = await fetch("https://api.openrouteservice.org/v2/directions/foot-walking/geojson", {
        method: "POST",
        headers: {
          Accept: "application/json, application/geo+json",
          "Content-Type": "application/json",
          Authorization: "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjcwNGMxOTg0NGQ1MjQ5YjliOWJhMjE0NjE0MzUyNjlmIiwiaCI6Im11cm11cjY0In0="
        },
        body: JSON.stringify({ coordinates: coordenadas }),
      });

      if (!orsResponse.ok) throw new Error("Error al obtener ruta de ORS");

      const resultado = await orsResponse.json();

      L.geoJSON(resultado, {
        style: { color: "blue", weight: 4 }
      }).addTo(mapRef.current);

      const bounds = L.geoJSON(resultado).getBounds();
      mapRef.current.fitBounds(bounds);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <h1>Mapa de Ruta</h1>
      <div id="map" style={{ height: "600px", width: "100%" }}></div>
    </div>
  );
};

export default App;

// const App = () => {
//   const [ruta, setRuta] = useState([]);
//   const [puntos, setPuntos] = useState([]);

//   const obtenerRuta = async () => {
//     try {
//       // Cargar archivo JSON
//       const response = await fetch('/data/Rutas.json');
//       const data = await response.json();

//       const coordenadas = data.ruta.map(punto => punto.coordenadas);
//       setPuntos(data.ruta); // para mostrar los marcadores y nombres

//       // Petición a OpenRouteService
//       const respuesta = await fetch('https://api.openrouteservice.org/v2/directions/foot-walking/geojson', {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/geo+json',
//           'Content-Type': 'application/json',
//           'Authorization': 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjcwNGMxOTg0NGQ1MjQ5YjliOWJhMjE0NjE0MzUyNjlmIiwiaCI6Im11cm11cjY0In0=' // 🔁 Reemplaza por tu API key
//         },
//         body: JSON.stringify({ coordinates: coordenadas })
//       });

//       if (!respuesta.ok) throw new Error("Error al obtener la ruta");

//       const geojson = await respuesta.json();
//       const coordenadasRuta = geojson.features[0].geometry.coordinates;
//       setRuta(coordenadasRuta);

//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Ruta Turística con Paradas</h1>
//       <button onClick={obtenerRuta}>Cargar Ruta desde JSON</button>

//       <MapContainer center={[41.117, 1.256]} zoom={15} scrollWheelZoom={true} style={{ height: '80vh', marginTop: '1rem' }}>
//         <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors & CartoDB' 
//         />
        
//         {/* Ruta calculada */}
//         {ruta.length > 0 && (
//           <Polyline positions={ruta.map(c => [c[1], c[0]])} color="blue" />
//         )}

//         {/* Puntos de interés */}
//         {puntos.map((p, idx) => (
//           <Marker key={idx} position={[p.coordenadas[1], p.coordenadas[0]]}>
//             <Popup>{p.nombre}</Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default App;
