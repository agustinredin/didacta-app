import { useState } from "react";
import Google from "./Google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import * as Mono from "@ui";

export default function RegisterForm({ onSwitch }) {
  // TODO: REFACTORIZAR LOGICA, EMPEZAR POR UNIFICAR FORMDATA EN UN SOLO ARCHIVO
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/auth/verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(data.message);

      // TODO: AGREGAR MENSAJE DE QUE SE ENVIÓ UN CORREO DE VERIFICACIÓN A SU CASILLA
      if (data.success) {
        navigate("/verification-email", { state: { email: formData.email } });
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <Mono.Card
      variant={"tertiary"}
      className="flex-col items-center p-10 space-y-3 min-w-115"
    >
      <img src="/Logo.png" className="w-28" alt="" />
      <h2 className="mono-text-title text-orange text-lg pb-2">
        Crea tu cuenta
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 w-full ">
        <div className="flex flex-col gap-6">
          <label
            htmlFor="email"
            className="block text-left text-sm mono-text-secondary text-gray-800"
          >
            Nombre y apellido
            <Mono.InputText
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-left text-sm mono-text-secondary text-gray-800 mb-1"
          >
            Correo electrónico
          </label>
          <Mono.InputText
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-left text-sm mono-text-secondary text-gray-800 mb-1"
          >
            Contraseña
          </label>
          <Mono.InputText
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <Mono.Button
          type="submit"
          className="mono-text-subtitle min-w-full  py-1"
        >
          Registrarse
        </Mono.Button>
      </form>

      <div className="flex w-full justify-center pb-4 pt-2">
        <Google />
      </div>

      {message && <p className="text-center text-sm">{message}</p>}
      <p className="text-center text-sm text-gray-800 border-t pt-4">
        ¿Ya tienes cuenta?{" "}
        <button
          onClick={onSwitch}
          className="mono-text-tertiary text-orange text-sm hover:underline cursor-pointer"
        >
          Inicia sesión
        </button>
      </p>
    </Mono.Card>
  );
}
