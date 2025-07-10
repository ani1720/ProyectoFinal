import Header from './Header'
import rutaTarracoImg from './assets/ruta-tarraco.png'
import './App.css'

function App() {
  const lugares = [
    { id: 1, nombre: 'Anfiteatro', img: anfiteatroImg, descripcion: 'Antiguo anfiteatro romano frente al mar.' },
    { id: 2, nombre: 'Catedral', img: catedralImg, descripcion: 'Impresionante catedral gótica en el corazón de Tarragona.' },
    { id: 3, nombre: 'Murallas', img: murallasImg, descripcion: 'Murallas romanas que protegían la antigua ciudad.' },
    { id: 4, nombre: 'Plaça del Rei', img: plazaReiImg, descripcion: 'Plaza central con gran valor histórico.' },
    { id: 5, nombre: 'Balcón Mediterráneo', img: balconImg, descripcion: 'Mirador con vistas al mar Mediterráneo.' },
  ];

  const [index, setIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedLugar, setSelectedLugar] = useState(null); // 🆕

   return (
    <>
      <Header />

      <div className="mapa-info-container">
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
          <img src={rutaTarracoImg} alt="Ruta Tarraco" />
        </div>
      </div>
    </>
  )
}

export default App
