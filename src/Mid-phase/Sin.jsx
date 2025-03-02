import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API requests
import "../Mid-phase/Sin.css";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", api: "" });
  const [message, setMessage] = useState(""); // To display success/error messages
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Step 1: Send login credentials to the API
        const loginResponse = await fetch("http://localhost:3006/api/ua/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            api: loginData.message || "Invalid email or password",
          }));
          return;
        }

        // Step 2: Store the user's data in sessionStorage
        sessionStorage.setItem("user", JSON.stringify(loginData)); // Store user info (including name)

        // Step 3: Update the current status with the loginId (email) and default itineraryId
        const currentStatusResponse = await axios.put(
          "http://localhost:3006/api/current/current-status",
          {
            loginId: email,  // Use email as loginId
            itineraryId: "2",  // Default itineraryId
            place: "japan", // Default place
            startDate: new Date(), // Default startDate as current date
            endDate: new Date(),   // Default endDate as current date
          }
        );

        // Handle successful current status update
        setMessage(currentStatusResponse.data.message);

        // Redirect to the home page after successful login
        navigate("/home");
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          api: "An error occurred while signing in or updating current status.",
        }));
        console.error("Error:", error);
      }
    } else {
      alert("Please ensure your email is valid and your password is at least 8 characters long.");
    }
  };

  return (
    <div className="sin-body">
      <div className="sign-in-page">
        <div className="sign-in-container">
          <h1>Welcome Back</h1>
          <p>Sign in to discover and plan your next adventure!</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            {errors.api && <p className="error">{errors.api}</p>}
            <div className="button-container1">
              <button type="submit" className="sign-in-button1">
                Sign In
              </button>
            </div>
          </form>
          {message && <p>{message}</p>} {/* Display message after submission */}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
