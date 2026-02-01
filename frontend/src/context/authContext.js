import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState({
    display_name: null,
    photo: null,
    Id: null
  });
  const [loading, setLoading] = useState(false);

  const logout = async (params) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/logout/${params}`, {
      method: "GET",
      credentials: "include"
    });

    const data = await res.json();
    if (data) {
      return alert(`${data.message}`);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/protection`, {
        method: "GET",
        headers:{
          Authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
      });
      const result = await res.json();
      if(result){
        setUser({display_name: result.username, photo: result.photo, Id: result.Id});
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const refresh = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setAccessToken(data.access_token);
    } else {
      console.log(data.message);
      setLoading(false);
    }
  } catch (error) {
    console.log("RESPONSE:", error.response);
    console.log("MESSAGE:", error.message);
    setLoading(false);
  }
};

  useEffect(() => {
    if(accessToken){
      login();
    }else if(!accessToken){
      refresh();
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ logout, refresh, accessToken, setAccessToken, login, user}}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
