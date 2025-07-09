import { useState } from "react";
import rutas from "../data/rutas.json";
import RutaCard from "../components/RutaCard";
import RutaFiltro from "../components/RutaFiltro";

const RutaList = () => {
  const [filtroActivo, setFiltroActivo] = useState("todas");

  const rutasFiltradas =
    filtroActivo === "todas"
      ? rutas
      : rutas.filter((ruta) => ruta.tipo === filtroActivo);

  return (
    <div>
      <h1>Explora Rutas en Tarragona</h1>
      <RutaFiltro filtroActivo={filtroActivo} setFiltroActivo={setFiltroActivo} />
      {rutasFiltradas.length > 0 ? (
        rutasFiltradas.map((ruta) => <RutaCard key={ruta.id} ruta={ruta} />)
      ) : (
        <p>No hay rutas disponibles para este tipo.</p>
      )}
    </div>
  );
};

export default RutaList;
