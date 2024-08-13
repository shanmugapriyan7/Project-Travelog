import React, { useState } from "react";
import "../Mid-phase/Sin.css";
import { NavLink, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", api: "" });
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "", api: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (/\S+@\S+\.\S+/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    } else if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email address is invalid",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length >= 8) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    } else if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3006/api/user");
        const data = await response.json();

        const user = data.find(
          (user) => user.mail === email && user.password === password
        );

        if (user) {
          alert("Sign-in successful");
          navigate("/");
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            api: "Invalid email or password",
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: "An error occurred while signing in",
        }));
      }
    } else {
      alert(
        "Please ensure your email is valid and your password is at least 8 characters long"
      );
    }
  };

  return (
    <div className="sin-body">
      <div className="sign-in-page">
        <div className="sign-in-container">
          <div className="sign-in-header">
            <h1>Welcome Back</h1>
            <p>Sign in to discover and plan your next adventure!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            {errors.api && <p className="error">{errors.api}</p>}
            <div className="button-container1">
              <button type="submit" className="sign-in-button1">
                Sign In
              </button>
              <NavLink to="/Signup">
                <button type="button" className="forgot-password-button">
                  Create Account
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
