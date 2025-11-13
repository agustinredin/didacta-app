import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Mono from "@ui";

const LEN = 5;

export default function EmailVerification() {
  const [digits, setDigits] = useState(Array(LEN).fill(""));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const email = useLocation().state?.email;

  const distributePaste = (text) => {
    const clean = text.replace(/\D/g, "").slice(0, LEN).split("");
    if (clean.length === 0) return;

    const next = Array(LEN).fill("");
    for (let i = 0; i < clean.length; i++) next[i] = clean[i];
    setDigits(next);

    const last = clean.length - 1;
    inputsRef.current[last]?.focus();
  };

  const setDigit = (index, val) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[index] = v;
    setDigits(next);

    if (v && index < LEN - 1) inputsRef.current[index + 1]?.focus();
    if (!v && index > 0) inputsRef.current[index - 1]?.focus();
  };

  const code = digits.join("");

  const handleVerify = async () => {
    if (code.length < LEN) {
      setMessage("Ingresá los 5 dígitos");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await apiClient.post("/auth/register", {
        email,
        code,
      });
      console.log(res);
      const data = await res.json();
      setMessage(data.message || "");
      if (data.success) navigate("/menu");
    } catch {
      setMessage("Error de conexión con el servidor");
    }

    setLoading(false);
  };

  return (
    <Mono.Card className="flex flex-col items-center max-w-sm p-5 pb-10">
      <div className="flex flex-col items-center max-w-xs pb-5">
        <img src="/Logo.png" className="w-28" alt="" />
        <p className="mono-text-tertiary text-gray text-sm text-center">
          Ingresá el código de 5 digitos que enviamos a{" "}
          <span className="font-extrabold">{`${email}`}</span>
        </p>
      </div>

      <div className="flex justify-between gap-2 mb-6">
        {digits.map((d, i) => (
          <Mono.InputText
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={d}
            inputMode="numeric"
            maxLength={1}
            onChange={(e) => setDigit(i, e.target.value)}
            onPaste={(e) => {
              e.preventDefault();
              distributePaste(e.clipboardData.getData("text"));
            }}
            className="w-12 h-14 text-center text-2xl font-semibold"
          />
        ))}
      </div>

      <Mono.Button
        onClick={handleVerify}
        disabled={loading}
        className="min-w-full py-2 flex items-center justify-center"
      >
        {loading ? (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
        ) : (
          "Verificar"
        )}
      </Mono.Button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </Mono.Card>
  );
}
