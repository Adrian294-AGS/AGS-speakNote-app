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
      setAccessToken(null);
      setUser({display_name: null, photo: null, Id: null});
      return alert(`${data.message}`);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      const respond = await fetch(`${process.env.REACT_APP_API_URL}/protection`, {
        method: "GET",
        headers:{
          authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
      });
      
      const logResult = await respond.json();

      if(logResult){
        alert(logResult.Id);
        setUser({display_name: logResult.username, photo: logResult.photo, Id: logResult.Id});
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
    console.log("REFRESH RESPONSE:", data); 

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
