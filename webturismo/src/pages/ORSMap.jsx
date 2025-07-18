import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { obtenerRutaORS } from "../utils/ors";

// Tu JSON de coordenadas (ejemplo)
const coordenadasJSON = [
  
  [
    1.030583,
    41.253727,
    930.246
  ],
  [
    1.030484,
    41.253703,
    960.988
  ],
  [
    1.030677,
    41.253651,
    960.916
  ],
];

const ORSMap = () => {
  useEffect(() => {
    const initMap = async () => {
      const map = L.map("ors-map").setView([41.12, 1.26], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const rutaGeoJSON = await obtenerRutaORS(coordenadasJSON);

      if (rutaGeoJSON) {
        L.geoJSON(rutaGeoJSON, {
          style: {
            color: "blue",
            weight: 4,
            opacity: 0.7,
          },
        }).addTo(map);
      }
    };

    initMap();
  }, []);

  return <div id="ors-map" style={{ height: "80vh", width: "100%" }} />;
};

export default ORSMap;
