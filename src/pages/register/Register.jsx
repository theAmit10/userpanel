import React from "react";
import "./Register.css";
import images from "../../assets/constants/images";
import COLORS from "../../assets/constants/colors";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/login");
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
        <div className="loginparentbox">
          <div className="loginbox">
            <img
              src={images.gamecontroller}
              alt="game controller Image"
              className="gamecontroller-image"
            />

            <div className="login-form-register">
              <form>
                <h1 style={{ fontFamily: "MB" }}>Register</h1>
                <label className="welcome-label">
                  Welcome , Please enter your details.
                </label>
                <div className="form-group">
                  <label className="welcome-label">Name:</label>
                  <input
                    className="welcome-label"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                  />
                </div>
                <div className="form-group">
                  <label className="welcome-label">Email:</label>
                  <input
                    className="welcome-label"
                    type="email"
                    name="email"
                    placeholder="Enter phone or email"
                  />
                </div>
                <div className="form-group">
                  <label className="welcome-label">Password:</label>
                  <input
                    className="welcome-label"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="form-group">
                  <label className="welcome-label">Confirm Password:</label>
                  <input
                    className="welcome-label"
                    type="password"
                    name="password"
                    placeholder="Enter Confirm Password"
                  />
                </div>

                <button className="submit-btn-register" type="submit">
                  Register
                </button>

               
                  <label
                    className="welcome-label"
                    style={{
                      color: COLORS.grayHalfBg,
                      textAlign: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Already have an account?{" "}
                  </label>
                  <label className="welcome-label">
                    <span onClick={handleSignInClick} style={{ color: "#0179FE", cursor: "pointer" }}>Sign In</span>
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

// .login-page {
//   display: flex;
//   height: 100vh;
//   background-color: #011833;
//   color: white;
// }

// .sidebar {
//   width: 20%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
// }

// .sidebar-top {
//   text-align: left;
//   width: 100%;
// }

// .sidebar-image {
//   width: 100%;
//   object-fit: cover;
// }

// .main-content {
//   width: 75%;
//   display: flex;
//   flex-direction: column;
//   justify-content: stretch;
//   padding-top: 5%;
//   position: relative; /* Added this to make it the positioning context */
// }

// .loginparentbox {
//   background: linear-gradient(180deg, #0162AF, #011833);
//   width: 80%;
//   height: 80vh;
//   border-radius: 3vh;
// }

// .loginbox {
//   background: linear-gradient(180deg, #0162AF, #011833);
//   width: 100%;
//   height: 80vh;
//   border-radius: 3vh;
//   margin-top: 5%;
//   margin-left: 5%;
// }

// .gamecontroller-image {
//   width: 14%;
//   object-fit: cover;
//   position: absolute;
//   top: 40%;

// }

// .login-form {

//   border-radius: 10px;
//   width: 80%;
//   height: 60vh;
//   position: relative;

//   gap: 10px; /* Added this to create a 20px gap between each item */
// }

// .welcome-label {
//   font-family: "Montserrat_Regular";
//   width: 100%;
// }

// .login-form form {
//   display: flex;
//   flex-direction: column;
//   margin-top: -40%;

// }

// .form-group {
//   display: flex;
//   align-items: flex-start;
//   gap: 10px;
//   flex-direction: column;
// }

// .form-group label {
//   flex-shrink: 0;
//   width: 100px; /* Adjust as needed */
//   text-align: left;
// }

// .form-group input {
//   flex-grow: 1;
//   padding: 10px;
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   width: 100%;
// }

// .form-group span{
//   color: #0179FE;
// }

// .submit-btn {
//   padding: 10px;
//   border-radius: 5px;
//   background-color: #0179FE;
//   color: white;
//   border: none;
//   cursor: pointer;
// }

// .main-content-image {
//   width: 35%;
//   object-fit: cover;
//   position: absolute;
//   right: 0;
//   bottom: 0;
// }
