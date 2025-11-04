import { Toast } from "@/ui";
import { useState, createContext, useContext } from "react";
import UsePersistedState from "../hooks/usePersistedState";

//TODO: UI Context con dark theme y toast por ahora
const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const showToast = (
    state = "default",
    title,
    message,
    duration,
    onClose,
    actionJSX
  ) => {
    setUI((prev) => ({
      ...prev,
      toastProps: {
        state,
        title,
        message,
        duration: duration || 5000,
        onClose: () => {
          onClose?.();
          setUI((prev) => ({ ...prev, toastProps: null }));
        },
        actionJSX: null,
      },
    }));
  };
  const toggleTheme = () => {
    setUI((prev) => ({
      ...prev,
      theme: prev.theme == "dark" ? "light" : "dark",
    }));
  };

  const [ui, setUI] = useState({
    toastProps: null,
    theme: "light",
    toggleTheme,
    showToast,
  });

  //INFO no lo usamos como custom hook con setters: manejamos aca la logica. Objeto "UI" tiene solo funciones
  return (
    <UIContext value={{ ui }}>
      {children}
      {ui.toastProps && <Toast {...ui.toastProps} />}
    </UIContext>
  );
};

export const useUI = () => useContext(UIContext);
