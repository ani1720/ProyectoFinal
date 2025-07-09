import React from 'react';
import './Footer.css';
import rutaTarracoImg from './assets/ruta-tarraco.png'; // Asegúrate de que la ruta sea correcta

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h4>RUTAS</h4>
          <ul>
            <li>Rutas Montaña</li>
            <li>Rutas Playas</li>
            <li>Rutas Antiguo Tarraco</li>
            <li>Rutas Conecta con la Naturaleza</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>ABOUT</h4>
          <ul>
            <li>Sobre Nosotros</li>
            <li>Historia de Tarraco</li>
            <li>Historia de Anfiteatro</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>SERVICIOS</h4>
          <ul>
            <li>Guías locales</li>
            <li>Recomendaciones</li>
            <li>Reservas turísticas</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>MAPAS</h4>
          <img src={rutaTarracoImg} alt="Mapa Tarraco" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
