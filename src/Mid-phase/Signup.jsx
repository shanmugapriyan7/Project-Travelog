import React, { useState } from "react";
import "../Mid-phase/Signup.css"; // Import your CSS file
import { NavLink } from "react-router-dom";
const CreateAccount = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    validateField(name, type === "checkbox" ? checked : value);
  };

  const validateField = (name, value) => {
    const errors = { ...formErrors };

    switch (name) {
      case "username":
        if (!value) {
          errors.username = "Username is required";
        } else {
          delete errors.username;
        }
        break;
      case "email":
        if (!value) {
          errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errors.email = "Email is invalid";
        } else {
          delete errors.email;
        }
        break;
      case "password":
        if (!value) {
          errors.password = "Password is required";
        } else if (value.length < 8) {
          errors.password = "Password must be at least 8 characters";
        } else {
          delete errors.password;
        }
        break;
      case "confirmPassword":
        if (!value) {
          errors.confirmPassword = "Confirm Password is required";
        } else if (value !== formData.password) {
          errors.confirmPassword = "Passwords do not match";
        } else {
          delete errors.confirmPassword;
        }
        break;
      case "acceptTerms":
        if (!value) {
          errors.acceptTerms = "You must accept the terms and conditions";
        } else {
          delete errors.acceptTerms;
        }
        break;
      default:
        break;
    }

    setFormErrors(errors);
  };

  const validate = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!formData.acceptTerms)
      errors.acceptTerms = "You must accept the terms and conditions";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
    } else {
      setFormErrors(errors);
    }
  };

  return (
      <div className="signup-body" >
    <div className="create-account">
      {submitted ? (
        <h2>Account created successfully!</h2>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <h2>Create Account</h2>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className={formErrors.username ? "error" : ""}
            />
            {formErrors.username && (
              <span className="error-message">{formErrors.username}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? "error" : ""}
              />
            {formErrors.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={formErrors.password ? "error" : ""}
              />
            {formErrors.password && (
              <span className="error-message">{formErrors.password}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={formErrors.confirmPassword ? "error" : ""}
              />
            {formErrors.confirmPassword && (
              <span className="error-message">
                {formErrors.confirmPassword}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="acceptTerms" className="checkbox-container">
              <input
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                />
              I accept the terms and conditions
            </label>
            {formErrors.acceptTerms && (
              <span className="error-message">{formErrors.acceptTerms}</span>
            )}
          </div>
          
          <div className="button-group">
         <NavLink to="/">   <button type="submit" className="form-button">
              Create Account
            </button></NavLink>
          <NavLink to="/Sin">  <button type="button" className=" signin-button">
              Sign In
            </button></NavLink>
          </div>
          
        </form>
      )}
    </div>
    </div>
      
  );
};

export default CreateAccount;
