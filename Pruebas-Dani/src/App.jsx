import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import RutaList from './pages/RutaList';

import rutaTarracoImg from './assets/ruta-tarraco.png';
import anfiteatroImg from './assets/anfiteatro.jpg';
import catedralImg from './assets/catedral.jpg';
import murallasImg from './assets/murallas.jpg';
import plazaReiImg from './assets/plaza-rei.jpg';
import balconImg from './assets/balcon.jpg';

import './App.css';

function App() {
  const lugares = [
    { id: 1, nombre: 'Anfiteatro', img: anfiteatroImg, descripcion: 'Antiguo anfiteatro romano frente al mar.' },
    { id: 2, nombre: 'Catedral', img: catedralImg, descripcion: 'Impresionante catedral gótica en el corazón de Tarragona.' },
    { id: 3, nombre: 'Murallas', img: murallasImg, descripcion: 'Murallas romanas que protegían la antigua ciudad.' },
    { id: 4, nombre: 'Plaça del Rei', img: plazaReiImg, descripcion: 'Plaza central con gran valor histórico.' },
    { id: 5, nombre: 'Balcón Mediterráneo', img: balconImg, descripcion: 'Mirador con vistas al mar Mediterráneo.' },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedLugar, setSelectedLugar] = useState(null);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="mapa-info-container">
                <div className="info">
                  <h1>Turismo en Tarragona</h1>
                  <p><strong>Descripción:</strong> Explora la historia romana a través de una ruta guiada por los lugares más emblemáticos del antiguo Tarraco.</p>
                  <p><strong>Servicios:</strong> Información cultural, rutas interactivas, recomendaciones gastronómicas, y accesos a lugares turísticos.</p>
                </div>

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
                <div className="lugar-detalle">
                  <h2>{selectedLugar.nombre}</h2>
                  <p>{selectedLugar.descripcion}</p>
                </div>
              )}
            </>
          }
        />

        <Route path="/rutas" element={<RutaList />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
