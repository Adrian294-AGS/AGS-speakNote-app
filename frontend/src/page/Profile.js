import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    userInfo: "insert info",
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

  const handleChange = (e) => {
    setProfile({...profile, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userInfo", profile.userInfo);
    if (profile.photo instanceof File) {
    formData.append("photo", profile.photo);
  }

    try {
      const res = await fetch(`http://localhost:5000/update/${Id}`, {
        method: "PUT",
        body: formData
      });

      const data = await res.json();
      if(!data.success){
        return alert("Fail to Update");
      }
      alert("Success Update");
      setLoop((prev) => !prev);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if (accessToken) {
      jwtAuth();
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [loop]);

  return (
    <div>
      {accessToken ? (
        <div>
          <Navbar />
          <div className="container mt-3">
          {/* Profile Header */}
          <div className="container card shadow-sm border-0 rounded-3">
            <div className="card-body">
              <div className="row align-items-center">
                {/* Profile Picture */}
                <div className="col-12 col-md-4 d-flex justify-content-center mb-3 mb-md-0">
                  <div
                    className="rounded-circle border border-3 border-white bg-light d-flex justify-content-center align-items-center shadow-sm"
                    style={{ width: "180px", height: "180px" }}
                  >
                    {profile.photo ? (
                      <img
                        src={
                          `http://localhost:5000/photo/${profile.photo}` || profile.photo
                        }
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
                </div>
              </div>
            </div>
          </div>

          {/* Edit Section */}
          <div className="container mt-4">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Edit Profile</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* About / Info */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">About</label>
                    <textarea
                      name="userInfo"
                      className="form-control"
                      rows="3"
                      value={profile.userInfo}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Upload Photo */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => {setProfile({...profile, photo: e.target.files[0]})}}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="d-flex justify-content-end gap-2">
                    <button type="reset" className="btn btn-outline-secondary">
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
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
