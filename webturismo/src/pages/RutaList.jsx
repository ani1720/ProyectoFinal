import React from "react";
import rutas from "../data/rutas.json";
import "./RutaList.css";

const RutaList = () => {
  return (
    <div className="pantalla-completa">
      <div className="vertical-layout">

        

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
        <p><strong>Duración:</strong> {ruta.duracion}</p>
        <p><strong>Tipo:</strong> {ruta.tipo}</p>
        <p><strong>Incluye:</strong></p>
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
