import { useState } from "react";
import * as Mono from "@ui";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        console.log(data);
        setMessage("✅ Revisa tu correo para restablecer la contraseña.");
      } else {
        setMessage(`❌ ${data.message || "Error en el servidor"}`);
      }
    } catch (error) {
      setMessage("⚠️ Error de conexión con el servidor");
    }
  };

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center">
      {/* TODO: Decidir si este div va dentro o fuera de la card. Se aceptan sugerencias aparte de la mencionada. */}
      <div className="flex flex-col items-center max-w-xs pb-8">
        <img src="/Logo.png" className="w-28" alt="" />
        <p className="mono-text-tertiary text-gray text-xs text-center">
          Ingrese su correo electrónico y le enviaremos un link de
          restablecimiento
        </p>
      </div>
      <Mono.Card className={"flex flex-col items-center p-9"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm mono-text-tertiary text-gray mb-1"
            >
              Correo electrónico
            </label>
            <Mono.InputText
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <Mono.Button
            type="submit"
            className="min-w-full mono-text-tertiary text-md px-3  py-1"
          >
            Enviar restablecimiento
          </Mono.Button>

          {message && (
            <p className="mt-3 text-sm text-center text-gray-700">{message}</p>
          )}
        </form>
      </Mono.Card>
    </section>
  );
};

export default ResetPassword;
