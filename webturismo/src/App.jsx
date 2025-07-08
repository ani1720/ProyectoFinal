import Header from './Header'
import rutaTarracoImg from './assets/ruta-tarraco.png'
import './App.css'

function App() {
  return (
    <>
      <Header />
      
      <div className="mapa-info-container">
        {/* Columna izquierda: Detalles */}
        <div className="info">
          <h1>Nombre</h1>
          <p><strong>Descripción:</strong> Aquí puedes añadir texto descriptivo.</p>
          <p><strong>Servicios:</strong> Restaurantes, zonas wifi, etc.</p>
        </div>

        {/* Columna derecha: Mapa */}
        <div className="mapa">
          <h2>RUTA HISTÓRICA ANTIGUO TARRACO</h2>
          <img src={rutaTarracoImg} alt="Ruta Tarraco" />
        </div>
      </div>
    </>
  )
}

export default App
