import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) {
        setFormData({ username: data.data, password: "", repeatPassword: "" });
        setError(data.message);
        return;
      }

      if (data.Error) {
        console.log(data.Error);
        return;
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid min-vh-50 d-flex align-items-center justify-content-center">
        <div
          className="row justify-content-center p-4"
          style={{ width: "250%" }}
        >
          <div
            className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 px-4"
            id="cardCol1"
          >
            <div className="subCard1 shadow-lg p-4 rounded bg-white">
              <h3
                className="fw-bold text-center mb-4"
                style={{ color: "green" }}
              >
                REGISTER
              </h3>

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
                {/* Username */}
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder="Your Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Repeat Password */}
                <div className="mb-3">
                  <label htmlFor="RepeatPassword" className="form-label">
                    Repeat Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="repeatPassword"
                    id="RepeatPassword"
                    placeholder="Repeat your password"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="registerBtn text-center w-100 text-white mt-2 rounded"
                  style={{
                    backgroundColor: "green",
                    border: "none",
                    fontWeight: "bold",
                    height: "5vh",
                  }}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
