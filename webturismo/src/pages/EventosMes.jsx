import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function EventosMes() {
  const { mes } = useParams();
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const colRef = collection(db, `eventos/${mes}`);
        const snapshot = await getDocs(colRef);

        const data = snapshot.docs.map((doc) => doc.data());
        setEventos(data);
      } catch (error) {
        console.error("Error al obtener eventos:", error);
      }
    };

    fetchEventos();
  }, [mes]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Eventos de {mes.charAt(0).toUpperCase() + mes.slice(1)}</h1>

      {eventos.length === 0 ? (
        <p>No hay eventos disponibles para este mes.</p>
      ) : (
        eventos.map((evento, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#1a1a2e",
              padding: "1.5rem",
              borderRadius: "10px",
              marginBottom: "2rem",
              color: "white",
            }}
          >
            <h2>{evento.nombre}</h2>
            <p><strong>Mes:</strong> {mes}</p>
            <p><strong>Fecha:</strong> {evento.fecha}</p>
            <p>{evento.descripcion}</p>
            {evento.imagenUrl && (
              <img
                src={evento.imagenUrl}
                alt={evento.nombre}
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginTop: "1rem",
                }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}
