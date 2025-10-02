import InputField from "./InputField";
import { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    setEmail(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json()

      if (res.ok) {
        console.log(data)
        setMessage("✅ Revisa tu correo para restablecer la contraseña.")
      } else {
        setMessage(`❌ ${data.message || "Error en el servidor"}`)
      }
    } catch (error) {
      setMessage("⚠️ Error de conexión con el servidor");
    }
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-6 bg-white rounded shadow-md"
      >
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
            value={email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Restablecer contraseña
        </button>

        {message && (
          <p className="mt-3 text-sm text-center text-gray-700">{message}</p>
        )}
      </form>
    </section>
  )
}

export default ResetPassword
