import React from "react";
import { useNavigate } from "react-router-dom";
import junioImg from "../assets/tarraco-viva.jpg"; // usa tu imagen real
import julioImg from "../assets/SantaTecla.jpg";   // imagen para julio, etc.

export default function Eventos() {
  const navigate = useNavigate();

  const meses = [
    {
      nombre: "junio",
      imagen: junioImg,
    },
    {
      nombre: "julio",
      imagen: julioImg,
    },
    // añade más meses si quieres
  ];

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h1>Eventos mensuales en Tarragona</h1>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {meses.map((mes) => (
          <div
            key={mes.nombre}
            onClick={() => navigate(`/eventos/${mes.nombre}`)}
            style={{
              cursor: "pointer",
              borderRadius: "10px",
              overflow: "hidden",
              width: "300px",
              boxShadow: "0 0 10px rgba(0,0,0,0.5)",
              backgroundColor: "#222",
            }}
          >
            <img
              src={mes.imagen}
              alt={mes.nombre}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h2 style={{ textAlign: "center", padding: "1rem" }}>
              {mes.nombre.charAt(0).toUpperCase() + mes.nombre.slice(1)}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
