import { createContext, useContext, useState, useEffect } from "react";

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

  const refresh = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/refresh", {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setAccessToken(data.access_token);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Automatically refresh on page load
  useEffect(() => {
    refresh();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
