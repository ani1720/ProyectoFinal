import { useState } from "react";
import rutas from "../data/rutas.json";
import "./RutaList.css";

const RutaList = () => {
  const [filtroActivo, setFiltroActivo] = useState("todas");

  const rutasFiltradas =
    filtroActivo === "todas"
      ? rutas
      : rutas.filter((ruta) => ruta.tipo === filtroActivo);

  return (
    <div className="ruta-list">
      <h1>Explora Rutas en Tarragona</h1>
      <div className="filtros">
        {["todas", "montaña", "histórica", "playa"].map((tipo) => (
          <button
            key={tipo}
            className={filtroActivo === tipo ? "activo" : ""}
            onClick={() => setFiltroActivo(tipo)}
          >
            {tipo.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid-rutas">
        {rutasFiltradas.map((ruta) => (
          <div className="tarjeta-ruta" key={ruta.id}>
            <img src={ruta.imagen} alt={ruta.nombre} />
            <div className="overlay">
              <h2>{ruta.nombre}</h2>
              <p>{ruta.descripcion}</p>
              <p><strong>Duración:</strong> {ruta.duracion}</p>
              <p><strong>Tipo:</strong> {ruta.tipo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RutaList;
