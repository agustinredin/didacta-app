import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function EmailVerification() {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const inputs = useRef([]);
  const navigate = useNavigate();
  const email = useLocation().state?.email;

  const handleChange = (value, i) => {
    if (!/^\d?$/.test(value)) return;
    const arr = [...code];
    arr[i] = value;
    setCode(arr);
    if (value && i < 4) inputs.current[i + 1].focus();
  };

  const handleVerify = async () => {
    const finalCode = code.join("");
    if (finalCode.length < 5) return setMessage("Ingresá los 5 dígitos");

    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code: finalCode }),
    });
    const data = await res.json();

    setMessage(data.message);
    if (data.success) navigate("/menu");
  };

  //TODO: AGREGAR QUE SE PUEDA PEGAR UN NÚMERO DE 5 DÍGITOS Y SE COLOQUE EN TODOS LOS INPUTS. ACTUALMENTE SI PEGAS UN CÓDIGO, SE QUEDA EN EL PRIMER INPUT CON UN SOLO DÍGITO.
  return (
    <div className="max-w-sm mx-auto p-6 border rounded-lg shadow text-center">
      <h2 className="text-xl font-semibold mb-4">Verificación</h2>
      <p className="text-gray-600 mb-6 text-sm">
        Ingresá el código enviado a tu correo
      </p>

      <div className="flex justify-between mb-6">
        {code.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputs.current[i] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            className="w-12 h-14 text-center text-2xl font-semibold bg-gray-100 border rounded-lg"
          />
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
