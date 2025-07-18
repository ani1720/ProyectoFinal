import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RutaList from "./pages/RutaList";
import RutaDetalle from "./pages/RutaDetalle";



function Ruta() {
  return (
      <Routes>
        <Route path="/" element={<RutaList />} />
        <Route path="/ruta/:id" element={<RutaDetalle />} />
      </Routes>
  );
}

export default Ruta;
