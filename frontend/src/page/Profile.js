import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LogInFirst from "../components/LogInFirst";
import Navbar from "../components/Navbar";

function Profile() {
  const { Id } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    Id: null,
    username: "",
    photo: null,
    email: "",
    userInfo: "",
  });
  const [loop, setLoop] = useState(false);

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
      setLoop((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/fetchUsers/${Id}`, {
        method: "GET",
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        return;
      }
      setProfile({
        Id: data.Id,
        username: data.username,
        photo: data.photo,
        email: data.email,
        userInfo: data.user_info,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      jwtAuth();
    }
  }, []);

  useEffect(() => {
    if (loop) {
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
            <div className="container card shadow-sm border-0 rounded-3">
              {/* Profile Info Section */}
              <div className="card-body">
                <div className="row align-items-center">
                  {/* Profile Picture */}
                  <div className="col-12 col-md-4 d-flex justify-content-center mb-3 mb-md-0">
                    <div
                      className="rounded-circle border border-3 border-white bg-light d-flex justify-content-center align-items-center shadow-sm"
                      style={{
                        width: "180px",
                        height: "180px",
                      }}
                    >
                      {profile.photo ? (
                        <img
                          src={ profile.photo || `http://localhost:5000/${profile.photo}` }
                          alt="Profile"
                          className="rounded-circle img-fluid"
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
                  </div>

                  {/* User Info */}
                  <div className="col-12 col-md-8 text-center text-md-start">
                    <h2 className="mb-1">{profile.username}</h2>
                    <p className="text-muted mb-2">{profile.email}</p>
                    <p className="mb-3">{profile.userInfo}</p>

                    {/* Buttons */}
                    <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
                      <Link to="/editProfile">
                        <button className="btn btn-primary">
                          Edit Profile
                        </button>
                      </Link>
                    </div>
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
