import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

const Menu = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="w-full h-full bg-blue-300">
            <h1>TE REGISTRASTE CON ÉXITO</h1>
            <h3>BIENVENIDO A DIDACTA</h3>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Cerrar sesión
            </button>
        </div>
    )
}

export default Menu