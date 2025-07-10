import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="navbar">
      <div className="logo">LG</div>
      <nav className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/rutas">RUTAS</Link>
        {/* Agrega más rutas si las tienes */}
      </nav>
    </header>
  );
}

export default Header;
