import React from 'react'
import { useNavigate } from 'react-router-dom';


function Main() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5000/logout",{
        method: "GET",
        credentials: "include"
      });

      const data = await res.json();
      if(!data.success){
        alert("log-out prolem");
        return;
      }
      alert(`${data.message}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div onClick={logout}>
      Log-out
    </div>
  )
}

export default Main
