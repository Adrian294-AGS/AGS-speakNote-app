import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import LogInFirst from "../components/LogInFirst";

function History() {
  const [accessToken] = useState(localStorage.getItem("token"));
  const [profile, setProfile] = useState({
    Id: Number,
    username: "",
  });
  const navigate = useNavigate();

  const [testing] = useState(false);

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

  const fetchAudio = async () => {};

  useEffect(() => {
    if (accessToken) {
      jwtAuth();
      return;
    }
  });

  return (
    <div>
      {accessToken ? (
        <div>
          <Navbar />
          <div className="container py-4">
            <div className="d-flex justify-content-between align-items-end mb-3">
              <div>
                <h2 className="mb-0">Transcriptions</h2>
                <small className="text-muted">
                  Audio name • Transcription • Date
                </small>
              </div>
              <div className="d-flex gap-2">
                <input className="form-control" placeholder="Search…" />
                <button className="btn btn-outline-secondary">Filter</button>
              </div>
            </div>

            <div className="row g-3">
              {testing ? (
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="card shadow-sm border-0 h-100">
                    <div className="card-header bg-light d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge text-bg-success">Audio</span>
                        <strong
                          className="text-truncate"
                          title="lecture_snippet.m4a"
                        >
                          lecture_snippet.m4a
                        </strong>
                      </div>
                      <small className="text-muted">
                        Aug 17, 2025 • 3:20 PM
                      </small>
                    </div>
                    <div className="card-body">
                      <p
                        className="card-text"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        In relational databases, normalization reduces
                        redundancy. 1NF eliminates repeating groups, 2NF removes
                        partial dependencies, and 3NF removes transitive
                        dependencies…
                      </p>
                      <button className="btn btn-sm btn-outline-primary">
                        Read more
                      </button>
                    </div>
                    <div className="card-footer bg-white d-flex gap-2 justify-content-end">
                      <button className="btn btn-sm btn-outline-secondary">
                        Copy text
                      </button>
                      <a className="btn btn-sm btn-primary" href="#">
                        Download audio
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="container py-5 d-flex justify-content-center align-items-center"
                >
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
                        You don’t have any converted audio yet. Upload an audio
                        file to get started with transcription.
                      </p>
                      <button className="btn btn-primary mt-3">
                        <i className="bi bi-upload me-2"></i> Upload Audio
                      </button>
                    </div>
                  </div>
                </div>
              )}
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

export default History;
