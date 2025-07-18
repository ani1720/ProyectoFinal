import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import './pages/Eventos.css';

import hoguera from './assets/hoguera.jpg';
import fuegos from './assets/fuegos.jpg';
import tarracoViva from './assets/tarraco-viva.jpg';
import castells from './assets/castells.jpg';
import campdemart from './assets/Campdemart.jpg';
import santmagi from './assets/santmagi.jpg';
import dixieland from './assets/dixieland.jpg';
import TarraTangueando from './assets/TarraTangueando.jpg';
import SantaTecla from './assets/SantaTecla.jpg';
import URSI from './assets/URSI.jpg';

const eventosMensuales = [
  {
    mes: "Junio",
    eventos: [
      { titulo: "Castells semanales", descripcion: "Exhibiciones tradicionales de torres humanas.", imagen: castells },
      { titulo: "Nit de Sant Joan", descripcion: "Celebración con hogueras, música y fuegos artificiales.", imagen: hoguera }
    ]
  },
  {
    mes: "Julio",
    eventos: [
      { titulo: "Concurso de Fuegos Artificiales", descripcion: "Competencia pirotécnica en la playa.", imagen: fuegos },
      { titulo: "Festival Camp de Mart", descripcion: "Festival cultural con música y teatro al aire libre.", imagen: campdemart }
    ]
  },
  {
    mes: "Agosto",
    eventos: [
      { titulo: "Sant Magí", descripcion: "Fiestas patronales con procesiones y conciertos.", imagen: santmagi },
      { titulo: "Dixieland", descripcion: "Festival de jazz tradicional.", imagen: dixieland },
      { titulo: "TarraTangueando", descripcion: "Encuentro de tango con talleres y espectáculos.", imagen: TarraTangueando }
    ]
  },
  {
    mes: "Septiembre",
    eventos: [
      { titulo: "Santa Tecla", descripcion: "Gran fiesta mayor con actos tradicionales y fuegos.", imagen: SantaTecla },
      { titulo: "URSI", descripcion: "Encuentro artístico urbano con intervenciones creativas.", imagen: URSI },
      { titulo: "Espectáculos en el Palau & cultura científica", descripcion: "Eventos culturales y divulgación científica.", imagen: tarracoViva }
    ]
  }
];

const lugaresRelacionados = [
  {
    nombre: "Anfiteatro",
    imagen: castells,
    resumen: "Antiguo anfiteatro romano frente al mar.",
    detalles: "Este sitio es uno de los puntos más destacados de la ruta turística por Tarragona. Ideal para visitas culturales, actividades al aire libre y vistas panorámicas.",
    horario: "10:00 - 18:00 (todos los días)",
    ubicacion: "Tarragona centro histórico"
  },
  {
    nombre: "Catedral",
    imagen: campdemart,
    resumen: "Imponente catedral románica-gótica en la parte alta.",
    detalles: "Uno de los monumentos más emblemáticos de Tarragona, ubicada en el corazón del casco antiguo.",
    horario: "10:00 - 19:00 (lunes a sábado)",
    ubicacion: "Pla de la Seu"
  }
];

function EventoDetalle() {
  const { titulo } = useParams();
  const tituloDecodificado = decodeURIComponent(titulo);

  const eventoEncontrado = eventosMensuales
    .flatMap((grupo) => grupo.eventos)
    .find((evento) => evento.titulo === tituloDecodificado);

  const [selectedLugar, setSelectedLugar] = useState(lugaresRelacionados[0]);

  if (!eventoEncontrado) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Evento no encontrado</h2>
        <Link to="/eventos">Volver</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/eventos" style={{ textDecoration: "none" }}>&larr; Volver</Link>
      <h1>{eventoEncontrado.titulo}</h1>
      <img
        src={eventoEncontrado.imagen}
        alt={eventoEncontrado.titulo}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover", margin: "1rem 0" }}
      />
      <p style={{ fontSize: "1.2rem" }}>{eventoEncontrado.descripcion}</p>

      {/* Sección de lugares relacionados */}
      <div style={{ marginTop: "3rem" }}>
        <h2>Lugares relacionados</h2>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {lugaresRelacionados.map((lugar, i) => (
            <img
              key={i}
              src={lugar.imagen}
              alt={lugar.nombre}
              onClick={() => setSelectedLugar(lugar)}
              style={{
                width: "120px",
                height: "90px",
                borderRadius: "10px",
                cursor: "pointer",
                border: lugar.nombre === selectedLugar.nombre ? "3px solid #0077cc" : "2px solid transparent",
                objectFit: "cover"
              }}
            />
          ))}
        </div>

        <div style={{
          display: "flex",
          gap: "1.5rem",
          padding: "1.5rem",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          flexWrap: "wrap",
          alignItems: "center"
        }}>
          <img
            src={selectedLugar.imagen}
            alt={selectedLugar.nombre}
            style={{ width: "240px", borderRadius: "12px", objectFit: "cover" }}
          />
          <div style={{ maxWidth: "500px" }}>
            <h3 style={{ marginBottom: "0.5rem" }}>{selectedLugar.nombre}</h3>
            <p>{selectedLugar.resumen}</p>
            <p><strong>Detalles:</strong> {selectedLugar.detalles}</p>
            <p><strong>Horario:</strong> {selectedLugar.horario}</p>
            <p><strong>Ubicación:</strong> {selectedLugar.ubicacion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventoDetalle;
