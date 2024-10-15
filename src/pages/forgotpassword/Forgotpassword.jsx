import React, { useRef, useState } from "react";
import "./ForgotPassword.css";
import images from "../../assets/constants/images";
import { useNavigate } from "react-router-dom";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { PiSubtitles } from "react-icons/pi";
import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../../components/helper/showErrorToast";
import axios from "axios";
import { useDispatch} from "react-redux";
import CircularProgressBar from "../../components/helper/CircularProgressBar";
import UrlHelper from "../../helper/UrlHelper";
import { LoadingComponent } from "../../components/helper/LoadingComponent";

function Forgotpassword() {
  const [email, setEmail] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [showProgressBar, setProgressBar] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    } else if (!emailRegex.test(email)) {
      showErrorToast("Enter valid email address");
    } else {
      setProgressBar(true);
      try {
        console.log("Starting forgot password");
        console.log("email :: ", email);

        const { data } = await axios.post(
          UrlHelper.FORGOT_PASSWORD_API,
          {
            email: email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("datat :: " + data);

        showSuccessToast(data.message);

        setProgressBar(false);
        setShowOtp(true);
      } catch (error) {
        setProgressBar(false);
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

  //  FOR OTP

  const inputs = Array.from({ length: 6 }, () => useRef(null)); // Adjust length as per your requirement

  const handleChangeText = (e, index) => {
    const text = e.target.value;
    let newOtp = otp.split("");
    newOtp[index] = text;
    newOtp = newOtp.join("");
    setOtp(newOtp);

    if (text.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].current.focus();
    }
  };

  const handleCheckOtp = () => {
    if (otp.length === 6) {
      submitOTPHandler();
      // Alert.alert('Success', 'OTP Entered Successfully :: ' + otp);
    } else {
      showErrorToast("Please enter all six digits of the OTP");
    }
  };

  const submitOTPHandler = async () => {
    console.log("Working on OTP verifcation ");

    setProgressBar(true);

    try {
      console.log("OTP :: " + otp);

      const { data } = await axios.put(
        UrlHelper.FORGOT_PASSWORD_API,
        {
          otp: parseInt(otp),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("datat :: " + data);

      setProgressBar(false);
    } catch (error) {
      setProgressBar(false);
      console.log(error);
      console.log(error.response.data.message);
      

      if (error.response.data.message === "Please enter new password ") {
        // navigation.navigate("ResetPassword", {
        //   otp: otp,
        // });
        setShowResetPassword(true);
        setShowOtp(false)
      } else if (
        error.response.data.message === "Incorrect OTP or OTP has been expired"
      ) {
        showErrorToast(error.response.data.message);
      } else {
        showErrorToast("Something went wrong");
      }
    }
  };

  // FOR RESETING PASSWORD
  const submitHandlerForReset = async () => {
    console.log("Working on Reset Password ");

    if (!password) {
      showErrorToast("Enter password");
    } else if (password.length < 6) {
      showErrorToast("Password must be atleast 6 characters long");
    } else if (!confirmPassword) {
      showErrorToast("Enter confirm password");
    } else if (password != confirmPassword) {
      showErrorToast("Password and Confirm Password Not Matched");
    } else {
      setProgressBar(true);

      try {
        const { data } = await axios.put(
          UrlHelper.FORGOT_PASSWORD_API,
          {
            otp: otp,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("datat :: " + data);

        showSuccessToast(data.message);
        navigation("/login")
        setProgressBar(false);
      } catch (error) {
        setProgressBar(false);
        console.log(error);
        console.log(error.response.data.message);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="loginContainer">
    <div className="loginContainerLeft">
      <label className="labelHeader">Hello,</label>
      <label className="labelHeader">Welcome</label>
      <label className="labelHeader">To</label>
      <label className="labelHeader">TheWorldPlay</label>

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
        {/** SHOWING FORGOT CONTAINER */}
        {!showOtp && !showResetPassword && (
          <div className="rightParenCMain">
            <label className="labelHeader">Forgot Password</label>

            <label className="labelSubHeader">
              {" "}
              Please enter your details.
            </label>
            {/** EMAIL */}
            <label className="alCLLabel">Email</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {showProgressBar ? (
              <LoadingComponent />
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
        )}

        {/** SHOOWING OTP CONTAINER */}
        {showOtp && (
          <div className="rightParenCMain">
            <label className="labelHeader">Forgot Password</label>

            <label className="labelSubHeader">
              {" "}
              Enter the One time password sent to your Account
            </label>
            {/** EMAIL */}
            <label className="alCLLabel">OTP</label>
            <div className="fotpContainer">
              <div className="otpContainer">
                {inputs.map((input, index) => (
                  <input
                    key={index}
                    className="otp-input"
                    type="text"
                    value={otp[index] || ""}
                    ref={input}
                    onChange={(e) => handleChangeText(e, index)}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            {showProgressBar ? (
              <LoadingComponent />
            ) : (
              <div className="lBottomContainer" onClick={handleCheckOtp}>
                <label className="alBottomContainerlabel">Verify OTP</label>
              </div>
            )}

            <div className="lfContainer">
              <label className="alBottomContainerlabel">
                Don’t have an account?{" "}
              </label>
              <label onClick={handleSignUpClick} className="lBottomContainerlabel">Sign up</label>
            </div>
          </div>
        )}

        {/** SHOWING RESETTING PASSWORD CONTAINER */}
        {showResetPassword && !showOtp && (
          <div className="rightParenCMain">
            <label className="labelHeader">Reset Password</label>

            {/** PASSWORD */}
            <label className="alCLLabel">Password</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/** CONFIMR PASSWORD */}
            <label className="alCLLabel">Confirm Password</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {showProgressBar ? (
              <LoadingComponent />
            ) : (
              <div
                className="lBottomContainer"
                onClick={submitHandlerForReset}
              >
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}
          </div>
        )}
      </div>
    </div>

    <ToastContainer />
  </div>
  );
}

export default Forgotpassword;



// import React, { useRef, useState } from "react";
// import "./ForgotPassword.css";
// import images from "../../assets/constants/images";
// import { useNavigate } from "react-router-dom";
// import COLORS from "../../assets/constants/colors";
// import FONT from "../../assets/constants/fonts";
// import { ToastContainer } from "react-toastify";
// import {
//   showErrorToast,
//   showSuccessToast,
//   showWarningToast,
// } from "../../components/helper/showErrorToast";
// import axios from "axios";
// import { useDispatch} from "react-redux";
// import CircularProgressBar from "../../components/helper/CircularProgressBar";
// import UrlHelper from "../../helper/UrlHelper";

// function Forgotpassword() {
//   const [email, setEmail] = useState("");

//   const [showOtp, setShowOtp] = useState(false);
//   const [showProgressBar, setProgressBar] = useState(false);
//   const [showResetPassword, setShowResetPassword] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

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
//     } else if (!emailRegex.test(email)) {
//       showErrorToast("Enter valid email address");
//     } else {
//       setProgressBar(true);
//       try {
//         console.log("Starting forgot password");
//         console.log("email :: ", email);

//         const { data } = await axios.post(
//           UrlHelper.FORGOT_PASSWORD_API,
//           {
//             email: email,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         console.log("datat :: " + data);

//         showSuccessToast(data.message);

//         setProgressBar(false);
//         setShowOtp(true);
//       } catch (error) {
//         setProgressBar(false);
//         showErrorToast("Someting went wrong");
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

//   //  FOR OTP

//   const inputs = Array.from({ length: 6 }, () => useRef(null)); // Adjust length as per your requirement

//   const handleChangeText = (e, index) => {
//     const text = e.target.value;
//     let newOtp = otp.split("");
//     newOtp[index] = text;
//     newOtp = newOtp.join("");
//     setOtp(newOtp);

//     if (text.length === 1 && index < inputs.length - 1) {
//       inputs[index + 1].current.focus();
//     }
//   };

//   const handleCheckOtp = () => {
//     if (otp.length === 6) {
//       submitOTPHandler();
//       // Alert.alert('Success', 'OTP Entered Successfully :: ' + otp);
//     } else {
//       showErrorToast("Please enter all six digits of the OTP");
//     }
//   };

//   const submitOTPHandler = async () => {
//     console.log("Working on OTP verifcation ");

//     setProgressBar(true);

//     try {
//       console.log("OTP :: " + otp);

//       const { data } = await axios.put(
//         UrlHelper.FORGOT_PASSWORD_API,
//         {
//           otp: parseInt(otp),
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("datat :: " + data);

//       setProgressBar(false);
//     } catch (error) {
//       setProgressBar(false);
//       console.log(error);
//       console.log(error.response.data.message);
      

//       if (error.response.data.message === "Please enter new password ") {
//         // navigation.navigate("ResetPassword", {
//         //   otp: otp,
//         // });
//         setShowResetPassword(true);
//         setShowOtp(false)
//       } else if (
//         error.response.data.message === "Incorrect OTP or OTP has been expired"
//       ) {
//         showErrorToast(error.response.data.message);
//       } else {
//         showErrorToast("Something went wrong");
//       }
//     }
//   };

//   // FOR RESETING PASSWORD
//   const submitHandlerForReset = async () => {
//     console.log("Working on Reset Password ");

//     if (!password) {
//       showErrorToast("Enter password");
//     } else if (password.length < 6) {
//       showErrorToast("Password must be atleast 6 characters long");
//     } else if (!confirmPassword) {
//       showErrorToast("Enter confirm password");
//     } else if (password != confirmPassword) {
//       showErrorToast("Password and Confirm Password Not Matched");
//     } else {
//       setProgressBar(true);

//       try {
//         const { data } = await axios.put(
//           UrlHelper.FORGOT_PASSWORD_API,
//           {
//             otp: otp,
//             password: password,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         console.log("datat :: " + data);

//         showSuccessToast(data.message);
//         navigation("/login")
//         setProgressBar(false);
//       } catch (error) {
//         setProgressBar(false);
//         console.log(error);
//         console.log(error.response.data.message);
//         showErrorToast("Something went wrong");
//         console.log(error);
//       }
//     }
//   };

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
//       <div className="main-content">
//         <div className="loginparentbox-login">
//           <div className="loginbox-login">
//             <img
//               src={images.gamecontroller}
//               alt="game controller Image"
//               className="gamecontroller-image-login"
//             />
//             {/** SHOWING FORGOT CONTAINER */}
//             {!showOtp && !showResetPassword && (
//               <div className="login-form-login">
//                 <h1 style={{ fontFamily: "MB" }}>Forgot Password</h1>
//                 <label className="welcome-label-login">
//                   Please enter your email address.
//                 </label>
//                 <div className="form-group-login">
//                   <label className="welcome-label-login">Email:</label>
//                   <input
//                     className="welcome-label-login"
//                     type="email"
//                     name="email"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 {showProgressBar ? (
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       padding: "2vw",
//                     }}
//                   >
//                     <CircularProgressBar />
//                   </div>
//                 ) : (
//                   <button onClick={submitHandler} className="submit-btn-login">
//                     Submit
//                   </button>
//                 )}

//                 <label
//                   className="welcome-label-login"
//                   style={{
//                     color: COLORS.grayHalfBg,
//                     textAlign: "center",
//                     fontFamily: FONT.Montserrat_Regular,
//                   }}
//                 >
//                   Don’t have an account?{" "}
//                   <span
//                     onClick={handleSignUpClick}
//                     style={{ color: "#0179FE", cursor: "pointer" }}
//                   >
//                     Sign up
//                   </span>
//                 </label>
//               </div>
//             )}

//             {/** SHOOWING OTP CONTAINER */}

//             {showOtp && (
//               <div className="login-form-login-otp">
//                 <h1 style={{ fontFamily: "MB" }}>Forgot Password</h1>
//                 <label className="welcome-label-login">
//                   Enter the One time password sent to your Account
//                 </label>
//                 <div
//                   className="form-group-login-p-container"
//                   style={{ flexDirection: "row" }}
//                 >
//                   {inputs.map((input, index) => (
//                     <input
//                       key={index}
//                       className="welcome-label-login-p-input"
//                       style={{
//                         maxWidth: "3vw",
//                         padding: "1vw",
//                         borderRadius: "1vw",
//                         border: "1px solid #ccc",
//                         color: "#000", // Ensure the text color is visible
//                       }}
//                       type="text"
//                       value={otp[index] || ""}
//                       ref={input}
//                       onChange={(e) => handleChangeText(e, index)}
//                       autoFocus={index === 0}
//                     />
//                   ))}
//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     padding: "2vw",
//                   }}
//                 >
//                   {showProgressBar ? (
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         padding: "2vw",
//                       }}
//                     >
//                       <CircularProgressBar />
//                     </div>
//                   ) : (
//                     <button
//                       onClick={handleCheckOtp}
//                       className="submit-btn-login"
//                     >
//                       Submit
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/** SHOWING RESETTING PASSWORD CONTAINER */}

//             {showResetPassword && !showOtp && (
//               <div className="login-form-login-otp">
//                 <h1 style={{ fontFamily: "MB" }}>Reset Password</h1>
//                 <div className="form-group-login-p-container">
//                   <div className="form-group">
//                     <label className="welcome-label">Password:</label>
//                     <input
//                       className="welcome-label"
//                       type="password"
//                       name="password"
//                       placeholder="Enter Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label className="welcome-label">Confirm Password:</label>
//                     <input
//                       className="welcome-label"
//                       type="password"
//                       name="password"
//                       placeholder="Enter Confirm Password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     padding: "2vw",
//                   }}
//                 >
//                   {showProgressBar ? (
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         padding: "2vw",
//                       }}
//                     >
//                       <CircularProgressBar />
//                     </div>
//                   ) : (
//                     <button
//                       onClick={submitHandlerForReset}
//                       className="submit-btn-login"
//                     >
//                       Submit
//                     </button>
//                   )}
//                 </div>
//               </div>
//             )}
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

// export default Forgotpassword;




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

// .main-content-login {
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

// .welcome-label-login-p-input{
//   margin: 2vh;
//   color: black;
//   font-family: 'MB';
//   font-size: medium;
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

// .form-group-login-p-container {
//   display: flex;
//   align-items: flex-start;
//   gap: 20px;
//   flex-direction: column;
//   min-height: 60vh;
//   justify-content: center;
//   align-items: center;
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
// }
