import { useParams } from "react-router-dom";
import { useState } from "react";
import * as Mono from "@ui";

export default function NewPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) return setMessage("Las contraseñas no coinciden");

    const res = await fetch(env.VITE_API_URL + "/auth/new-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <Mono.Card className={"flex-col items-center space-y-5 p-10 min-w-115"}>
      <img src="/Logo.png" className="w-28" alt="Logotipo de didacta" />
      <h2 className="mono-text-title text-orange">Restablecer contraseña</h2>
      <form className="w-full" onSubmit={handleSubmit}>
        <Mono.InputText
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <Mono.InputText
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <br />
      </form>
      <Mono.Button className={"min-w-full py-1"} type="submit">
        Restablecer
      </Mono.Button>
      <p>{message}</p>
    </Mono.Card>
  );
}
