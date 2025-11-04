import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./domain/auth/AuthContext";
import "./styles/globals.css";
import AppRouter from "./Router";
import { UIProvider } from "./core/context/UIContext";

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing in index.html");
const root = createRoot(container);

root.render(
  //   <React.StrictMode>
  <AuthProvider>
    <UIProvider>
      <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
        <AppRouter />
      </GoogleOAuthProvider>
    </UIProvider>
  </AuthProvider>
  //   </React.StrictMode>
);
