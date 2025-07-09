import Header from './Header'
import './App.css'

function App() {
  return (
    <>
      <Header />
      
      <div className="mapa-info-container">
        {/* Columna izquierda: Detalles */}
        <div className="info">
  <h1>Turismo en Tarragona</h1>
  <p>
    Bienvenido a nuestra plataforma de turismo inteligente en Tarragona. 
    Aquí descubrirás las rutas culturales más importantes, información histórica y servicios útiles 
    como restaurantes, zonas wifi, transporte y más.
  </p>
  <p>
    Nuestra misión es ayudarte a explorar los lugares emblemáticos de la ciudad con mapas interactivos, 
    curiosidades culturales y recomendaciones personalizadas.
  </p>
</div>


        {/* Columna derecha: Mapa */}
        <div className="mapa">
          <h2>RUTA HISTÓRICA ANTIGUO TARRACO</h2>
        </div>
      </div>
    </>
  )
}

export default App
