import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      login(res.data); // Save user + token
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        `Can't Login ${error.response.data.message || "\nLogin failed"}`
      );
    }
  };

  return (
    <div className="auth-forms">
      <div className="container ">
        <h1>Login</h1>
        <form
          className="row g-3 needs-validation"
          noValidate=""
          onSubmit={handleSubmit}
        >
          <div className="row g-2 position-relative">
            <label htmlFor="email-id" className="form-label">
              Email 
            </label>
            <input
              id="email-id"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="row g-2 position-relative">
          <label htmlFor="password" className="form-label">
              Password 
            </label>
          <input
            name="password"
            id="password"
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          </div>
          <p class="fs-6">Don't Have an account ? <a href="/">Signm Up!</a> </p>
          <div className="row g-2">
          <button className="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
