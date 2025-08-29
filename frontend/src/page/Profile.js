import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogInFirst from "../components/LogInFirst";
import Navbar from "../components/Navbar";

function Profile() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const [loop, setLoop] = useState(false);
  const [profile, setProfile] = useState({
    Id: null,
    username: "",
    photo: null,
    email: ""
  });

  const jwtAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/protection", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        alert(error);
        navigate("/");
        return;
      }
      setLoop(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/fetchUsers/${Id}`, {
        method: "GET"
      });

      const data = await res.json();
      if(!data.success){
        setError(data.message);
        setProfile({Id: null, username: "", photo: null, email: ""});
        return;
      };
      setProfile({Id: data.Id, username: data.username, photo: data.photo, email: data.email});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      jwtAuth();
    }
  });

  useEffect(() => {
    if(loop){
      fetchUser(); 
    }
  }, [loop]);

  return (
    <div>
      {accessToken ? (
        <div>
          <Navbar />
          <div className="container mt-3">
           
            {/* Profile Header */}
            <div className="card shadow-sm border-0 rounded-3">
              {/* Cover Photo */}
              <div
                className="rounded-top overflow-hidden bg-light d-flex justify-content-center align-items-center"
                style={{ height: "450px" }}
              >
                {profile.photo ? (
                  <img
                    src={profile.photo || `http://localhost:5000/${profile.photo}`}
                    alt="Cover"
                    className="w-100 h-100"
                    style={{
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                ) : (
                  <div className="w-100 h-100 bg-secondary"></div> // fallback gray background
                )}
              </div>

              {/* Profile Info Section */}
              <div className="card-body d-flex flex-column flex-md-row align-items-center gap-4">
                {/* Profile Picture */}
                <div
                  className="rounded-circle border border-3 border-white bg-light d-flex justify-content-center align-items-center"
                  style={{
                    width: "180px",
                    height: "180px",
                    marginTop: "-90px", // pull upwards like FB
                  }}
                >
                  {profile.photo ? (
                    <img
                      src={profile.photo || `http://localhost:5000/${profile.photo}`}
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <i
                      className="bi bi-person-circle text-secondary"
                      style={{ fontSize: "5rem" }}
                    ></i>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-grow-1 text-center text-md-start">
                  <h2 className="mb-1">{profile.username}</h2>
                  <p className="text-muted mb-2">{profile.email}</p>
                  <p className="mb-3">
                    Full Stack Developer • Coffee Lover ☕ • React & Node
                    Enthusiast
                  </p>

                  {/* Buttons */}
                  <div className="d-flex justify-content-center justify-content-md-start gap-2">
                    <button className="btn btn-primary">Edit Profile</button>
                    <button className="btn btn-outline-secondary">
                      Upload Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <LogInFirst />
        </div>
      )}
    </div>
  );
}

export default Profile;
