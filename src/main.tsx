import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./domain/auth/AuthContext";
import "./styles/globals.css";
import "./styles/mono-theme.css";
import "./styles/mono-theme-dark.css";
import AppRouter from "./Router";

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing in index.html");
const root = createRoot(container);

root.render(
  //   <React.StrictMode>
  <AuthProvider>
    <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
      <AppRouter />
    </GoogleOAuthProvider>
  </AuthProvider>
  //   </React.StrictMode>
);
