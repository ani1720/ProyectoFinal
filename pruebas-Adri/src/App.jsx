import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom"; // Link no se usa aquí directamente, pero está bien
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import Ruta from "./Ruta";
import Header from "./Header";
import Login from "./Login";
import Registro from "./Registro";
import Home from "./Home";
import RutaDetalle from "./pages/RutaDetalle";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebaseConfig";
import Mapa from './pages/Mapa';
import Eventos from './pages/Eventos';



function App() {
  const [usuario, setUsuario] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState("");

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

  useEffect(() => {
    const obtenerNombreUsuario = async () => {
      if (usuario) {
        const ref = doc(db, "usuarios", usuario.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setNombreUsuario(snap.data().nombreUsuario);
        }
      }
    };
    obtenerNombreUsuario();
  }, [usuario]);

  return (
    <>
      <Header
        usuario={usuario}
        nombreUsuario={nombreUsuario}
        cerrarSesion={() => {
          import("firebase/auth").then(({ signOut }) => signOut(auth));
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/rutas/*" element={<Ruta />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/eventos" element={<Eventos />} />
      </Routes>
    </>
  );
}

export default App;