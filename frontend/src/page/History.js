import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import LogInFirst from "../components/LogInFirst";
import Loading from "../components/Loading";

function History() {
  const [accessToken] = useState(localStorage.getItem("token"));
  const [profile, setProfile] = useState({
    Id: null,
    username: "",
  });
  const navigate = useNavigate();
  const [transcription, setTranscription] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [changes, setChanges] = useState(false);

  const jwtAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/protection", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
      const result = await res.json();
      if (!result.success) {
        navigate("/");
        return;
      }
      setProfile({ Id: result.Id, username: result.username });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAudio = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/fetchAllAudio/${profile.Id}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }
      setTranscription(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (profile.Id) {
      setLoading(true);
      fetchAudio();
      return;
    }
  }, [profile.Id, changes]);

  useEffect(() => {
    if (accessToken) {
      jwtAuth();
    }
  });

  const handleDelete = async (Id) => {
    const transId = Id;
    try {
      const res = await fetch(`http://localhost:5000/deleteAudio/${transId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setChanges((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = async (Id) => {
    const transId = Id;
    try {
      const res = await fetch(`http://localhost:5000/copyText/${transId}`, {
        method: "GET",
      });
      const data = await res.json();

      if (!data) {
        setError(data.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {accessToken ? (
        <div>
          <Navbar />
          <div className="container py-4">
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-3 gap-3">
              <div>
                <h2 className="mb-0">Transcriptions</h2>
                <small className="text-muted">
                  Audio name • Transcription • Date
                </small>
              </div>
              <div className="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search…"
                  style={{ minWidth: "200px" }}
                />
                <button className="btn btn-outline-secondary">Search…</button>
              </div>
            </div>

            {/* Cards Grid */}
            {loading ? (
              <div>
                <Loading />
              </div>
            ) : (
              <div className="row g-3">
                {transcription && transcription.length > 0 ? (
                  transcription.map((t) => (
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="card shadow-sm border-0 h-100">
                        {/* Card Header */}
                        <div className="card-header bg-light d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center gap-2 text-truncate">
                            <span className="badge text-bg-success">Audio</span>
                            <strong
                              className="text-truncate"
                              title={t.wav_file}
                            >
                              {t.wav_file}
                            </strong>
                          </div>
                          <small className="text-muted text-nowrap ms-2">
                            {t.created_at}
                          </small>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                          <p
                            className="card-text"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {t.result_text}
                          </p>
                          <button className="btn btn-sm btn-outline-primary">
                            Read more
                          </button>
                        </div>

                        {/* Card Footer */}
                        <div className="card-footer bg-white d-flex flex-wrap gap-2 justify-content-end">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleCopy(t.Id)}
                          >
                            Copy text
                          </button>
                          <a className="btn btn-sm btn-primary" href="#">
                            Download audio
                          </a>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(t.Id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  /* Empty State */
                  <div className="container py-5 d-flex justify-content-center align-items-center">
                    <div
                      className="card shadow-sm border-0 text-center p-5"
                      style={{ maxWidth: "500px", width: "100%" }}
                    >
                      <div className="card-body">
                        <div className="mb-4">
                          <i
                            className="bi bi-mic-mute text-danger"
                            style={{ fontSize: "4rem" }}
                          ></i>
                        </div>
                        <h3 className="card-title mb-3">No Audio Converted</h3>
                        <p className="card-text text-muted">
                          You don’t have any converted audio yet. Upload an
                          audio file to get started with transcription.
                        </p>
                        <Link to={"/main"}>
                          <button className="btn btn-primary mt-3">
                            <i className="bi bi-upload me-2"></i> Upload Audio
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
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

export default History;
