import { useState } from "react";
import InputField from "./InputField";

export default function LoginForm({ onSwitch }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

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
        setMessage(`✅ Bienvenido ${data.name}`);
        localStorage.setItem("token", data.token);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch {
      setMessage("Error de conexión con el servidor");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-80 space-y-4">
      <h2 className="text-xl font-bold text-center">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <InputField
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Ingresar
        </button>
      </form>

      {message && <p className="text-center text-sm">{message}</p>}

      <p className="text-center text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <button onClick={onSwitch} className="text-blue-500 underline">
          Regístrate
        </button>
      </p>
    </div>
  );
}
