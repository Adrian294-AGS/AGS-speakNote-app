import { useEffect, useState } from "react";
import LogInFirst from "../components/LogInFirst";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/authContext";

function Profile() {
  const { accessToken } = useAuth();
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    photo: null,
    email: "",
    userInfo: ""
  });
  const [loop, setLoop] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/fetchUsers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        return;
      }
      setProfile({
        username: data.userData.display_name,
        photo: data.userData.photo,
        email: data.userData.email,
        userInfo: data.userData.userInfo
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
    formData.append("Info", profile.userInfo);
    if (profile.photo instanceof File) {
      formData.append("photo", profile.photo);
    }
    try {
      const res = await fetch(`http://localhost:5000/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        credentials: "include",
        body: formData
      });

      const data = await res.json();
      if(!data.success){
        setError(data.message);
        return;
      }
      alert("Success Update");
      setLoop((prev) => !prev);
      setIsEditing((prev) => !prev);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if (accessToken) {
      fetchUser();
    }
  }, [loop, accessToken]);

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
                          src={`http://localhost:5000/photo/${profile.photo}`}
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
                    <p className="mb-3">{profile.userInfo || "Insert Info"}</p>

                    {/* Edit Button */}
                    <button
                      className="btn btn-outline-primary mt-2"
                      onClick={() => setIsEditing((prev) => !prev)} // 👈 toggle form
                    >
                      {isEditing ? "Close Edit" : "Edit Profile"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Section - only visible when isEditing = true */}
            {isEditing && (
              <div className="container mt-4">
                <div className="card border-0 shadow-sm rounded-3">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Edit Profile</h5>
                  </div>
                  <div className="card-body">
                     {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                     )}
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
                        <label className="form-label fw-semibold">Profile Photo</label>
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          className="form-control"
                          onChange={(e) =>
                            setProfile({ ...profile, photo: e.target.files[0] })
                          }
                        />
                      </div>

                      {/* Buttons */}
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setIsEditing(false)} // 👈 close form
                        >
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
            )}
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
