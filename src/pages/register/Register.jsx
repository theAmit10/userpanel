import React, { useState } from "react";
import "./Register.css";
import images from "../../assets/constants/images";
import COLORS from "../../assets/constants/colors";
import { useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/helper/showErrorToast";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { IoIosArrowDropdown } from "react-icons/io";
import {
  useCreateRegisterMutation,
  useGetAllCountryQuery,
} from "../../helper/Networkcall";
import Loader from "../../components/helper/Loader";
import CircularProgressBar from "../../components/helper/CircularProgressBar";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { serverName } from "../../redux/store";

function Register() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    // navigate("/login");
    submitHandler();
  };

  const navigation = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [userDeviceToken, setUserDeviceToken] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Select country");
  const [signupwith, setsignupwith] = useState("");
  const [showCountry, setShowCountry] = useState(false);

  const showingContryContainer = () => {
    if (showCountry === false) {
      setShowCountry(true);
    } else {
      setShowCountry(false);
    }
  };

  const selectingContryContainer = (item) => {
    if (showCountry === false) {
      setShowCountry(true);
    } else {
      setShowCountry(false);
    }
    setSelectedCountry(item.countryname);
  };

  const {
    data: currecylist,
    isLoading: currencyloading,
    error: currencyerror,
  } = useGetAllCountryQuery();

  const [createRegister, { isLoading, error }] = useCreateRegisterMutation();

  const [showProgressBar, setProgressBar] = useState(false);
  // const signupwith = "emailtype";

  const submitHandler = async () => {
    console.log("Starting register");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

    console.log("Email :: " + email);
    console.log("name :: " + name);
    console.log("devicetoken :: " + userDeviceToken);

    if (signupwith === "emailtype") {
      if (!name) {
        showErrorToast("Enter name");
      } else if (!email) {
        showErrorToast("Enter email address");
      } else if (!emailRegex.test(email)) {
        showErrorToast("Enter valid email address");
      } else if (!selectedCountry === "Select Country") {
        showErrorToast("Please select your country");
      } else if (!password) {
        showErrorToast("Enter password");
      } else if (password.length < 6) {
        showErrorToast("Password must be atleast 6 characters long");
      } else if (!confirmPassword) {
        showErrorToast("Enter confirm password");
      } else if (password != confirmPassword) {
        showErrorToast("Password and Confirm Password Not Matched");
      } else {
        console.log("Email :: " + email);
        console.log("name :: " + name);
        console.log("devicetoken :: " + userDeviceToken);

        showSuccessToast("Processing");

        try {
          const body = {
            name: name,
            email: email,
            password: password,
            role: "user",
            country: selectedCountry._id,
          };

          const res = await createRegister({
            body,
          }).unwrap();

          console.log("datat :: " + res);
          navigation("/login");
        } catch (error) {
          showErrorToast(error?.data?.message);
          console.log(error);
          console.log(error.response);
        }
      }
    } else {
      if (!name) {
        showErrorToast("Enter name");
      } else if (!email) {
        showErrorToast("Enter phone number");
      } else if (!phoneRegex.test(email)) {
        showErrorToast("Enter valid Phone number");
      } else if (!selectedCountry === "Select Country") {
        showErrorToast("Please select your country");
      } else if (!password) {
        showErrorToast("Enter password");
      } else if (password.length < 6) {
        showErrorToast("Password must be atleast 6 characters long");
      } else if (!confirmPassword) {
        showErrorToast("Enter confirm password");
      } else if (password != confirmPassword) {
        showErrorToast("Password and Confirm Password Not Matched");
      } else {
        showSuccessToast("Processing");

        try {
          const body = {
            name: name,
            email: email,
            password: password,
            role: "user",
            country: selectedCountry._id,
          };

          const res = await createRegister({
            body,
          }).unwrap();

          console.log("datat :: " + res);
          navigation("/login");
        } catch (error) {
          showErrorToast(error?.data?.message);
          console.log(error);
          console.log(error.response);
        }
      }
    }
  };


   const settingForGoogleAuth = () => {
    // setsignupwith("googletype")
    showSuccessToast("Processing...")

   }

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

            {/** DIFFERNET REGISTER TYPE */}

            {signupwith === "" && (
              <div className="login-form-register">
                <h1 style={{ fontFamily: "MB" }}>Register</h1>
                <label
                  className="welcome-label"
                  style={{ marginBottom: "1vw" }}
                >
                  Welcome , Please enter your details.
                </label>

                <div
                  style={{
                    flex: "1",
                    marginTop: "1vw",
                  }}
                >
                  <div
                    onClick={() => setsignupwith("emailtype")}
                    className="form-group-select-country_container"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: COLORS.background,
                      marginTop: "3vh"
                    }}
                  >
                    <label
                      className="welcome-label-select-country"
                      style={{ color: COLORS.white_s }}
                    >
                      Sign up with Email
                    </label>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "1vw",
                      }}
                    >
                      <MdEmail color={COLORS.white_s} size={"1.2em"} />
                    </div>
                  </div>

                  {/** PHONE */}

                  <div
                    onClick={() => setsignupwith("phonetype")}
                    className="form-group-select-country_container"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: COLORS.background,
                      marginTop: "1vw",
                    }}
                  >
                    <label
                      className="welcome-label-select-country"
                      style={{ color: COLORS.white_s }}
                    >
                      Sign up with Phone
                    </label>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "1vw",
                      }}
                    >
                      <FaPhoneAlt color={COLORS.white_s} size={"1.2em"} />
                    </div>
                  </div>

                  {/** google */}

                  <div
                    onClick={settingForGoogleAuth}
                    className="form-group-select-country_container"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: COLORS.background,
                      marginTop: "1vw",
                      marginBottom: "3vh",
                    }}
                  >
                    <label
                      className="welcome-label-select-country"
                      style={{ color: COLORS.white_s }}
                    >
                      Sign up with Google
                    </label>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "1vw",
                      }}
                    >
                      <FaGoogle color={COLORS.white_s} size={"1.2em"} />
                    </div>
                  </div>
                </div>

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
                  <span
                    onClick={() => navigate("/login")}
                    style={{ color: "#0179FE", cursor: "pointer" }}
                  >
                    Sign In
                  </span>
                </label>
              </div>
            )}

            {/** LOGIN FORM CONTAINER  EMAIL*/}

            {signupwith === "emailtype" && !showCountry && (
              <div className="login-form-register">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
              
                <div className="form-group">
                <label className="welcome-label">Email:</label>
                  <input
                    className="welcome-label"
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="welcome-label">Password:</label>
                  <input
                    className="welcome-label"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="welcome-label">Confirm Password:</label>
                  <input
                    className="welcome-label"
                    type="password"
                    name="password"
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <label className="welcome-label">Country</label>
                <div
                  onClick={showingContryContainer}
                  className="form-group-select-country_container"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: COLORS.white_s,
                  }}
                >
                  <label className="welcome-label-select-country">
                    {selectedCountry}
                  </label>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "1vw",
                    }}
                  >
                    <IoIosArrowDropdown color={COLORS.black} size={"1.5em"} />
                  </div>
                </div>
                {isLoading ? (
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
                  <button
                    onClick={submitHandler}
                    className="submit-btn-register"
                    type="submit"
                  >
                    Register
                  </button>
                )}
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
                  <span
                    onClick={() => navigate("/login")}
                    style={{ color: "#0179FE", cursor: "pointer" }}
                  >
                    Sign In
                  </span>
                </label>
              </div>
            )}

            {/** LOGIN FORM CONTAINER  PHONETYPE*/}

            {signupwith === "phonetype" && !showCountry && (
              <div className="login-form-register">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <label className="welcome-label">Phone no:</label>
                <div className="form-group">
                  <input
                    className="welcome-label"
                    type="number"
                    name="phonenumber"
                    placeholder="Enter phone number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="welcome-label">Password:</label>
                  <input
                    className="welcome-label"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="welcome-label">Confirm Password:</label>
                  <input
                    className="welcome-label"
                    type="password"
                    name="password"
                    placeholder="Enter Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <label className="welcome-label">Country</label>
                <div
                  onClick={showingContryContainer}
                  className="form-group-select-country_container"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: COLORS.white_s,
                  }}
                >
                  <label className="welcome-label-select-country">
                    {selectedCountry}
                  </label>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "1vw",
                    }}
                  >
                    <IoIosArrowDropdown color={COLORS.black} size={"1.5em"} />
                  </div>
                </div>
                {isLoading ? (
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
                  <button
                    onClick={submitHandler}
                    className="submit-btn-register"
                    type="submit"
                  >
                    Register
                  </button>
                )}
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
                  <span
                     onClick={() => navigate("/login")}
                    style={{ color: "#0179FE", cursor: "pointer" }}
                  >
                    Sign In
                  </span>
                </label>
              </div>
            )}

            {/** COUNTRY CONTAINER */}

            {signupwith !== "" && showCountry && (
              <div className="login-form-register">
                <h1 style={{ fontFamily: "MB", marginBottom: "1vw" }}>
                  Select Country
                </h1>

                {currencyloading ? (
                  <div
                    style={{
                      flex: "1",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgressBar />
                  </div>
                ) : (
                  currecylist.currencies.map((item, index) => (
                    <div
                      onClick={() => selectingContryContainer(item)}
                      className="form-group-select-country_container"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        backgroundColor: COLORS.white_s,
                        marginBottom: "1vw",
                      }}
                    >
                      <div className="ltcrightimaged">

                      {item?.countryicon ? (
                        <img
                        src={`${serverName}/uploads/currency/${item.countryicon}`}
                        alt="Profile Picture"
                        className="user-imaged"
                      />
                      ) : (
                        <img
                        src={images.user}
                        alt="Profile Picture"
                        className="user-imaged"
                      />
                      )}
                       
                      </div>
                      <label className="welcome-label-select-country">
                        {item.countryname}
                      </label>
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "1vw",
                        }}
                      >
                        <IoIosArrowDropdown
                          color={COLORS.black}
                          size={"1.5em"}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <img
          src={images.cat}
          alt="Main Content Image"
          className="main-content-image"
        />
      </div>

      <ToastContainer />
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
