import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ username, photo, Id }) {
  const [condition, setCondition] = useState(false);
  const changeNavbar = localStorage.getItem("navbarOnChange");

  useEffect(() => {
    if (changeNavbar) {
      setCondition(true);
      return;
    }
  }, []);

  return (
   <nav className="navbar navbar-expand-lg bg-light shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <h2 className="m-0 fw-bold text-success">AGS</h2>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            {condition ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/messenger">
                    Messenger
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/home/transcription">
                    Transcription
                  </Link>
                </li>
                {/* Profile */}
                <li className="nav-item d-flex align-items-center gap-2">
                  <Link
                    to={`/home/profile`}
                    className="d-flex align-items-center text-decoration-none gap-2"
                  >
                    <span className="fw-bold text-success">{username}</span>
                    {photo ? (
                      <img
                        src={`http://localhost:5000/photo/${photo}`}
                        alt="User"
                        className="rounded-circle border"
                        style={{
                          width: "35px",
                          height: "35px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <i
                        className="bi bi-person-circle"
                        style={{ fontSize: "1.8rem", color: "gray" }}
                      ></i>
                    )}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Log-In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Me
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
