import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");
    setToken(null);
    setUser(null);
  };

  const saveSession = (userData, tokenData, durationMs) => {
    const expiresAt = Date.now() + durationMs;
    localStorage.setItem("token", tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("expiresAt", expiresAt);
    setToken(tokenData);
    setUser(userData);
  };

  const register = (userData, tokenData) => {
    const expiresIn = 60 * 24 * 60 * 60 * 1000;
    saveSession(userData, tokenData, expiresIn);
  };

  const login = (userData, tokenData) => {
    const expiresIn = 60 * 24 * 60 * 60 * 1000;
    saveSession(userData, tokenData, expiresIn);
  };

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      const expiresAt = localStorage.getItem("expiresAt");

      if (!storedToken || !expiresAt) return;

      if (Date.now() > Number(expiresAt)) {
        logout();
      } else {
        setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error restaurando sesión:", err);
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
