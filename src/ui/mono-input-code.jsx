import { useRef, useState, forwardRef } from "react";
import { MonoInputText } from "./mono-input-text";

export const MonoInputCode = forwardRef(function MonoInputCode(
  { digits },
  ref
) {
  const codeInputRefs = useRef([]);
  const [verificationCode, setVerificationCode] = useState(
    Array(digits).fill("")
  );

  // cada render, actualizá ref.current con lo que quieras exponer
  if (ref) {
    ref.current = {
      value: verificationCode.join(""),
      refs: codeInputRefs.current,
      state: verificationCode,
    };
  }

  const handleCodeChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...verificationCode];
    next[index] = value;
    setVerificationCode(next);
    if (value && index < verificationCode.length - 1)
      codeInputRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      codeInputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < verificationCode.length - 1) {
      e.preventDefault();
      codeInputRefs.current[index + 1]?.focus();
    }
    if (/^\d?$/.test(e.key) && verificationCode[index]) {
      const next = [...verificationCode];
      next[index] = e.key;
      setVerificationCode(next);
      if (e.key && index < verificationCode.length - 1)
        codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    const next = [...verificationCode];
    for (let i = 0; i < verificationCode.length; i++) next[i] = pasted[i] ?? "";
    setVerificationCode(next);
    const focusIndex = Math.min(pasted.length, verificationCode.length - 1);
    codeInputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex space-x-3">
      {verificationCode.map((digit, index) => (
        <MonoInputText
          key={index}
          ref={(el) => (codeInputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl border-2-black dark:border-white"
          value={digit}
          onChange={(e) => handleCodeChange(index, e.target.value)}
          onKeyDown={(e) => handleCodeKeyDown(index, e)}
          onPaste={handleCodePaste}
        />
      ))}
    </div>
  );
});
