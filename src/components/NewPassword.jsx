import { useParams } from "react-router-dom";
import { useState } from "react";

export default function NewPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setMessage("Las contraseñas no coinciden");

    const res = await fetch(import.meta.env.API_URL + "/new-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  //TODO: aca en useeffect borrar token de base de datos O ver como hacer una propiedad para que se borre en mongo automaticamente segun T tiempo

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <br />
        <button type="submit">Guardar</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

//RESETEO EXITOSO ? NAVIGATE A LOGIN
