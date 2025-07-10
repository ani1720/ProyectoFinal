import { useState } from 'react';
import Header from './Header';
import rutaTarracoImg from './assets/ruta-tarraco.png';
import './App.css';
import anfiteatroImg from './assets/anfiteatro.jpg';
import catedralImg from './assets/catedral.jpg';
import murallasImg from './assets/murallas.jpg';
import plazaReiImg from './assets/plaza-rei.jpg';
import balconImg from './assets/balcon.jpg';


function App() {
  const lugares = [
    { id: 1, nombre: 'Anfiteatro', img: anfiteatroImg, descripcion: 'Antiguo anfiteatro romano frente al mar.' },
    { id: 2, nombre: 'Catedral', img: catedralImg, descripcion: 'Impresionante catedral gótica en el corazón de Tarragona.' },
    { id: 3, nombre: 'Murallas', img: murallasImg, descripcion: 'Murallas romanas que protegían la antigua ciudad.' },
    { id: 4, nombre: 'Plaça del Rei', img: plazaReiImg, descripcion: 'Plaza central con gran valor histórico.' },
    { id: 5, nombre: 'Balcón Mediterráneo', img: balconImg, descripcion: 'Mirador con vistas al mar Mediterráneo.' },
  ];

  const [index, setIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedLugar, setSelectedLugar] = useState(null); // 🆕

   return (
    <>
      <Header />

      <div className="mapa-info-container">
        <div className="info">
          <h1>Turismo en Tarragona</h1>
          <p><strong>Descripción:</strong> Esta aplicación interactiva permite a los usuarios explorar el patrimonio histórico y cultural de Tarragona a través de una ruta guiada con imágenes, descripciones detalladas, mapas y horarios. Diseñada para turistas y curiosos, la app facilita el descubrimiento de los lugares más emblemáticos del antiguo Tarraco de forma visual e intuitiva.</p>
          <p><strong>Servicios:</strong>  Ofrecemos un tour turístico personalizado que se adapta al ritmo de cada persona. Gracias a nuestra aplicación, los usuarios pueden explorar la ciudad de forma libre, sin necesidad de seguir a un guía. Disfruta de la historia, los secretos y rincones emblemáticos de Tarragona a tu manera, con acceso a mapas interactivos, descripciones detalladas, horarios, ubicaciones y recomendaciones gastronómicas cercanas.</p>        </div>

        <div className="mapa">
          <h2>RUTA HISTÓRICA ANTIGUO TARRACO</h2>
          <img src={rutaTarracoImg} alt="Ruta Tarraco" />
        </div>
      </div>

      <div className="slider-wrapper">
        {lugares.map((lugar, i) => (
          <img
            key={i}
            src={lugar.img}
            alt={lugar.nombre}
            className={`slider-item ${hoveredIndex === i ? 'active' : ''}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedLugar(lugar)}
          />
        ))}
      </div>

      {selectedLugar && (
  <div className="card-detalle">
    <div className="card-imagen">
      <img src={selectedLugar.img} alt={selectedLugar.nombre} />
    </div>
    <div className="card-info">
      <h2>{selectedLugar.nombre}</h2>
      <p>{selectedLugar.descripcion}</p>
      <p><strong>Detalles:</strong> Este sitio es uno de los puntos más destacados de la ruta turística por Tarragona. Ideal para visitas culturales, actividades al aire libre y vistas panorámicas.</p>
      <p><strong>Horario:</strong> 10:00 - 18:00 (todos los días)</p>
      <p><strong>Ubicación:</strong> Tarragona centro histórico</p>
    </div>
  </div>
)}




     
    </>
  );

}

export default App;
