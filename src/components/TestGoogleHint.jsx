import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function MainMenu() {
  const [showHint, setShowHint] = useState(false)
  const [userEmail, setUserEmail] = useState(null)

  useEffect(() => {
    if (!window.google || env.VITE_GOOGLE_CLIENT_ID) return

    // Inicializa Google Identity Services
    window.google.accounts.id.initialize({
      client_id: env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: true,
    })

    // Solicita el “hint” o sesión previa
    window.google.accounts.id.prompt()
  }, [])

  // Maneja la respuesta de Google si hay credencial disponible
  const handleCredentialResponse = async (response) => {
    const decoded = parseJwt(response.credential)
    if (!decoded?.email) return

    setUserEmail(decoded.email)
    try {
      const res = await fetch("http://localhost:8080/api/auth/google-hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: decoded.email }),
      })
      const data = await res.json()
      if (data.exists) setShowHint(true)
    } catch (err) {
      console.error("Error consultando usuario:", err)
    }
  }

  // Decodifica el JWT del token de Google sin librerías
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]))
    } catch {
      return null
    }
  }

  return (
    <header className="relative bg-white border-b shadow-sm">
      <nav className="flex justify-between items-center px-8 py-4">
        <div className="text-2xl font-semibold text-gray-800">Didacta</div>
        <ul className="flex gap-8 text-gray-700">
          <li><a href="#inicio" className="hover:text-blue-600">Inicio</a></li>
          <li><a href="#caracteristicas" className="hover:text-blue-600">Características</a></li>
          <li><a href="#contacto" className="hover:text-blue-600">Contacto</a></li>
        </ul>
        <Link>
        <button
          onClick={() => window.location.href = "/login"}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </button>
        </Link>
      </nav>

      {showHint && (
        <div className="absolute top-2 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow animate-fadeIn">
          Iniciá sesión con tu cuenta de Google {userEmail && <span className="font-semibold">({userEmail})</span>}
        </div>
      )}
    </header>
  )
}