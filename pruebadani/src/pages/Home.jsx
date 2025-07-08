import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🌄 Bienvenido a WebTurismo Tarragona</h1>
      <p>
        Descubre la riqueza natural, cultural y gastronómica de nuestra región.
        Desde rutas únicas hasta eventos locales, ¡te lo mostramos todo!
      </p>

      <div style={{ marginTop: '2rem' }}>
        <h2>Explora:</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/about">🧭 Sobre Nosotros</Link></li>
          <li><Link to="/map">🗺️ Mapa Turístico</Link></li>
          <li><Link to="/routes">🥾 Rutas Naturales</Link></li>
          <li><Link to="/events">🎉 Eventos Locales</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
