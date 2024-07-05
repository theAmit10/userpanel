import React from "react";
import "./Register.css";
import images from "../assets/constants/images";


function Register() {
  return (
    <div className="login-page">
      <div className="sidebar">
        <div className="sidebar-top">
          <h3 style={{ fontFamily: "Montserrat_Regular" }}>Hello,</h3>
          <h2 style={{ fontFamily: "Montserrat_Bold" }}>Welcome</h2>
          <h2 style={{ fontFamily: "Montserrat_Bold" }}>To</h2>
          <h2 style={{ fontFamily: "Montserrat_Bold" }}>TheLionWorld</h2>
        </div>
        <img src={images.cups} alt="Sidebar Image" className="sidebar-image" />
      </div>
      <div className="main-content">
        <div className="loginparentbox">
          <div className="loginbox">
            <img
              src={images.gamecontroller}
              alt="game controller Image"
              className="gamecontroller-image"
            />

            <div className="login-form">
              <form>
                <h1 style={{ fontFamily: "Montserrat_Bold" }}>Register</h1>
                <label className="welcome-label">
                Welcome , Please enter your details.
                </label>
                <div className="form-group">
                  <label className="welcome-label">Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group">
                  <label className="welcome-label">Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter phone or email"
                  />
                </div>
                <div className="form-group">
                  <label className="welcome-label">Password:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="form-group">
                  <label className="welcome-label">Confirm Password:</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Confirm Password"
                  />
                </div>

                
                <button className="submit-btn" type="submit">
                  Register
                </button>

                <label
                  className="welcome-label"
                  style={{ color: "#475467", textAlign: "center" }}
                >
                  Already have an account?{" "}
                  <span style={{ color: "#0179FE" }}>Sign In</span>
                </label>
              </form>
            </div>
          </div>
        </div>
        <img
          src={images.cat}
          alt="Main Content Image"
          className="main-content-image"
        />
      </div>
    </div>
  );
}

export default Register;

