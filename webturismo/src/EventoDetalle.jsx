import React from 'react';
import { useParams, Link } from 'react-router-dom';

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

const EventoDetalle = () => {
  const { titulo } = useParams();
  const tituloDecodificado = decodeURIComponent(titulo);

  // Buscar el evento por título
  const eventoEncontrado = eventosMensuales
    .flatMap((grupo) => grupo.eventos)
    .find((evento) => evento.titulo === tituloDecodificado);

  if (!eventoEncontrado) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Evento no encontrado</h2>
        <Link to="/eventos">Volver a eventos</Link>
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
        style={{ maxWidth: "100%", margin: "1rem 0" }}
      />
      <p style={{ fontSize: "1.2rem" }}>{eventoEncontrado.descripcion}</p>
    </div>
  );
};

export default EventoDetalle;
