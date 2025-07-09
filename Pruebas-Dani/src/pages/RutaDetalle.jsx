import { useParams } from "react-router-dom";
import rutas from "../data/rutas.json";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-gpx";

const RutaDetalle = () => {
  const { id } = useParams();
  const ruta = rutas.find((r) => r.id === parseInt(id));
  const mapRef = useRef(null);

  useEffect(() => {
    if (!ruta || mapRef.current) return;

    mapRef.current = L.map("map").setView([41.12, 1.26], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapRef.current);

    new L.GPX(ruta.archivo_gpx, {
      async: true,
      polyline_options: {
        color: "red",
        weight: 4,
        opacity: 0.8,
      },
      marker_options: {
        startIconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        endIconUrl: "https://cdn-icons-png.flaticon.com/512/892/892285.png",
        shadowUrl: "",
      },
    })
      .on("loaded", function (e) {
        mapRef.current.fitBounds(e.target.getBounds());
      })
      .addTo(mapRef.current);
  }, [ruta]);

  if (!ruta) return <p>Ruta no encontrada</p>;

  return (
    <div>
      <h2>{ruta.titulo}</h2>
      <p>{ruta.descripcion}</p>
      <span className={`badge ${ruta.tipo}`}>{ruta.tipo}</span>
      <div id="map" style={{ height: "80vh", marginTop: "1rem" }}></div>
    </div>
  );
};

export default RutaDetalle;
