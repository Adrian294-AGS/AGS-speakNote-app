import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import LogInFirst from "../components/LogInFirst";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

function Main() {
  const { accessToken, setAccessToken, logout } = useAuth();

  const [data, setData] = useState({
    Id: null,
    username: "",
    photo: null
  });

  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState("");
  const [transcriptions, setTranscription] = useState(null);
  const [audioId, setAudioId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("navbarOnChange");
    logout(data.Id);
    navigate("/");
    return;
  };

  useEffect(() => {
    jwtAuth();
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!audioFile) {
      setError("No Audio Uploaded");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("Id", data.Id);
      formData.append("file", audioFile);
      formData.append("username", data.username);

      const res = await fetch("http://localhost:5000/home/transcriptions", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!result.success) {
        setError(result.message || result.Error);
        setAudioFile("");
        return;
      }
      setAudioId(result.Id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAudio = async () => {
    try {
      const res = await fetch(`http://localhost:5000/fetchAudio/${audioId}`, {
        method: "GET",
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      if (data.Error) {
        console.log(data.Error);
        return;
      }

      setTranscription(data.preview);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (audioId) {
      fetchAudio();
    }
  }, [audioId]);

  const jwtAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/protection", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include"
      });
      const result = await res.json();
      if (!result.success) {
        alert(result.message);
        return;
      }
      getProfileInfo(result.Id);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileInfo = async (params) => {
    const Id = params;
    try {
      const res = await fetch(`http://localhost:5000/getProfileInfo/${Id}`, {
        method: "GET"
      });

      const profile = await res.json();
      if(profile.success){
        setData({Id: params, username: profile.username, photo: profile.photo});
        alert(profile.username);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return accessToken ? (
    <div>
      <Navbar username={data.username} photo={data.photo} Id={data.Id}/>
      {loading ? (
      <div>
        <Loading />
      </div>
    ) : (
      <div>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="card mt-0 shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                  {/* Title */}
                  <h2 className="text-center fw-bold text-primary mb-4">
                    🎙️ Audio Upload
                  </h2>
                  {/* Error Alert */}
                  {error && (
                    <div
                      className="alert alert-danger alert-dismissible fade show text-center"
                      role="alert"
                    >
                      {error}
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                      ></button>
                    </div>
                  )}

                  {/* Upload Form */}
                  <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Select Audio File
                      </label>
                      <input
                        type="file"
                        accept=".mp3,.wav"
                        name="file"
                        className="form-control"
                        onChange={(e) => {
                          setAudioFile(e.target.files[0]);
                        }}
                      />
                      <small className="text-muted">
                        Supported formats: MP3, WAV
                      </small>
                    </div>

                    <div className="d-grid">
                      <button className="btn btn-primary btn-lg" type="submit">
                        ⬆️ Upload
                      </button>
                    </div>
                  </form>

                  {/* Transcriptions */}
                  <div>
                    <h4 className="fw-bold text-secondary">Transcriptions</h4>
                    <div
                      className="bg-light p-3 rounded border"
                      style={{ minHeight: "100px" }}
                    >
                      {transcriptions ? (
                        <p className="mb-0">{transcriptions.result_text}</p>
                      ) : (
                        <p className="text-muted">No transcription yet.</p>
                      )}
                    </div>
                  </div>

                  {/* Logout */}
                  <div className="text-center mt-4">
                    <button
                      onClick={onLogout}
                      className="btn btn-outline-danger px-4"
                    >
                      🚪 Log-out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
  ) : (
    <div>
      <LogInFirst />
    </div>
  );
}

export default Main;
