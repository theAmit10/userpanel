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
import { PiSubtitles } from "react-icons/pi";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        showErrorToast("Someting went wrong");
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
      const val = await localStorage.getItem("accesstoken");
      console.log("From SS Access Token :: " + val);
      // dispatch(getUserAccessToken(val));
      dispatch({
        type: "getaccesstoken",
        payload: val,
      });

      const timer = setTimeout(() => {
        if (val) {
          navigation("/dashboard");
        } else {
          navigation("/login");
        }
      }, 3000);
    } catch (error) {
      console.log("error" + error);
    }
  };

  useEffect(() => {
    getUserAccessToken();
  }, []);

  return (
    <div className="loginContainer">
      <div className="loginContainerLeft">
        <label className="labelHeader">Hello,</label>
        <label className="labelHeader">Welcome</label>
        <label className="labelHeader">To</label>
        <label className="labelHeader">TheLionWorld</label>

        <div className="loginContainerLeftBottom">
          <div className="trophyimagecontainer">
            <img src={images.cups} alt="trphy" className="logcatandtrophyimg" />
          </div>

          <div className="logcatimagecontainer">
            <img src={images.cat} alt="cat" className="logcatandtrophyimg" />
          </div>
        </div>
      </div>
      <div className="loginContainerRight">
        <div className="rightParenC">
          <div className="rightParenCMain">
            <label className="labelHeader">Log In</label>

            <label className="labelSubHeader">
              {" "}
              Welcome back! Please enter your details.
            </label>
            {/** EMAIL */}
            <label className="alCLLabel">Email</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <MdOutlineMail color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/** PASSWORD */}
            <label className="alCLLabel">Password</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <MdOutlinePassword color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="lfContainer">
              <label
                onClick={() => navigation("/forgotpassword")}
                className="alBottomContainerlabel"
              >
                Forgot password
              </label>
            </div>

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
              <div className="lBottomContainer" onClick={submitHandler}>
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}

            <div className="lfContainer">
              <label className="alBottomContainerlabel">
                Don’t have an account?{" "}
              </label>
              <label
                onClick={handleSignUpClick}
                className="lBottomContainerlabel"
              >
                Sign up
              </label>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;

// import React, { useEffect, useState } from "react";
// import "./Login.css";
// import images from "../../assets/constants/images";
// import { useNavigate } from "react-router-dom";
// import COLORS from "../../assets/constants/colors";
// import FONT from "../../assets/constants/fonts";
// import { ToastContainer } from "react-toastify";
// import {
//   showErrorToast,
//   showSuccessToast,
// } from "../../components/helper/showErrorToast";
// import Loader from "../../components/helper/Loader";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../redux/actions/userAction";
// import CircularProgressBar from "../../components/helper/CircularProgressBar";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { loading, message, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const navigation = useNavigate();

//   const handleSignUpClick = () => {
//     navigation("/register");
//   };

//   const submitHandler = async () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

//     if (!email) {
//       showErrorToast("Please enter email");
//     } else if (!emailRegex.test(email) && !phoneRegex.test(email)) {
//       showErrorToast("Enter valid email address or phone number");
//     } else if (!password) {
//       showErrorToast("Enter password");
//     } else {
//       try {
//         console.log("Starting login");
//         console.log("email and password:: ", email, password);

//         dispatch(login(email, password));

