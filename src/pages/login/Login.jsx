import React from "react";
import "./Login.css";
import images from "../../assets/constants/images";
import { useNavigate } from "react-router-dom";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";

function Login() {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/register");
  };

  
  const handleLoginClick = (event) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="sidebar">
        <div className="sidebar-top">
          <h3 style={{ fontFamily: "MR" }}>Hello,</h3>
          <h2 style={{ fontFamily: "MB" }}>Welcome</h2>
          <h2 style={{ fontFamily: "MB" }}>To</h2>
          <h2 style={{ fontFamily: "MB" }}>TheLionWorld</h2>
        </div>
        <img src={images.cups} alt="Sidebar Image" className="sidebar-image" />
      </div>
      <div className="main-content">
        <div className="loginparentbox-login">
          <div className="loginbox-login">
            <img
              src={images.gamecontroller}
              alt="game controller Image"
              className="gamecontroller-image-login"
            />

            <div className="login-form-login">
              <form>
                <h1 style={{ fontFamily: "MB" }}>Log In</h1>
                <label className="welcome-label-login">
                  Welcome back! Please enter your details.
                </label>
                <div className="form-group-login">
                  <label className="welcome-label-login">Email:</label>
                  <input
                    className="welcome-label-login"
                    type="email"
                    name="email"
                    placeholder="Enter phone or email"
                  />
                </div>
                <div className="form-group-login">
                  <label className="welcome-label">Password:</label>
                  <input
                    className="welcome-label-login"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                  />
                </div>

                <label
                  className="welcome-label-login"
                  style={{
                    color: COLORS.grayHalfBg,
                    textAlign: "center",
                    cursor: "pointer",
                    fontFamily: FONT.Montserrat_Regular,
                  }}
                >
                  Forgot Password
                </label>
                <button onClick={handleLoginClick} className="submit-btn-login" type="submit">
                  Login
                </button>

                <label
                  className="welcome-label-login"
                  style={{
                    color: COLORS.grayHalfBg,
                    textAlign: "center",
                    fontFamily: FONT.Montserrat_Regular,
                  }}
                >
                  Don’t have an account?{" "}
                  <span
                    onClick={handleSignUpClick}
                    style={{ color: "#0179FE", cursor: "pointer" }}
                  >
                    Sign up
                  </span>
                </label>
              </form>
            </div>
          </div>
        </div>
        <img
          src={images.cat}
          alt="Main Content Image"
          className="main-content-image-login"
        />
      </div>
    </div>
  );
}

export default Login;
