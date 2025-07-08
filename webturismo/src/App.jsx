import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Map from './pages/Map';
import RoutesPage from './pages/Routes';
import Events from './pages/Events';

function App() {
  return (
    <div>
      <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/">Inicio</Link> |{' '}
        <Link to="/about">Sobre Nosotros</Link> |{' '}
        <Link to="/map">Mapa</Link> |{' '}
        <Link to="/routes">Rutas</Link> |{' '}
        <Link to="/events">Eventos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;
