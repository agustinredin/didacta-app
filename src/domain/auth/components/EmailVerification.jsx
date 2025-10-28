import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LEN = 5;

export default function EmailVerification() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const email = useLocation().state?.email;

  const focus = () => inputRef.current?.focus();
  const handleChange = (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, LEN);
    setCode(v);
  };

  const handleVerify = async () => {
    if (code.length < LEN) return setMessage("Ingresá los 5 dígitos");
    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      setMessage(data.message || "");
      if (data.success) navigate("/menu");
    } catch {
      setMessage("Error de conexión con el servidor");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 border rounded-lg shadow text-center">
      <h2 className="text-xl font-semibold mb-4">Verificación</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Ingresá el código enviado a tu correo
      </p>

      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        maxLength={LEN}
        value={code}
        onChange={handleChange}
        autoComplete="one-time-code"
        className="sr-only"
      />

      {/* Cajas “tontas”. Click en cualquiera enfoca el input oculto */}
      <div className="flex justify-between mb-6" onClick={focus}>
        {Array.from({ length: LEN }).map((_, i) => (
          <div
            key={i}
            className="w-12 h-14 flex items-center justify-center text-2xl font-semibold bg-gray-100 border rounded-lg cursor-text"
          >
            {code[i] || ""}
          </div>
        ))}
      </div>

      <button
        onClick={handleVerify}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
      >
        Verificar
      </button>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
}
