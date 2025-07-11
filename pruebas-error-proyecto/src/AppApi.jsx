import React, { useState } from 'react';
<<<<<<< HEAD:webturismo/src/AppApi.jsx
import polyline from 'polyline';

const ORS_API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjcwNGMxOTg0NGQ1MjQ5YjliOWJhMjE0NjE0MzUyNjlmIiwiaCI6Im11cm11cjY0In0=';
=======
// import polyline from 'polyline'; // Esta librería ya no es necesaria si usas OpenRouteService directamente, puedes comentarla o borrarla si no vas a usar Google Maps

// IMPORTANTE: RESTRINGE TU API KEY EN LA CONSOLA DE OpenRouteService.
// Asegúrate de que el dominio de tu app (ej. http://localhost:5174/*) esté permitido.
const ORS_API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjcwNGMxOTg0NGQ1MjQ5YjliOWJhMjE0NjE0MzUyNjlmIiwiaCI6Im11cm11cjY0In0='; 
>>>>>>> 95169cad645ae38eb849156dfcb5f333c6fc69d9:pruebas-error-proyecto/src/AppApi.jsx

function RouteGenerator() {
  const [origin, setOrigin] = useState('41.1080,1.2510');
  const [destination, setDestination] = useState('41.1095,1.2700');
  const [waypoints, setWaypoints] = useState('41.1105,1.2540|41.1110,1.2580|41.1110,1.2670');
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // CORRECCIÓN 1: Usar backticks (`) para el template literal
  const formatoCoordParaORS = (coordsString) => {
    return coordsString.split('|').map(pair => {
      const [lat, lon] = pair.split(',');
<<<<<<< HEAD:webturismo/src/AppApi.jsx
      return `${lon},${lat}`;
    });
  };

=======
      return `${lon},${lat}`; // Usar backticks para interpolar ${lon} y ${lat}
    }).join('|'); // Re-unir los pares con '|'
  };

  // Función para obtener la ruta de la API de OpenRouteService
>>>>>>> 95169cad645ae38eb849156dfcb5f333c6fc69d9:pruebas-error-proyecto/src/AppApi.jsx
  const fetchRoute = async () => {
    setLoading(true);
    setError(null);
    setRouteCoordinates([]);

<<<<<<< HEAD:webturismo/src/AppApi.jsx
    const orsOrigin = formatoCoordParaORS(origin);
    const orsDestination = formatoCoordParaORS(destination);
    const orsWaypoints = waypoints ? formatoCoordParaORS(waypoints) : '';

    let orsUrl = `/ors/v2/directions/foot-walking?...`
   orsUrl += `start=${orsOrigin}&end=${orsDestination}`;
    if (orsWaypoints) {
      orsUrl += `&waypoints=${orsWaypoints}`;
    }
    orsUrl += `&api_key=${ORS_API_KEY}`;

=======
    console.log('Valor actual del estado Origin:', origin);

    // CORRECCIÓN 2: Llamar a formatoCoordParaORS para definir estas variables
    const orsOrigin = formatoCoordParaORS(origin);
    const orsDestination = formatoCoordParaORS(destination);
    const orsWaypoints = waypoints ? formatoCoordParaORS(waypoints) : ''; // Manejar caso de waypoints vacíos

    // Construye la URL de la solicitud a ORS
    let orsUrl = `https://api.openrouteservice.org/v2/directions/foot-walking?`; // Aquí defines el perfil/modo
    orsUrl += `start=${orsOrigin}&`;
    orsUrl += `end=${orsDestination}`;
    if (orsWaypoints) {
      orsUrl += `&waypoints=${orsWaypoints}`;
    }
    orsUrl += `&api_key=${ORS_API_KEY}`; // La clave API al final

    console.log('URL de la solicitud a ORS:', orsUrl);

>>>>>>> 95169cad645ae38eb849156dfcb5f333c6fc69d9:pruebas-error-proyecto/src/AppApi.jsx
    try {
      const response = await fetch(orsUrl, {
        method: 'GET', // ORS también soporta POST, que es más seguro para API keys
        headers: {
<<<<<<< HEAD:webturismo/src/AppApi.jsx
          'Accept': 'application/json'
=======
          'Accept': 'application/json',
          // 'Authorization': ORS_API_KEY // Para algunos endpoints puede requerir header Authorization
>>>>>>> 95169cad645ae38eb849156dfcb5f333c6fc69d9:pruebas-error-proyecto/src/AppApi.jsx
        }
      });

      const data = await response.json();

<<<<<<< HEAD:webturismo/src/AppApi.jsx
      if (response.ok) {
        const orsRouteCoords = data.features[0].geometry.coordinates;
        const formattedCoords = orsRouteCoords.map(coord => [coord[1], coord[0]]);
        setRouteCoordinates(formattedCoords);
=======
      if (response.ok) { // Verifica response.ok para HTTP 200-299
        // La respuesta de ORS suele estar en data.features[0].geometry.coordinates
        // Estos son [lon, lat], así que tendremos que invertirlos para GPX y nuestro estado
        const orsRouteCoords = data.features[0].geometry.coordinates;
        
        // Invertir a [lat, lon] para el formato GPX y para setRouteCoordinates
        const formattedCoords = orsRouteCoords.map(coord => [coord[1], coord[0]]);
        setRouteCoordinates(formattedCoords); // CORRECCIÓN 3: Aquí estaba 'formatteCoords' en lugar de 'formattedCoords'
>>>>>>> 95169cad645ae38eb849156dfcb5f333c6fc69d9:pruebas-error-proyecto/src/AppApi.jsx
      } else {
        setError(`Error en la API de ORS: ${data.error ? data.error.message : response.statusText}`);
      }
    } catch (err) {
      setError(`Error al conectar con la API de ORS: ${err.message}`);
<<<<<<< HEAD:webturismo/src/AppApi.jsx
    } finally {
      setLoading(false);
=======
      console.error('Error de red o fetch fallido:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para generar el contenido GPX
  const generateGpx = () => {
    if (routeCoordinates.length === 0) {
      return '';
>>>>>>> 95169cad645ae38eb849156dfcb5f333c6fc69d9:pruebas-error-proyecto/src/AppApi.jsx
    }
  };

  const generateGpx = () => {
    if (routeCoordinates.length === 0) return '';

    let gpxContent = `<?xml version='1.0' encoding='UTF-8'?>
<gpx version="1.1" creator="GPT-4o" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>Ruta Generada desde React</name>
    <trkseg>
`;

    routeCoordinates.forEach(coord => {
      gpxContent += `      <trkpt lat="${coord[0]}" lon="${coord[1]}">\n        <ele>5</ele>\n      </trkpt>\n`;
    });

    gpxContent += `    </trkseg>
  </trk>
</gpx>
`;
    return gpxContent;
  };

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
            {routeCoordinates.slice(0, 5).map((coord, index) => (
              <div key={index}>{`Lat: ${coord[0]}, Lon: ${coord[1]}`}</div>
            ))}
            {routeCoordinates.length > 5 && <div>... (mostrando solo los primeros 5 puntos)</div>}
          </pre>
        </div>
      )}
    </div>
  );
<<<<<<< HEAD:webturismo/src/AppApi.jsx
}

export default RouteGenerator;
=======
} // CORRECCIÓN 4: Eliminada esta llave extra
// CORRECCIÓN 5: Eliminada esta llave extra (había dos)
export default RouteGenerator;

>>>>>>> 95169cad645ae38eb849156dfcb5f333c6fc69d9:pruebas-error-proyecto/src/AppApi.jsx
