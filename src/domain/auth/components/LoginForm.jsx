import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import * as Mono from "@ui";
import Google from "./Google";
import { signInWithGoogle } from "../auth";
import { apiClient } from "@/core/api";

export default function LoginForm({ onSwitch }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [hint, setHint] = useState(false);

  //TODO unificar endpoints arrancando por aca: el resetLink de auth.controller.resetPassword viene al login y toma el valor de searchparamas
  //useSearchParams()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.name, data.token);
        navigate("/profile");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch {
      setMessage("Error de conexión con el servidor");
    }
  };

  useEffect(() => {
    const checkGoogleHint = async () => {
      const email = formData.email;
      if (!email) return;
      try {
        const res = await fetch(
          `http://localhost:8080/auth/google-hint?email=${encodeURIComponent(
            email
          )}`
        );
        if (!res.ok) return;
        const data = await res.json();
        setHint(data.showHint);
      } catch {
        setHint(false);
      }
    };

    const timeout = setTimeout(checkGoogleHint, 400); // Se utiliza debounce para que no se actualice cada vez que se modifica el input de email. Ejecuta la funcion cada 400ms
    return () => clearTimeout(timeout);
  }, [formData.email]);

  return (
    <Mono.Card className="flex-col bg-white shadow-lg p-10 space-y-4 min-w-115">
      <div className="flex items-center flex-col">
        <img src="/Logo.png" className="w-28" alt="" />
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {/* Bienvenido de nuevo */}
        </h2>
        <h2 className="mono-text-title text-center text-lg font-semibold text-orange-500 pb-2">
          Bienvenido de nuevo
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
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
            className={""}
          />
          {/* TODO: HACER UN HINT MÁS ATRACTIVO, ESTE ES SOLO DE PRUEBA */}
          {hint && (
            <p className="text-sm text-gray-500 mt-1">
              Este correo está asociado a una cuenta de Google.
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center space-x-40">
            <label
              htmlFor="password"
              className="block text-left text-sm mono-text-secondary text-gray-800 mb-1"
            >
              Contraseña
            </label>
            <Link
              to="/reset-password"
              className="mono-text-tertiary text-orange text-xs hover:underline cursor-pointer"
            >
              Olvidé mi contraseña
            </Link>
          </div>

          <Mono.InputText
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="w-full flex justify-center">
          <Mono.Button
            type="submit"
            className="mono-text-subtitle min-w-full py-1"
          >
            Ingresar
          </Mono.Button>
        </div>

        <div className="flex justify-center pb-4">
          <Google />
        </div>
      </form>

      {message && (
        <p className="text-center text-sm text-red-500 font-medium">
          {message}
        </p>
      )}

      <div className="border-t pt-4">
        <p className="text-center text-sm text-gray-800">
          ¿No tienes cuenta?{" "}
          <button
            onClick={onSwitch}
            className="mono-text-tertiary text-orange text-sm hover:underline cursor-pointer"
          >
            Regístrate
          </button>
        </p>
      </div>
    </Mono.Card>
  );
}
