import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RutaList from "./pages/RutaList";
import RutaDetalle from "./pages/RutaDetalle";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RutaList />} />
        <Route path="/ruta/:id" element={<RutaDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;
