import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("navbarOnChange", true);
      navigate("/main");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message);
        setFormData({ username: "", password: "" });
        return;
      }
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("navbarOnChange", true);
      navigate("/main");
    } catch (err) {
      console.error(err);
      setFormData({ username: "", password: "" });
      alert("Something went wrong!");
    }
  };

  const googleSignin = async () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div>
      <Navbar />
      <div
        className="container mt-5 p-4 rounded shadow-lg bg-light"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="mb-4 text-center" style={{ color: "green" }}>
          Log-In
        </h2>

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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-2 w-100"
            style={{ backgroundColor: "green", border: "none" }}
          >
            Log-in
          </button>

          <Link to={"/register"}>
            <button
              className="btn btn-primary mt-2 w-100"
              style={{ backgroundColor: "green", border: "none" }}
            >
              Create Account
            </button>
          </Link>
        </form>
        <hr />
        <div
          className="googleIcon d-flex text-align-center justify-content-center rounded p-3 text-white gap-2 align-items-center"
          style={{ cursor: "pointer", backgroundColor: "green", height: "5vh" }} // Optional: background color for Google style
          onClick={googleSignin}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="25"
            viewBox="0 0 48 48"
          >
            <path
              fill="#4285F4"
              d="M43.6 20.5h-1.9V20H24v8h11.3C33.1 32.5 29 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.1 6.2 28.8 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.1-.4-3.5z"
            />
            <path
              fill="#34A853"
              d="M6.3 14.7l6.6 4.8C14.3 16.1 18.8 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.1 6.2 28.8 4 24 4c-7.9 0-14.7 4.6-17.7 10.7z"
            />
            <path
              fill="#FBBC05"
              d="M24 44c5.4 0 10.3-1.9 14-5.2l-6.5-5.4c-2 1.6-4.6 2.6-7.5 2.6-5 0-9.1-3.3-10.6-7.9l-6.7 5.2C9.3 39.3 16.1 44 24 44z"
            />
            <path
              fill="#EA4335"
              d="M43.6 20.5h-1.9V20H24v8h11.3c-1.2 3.4-4.3 6.2-8.1 6.8v6.7h7.6c4.4-4.1 7-10.1 7-16.5 0-1.2-.1-2.1-.4-3.5z"
            />
          </svg>

          <span>Sign in With Google</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
