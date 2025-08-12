import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/authContext";


function Main() {
  const [data, setData] = useState({
    Id: 0,
    username: ""
  });
  const { accessToken } = useAuth();

  const { logout } = useAuth();

  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
    return;
  };

  const jwtAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/protection",{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await res.json();
    if(!data.success){
      alert("Not Authorized!!!");
      navigate("/");
      return;
    }

    setData({Id: data.Id, username: data.username});

    } catch (error) {
      console.log(error);
      alert("ukitnam");
      navigate("/");
    }
  }

  useEffect(() => {
    jwtAuth();
  }, [accessToken]);

  return (
    <div onClick={onLogout}>
      {data.Id}
      {data.username}
    </div>
  )
}

export default Main
