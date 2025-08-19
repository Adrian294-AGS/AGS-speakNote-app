import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [condition, setCondition] = useState(false);
  const changeNavbar = localStorage.getItem("navbarOnChange");

  useEffect(() => {
    if (changeNavbar) {
      setCondition(true);
      return;
    }
  });

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container text-dark">
        <Link className="navbar-brand" to="/">
          <h2 style={{ color: "green", fontWeight: "bold" }}>AGS</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {condition ? (
          <div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
                {" "}
                {/* or just remove ms-auto */}
                <li className="nav-item">
                  <Link className="nav-link" to="/main">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/history">
                    History
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="#">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto">
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
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
