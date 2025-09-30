import { useState } from "react";
import InputField from "./InputField";
import { GoogleLogin } from "@react-oauth/google"
import {jwtDecode} from "jwt-decode"

export default function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
    const [error, setError] = useState("")


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ Registro exitoso: ${data.name}`);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch {
      setMessage("Error de conexión con el servidor");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log(credentialResponse)
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      console.log("Datos de Google:", decoded)

      const res = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token: credentialResponse.credential })
      })
      console.log(res)
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || "Error en login con Google")
        return
      }
      console.log(data)
    
      localStorage.setItem("token", data.token)
      onSwitch(data)
    } catch (err) {
      console.error(err)
      setError("Error en la autenticación con Google")
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-80 space-y-4">
      <h2 className="text-xl font-bold text-center">Registro</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <InputField
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
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
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Registrarse
        </button>
      </form>
        
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Error en Google Login")}
          />
        </div>

      {message && <p className="text-center text-sm">{message}</p>}

      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <button onClick={onSwitch} className="text-blue-500 underline">
          Inicia sesión
        </button>
      </p>
    </div>
  );
}
