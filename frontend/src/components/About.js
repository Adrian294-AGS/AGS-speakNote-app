import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Back Button */}
      <div className="p-3">
        <button
          className="btn btn-outline-success d-flex align-items-center shadow-sm px-3 text-align-center"
          onClick={() => navigate(-1)} // go back
        >
          <span className="me-2" style={{ fontSize: "1.2rem" }}>
            ←
          </span>
          Back
        </button>
      </div>
      <div className="container mt-4">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <img
            src="/1328396.png"
            alt="profile"
            className="rounded-circle shadow"
            style={{
              width: "150px", // same width and height
              height: "150px",
              objectFit: "cover", // crop instead of stretch
            }}
          />
          <h1 className="mt-3">Hi, I'm Adrian 👋</h1>
          <p className="text-muted">Solo Programmer | Fullstack Developer</p>
        </div>

        {/* About Me Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <h2>About Me</h2>
            <p>
              I'm a passionate programmer who loves building modern web apps. I
              specialize in <strong>React, Node.js, Express, and MySQL</strong>.
              My focus is on creating clean, scalable, and efficient solutions.
              I enjoy solving problems, learning new tools, and experimenting
              with technologies.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://via.placeholder.com/400x250"
              alt="coding"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-5">
          <h2 className="text-center mb-4">Skills & Tools</h2>
          <div className="row text-center">
            <div className="col-6 col-md-4 col-lg-3 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex align-items-center justify-content-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 288"
                    width="50"
                    height="50"
                    role="img"
                  >
                    <title>Node.js Logo</title>
                    <path
                      fill="#539E43"
                      d="M128 0l128 74v140l-128 74L0 214V74z"
                    />
                  </svg>

                  <h6 className="mb-0">Node.js</h6>
                </div>
              </div>
            </div>
            {/* Express.js*/}
            <div className="col-6 col-md-4 col-lg-3 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex align-items-center justify-content-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 512 128"
                    role="img"
                  >
                    <title>Express.js</title>
                    <text
                      x="0"
                      y="96"
                      fontFamily="Helvetica, Arial, sans-serif"
                      fontSize="96"
                      fill="#000"
                    >
                      express
                    </text>
                  </svg>

                  <h6 className="mb-0">Express.js</h6>
                </div>
              </div>
            </div>
            {/* MySQL*/}
            <div className="col-6 col-md-4 col-lg-3 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex align-items-center justify-content-center gap-3">
                  <img
                    src="/MySQL-logo.png"
                    width={"50"}
                    height={50}
                    alt="MySQL"
                  />
                  <h6 className="mb-0">MySQL</h6>
                </div>
              </div>
            </div>
            {/* GIT*/}
            <div className="col-6 col-md-4 col-lg-3 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex align-items-center justify-content-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 97 97"
                    width="50"
                    height="50"
                    role="img"
                    aria-label="Git Logo"
                  >
                    <title>Git Logo</title>
                    <path
                      fill="#F05033"
                      d="M92.71 44.408L52.594 4.29a8.87 8.87 0 00-12.55 0l-12.49 12.49 15.82 15.82a6.51 6.51 0 018.53 8.46l15.25 15.25a6.513 6.513 0 11-4.62 4.62L47.28 45.67v29.07a6.51 6.51 0 11-6.17-1.77V45.63a6.51 6.51 0 01-3.45-8.51L21.25 21.25 4.29 38.21a8.87 8.87 0 000 12.55l40.116 40.118a8.87 8.87 0 0012.55 0l35.754-35.754a8.87 8.87 0 000-12.55z"
                    />
                  </svg>

                  <h6 className="mb-0">Git</h6>
                </div>
              </div>
            </div>
            {/* React */}
            <div className="col-6 col-md-4 col-lg-3 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex align-items-center justify-content-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    width="50"
                    height="50"
                    role="img"
                    aria-label="React Logo"
                  >
                    <title>React Logo</title>
                    <circle cx="128" cy="128" r="24" fill="#61DAFB" />
                    <g stroke="#61DAFB" stroke-width="16" fill="none">
                      <ellipse
                        rx="108"
                        ry="44"
                        cx="128"
                        cy="128"
                        transform="rotate(0 128 128)"
                      />
                      <ellipse
                        rx="108"
                        ry="44"
                        cx="128"
                        cy="128"
                        transform="rotate(60 128 128)"
                      />
                      <ellipse
                        rx="108"
                        ry="44"
                        cx="128"
                        cy="128"
                        transform="rotate(120 128 128)"
                      />
                    </g>
                  </svg>

                  <h6 className="mb-0">React</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mb-5">
          <h2>Get In Touch</h2>
          <p>Want to collaborate or just say hi? Reach me on my socials.</p>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/adrian.santiago.135263"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary shadow-sm d-flex align-items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                role="img"
                aria-label="Facebook logo"
              >
                <rect width="24" height="24" rx="4" fill="#1877F2" />
                <path
                  fill="#FFFFFF"
                  d="M15.12 8.5h-1.3c-.34 0-.8.17-.8.86v1.02h2.07l-.27 2.1h-1.8V19h-2.18v-6.52h-1.8v-2.1h1.8V9.03c0-1.55.94-2.62 2.45-2.62.7 0 1.3.05 1.47.07v1.99z"
                />
              </svg>
              Facebook
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/adriansantiago167/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-danger shadow-sm d-flex align-items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                role="img"
                aria-label="Instagram logo"
              >
                <linearGradient id="IGgradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#feda75" />
                  <stop offset="25%" stopColor="#fa7e1e" />
                  <stop offset="50%" stopColor="#d62976" />
                  <stop offset="75%" stopColor="#962fbf" />
                  <stop offset="100%" stopColor="#4f5bd5" />
                </linearGradient>
                <rect width="24" height="24" rx="5" fill="url(#IGgradient)" />
                <path
                  fill="#fff"
                  d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm4.6-8.8a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4z"
                />
              </svg>
              Instagram
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Adrian294-AGS"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark shadow-sm"
            >
              💻 GitHub
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/adrian-santiago-2856a5376/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info shadow-sm"
            >
              🔗 LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
