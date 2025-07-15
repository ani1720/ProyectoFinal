import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrige el icono por defecto que a veces no carga correctamente en React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const puntosInteres = [
  {
    nombre: "Anfiteatro Romano",
    coordenadas: { lat: 41.1149, lng: 1.2582 },
    descripcion: "Anfiteatro romano del siglo II d.C.",
    imagen: "/src/assets/anfiteatro.jpg"
  },
  {
    nombre: "Catedral de Tarragona",
    coordenadas: { lat: 41.1182, lng: 1.2571 },
    descripcion: "Catedral gótica construida sobre un templo romano.",
    imagen: "/src/assets/catedral.jpg"
  },
  {
    nombre: "Murallas Romanas",
    coordenadas: { lat: 41.1195, lng: 1.2540 },
    descripcion: "Antiguas murallas que protegían la ciudad romana de Tarraco.",
    imagen: "/src/assets/murallas.jpg"
  }
];

const MapaInteractivo = () => {
  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <MapContainer center={[41.1172, 1.2540]} zoom={15} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {puntosInteres.map((punto, idx) => (
          <Marker key={idx} position={[punto.coordenadas.lat, punto.coordenadas.lng]}>
            <Popup>
              <div style={{ maxWidth: '200px' }}>
                <h3>{punto.nombre}</h3>
                <img src={punto.imagen} alt={punto.nombre} style={{ width: '100%', borderRadius: '8px' }} />
                <p>{punto.descripcion}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapaInteractivo;
