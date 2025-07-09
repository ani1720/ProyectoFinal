import './Header.css'

function Header() {
  return (
    <header className="navbar">
      <div className="logo">LG</div>
      <nav className="nav-links">
        <a href="#">HOME</a>
        <a href="#">ABOUT</a>
        <a href="#">EVENTOS</a>
        <a href="#">MAP</a>
      </nav>
    </header>
  )
}

export default Header
