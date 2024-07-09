import React from "react";
import "./Login.css";
import images from "../../assets/constants/images";
import { useNavigate } from "react-router-dom";


function Login() {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate("/login");
  };


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
                <h1 style={{ fontFamily: "Montserrat_Bold" }}>Log In</h1>
                <label className="welcome-label">
                  Welcome back! Please enter your details.
                </label>
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

                <label
                  className="welcome-label"
                  style={{ color: "#475467", textAlign: "center", cursor: 'pointer' }}
                >
                  Forgot Password  
                </label>
                <button className="submit-btn" type="submit">
                  Login
                </button>

                <label
                  className="welcome-label"
                  style={{ color: "#475467", textAlign: "center" }}
                >
                  Don’t have an account?{" "}
                  <span onClick={handleSignUpClick} style={{ color: "#0179FE" ,cursor: 'pointer' }}>Sign up</span>
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

export default Login;
