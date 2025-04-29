import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      toast("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message || "Signup failed");
    }
  };

  return (
    <div className="auth-forms">
      <div className="container ">
        <h1>Signup</h1>
        <form
          className="row g-3 needs-validation"
          noValidate=""
          onSubmit={handleSubmit}
        >
          <div className="row g-2 position-relative">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="form-control"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="row g-2 position-relative">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
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
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="row g-2 position-relative">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              id="country"
              name="country"
              className="form-control"
              placeholder="Country"
              onChange={handleChange}
              required
            />
          </div>
        <p class="fs-6">Have an account ? <a href="/login">Login In!</a> </p>
        
          <div className="row g-2">
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
