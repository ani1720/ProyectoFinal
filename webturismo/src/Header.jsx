// Header.jsx
import './Header.css';
import { Link } from "react-router-dom";

function Header({ usuario, cerrarSesion }) {
  return (
    <header className="navbar">
      <div className="logo">LG</div>
      
      <nav className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/eventos">EVENTOS</Link>
        <Link to="/map">MAP</Link>
        <Link to="/rutas">RUTAS</Link>
        
        <div className="auth-buttons">
          {usuario ? (
            <button onClick={cerrarSesion}>Cerrar sesión</button>
          ) : (
            <>
              <Link to="/login">
                <button>Iniciar sesión</button>
              </Link>
            </>
          )}
        </div>

        <a href="#">HOME</a>
        <a href="#">ABOUT</a>
        <a href="#">EVENTOS</a>
        <a href="#">MAP</a>
        <a href="#">RUTAS</a>
      </nav>
    </header>
  );
}

export default Header;
