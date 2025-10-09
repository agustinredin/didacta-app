import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"
import { useAuth } from "../context/AuthContext";
import InputField from "./InputField";

export default function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const {register} = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json();
      if (res.ok) {
        register(data.name, data.token)
        navigate('/menu')
      } else {
        setMessage(`❌ ${data.message}`)
      }
    } catch (err){
        setMessage("Error: " + err.message)
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log(credentialResponse)
    try {
console.log("Token recibido:", credentialResponse?.credential)
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
      navigate('/profile')
    } catch (err) {
      console.error(err)
      setError("Error en la autenticación con Google")
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-96 space-y-6 border border-gray-200">
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
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer"
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
        <button onClick={onSwitch} className="text-blue-600 font-medium hover:underline cursor-pointer">
          Inicia sesión
        </button>
      </p>
    </div>
  );
}
