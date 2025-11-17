import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Mono from "@ui";
import { apiClient } from "@/core/api";
import { useUI } from "@/core/context/UIContext";
import { useAction } from "@/core/hooks/useAction";

export default function EmailVerification() {
  const { ui } = useUI();
  const codeRef = useRef(null);

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const email = useLocation().state?.email;

  const handleVerify = async () => {
    const code = codeRef.current?.value || "";
    if (code.length < 5) {
      ui.showToast("Ingresá los 5 dígitos", "info");
      return;
    }

    try {
      const res = await apiClient.post("/auth/register", {
        email,
        code,
      });
      console.log(res);
      ui.showToast(res.data.message || "");
      if (res.data.success) navigate("/menu");
      else {
        if (res.data.message) ui.showToast(res.data.message, "error");
      }
    } catch (e) {
      ui.showToast(
        e.response?.data?.message || "Error de verificación",
        "error"
      );
    }
  };

  //INFO
  const ej = useAction(handleVerify);
  return (
    <Mono.Card className="flex flex-col items-center max-w-sm p-5 pb-10">
      <div className="flex flex-col items-center max-w-xs pb-5">
        <img src="/Logo.png" className="w-28" alt="" />
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-black dark:text-white uppercase tracking-wide">
          VERIFICÁ TU EMAIL
        </h2>
        <p className="mono-text-tertiary text-gray text-sm text-center">
          Ingresá el código de 5 digitos que enviamos a{" "}
          <span className="font-extrabold">{`${email}`}</span>
        </p>
      </div>

      <div className="flex justify-between gap-2 mb-6">
        <Mono.InputCode digits={5} ref={codeRef} />
      </div>

      <Mono.Button
        onClick={() => verif()}
        disabled={loading}
        className="min-w-full py-2 flex items-center justify-center"
      >
        {loading ? (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
        ) : (
          "Verificar"
        )}
      </Mono.Button>
    </Mono.Card>
  );
}
