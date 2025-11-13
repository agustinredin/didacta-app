import axios from "axios";

//TODO: testear y modificar segun token, cookie http, etc. paso 0
//INFO: Funciona register y login. Actualmente hay un BUG con google, a continuación dejo el error:
// client:347 Cross-Origin-Opener-Policy policy would block the window.postMessage call.
// Al parecer se trata de un error en el helmet configurado. Por ahora no logré solucionarlo
const API_URL = env.VITE_API_URL || "https://localhost:8080/auth";
export const apiClient = axios.create({
  baseURL: API_URL,
});

// Interceptor: adjuntar token JWT si existe
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // o leer de AuthContext
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Interceptor: manejar respuestas globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Ejemplo: token expirado -> redirigir a login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
