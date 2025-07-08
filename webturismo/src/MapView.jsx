import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-gpx";

const MapView = () => {
  useEffect(() => {
    const map = L.map("map").setView([41.12, 1.26], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

<<<<<<< Updated upstream
=======
    // GPX cargado desde carpeta public/gpx/
>>>>>>> Stashed changes
    new L.GPX("/gpx/ruta_tarragona.gpx", {
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
        map.fitBounds(e.target.getBounds());
      })
      .addTo(map);
  }, []);

  return <div id="map" style={{ width: "100%", height: "80vh" }} />;
};

export default MapView;
