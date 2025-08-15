import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import LogInFirst from "../components/LogInFirst";

function Main() {
  const [accessToken] = useState(localStorage.getItem("token"));

  const [data, setData] = useState({
    Id: null,
    username: "",
    file: null
  });

  const [transcriptions, setTranscription] = useState(null);
  const [audioId, setAudioId] = useState(Number);
  const [error, setError] = useState();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/home/transcriptions", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: JSON.stringify(data)
      });
      
      const data = await res.json();

      if(!data.success) {
        setError(data.message || data.Error);
        setData({file: null});
        return;
      }
      setAudioId(data.Id);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchAudio = async () => {
    try {
      const res = await fetch("http://localhost:5000/fetchAudio",{
        method: "GET",
        body: JSON.stringify(audioId)
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(audioId){
      fetchAudio();
    }
  }, [audioId]);

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
  });

  return accessToken ? (
    <div className="container mt-5">
      <h2>Audio Upload</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".mp3,.wav"
          name="file"
          value={data.file}
          onChange={(e) => {e.target.files[0]}}
        />
        <button className="btn btn-primary mt-2" type="submit">
          Upload
        </button>
      </form>

      <h3 className="mt-4">Transcriptions</h3>
      <ul>
        {transcriptions && (
          transcriptions.result_text
        )}
      </ul>
    </div>
  ) : (
    <div>
      <LogInFirst />
    </div>
  );
}

export default Main;
