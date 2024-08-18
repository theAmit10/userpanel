import React, { useEffect, useState } from "react";
import "./Login.css";
import images from "../../assets/constants/images";
import { useNavigate } from "react-router-dom";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/helper/showErrorToast";
import Loader from "../../components/helper/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userAction";
import CircularProgressBar from "../../components/helper/CircularProgressBar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigation = useNavigate();

  const handleSignUpClick = () => {
    navigation("/register");
  };


  const submitHandler = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

    if (!email) {
      showErrorToast("Please enter email");
    } else if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      showErrorToast("Enter valid email address or phone number");
    } else if (!password) {
      showErrorToast("Enter password");
    } else {
      try {
        console.log("Starting login");
        console.log("email and password:: ", email, password);

        dispatch(login(email, password));

      } catch (error) {
        showErrorToast("Someting went wrong")
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    }
  };


  useEffect(() => {
    if (error) {
      console.log("ERROR");
      console.log(error);

      showErrorToast(error);

      dispatch({
        type: "clearError",
      });
    }

    if (message) {
      console.log("RESULT FOUND");
      console.log(message);
      //   navigation.navigate(navigateTo)

      // We are using navigation reset so that all the navigation stack will get clear

      navigation("/dashboard");
      showSuccessToast(message);

      dispatch({
        type: "clearMessage",
      });
    }
  }, [error, message, dispatch]);


  const getUserAccessToken = async () => {
    try {
      const val = await localStorage.getItem('accesstoken');
      console.log('From SS Access Token :: ' + val);
      // dispatch(getUserAccessToken(val));
      dispatch({
        type: 'getaccesstoken',
        payload: val,
      });

      const timer = setTimeout(() => {
        if (val) {
          navigation('/dashboard')
        } else {
          navigation('/login')
        }
      }, 3000);
    } catch (error) {
      console.log('error' + error);
    }
  };

  useEffect(() => {
    getUserAccessToken();

  }, []);


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
      <div className="main-content-login-org">
        <div className="loginparentbox-login">
          <div className="loginbox-login">
            <img
              src={images.gamecontroller}
              alt="game controller Image"
              className="gamecontroller-image-login"
            />

            <div className="login-form-login">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group-login">
                <label className="welcome-label">Password:</label>
                <input
                  className="welcome-label-login"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <label
              onClick={() => navigation("/forgotpassword")}
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

              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "2vw",
                  }}
                >
                  <CircularProgressBar />
                </div>
              ) : (
                <button onClick={submitHandler} className="submit-btn-login">
                  Login
                </button>
              )}

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
            </div>
          </div>
        </div>
        <img
          src={images.cat}
          alt="Main Content Image"
          className="main-content-image-login"
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
