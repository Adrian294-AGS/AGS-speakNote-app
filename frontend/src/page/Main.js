import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import LogInFirst from "../components/LogInFirst";

function Main() {
  const [accessToken] = useState(localStorage.getItem("token"));

  const [data, setData] = useState({
    Id: null,
    username: "",
  });
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
    return;
  };

  const jwtAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/protection", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const result = await res.json();
      if (!result.success) {
        navigate("/");
        return;
      }
      setData({ Id: result.Id, username: result.username });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(accessToken){
      jwtAuth();
    } 
  });

  return (
    accessToken ? (
      <div onClick={onLogout}>
        {data.Id} {data.username}
      </div>
    ):(
      <div>
       <LogInFirst />
      </div>
    )
  );
}

export default Main;
