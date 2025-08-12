import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function Main() {
  const [data, setData] = useState({
    Id: null,
    username: "",
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
    if (accessToken) {
      jwtAuth();
    }
  }, [accessToken]);

  return (
    accessToken ? (
      <div onClick={onLogout}>
        {data.Id} {data.username}
      </div>
    ):(
      <div>
        <Link to={"/"}>
          Log-in first
        </Link>
      </div>
    )
  );
}

export default Main;
