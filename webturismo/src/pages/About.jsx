import React from "react";
import Logo from "../assets/Logo2.png";
import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper">
      <div className="about-logo-section">
        <img src={Logo} alt="Logo TGO Tours" className="about-logo" />
      </div>

      <div className="about-content">
        <p>
          Bienvenido a <strong>Tarraco Explorer</strong>, una plataforma pensada para ayudarte a
          descubrir y disfrutar lo mejor de Tarragona.
        </p>

        <h2>¿Qué encontrarás aquí?</h2>
        <ul>
          <li>🗺️ Mapas interactivos con rutas peatonales optimizadas</li>
          <li>🏛️ Puntos de interés destacados con información histórica</li>
          <li>📷 Imágenes y recomendaciones de cada lugar</li>
          <li>📝 Foro donde puedes dejar tus comentarios o experiencias</li>
        </ul>

        <h2>¿Quiénes somos?</h2>
        <p>
          Este proyecto nace con el objetivo de facilitar el turismo local, especialmente para
          quienes visitan Tarragona por primera vez o desean conocerla a fondo sin usar múltiples
          apps.
        </p>

        <h2>¿Cómo funciona?</h2>
        <p>
          Elige una ruta desde el menú o desde la página principal. Podrás ver los puntos
          destacados, un mapa en tiempo real y comentarios de otros visitantes.
        </p>

        <h2>¿Tienes sugerencias?</h2>
        <p>
          Estamos en constante mejora. Si tienes ideas, correcciones o quieres colaborar, puedes
          escribirnos a:{" "}
          <a
            href="mailto:contacto@tarracoexplorer.com"
            style={{ color: "#81c7ff", textDecoration: "underline" }}
          >
            contacto@tarracoexplorer.com
          </a>
        </p>

        <p style={{ marginTop: "1.5rem", fontStyle: "italic" }}>
          ¡Esperamos que disfrutes tu viaje por Tarragona tanto como nosotros disfrutamos construir
          esta plataforma!
        </p>
      </div>
    </div>
  );
};

export default About;
