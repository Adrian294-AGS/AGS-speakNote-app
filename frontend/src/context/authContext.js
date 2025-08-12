import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const login = (token) => {
    setAccessToken(token);
  };

  const logout = async () => {
    const res = await fetch("http://localhost:5000/logout", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    if (data) {
      setAccessToken(null);
      return alert(`${data.message}`);
    }
  };
  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
