import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import * as Mono from "@ui";
import Google from "./Google";
import { signInWithGoogle } from "../auth";
import { apiClient } from "@/core/api";
import { Eye, EyeOff } from "lucide-react";
import { useUI } from "@/core/context/UIContext";

export default function LoginForm({ onSwitch }) {
  const { ui } = useUI();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [hint, setHint] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/auth/login", formData);
      if (res.status == 200) {
        const { user, token } = res.data;
        login(user, token);
        navigate("/menu");
      }
    } catch (e) {
      let msg = e.response?.data?.message;
      msg && ui.showToast(msg, "error");
    }
  };

  useEffect(() => {
    // const checkGoogleHint = async () => {
    //   const email = formData.email;
    //   if (!email) return;
    //   try {
    //     const res = await fetch(
    //       `http://localhost:8080/auth/google-hint?email=${encodeURIComponent(
    //         email
    //       )}`
    //     );
    //     if (!res.ok) return;
    //     const data = await res.json();
    //     setHint(data.showHint);
    //   } catch {
    //     setHint(false);
    //   }
    // };
    // const timeout = setTimeout(checkGoogleHint, 400);
    // return () => clearTimeout(timeout);
  }, [formData.email]);

  return (
    <Mono.Card className="flex-col bg-white shadow-lg p-10 space-y-4 min-w-115">
      <div className="flex items-center flex-col">
        <img src="/Logo.png" className="w-28" alt="" />
        <h2 className="text-2xl font-semibold text-center text-gray-800"></h2>
        <h2 className="mono-text-title text-center text-lg font-semibold text-orange-500 pb-2">
          Bienvenido de nuevo
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-left text-sm mono-text-secondary text-gray-800 mb-1"
          >
            Correo electrónico
          </label>
          <Mono.InputText
            minLength={3}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {hint && (
            <p className="text-sm text-gray-500 mt-1">
              Este correo está asociado a una cuenta de Google.
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-left text-sm mono-text-secondary text-gray-800 mb-1"
            >
              Contraseña
            </label>
            <Link
              to="/reset-password"
              className="mono-text-tertiary text-orange text-xs hover:underline cursor-pointer"
            >
              Olvidé mi contraseña
            </Link>
          </div>

          <div className="relative">
            <Mono.InputText
              minLength={6}
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <Mono.Button
            type="submit"
            className="mono-text-subtitle min-w-full py-1"
          >
            Ingresar
          </Mono.Button>
        </div>

        <div className="flex justify-center pb-4">
          <Google />
        </div>
      </form>

      <div className="border-t pt-4">
        <p className="text-center text-sm text-gray-800">
          ¿No tienes cuenta?{" "}
          <button
            onClick={onSwitch}
            className="mono-text-tertiary text-orange text-sm hover:underline cursor-pointer"
          >
            Regístrate
          </button>
        </p>
      </div>
    </Mono.Card>
  );
}
