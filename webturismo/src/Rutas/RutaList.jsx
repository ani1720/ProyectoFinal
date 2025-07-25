import { Link } from "react-router-dom";
// import rutas from "/public/data/rutas.json";
import { useEffect, useState } from "react";
import {collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "./RutaList.css";


const RutaList = () => {
 const [rutas, setRutas] = useState([]);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Rutas"));
        const rutasData = querySnapshot.docs.map(doc => ({
          id: doc.id, // "ruta1", "ruta2", etc.
          ...doc.data()
        }));
        setRutas(rutasData);
      } catch (error) {
        console.error("Error al obtener rutas:", error);
      }
    };

    fetchRutas();
  }, []);

  useEffect(() => {
    const cargarRutas = async () => {
      const snapshot = await getDocs(collection(db, "Rutas"));
      const todas = snapshot.doc.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filtradas = tipoSeleccionado 
      ? todas.filter((r) => r.tipo === tipoSeleccionado)
      : todas;
      setRutas(filtradas);
    };
    cargarRutas();
  }, [tipoSeleccionado]);

  return (
    <div className="pantalla-completa">
      <div className="vertical-layout">
        <h1>Explora Rutas en Tarragona</h1>

        <section className="rutas-diagonales">
          {rutas
          .filter((ruta) => tipoSeleccionado === "" || ruta.tipo === tipoSeleccionado)
          .slice(0, 3)
          .map((ruta) => (
            <Link
              to={`/rutas/${ruta.id}`}
              key={ruta.id}
              className="tarjeta-diagonal"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={ruta.imagen}
                alt={ruta.nombre}
                style={{ cursor: "pointer" }}
              />
              <div className="contenido">
                <h2>{ruta.nombre}</h2>
                {/* <p><strong>Duración:</strong> {ruta.duracion}</p> */}
                <p><strong>Tipo:</strong> {ruta.tipo}</p>
                <p><strong>Incluye:</strong></p>
                <ul>
                  {ruta.contenido?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default RutaList;