//       } catch (error) {
//         showErrorToast("Someting went wrong")
//         if (error.response) {
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         } else if (error.request) {
//           console.log(error.request);
//         } else {
//           console.log("Error", error.message);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       console.log("ERROR");
//       console.log(error);

//       showErrorToast(error);

//       dispatch({
//         type: "clearError",
//       });
//     }

//     if (message) {
//       console.log("RESULT FOUND");
//       console.log(message);
//       //   navigation.navigate(navigateTo)

//       // We are using navigation reset so that all the navigation stack will get clear

//       navigation("/dashboard");
//       showSuccessToast(message);

//       dispatch({
//         type: "clearMessage",
//       });
//     }
//   }, [error, message, dispatch]);

//   const getUserAccessToken = async () => {
//     try {
//       const val = await localStorage.getItem('accesstoken');
//       console.log('From SS Access Token :: ' + val);
//       // dispatch(getUserAccessToken(val));
//       dispatch({
//         type: 'getaccesstoken',
//         payload: val,
//       });

//       const timer = setTimeout(() => {
//         if (val) {
//           navigation('/dashboard')
//         } else {
//           navigation('/login')
//         }
//       }, 3000);
//     } catch (error) {
//       console.log('error' + error);
//     }
//   };

//   useEffect(() => {
//     getUserAccessToken();
//   }, []);

//   return (
//     <div className="login-page">
//       <div className="sidebar">
//         <div className="sidebar-top">
//           <h3 style={{ fontFamily: "MR" }}>Hello,</h3>
//           <h2 style={{ fontFamily: "MB" }}>Welcome</h2>
//           <h2 style={{ fontFamily: "MB" }}>To</h2>
//           <h2 style={{ fontFamily: "MB" }}>TheLionWorld</h2>
//         </div>
//         <img src={images.cups} alt="Sidebar Image" className="sidebar-image" />
//       </div>
//       <div className="main-content-login-org">
//         <div className="loginparentbox-login">
//           <div className="loginbox-login">
//             <img
//               src={images.gamecontroller}
//               alt="game controller Image"
//               className="gamecontroller-image-login"
//             />

//             <div className="login-form-login">
//               <h1 style={{ fontFamily: "MB" }}>Log In</h1>
//               <label className="welcome-label-login">
//                 Welcome back! Please enter your details.
//               </label>
//               <div className="form-group-login">
//                 <label className="welcome-label-login">Email:</label>
//                 <input
//                   className="welcome-label-login"
//                   type="email"
//                   name="email"
//                   placeholder="Enter phone or email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </div>
//               <div className="form-group-login">
//                 <label className="welcome-label">Password:</label>
//                 <input
//                   className="welcome-label-login"
//                   type="password"
//                   name="password"
//                   placeholder="Enter Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>

//               <label
//               onClick={() => navigation("/forgotpassword")}
//                 className="welcome-label-login"
//                 style={{
//                   color: COLORS.grayHalfBg,
//                   textAlign: "center",
//                   cursor: "pointer",
//                   fontFamily: FONT.Montserrat_Regular,
//                 }}
//               >
//                 Forgot Password
//               </label>

//               {loading ? (
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     padding: "2vw",
//                   }}
//                 >
//                   <CircularProgressBar />
//                 </div>
//               ) : (
//                 <button onClick={submitHandler} className="submit-btn-login">
//                   Login
//                 </button>
//               )}

//               <label
//                 className="welcome-label-login"
//                 style={{
//                   color: COLORS.grayHalfBg,
//                   textAlign: "center",
//                   fontFamily: FONT.Montserrat_Regular,
//                 }}
//               >
//                 Don’t have an account?{" "}
//                 <span
//                   onClick={handleSignUpClick}
//                   style={{ color: "#0179FE", cursor: "pointer" }}
//                 >
//                   Sign up
//                 </span>
//               </label>
//             </div>
//           </div>
//         </div>
//         <img
//           src={images.cat}
//           alt="Main Content Image"
//           className="main-content-image-login"
//         />
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Login;
// .login-page-login {
//   display: flex;
//   height: 100vh;
//   background-color: #011833;
//   color: white;
// }

// .sidebar-login {
//   width: 20%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
//   padding: 20px;
// }

// .sidebar-top-login {
//   text-align: left;
//   width: 100%;
// }

// .sidebar-image-login {
//   width: 100%;
//   object-fit: cover;
// }

// .main-content-login-org {
//   width: 75%;
//   display: flex;
//   flex-direction: column;
//   justify-content: stretch;
//   padding-top: 5%;
//   position: relative; /* Added this to make it the positioning context */
// }

// .loginparentbox-login {
//   background: linear-gradient(180deg, #0162AF, #011833);
//   width: 80%;
//   height: 80vh;
//   border-radius: 3vh;
// }

// .loginbox-login {
//   background: linear-gradient(180deg, #0162AF, #011833);
//   width: 100%;
//   height: 80vh;
//   border-radius: 3vh;
//   margin-left: 5%;
// }

// .gamecontroller-image-login {
//   width: 14%;
//   object-fit: cover;
//   position: absolute;
//   top: 25%;
//   left: -3%;
// }

// .login-form-login {
//   padding: 20%;
//   border-radius: 10px;
//   width: 80%;
//   height: 60vh;
//   position: relative;
//   margin: 5%;
//   justify-content: stretch;
//   display: flex;
//   flex-direction: column;
//   gap: 20px; /* Updated this to create a 20px gap between each form group */
// }

// .welcome-label-login {
//   font-family: "MR";
//   min-width: 20em;
// }

// .login-form-login form {
//   display: flex;
//   flex-direction: column;
//   gap: 20px; /* Updated this to create a 20px gap between each form group */
// }

// .form-group-login {
//   display: flex;
//   align-items: flex-start;
//   gap: 20px;
//   flex-direction: column;
// }

// .form-group-login label {
//   flex-shrink: 0;
//   width: 100px; /* Adjust as needed */
//   text-align: left;
// }

// .form-group-login input {
//   flex-grow: 1;
//   padding: 10px;
//   border-radius: 5px;
//   border: 1px solid #ccc;
//   width: 100%;
// }

// .form-group-login span{
//   color: #0179FE;
// }

// .submit-btn-login {
//   padding: 10px;
//   border-radius: 5px;
//   background-color: #0179FE;
//   color: white;
//   border: none;
//   cursor: pointer;
//   min-width: 20em;
// }

// .main-content-image-login {
//   width: 35%;
//   object-fit: cover;
//   position: absolute;
//   right: 0;
//   bottom: 0;
// }

// @media (max-width: 768px) {
//   .loginparentbox-login {
//       background: linear-gradient(180deg, #0162AF, #011833);
//       width: 90%;
//       height: 80vh;
//       border-radius: 3vh;
//       margin-top: 30%;
//   }

//   .loginbox-login {
//       background: linear-gradient(180deg, #0162AF, #011833);
//       width: 105%;
//       height: 80vh;
//       border-radius: 3vh;
//       margin-top: 5%;
//       margin-left: 5%;
//   }
//   .login-form-login {
//       padding: 2%;
//       border-radius: 10px;
//       width: 80%;
//       height: 60vh;
//       position: relative;
//       margin: 5%;
//       justify-content: stretch;
//       gap: 10px; /* Added this to create a 20px gap between each item */
//   }
//   .gamecontroller-image-login {
//       width: 14%;
//       object-fit: cover;
//       position: absolute;
//       top: 40%;
//       left: -20%;
//   }
//   .sidebar{
//       display: none;
//   }
//   .main-content-login-org {

//    display: flex;
//    justify-content: center;
//    align-items: center;
//    width: 90%;
//    height: 80vh;

//   }
//   .loginparentbox-login {
//       background: linear-gradient(180deg, #0162AF, #011833);
//       width: 80%;
//       height: 40vh;
//       border-radius: 3vh;
//   }
//   .main-content-image-login {
//       width: 25%;
//       object-fit: cover;
//       position: absolute;
//       right: 0;
//       top: -2vh;
//   }
// }
