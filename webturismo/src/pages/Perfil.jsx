import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile, updatePassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  updateEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombreUsuario: "",
    email: "",
    fechaRegistro: "",
    rol: "",
    fotoURL: "",
  });
  const [nuevaFoto, setNuevaFoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [correoVerificado, setCorreoVerificado] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload(); // ← NUEVO
        setUsuario(user);
        setCorreoVerificado(user.emailVerified); // ← NUEVO

        const refDoc = doc(db, "usuarios", user.uid);
        const snap = await getDoc(refDoc);
        if (snap.exists()) {
          const data = snap.data();
          setForm({
            nombreUsuario: data.nombreUsuario || "",
            email: data.email || user.email,
            fechaRegistro:
              data.fechaRegistro?.toDate().toLocaleDateString() || "",
            rol: data.rol || "turista",
            fotoURL: data.fotoURL || "",
          });
        }
      } else {
        setUsuario(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    const refDoc = doc(db, "usuarios", usuario.uid);
    await updateDoc(refDoc, { nombreUsuario: form.nombreUsuario });

    await updateProfile(usuario, { displayName: form.nombreUsuario });

    if (nuevaFoto) {
      const storageRef = ref(storage, `fotosPerfil/${usuario.uid}`);
      const fileSnapshot = await uploadBytes(storageRef, nuevaFoto);
      const url = await getDownloadURL(fileSnapshot.ref);
      await updateDoc(refDoc, { fotoURL: url });
      setForm({ ...form, fotoURL: url });
    }

    alert("Perfil actualizado correctamente");
  };

  const handleChangePassword = async () => {
    const nueva = prompt("Introduce tu nueva contraseña:");
    const contraseñaActual = prompt("Introduce tu contraseña actual:");
    if (!nueva || !contraseñaActual) return;

    try {
      const credencial = EmailAuthProvider.credential(
        usuario.email,
        contraseñaActual
      );
      await reauthenticateWithCredential(usuario, credencial);

      await updatePassword(usuario, nueva);
      alert("Contraseña actualizada correctamente.");
    } catch (error) {
      console.error(error);
      alert("Error al cambiar contraseña: " + error.message);
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (!usuario) return <p>No se ha iniciado sesión.</p>;

  const handleChangeEmail = async () => {
    const nuevoCorreo = prompt("Introduce tu nuevo correo electrónico:");
    if (!nuevoCorreo) return;

    const contraseñaActual = prompt("Introduce tu contraseña actual:");
    if (!contraseñaActual) return;

    try {
      await usuario.reload(); // 🔄 Refresca datos actuales

      if (!usuario.emailVerified) {
        alert(
          "Tu correo actual no está verificado. Verifícalo antes de cambiar."
        );
        return;
      }

      // 🔐 Reautenticación
      const credencial = EmailAuthProvider.credential(
        usuario.email,
        contraseñaActual
      );
      await reauthenticateWithCredential(usuario, credencial);

      // 📬 Actualizar correo
      await updateEmail(usuario, nuevoCorreo);
      await usuario.reload(); // 🔄 Recargar usuario actualizado

      // ✉️ Verificación al nuevo correo
      await sendEmailVerification(usuario);

      alert("Correo actualizado. Verifica el nuevo correo desde tu bandeja.");
    } catch (error) {
      console.error(error);
      alert("Error al cambiar el correo: " + error.message);
    }
  };

  return (
    <div className="perfil-page">
      <h2>👤 Perfil de usuario</h2>
      {form.fotoURL && (
        <img src={form.fotoURL} alt="Foto de perfil" width={100} />
      )}

      <div className="perfil-info">
        <label>Nombre de usuario</label>
        <input
          type="text"
          value={form.nombreUsuario}
          disabled
          style={{ backgroundColor: "#eee", cursor: "not-allowed" }}
        />

        <label>Correo electrónico</label>
        <input type="email" value={form.email} disabled />
        <p style={{ marginBottom: "1rem" }}>
          Estado del correo:{" "}
          {correoVerificado ? "✅ Verificado" : "⛔ No verificado"}
        </p>

        <label>Fecha de registro</label>
        <input type="text" value={form.fechaRegistro} disabled />

        <label>Rol</label>
        <input type="text" value={form.rol} disabled />

        <label>Foto de perfil</label>
        <input type="file" onChange={(e) => setNuevaFoto(e.target.files[0])} />

        <button onClick={handleUpdate}>💾 Guardar cambios</button>
        <button onClick={handleChangeEmail}>
          ✉️ Cambiar correo electrónico
        </button>
        <button onClick={handleChangePassword}>🔒 Cambiar contraseña</button>
        <button
          onClick={async () => {
            await usuario.reload();
            alert("Verificado: " + usuario.emailVerified);
          }}
        >
          🔍 Comprobar verificación
        </button>
      </div>
    </div>
  );
}

export default Perfil;
