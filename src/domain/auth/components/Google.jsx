import { apiClient } from "@/core/api";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { onGoogleSuccess } from "../handlers/onGoogleSuccess";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

//TODO: queda ver desde aca para abajo todos los refactor y pensar struct carpetas (post macro - 20/11)
const Google = ({ props }) => {
  const navigate = useNavigate();

  return (
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
