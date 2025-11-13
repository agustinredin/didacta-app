import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@domain/auth/AuthContext";

//INFO: atento. apliqué un barrel import a la ui con index.js. ANTES:
// import MonoCard from "@/ui/mono-card";
//AHORA:
import * as Mono from "@ui";

// import { User } from "lucide-react";

//TODO: entry point real de la aplicación
const Profile = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchProfile = async () => {
    //   const token = localStorage.getItem("token");
    //   if (!token) {
    //     setError("No se encontró token. Por favor, logueate.");
    //     return;
    //   }
    //   try {
    //     const res = await fetch("http://localhost:8080/auth/perfil", {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     const data = await res.json();
    //     if (!res.ok) {
    //       setError(data.message || "Error al obtener perfil");
    //       return;
    //     }
    //     setUsuario(data);
    //   } catch (err) {
    //     console.error(err);
    //     setError("Error de conexión con el servidor");
    //   }
    // };
    // fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (error) return <p className="text-red-500">{error}</p>;
  //   if (!usuario) return <p>Cargando perfil...</p>;

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold mb-2">Perfil de usuario</h1>
    //   {usuario?.foto ? (
    //     <img
    //       src={usuario.foto}
    //       alt="Foto de perfil"
    //       className="h-10 w-10 rounded-full object-cover"
    //     />
    //   ) : (
    //     <User className="h-10 w-10 text-gray-400" />
    //   )}{" "}
    //   <p>
    //     <strong>Nombre:</strong> {usuario?.name}
    //   </p>
    //   <p>
    //     <strong>Email:</strong> {usuario?.email}
    //   </p>
    //   <button
    //     onClick={handleLogout}
    //     className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    //   >
    //     Cerrar sesión
    //   </button>
    // </div>
    <></>
  );
};

export default Profile;
