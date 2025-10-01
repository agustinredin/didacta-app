import React from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Root container missing in index.html')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <AuthProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <App />
    </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
)
