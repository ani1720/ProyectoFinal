import { useEffect, useState } from 'react'
import Header from './Header'
import rutaTarracoImg from './assets/ruta-tarraco.png'
import './App.css'
import { auth } from "./firebase/firebaseConfig"
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import Login from "./Login"


function App() {
  const [usuario, setUsuario] = useState(null)
  const [errorLogin, setErrorLogin] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user)
        console.log("Sesión activa:", user.email)
      } else {
        setUsuario(null)
        console.log("No hay sesión iniciada")
      }
    })

    return () => unsubscribe()
  }, [])

  const loginDePrueba = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        "adriagonzalez777@gmail.com",         // 👈 Sustituye por un usuario válido
        "webturismo7"         // 👈 Sustituye por su contraseña
      )
      setErrorLogin(null)
    } catch (error) {
      console.error("Error de login:", error.message)
      setErrorLogin("❌ Credenciales inválidas o usuario no registrado.")
    }
  }

  return (
    <>
      <Header />
      <Login />
      
      <div className="mapa-info-container">
        <div className="info">
          <h1>Turismo en Tarragona</h1>
          <p>Bienvenido a nuestra plataforma...</p>
          <p>Misión: ayudarte a explorar la ciudad...</p>

          <div>
            {usuario ? (
              <p>👋 Hola, {usuario.email}</p>
            ) : (
              <>
                <p>🔒 Usuario no autenticado</p>
                <button onClick={loginDePrueba}>Probar login</button>
                {errorLogin && <p style={{ color: "red" }}>{errorLogin}</p>}
              </>
            )}
          </div>
        </div>

        <div className="mapa">
          <h2>RUTA HISTÓRICA ANTIGUO TARRACO</h2>
          <img src={rutaTarracoImg} alt="Ruta Tarraco" />
        </div>
      </div>
    </>
  )
}

export default App
