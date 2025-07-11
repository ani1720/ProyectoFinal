import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom"; // Link no se usa aquí directamente, pero está bien
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Ruta from "./Ruta";
import RutaList from './pages/RutaList';
import Header from "./Header";
import Login from "./Login";
import Registro from "./Registro";
import Home from "./Home";
import RutaDetalle from "./pages/RutaDetalle";


function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        console.log("Sesión activa:", user.email);
      } else {
        setUsuario(null);
        console.log("No hay sesión iniciada");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header
        usuario={usuario}
        cerrarSesion={() => {
          import("firebase/auth").then(({ signOut }) => signOut(auth));
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/rutas" element={<Ruta />} />
        
      </Routes>
    </>
  );
}

export default App;