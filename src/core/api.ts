import axios from "axios";

//TODO: testear y modificar segun token, cookie http, etc. paso 0
const API_URL = import.meta.env.VITE_API_URL || "https://api.didacta-ai.com";
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

// Import it and call its HTTP methods directly.
// Example usage:

// import { apiClient } from "@/core/apiClient";

// // GET
// const fetchUser = async (id) => {
//   const res = await apiClient.get(`/users/${id}`);
//   return res.data;
// };

// // POST
// const loginUser = async (email, password) => {
//   const res = await apiClient.post("/auth/login", { email, password });
//   return res.data;
// };

// // PUT / PATCH
// await apiClient.put(`/users/${id}`, { name: "New Name" });

// // DELETE
// await apiClient.delete(`/users/${id}`)
