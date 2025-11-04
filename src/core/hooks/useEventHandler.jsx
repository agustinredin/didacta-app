//INFO: Problema:
//Este código (js nativo):
//document.addEventListener("click", (e) => {...etc})
//Postea en el DOM incontables veces un evento todas las veces que se clickea.
//Es decir, cada vez que se ejecute la linea, va a haber un nuevo evento de click.
//No es comun el uso de esto en react porque los listeners son:
//<div onClick={...}/>
//Pero una evolución de esto se puede usar
//Mi solución para evitarlo, más un par de funcionalidades útiles
//Si veo que no se usa lo saco
import { useEffect, useRef } from "react";

export function useEventHandler(
  target = document,
  type,
  callback,
  delay,
  cleanup
) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!type || typeof callback !== "function") return;

    function handler(event) {
      if (timeoutRef.current) return;
      callback(event);

      timeoutRef.current = setTimeout(() => {
        cleanup?.(event);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }, delay || 5000);
    }

    document.addEventListener(type, handler);
    return () => {
      document.removeEventListener(type, handler);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [type, callback, cleanup, delay]);
}
