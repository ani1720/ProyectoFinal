import { Link } from "react-router-dom";

const RutaCard = ({ ruta }) => {
  return (
    <div className="ruta-card">
      {/* <h3>{ruta.titulo}</h3>
      <p>{ruta.descripcion}</p>
      <span className={`badge ${ruta.tipo}`}>{ruta.tipo}</span> */}
      <br />
      <Link to={`/ruta/${ruta.id}`}>Ver detalles</Link>
    </div>
  );
};

export default RutaCard;
