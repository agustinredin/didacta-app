import { createContext, useContext, useState, useEffect } from "react";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  console.log(env);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token")
  //   const storedUser = localStorage.getItem("user")
  //   if (storedToken) {
  //     setToken(storedToken);
  //     if (storedUser) setUser(JSON.parse(storedUser))
  //   }
  // }, []);

  const register = (userData, tokenData) => {
    localStorage.setItem("token", tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(tokenData);
    setUser(userData);
  };

  const login = (userData, tokenData) => {
    localStorage.setItem("token", tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(tokenData);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
const AuthContext = createContext(undefined);

export function useAuth() {
  return useContext(AuthContext);
}
