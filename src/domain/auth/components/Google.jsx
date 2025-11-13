import { apiClient } from "@/core/api";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { onGoogleSuccess } from "../handlers/onGoogleSuccess";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Google = ({ props }) => {
  const navigate = useNavigate();

  return (
    // Si le pones type = "icon" no se muestra el logo de google // cambiar la ruta del navigate
    <GoogleLogin
      text="continue_with"
      locale="es-ES"
      onSuccess={onGoogleSuccess({
        onLoggedIn: () => navigate("/menu"),
      })}
      onError={() => setError("Error en Google Login")}
    />
  );
};

export default Google;
