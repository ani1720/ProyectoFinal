import React, { useState } from "react";
import rutas from "../data/rutas.json";
import "./RutaList.css";
import RutaFiltro from "../components/RutaFiltro";

const RutaList = () => {
  const [filtroActivo, setFiltroActivo] = useState("todas");
  const rutasFiltradas =
    filtroActivo === "todas"
      ? rutas
      : rutas.filter((ruta) => ruta.tipo === filtroActivo);
  
      return (
    <div className="pantalla-completa">
      <div className="vertical-layout">
        <h1>Explora Rutas en Tarragona</h1>
        <RutaFiltro
        filtroActivo={filtroActivo}
        setFiltroActivo={setFiltroActivo}
        />
        <section className="rutas-diagonales">
          {rutas.slice(0, 3).map((ruta, index) => (
            <div
              key={ruta.id}
              className={`tarjeta-diagonal ${
                index === 0
                  ? "diagonal-left"
                  : index === 2
                  ? "diagonal-right"
                  : "normal"
              }`}
            >
              <img src={ruta.imagen} alt={ruta.nombre} />
              <div className="contenido">
                <h2>{ruta.nombre}</h2>
                <p>
                  <strong>Duración:</strong> {ruta.duracion}
                </p>
                <p>
                  <strong>Tipo:</strong> {ruta.tipo}
                </p>
                <p>
                  <strong>Incluye:</strong>
                </p>
                <ul>
                  {ruta.contenido?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default RutaList;
