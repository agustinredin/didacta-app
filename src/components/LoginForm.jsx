import { useState } from "react";
import InputField from "./InputField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function LoginForm({ onSwitch }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
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

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-96 space-y-3 border border-gray-200">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Bienvenido de nuevo
      </h2>
      <p className="text-center text-sm font-semibold text-orange-500">
        DIDACTA.AI
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Correo electrónico
          </label>
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Contraseña
          </label>
          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all cursor-pointer"
        >
          Ingresar
        </button>
      </form>

      
        <Link
          to="/reset-password"
          className="text-blue-600 text-sm font-medium hover:underline cursor-pointer"
        >
        ¿Olvidaste tu contraseña?
        </Link>

      {message && (
        <p className="text-center text-sm text-red-500 font-medium">{message}</p>
      )}

      <p className="text-center text-sm text-gray-600 pt-5">
        ¿No tienes cuenta?{" "}
        <button
          onClick={onSwitch}
          className="text-blue-600 font-medium hover:underline cursor-pointer"
        >
          Regístrate
        </button>
      </p>

    </div>
  );
}
