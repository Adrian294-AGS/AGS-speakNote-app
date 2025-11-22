import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState({
    Id: null,
    username: null,
    photo: null
  });
  const [loading, setLoading] = useState(false);

  const logout = async (params) => {
    const res = await fetch(`http://localhost:5000/logout/${params}`, {
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
      const res = await fetch("http://localhost:5000/protection", {
        method: "GET",
        headers:{
          Authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
      });
      const result = await res.json();
      if(result){
        alert("nag verify");
        setUser({Id: result.Id, username: result.username, photo: result.photo});
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const refresh = async () => {
  try {
    const res = await fetch("http://localhost:5000/auth/refresh", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setAccessToken(data.access_token);
      return true;
    } else {
      console.log(data.message);
      setLoading(false);
      return false
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
    return false;
  }
};

//eto nalang yung problema pag nag refresh yung page mawawala yung data
  useEffect(() => {
    if(accessToken){
      login();
    }else if(refresh()){
      login();
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ logout, refresh, accessToken, setAccessToken, login, user}}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
