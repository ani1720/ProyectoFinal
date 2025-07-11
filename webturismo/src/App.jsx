import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

import RutaList from './pages/RutaList';
import Header from "./Header";
import Login from "./Login";
import Registro from "./Registro";
import Home from "./Home";

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
        <Route path="/rutas" element={<RutaList />} />
      </Routes>
    </>
  );
}

export default App;
