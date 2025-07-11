import React, { useState } from 'react';
import polyline from 'polyline'; 


// Para desarrollo, puedes ponerla aquí. Para producción, considera un proxy.
const ORS_API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjcwNGMxOTg0NGQ1MjQ5YjliOWJhMjE0NjE0MzUyNjlmIiwiaCI6Im11cm11cjY0In0='; 
//http://localhost:*
function RouteGenerator() {
  // Estados para las coordenadas de la ruta
  const [origin, setOrigin] = useState('41.1080,1.2510'); // Ejemplo de Platja del Miracle
  const [destination, setDestination] = useState('41.1095,1.2700'); // Ejemplo de fin de la ruta
  const [waypoints, setWaypoints] = useState('41.1105,1.2540|41.1110,1.2580|41.1110,1.2670');
  
  // Estado para las coordenadas decodificadas de la ruta
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatoCoordParaORS = (coordsString) => {
    return coordsString.split(`|`).map(pair =>{
      const [lat, lon] = pair.split(',');
      return '${lon},${lat}';
    })
  };

  // Función para obtener la ruta de la API de Google Directions
  const fetchRoute = async () => {
    setLoading(true);
    setError(null);
    setRouteCoordinates([]); // Limpia resultados anteriores

       console.log('Valor actual del estado Origin:', origin);

    // Codifica los parámetros de la URL
    const params = new URLSearchParams({
      api_key: ORS_API_KEY
    });
     // Los puntos se pasan directamente en la URL del endpoint
    // ORS usa un formato diferente para los waypoints en la URL, los añadimos directamente al path o como parámetro 'points'
    // Para simplificar, usaremos un GET con 'start', 'end' y 'waypoints' como en el ejemplo conceptual
    const orsOrigin = formatoCoordParaORS(origin);
    const orsDestination = formatoCoordParaORS(destination);
    const orsWaypoints = waypoints ? formatoCoordParaORS(waypoints) : '';
    
    let orsUrl = `https://api.openrouteservice.org/v2/directions/foot-walking?`;
    orsUrl += `start=${orsOrigin}&`;
    orsUrl += `end=${orsDestination}`;
      if(orsWaypoints) {
        orsUrl += `&waypoints=${orsWaypoints}`;
      }
      orsUrl += `&api_key=${ORS_API_KEY}`;

      console.log('URL de la solicitud a ORS:', orsUrl);
    try {
      const response = await fetch(orsUrl, {
        method: 'GET',
        headers: {
          'Accept' : 'application/json',
           // 'Authorization': ORS_API_KEY
           // Para algunos endpoints puede requerir header Authorization
        }
      });

      const data = await response.json();

      if(response.ok) {
        const orsRouteCoords= data.features[0].geometry.coordinates;

        const formattedCoords = orsRouteCoords.map(coord => [coord[1],
        coord[0]]);
        setRouteCoordinates(formatteCoords);
      }else {
        setError(`Error en la API de ORS: ${data.error ? data.error.message : response.statusText}`);
        console.error('Respuesta de error de ORS:', data);
      }
    }catch (err) {
      setError(`Error al conectar con la API de ORS: ${err.message}`);
      console.error('Error de red o fetch fallido:', err);
    }finally {
      setLoading(false);
    };
  // Función para generar el contenido GPX
  const generateGpx = () => {
    if (routeCoordinates.length === 0) {
      return '';
    }

    let gpxContent = `<?xml version='1.0' encoding='UTF-8'?>
<gpx version="1.1" creator="GPT-4o" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>Ruta Generada desde React</name>
    <trkseg>
`;

    routeCoordinates.forEach(coord => {
      // Usamos una elevación predeterminada si no tenemos datos reales
      gpxContent += `      <trkpt lat="${coord[0]}" lon="${coord[1]}">\n        <ele>5</ele>\n      </trkpt>\n`;
    });

    gpxContent += `    </trkseg>
  </trk>
</gpx>
`;
    return gpxContent;
  };

  // Función para descargar el archivo GPX
  const downloadGpx = () => {
    const gpxData = generateGpx();
    if (!gpxData) {
      alert("No hay datos de ruta para generar el GPX.");
      return;
    }

    const blob = new Blob([gpxData], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ruta_miracle.gpx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); 
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Generador de Ruta GPX (Playa El Miracle)</h1>

      <div>
        <label>
          Origen (lat,lon):
          <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} style={{ marginLeft: '10px', width: '200px' }} />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Destino (lat,lon):
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} style={{ marginLeft: '10px', width: '200px' }} />
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Waypoints (lat,lon|lat,lon...):
          <input type="text" value={waypoints} onChange={(e) => setWaypoints(e.target.value)} style={{ marginLeft: '10px', width: '400px' }} />
        </label>
      </div>

      <button onClick={fetchRoute} disabled={loading} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        {loading ? 'Cargando Ruta...' : 'Obtener Ruta'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {routeCoordinates.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Ruta Obtenida</h2>
          <p>Número de puntos en la ruta: {routeCoordinates.length}</p>
          <button onClick={downloadGpx} style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Descargar GPX
          </button>
          <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', maxHeight: '300px', overflowY: 'scroll' }}>
            {/* Opcional: mostrar algunos puntos para depuración */}
            {routeCoordinates.slice(0, 5).map((coord, index) => (
              <div key={index}>{`Lat: ${coord[0]}, Lon: ${coord[1]}`}</div>
            ))}
            {routeCoordinates.length > 5 && <div>... (mostrando solo los primeros 5 puntos)</div>}
          </pre>
        </div>
      )}
    </div>
  );
}}
export default RouteGenerator