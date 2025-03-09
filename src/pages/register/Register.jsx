// import React, { useState } from "react";
// import "./Register.css";
// import images from "../../assets/constants/images";
// import COLORS from "../../assets/constants/colors";
// import { useNavigate } from "react-router-dom";
// import {
//   showErrorToast,
//   showSuccessToast,
// } from "../../components/helper/showErrorToast";
// import axios from "axios";
// import UrlHelper from "../../helper/UrlHelper";
// import { useSelector } from "react-redux";
// import { ToastContainer } from "react-toastify";
// import { IoIosArrowDropdown } from "react-icons/io";
// import {
//   useCreateRegisterMutation,
//   useGetAllCountryQuery,
// } from "../../helper/Networkcall";
// import Loader from "../../components/helper/Loader";
// import CircularProgressBar from "../../components/helper/CircularProgressBar";
// import { MdEmail } from "react-icons/md";
// import { FaPhoneAlt } from "react-icons/fa";
// import { FaGoogle } from "react-icons/fa";
// import { serverName } from "../../redux/store";

// function Register() {
//   const navigate = useNavigate();

//   const handleSignInClick = () => {
//     // navigate("/login");
//     submitHandler();
//   };

//   const navigation = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [userDeviceToken, setUserDeviceToken] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState("Select country");
//   const [signupwith, setsignupwith] = useState("");
//   const [showCountry, setShowCountry] = useState(false);

//   const showingContryContainer = () => {
//     if (showCountry === false) {
//       setShowCountry(true);
//     } else {
//       setShowCountry(false);
//     }
//   };

//   const selectingContryContainer = (item) => {
//     if (showCountry === false) {
//       setShowCountry(true);
//     } else {
//       setShowCountry(false);
//     }
//     setSelectedCountry(item.countryname);
//   };

//   const {
//     data: currecylist,
//     isLoading: currencyloading,
//     error: currencyerror,
//   } = useGetAllCountryQuery();

//   const [createRegister, { isLoading, error }] = useCreateRegisterMutation();

//   const [showProgressBar, setProgressBar] = useState(false);
//   // const signupwith = "emailtype";

//   const submitHandler = async () => {
//     console.log("Starting register");
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

//     console.log("Email :: " + email);
//     console.log("name :: " + name);
//     console.log("devicetoken :: " + userDeviceToken);

//     if (signupwith === "emailtype") {
//       if (!name) {
//         showErrorToast("Enter name");
//       } else if (!email) {
//         showErrorToast("Enter email address");
//       } else if (!emailRegex.test(email)) {
//         showErrorToast("Enter valid email address");
//       } else if (!selectedCountry === "Select Country") {
//         showErrorToast("Please select your country");
//       } else if (!password) {
//         showErrorToast("Enter password");
//       } else if (password.length < 6) {
//         showErrorToast("Password must be atleast 6 characters long");
//       } else if (!confirmPassword) {
//         showErrorToast("Enter confirm password");
//       } else if (password != confirmPassword) {
//         showErrorToast("Password and Confirm Password Not Matched");
//       } else {
//         console.log("Email :: " + email);
//         console.log("name :: " + name);
//         console.log("devicetoken :: " + userDeviceToken);

//         showSuccessToast("Processing");

//         try {
//           const body = {
//             name: name,
//             email: email,
//             password: password,
//             role: "user",
//             country: selectedCountry._id,
//           };

//           const res = await createRegister({
//             body,
//           }).unwrap();

//           console.log("datat :: " + res);
//           navigation("/login");
//         } catch (error) {
//           showErrorToast(error?.data?.message);
//           console.log(error);
//           console.log(error.response);
//         }
//       }
//     } else {
//       if (!name) {
//         showErrorToast("Enter name");
//       } else if (!email) {
//         showErrorToast("Enter phone number");
//       } else if (!phoneRegex.test(email)) {
//         showErrorToast("Enter valid Phone number");
//       } else if (!selectedCountry === "Select Country") {
//         showErrorToast("Please select your country");
//       } else if (!password) {
//         showErrorToast("Enter password");
//       } else if (password.length < 6) {
//         showErrorToast("Password must be atleast 6 characters long");
//       } else if (!confirmPassword) {
//         showErrorToast("Enter confirm password");
//       } else if (password != confirmPassword) {
//         showErrorToast("Password and Confirm Password Not Matched");
//       } else {
//         showSuccessToast("Processing");

//         try {
//           const body = {
//             name: name,
//             email: email,
//             password: password,
//             role: "user",
//             country: selectedCountry._id,
//           };

//           const res = await createRegister({
//             body,
//           }).unwrap();

//           console.log("datat :: " + res);
//           navigation("/login");
//         } catch (error) {
//           showErrorToast(error?.data?.message);
//           console.log(error);
//           console.log(error.response);
//         }
//       }
//     }
//   };

//    const settingForGoogleAuth = () => {
//     // setsignupwith("googletype")
//     showSuccessToast("Processing...")

//    }

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
//         <div className="loginparentbox">
//           <div className="loginbox">
//             <img
//               src={images.gamecontroller}
//               alt="game controller Image"
//               className="gamecontroller-image"
//             />

//             {/** DIFFERNET REGISTER TYPE */}

//             {signupwith === "" && (
//               <div className="login-form-register">
//                 <h1 style={{ fontFamily: "MB" }}>Register</h1>
//                 <label
//                   className="welcome-label"
//                   style={{ marginBottom: "1vw" }}
//                 >
//                   Welcome , Please enter your details.
//                 </label>

//                 <div
//                   style={{
//                     flex: "1",
//                     marginTop: "1vw",
//                   }}
//                 >
//                   <div
//                     onClick={() => setsignupwith("emailtype")}
//                     className="form-group-select-country_container"
//                     style={{
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       cursor: "pointer",
//                       backgroundColor: COLORS.background,
//                       marginTop: "3vh"
//                     }}
//                   >
//                     <label
//                       className="welcome-label-select-country"
//                       style={{ color: COLORS.white_s }}
//                     >
//                       Sign up with Email
//                     </label>
//                     <div
//                       style={{
//                         justifyContent: "center",
//                         alignItems: "center",
//                         marginRight: "1vw",
//                       }}
//                     >
//                       <MdEmail color={COLORS.white_s} size={"1.2em"} />
//                     </div>
//                   </div>

//                   {/** PHONE */}

//                   <div
//                     onClick={() => setsignupwith("phonetype")}
//                     className="form-group-select-country_container"
//                     style={{
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       cursor: "pointer",
//                       backgroundColor: COLORS.background,
//                       marginTop: "1vw",
//                     }}
//                   >
//                     <label
//                       className="welcome-label-select-country"
//                       style={{ color: COLORS.white_s }}
//                     >
//                       Sign up with Phone
//                     </label>
//                     <div
//                       style={{
//                         justifyContent: "center",
//                         alignItems: "center",
//                         marginRight: "1vw",
//                       }}
//                     >
//                       <FaPhoneAlt color={COLORS.white_s} size={"1.2em"} />
//                     </div>
//                   </div>

//                   {/** google */}

//                   <div
//                     onClick={settingForGoogleAuth}
//                     className="form-group-select-country_container"
//                     style={{
//                       display: "flex",
//                       flexDirection: "row",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       cursor: "pointer",
//                       backgroundColor: COLORS.background,
//                       marginTop: "1vw",
//                       marginBottom: "3vh",
//                     }}
//                   >
//                     <label
//                       className="welcome-label-select-country"
//                       style={{ color: COLORS.white_s }}
//                     >
//                       Sign up with Google
//                     </label>
//                     <div
//                       style={{
//                         justifyContent: "center",
//                         alignItems: "center",
//                         marginRight: "1vw",
//                       }}
//                     >
//                       <FaGoogle color={COLORS.white_s} size={"1.2em"} />
//                     </div>
//                   </div>
//                 </div>

//                 <label
//                   className="welcome-label"
//                   style={{
//                     color: COLORS.grayHalfBg,
//                     textAlign: "center",
//                     alignContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   Already have an account?{" "}
//                 </label>
//                 <label className="welcome-label">
//                   <span
//                     onClick={() => navigate("/login")}
//                     style={{ color: "#0179FE", cursor: "pointer" }}
//                   >
//                     Sign In
//                   </span>
//                 </label>
//               </div>
//             )}

//             {/** LOGIN FORM CONTAINER  EMAIL*/}

//             {signupwith === "emailtype" && !showCountry && (
//               <div className="login-form-register">
//                 <h1 style={{ fontFamily: "MB" }}>Register</h1>
//                 <label className="welcome-label">
//                   Welcome , Please enter your details.
//                 </label>
//                 <div className="form-group">
//                   <label className="welcome-label">Name:</label>
//                   <input
//                     className="welcome-label"
//                     type="text"
//                     name="name"
//                     placeholder="Enter name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>

//                 <div className="form-group">
//                 <label className="welcome-label">Email:</label>
//                   <input
//                     className="welcome-label"
//                     type="email"
//                     name="email"
//                     placeholder="Enter email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="welcome-label">Password:</label>
//                   <input
//                     className="welcome-label"
//                     type="password"
//                     name="password"
//                     placeholder="Enter Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="welcome-label">Confirm Password:</label>
//                   <input
//                     className="welcome-label"
//                     type="password"
//                     name="password"
//                     placeholder="Enter Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </div>
//                 <label className="welcome-label">Country</label>
//                 <div
//                   onClick={showingContryContainer}
//                   className="form-group-select-country_container"
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     backgroundColor: COLORS.white_s,
//                   }}
//                 >
//                   <label className="welcome-label-select-country">
//                     {selectedCountry}
//                   </label>
//                   <div
//                     style={{
//                       justifyContent: "center",
//                       alignItems: "center",
//                       marginRight: "1vw",
//                     }}
//                   >
//                     <IoIosArrowDropdown color={COLORS.black} size={"1.5em"} />
//                   </div>
//                 </div>
//                 {isLoading ? (
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
//                   <button
//                     onClick={submitHandler}
//                     className="submit-btn-register"
//                     type="submit"
//                   >
//                     Register
//                   </button>
//                 )}
//                 <label
//                   className="welcome-label"
//                   style={{
//                     color: COLORS.grayHalfBg,
//                     textAlign: "center",
//                     alignContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   Already have an account?{" "}
//                 </label>
//                 <label className="welcome-label">
//                   <span
//                     onClick={() => navigate("/login")}
//                     style={{ color: "#0179FE", cursor: "pointer" }}
//                   >
//                     Sign In
//                   </span>
//                 </label>
//               </div>
//             )}

//             {/** LOGIN FORM CONTAINER  PHONETYPE*/}

//             {signupwith === "phonetype" && !showCountry && (
//               <div className="login-form-register">
//                 <h1 style={{ fontFamily: "MB" }}>Register</h1>
//                 <label className="welcome-label">
//                   Welcome , Please enter your details.
//                 </label>
//                 <div className="form-group">
//                   <label className="welcome-label">Name:</label>
//                   <input
//                     className="welcome-label"
//                     type="text"
//                     name="name"
//                     placeholder="Enter name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />
//                 </div>
//                 <label className="welcome-label">Phone no:</label>
//                 <div className="form-group">
//                   <input
//                     className="welcome-label"
//                     type="number"
//                     name="phonenumber"
//                     placeholder="Enter phone number"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="welcome-label">Password:</label>
//                   <input
//                     className="welcome-label"
//                     type="password"
//                     name="password"
//                     placeholder="Enter Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label className="welcome-label">Confirm Password:</label>
//                   <input
//                     className="welcome-label"
//                     type="password"
//                     name="password"
//                     placeholder="Enter Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </div>
//                 <label className="welcome-label">Country</label>
//                 <div
//                   onClick={showingContryContainer}
//                   className="form-group-select-country_container"
//                   style={{
//                     display: "flex",
//                     flexDirection: "row",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     cursor: "pointer",
//                     backgroundColor: COLORS.white_s,
//                   }}
//                 >
//                   <label className="welcome-label-select-country">
//                     {selectedCountry}
//                   </label>
//                   <div
//                     style={{
//                       justifyContent: "center",
//                       alignItems: "center",
//                       marginRight: "1vw",
//                     }}
//                   >
//                     <IoIosArrowDropdown color={COLORS.black} size={"1.5em"} />
//                   </div>
//                 </div>
//                 {isLoading ? (
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
//                   <button
//                     onClick={submitHandler}
//                     className="submit-btn-register"
//                     type="submit"
//                   >
//                     Register
//                   </button>
//                 )}
//                 <label
//                   className="welcome-label"
//                   style={{
//                     color: COLORS.grayHalfBg,
//                     textAlign: "center",
//                     alignContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   Already have an account?{" "}
//                 </label>
//                 <label className="welcome-label">
//                   <span
//                      onClick={() => navigate("/login")}
//                     style={{ color: "#0179FE", cursor: "pointer" }}
//                   >
//                     Sign In
//                   </span>
//                 </label>
//               </div>
//             )}

//             {/** COUNTRY CONTAINER */}

//             {signupwith !== "" && showCountry && (
//               <div className="login-form-register">
//                 <h1 style={{ fontFamily: "MB", marginBottom: "1vw" }}>
//                   Select Country
//                 </h1>

//                 {currencyloading ? (
//                   <div
//                     style={{
//                       flex: "1",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <CircularProgressBar />
//                   </div>
//                 ) : (
//                   currecylist.currencies.map((item, index) => (
//                     <div
//                       onClick={() => selectingContryContainer(item)}
//                       className="form-group-select-country_container"
//                       style={{
//                         display: "flex",
//                         flexDirection: "row",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         cursor: "pointer",
//                         backgroundColor: COLORS.white_s,
//                         marginBottom: "1vw",
//                       }}
//                     >
//                       <div className="ltcrightimaged">

//                       {item?.countryicon ? (
//                         <img
//                         src={`${serverName}/uploads/currency/${item.countryicon}`}
//                         alt="Profile Picture"
//                         className="user-imaged"
//                       />
//                       ) : (
//                         <img
//                         src={images.user}
//                         alt="Profile Picture"
//                         className="user-imaged"
//                       />
//                       )}

//                       </div>
//                       <label className="welcome-label-select-country">
//                         {item.countryname}
//                       </label>
//                       <div
//                         style={{
//                           justifyContent: "center",
//                           alignItems: "center",
//                           marginRight: "1vw",
//                         }}
//                       >
//                         <IoIosArrowDropdown
//                           color={COLORS.black}
//                           size={"1.5em"}
//                         />
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//         <img
//           src={images.cat}
//           alt="Main Content Image"
//           className="main-content-image"
//         />
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default Register;

// .login-page {
//   display: flex;
//   height: 100vh;
//   background-color: #011833;
//   color: white;
//   overflow: hidden;
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
//   top: 25%;
//   left: -3%;
// }

// .login-form-register {
//   padding: 10%;
//   border-radius: 10px;
//   width: 80%;
//   height: 90vh;
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   gap: 10px;
//   padding-top: 20px;

//   overflow-y: scroll;
// }

// .welcome-label {
//   font-family: "MR";
//   min-width: 20em;
//   margin-bottom: 1vw;

// }

// .welcome-label-select-country{
//   font-family: "MR";
//   min-width: 20em;
//   flex-grow: 1;
//   padding: 10px;
//   width: 100%;
//   font-size: 1vw;
//   color: var(--darkGray);
// }

// .welcome-label-select-country:hover{
//   cursor: pointer;
// }

// .form-group-select-country_container{
//   display: flex;
//   align-items: flex-start;
//   flex-direction: row;
//   border-radius: 10px;
//   border: 1px solid #ccc;
// }

// .form-group-select-country_container:hover{
//   border: 2px solid var(--green); /* Change border color on hover */
//   cursor: pointer;
// }

// .login-form form {
//   display: flex;
//   flex-direction: column;
//   /* Updated this to create a 20px gap between each form group */
// }

// .form-group {
//   display: flex;
//   align-items: flex-start;

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

// .submit-btn-register {
//   flex-grow: 1;
//   padding: 10px;
//   border-radius: 5px;
//   background-color: #0179FE;
//   color: white;
//   border: none;
//   cursor: pointer;
//   width: 100%;
//   margin-top: 2vw;
//   margin-bottom: 2vw;
// }

// .main-content-image {
//   width: 35%;
//   object-fit: cover;
//   position: absolute;
//   right: 0;
//   bottom: 0;
// }

// @media (max-width: 1024px) {
//   .loginparentbox {
//       background: linear-gradient(180deg, #0162AF, #011833);
//       width: 90%;
//       height: 80vh;
//       border-radius: 3vh;

//   }

//   .loginbox {
//       background: linear-gradient(180deg, #0162AF, #011833);
//       width: 105%;
//       height: 80vh;
//       border-radius: 3vh;
//       margin-top: 5%;
//       margin-left: 5%;

//   }
//   .login-form-register {
//       padding: 2%;
//       border-radius: 10px;
//       width: 80%;
//       height: 70vh;
//       position: relative;
//       margin: 5%;
//       justify-content: stretch;

//   }
//   .gamecontroller-image {
//       width: 14%;
//       object-fit: cover;
//       position: absolute;
//       top: 40%;
//       left: -20%;
//   }
//   .form-group {
//       display: flex;
//       align-items: flex-start;
//       gap: 1vw;
//       flex-direction: column;

//   }
//   .welcome-label-select-country{
//       font-family: "MR";
//       min-width: 20em;
//       flex-grow: 1;
//       padding: 10px;
//       width: 100%;
//       font-size: 1.4vw;
//       color: var(--darkGray);
//   }
// }

// @media (max-width: 768px) {
//   .loginparentbox {
//       background: linear-gradient(180deg, #0162AF, #011833);
//       width: 90%;
//       height: 80vh;
//       border-radius: 3vh;
//       margin-top: 2%;
//   }

//   .loginbox {
//       background: linear-gradient(180deg, #0162AF, #011833);
//       width: 105%;
//       height: 80vh;
//       border-radius: 3vh;
//       margin-top: 5%;
//       margin-left: 5%;

//   }
//   .login-form-register {
//       padding: 2%;
//       border-radius: 10px;
//       width: 80%;
//       height: 70vh;
//       position: relative;
//       margin: 5%;
//       justify-content: center;
//       gap: 2vw; /* Added this to create a 20px gap between each item */

//   }
//   .gamecontroller-image {
//       width: 14%;
//       object-fit: cover;
//       position: absolute;
//       top: 40%;
//       left: -20%;
//   }
//   .form-group {
//       display: flex;
//       align-items: flex-start;
//       gap: 1vw;
//       flex-direction: column;
//       margin-top: 4vw;
//   }
//   .sidebar{
//       display: none;
//   }
//   .main-content {
//       display: flex;
//       flex-direction: column;
//       justify-content: center;

//       align-items: center;
//       position: relative; /* Added this to make it the positioning context */

//       width: 90%;
//       height: 80vh;

//   }
//   .form-group-select-country_container{
//       display: flex;
//       align-items: flex-start;
//       flex-direction: row;
//       border-radius: 10px;
//       border: 1px solid #ccc;
//   }
//   .welcome-label-select-country{
//       font-family: "MR";
//       min-width: 2em;
//       flex-grow: 1;
//       padding: 10px;
//       width: 100%;
//       font-size: 10px;
//       color: var(--black);
//   }
//   .welcome-label-select-country{
//       font-family: "MR";
//       min-width: 20em;
//       flex-grow: 1;
//       padding: 10px;
//       width: 100%;
//       font-size: 2.4vw;
//       color: var(--darkGray);
//   }

// }

import React, { useEffect, useState } from "react";
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
import { FaPhoneAlt } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { serverName } from "../../redux/store";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { CiCircleChevDown } from "react-icons/ci";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

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
  const [selectedCountryOrg, setSelectedCountryOrg] = useState(null);
  const [signupwith, setsignupwith] = useState("");
  const [showCountry, setShowCountry] = useState(false);
  const [showRegiter, setShowRegister] = useState(false);
  const [showR, setShowR] = useState(true);
  const [parentId, setParentId] = useState("");

  const showingContryContainer = () => {
    if (showCountry === false) {
      setShowCountry(true);
    } else {
      setShowCountry(false);
    }
  };

  // const selectingContryContainer = (item) => {
  //   if (showCountry === false) {
  //     setShowCountry(true);
  //   } else {
  //     setShowCountry(false);
  //   }
  //   setSelectedCountry(item.countryname);
  // };

  const selectingContryContainer = (item) => {
    setSelectedCountry(item.countryname);
    setSelectedCountryOrg(item);
    setShowCountry(false);
    setShowRegister(true);
  };

  const settingAC = () => {
    console.log("SETTING ALL COUNTRY");
    setShowCountry(true);
    setShowRegister(false);
  };

  const settingRegister = (item) => {
    console.log("SETTING REGISTER");
    setShowCountry(false);
    setShowR(false);
    setShowRegister(true);
    setsignupwith(item);
  };

  const backhandlerAC = () => {
    setShowCountry(false);
    setShowRegister(true);
  };

  const {
    data: currecylist,
    isLoading: currencyloading,
    error: currencyerror,
  } = useGetAllCountryQuery();

  const [createRegister, { isLoading, error }] = useCreateRegisterMutation();

  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = currecylist?.currencies?.filter((item) =>
      item.countryname.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (currecylist) {
      setFilteredData(currecylist?.currencies);
    }
  }, [currecylist]);

  const [showProgressBar, setProgressBar] = useState(false);
  // const signupwith = "emailtype";

  const submitHandler = async () => {
    console.log("Starting register");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex =
      /^(?:\+?\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?)[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

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
          // const body = {
          //   name: name,
          //   email: email,
          //   password: password,
          //   role: "user",
          //   country: selectedCountryOrg._id,
          // };

          let body = {};

          if (parentId) {
            body = {
              name: name,
              email: email,
              password: password,
              role: "user",
              country: selectedCountryOrg._id,
              parentId,
            };
          } else {
            body = {
              name: name,
              email: email,
              password: password,
              role: "user",
              country: selectedCountryOrg._id,
            };
          }

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
          // const body = {
          //   name: name,
          //   email: email,
          //   password: password,
          //   role: "user",
          //   country: selectedCountryOrg._id,
          // };

          let body = {};

          if (parentId) {
            body = {
              name: name,
              email: email,
              password: password,
              role: "user",
              country: selectedCountryOrg._id,
              parentId,
            };
          } else {
            body = {
              name: name,
              email: email,
              password: password,
              role: "user",
              country: selectedCountryOrg._id,
            };
          }

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
    showSuccessToast("Processing...");
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
        <div className="rightParenCR">
          {showR && (
            <div className="rightParenCMainR">
              <label className="labelHeader">Register With</label>

              <div
                className="alSearchContainer"
                onClick={() => settingRegister("emailtype")}
              >
                <div className="searchIconContainer">
                  <MdEmail color={COLORS.background} size={"2.5rem"} />
                </div>

                <label
                  className="al-search-input"
                  style={{ alignSelf: "center" }}
                >
                  Sign Up with Email
                </label>
                <div className="searchIconContainer">
                  <CiCircleChevDown color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>

              <div
                className="alSearchContainer"
                onClick={() => settingRegister("phonetype")}
              >
                <div className="searchIconContainer">
                  <FaPhoneAlt color={COLORS.background} size={"2.5rem"} />
                </div>

                <label
                  className="al-search-input"
                  style={{ alignSelf: "center" }}
                >
                  Sign Up with Phone
                </label>
                <div className="searchIconContainer">
                  <CiCircleChevDown color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>

              <div className="noteBottomContainer">
                <span className="noteTextLabel">
                  NOTE : The Password Reset Option Is Available For Accounts
                  With Email Signup Only.
                </span>
              </div>
            </div>
          )}

          {showRegiter && (
            <div className="rightParenCMainR">
              <label className="labelHeader">Register Now</label>

              {/** NAME */}
              <label className="alCLLabel">Name</label>
              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <FaRegUserCircle color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {signupwith === "emailtype" ? (
                <>
                  {/** EMAIL */}
                  <label className="alCLLabel">Email</label>
                  <div className="alSearchContainer">
                    <div className="searchIconContainer">
                      <MdEmail color={COLORS.background} size={"2.5rem"} />
                    </div>

                    <input
                      className="al-search-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  {/** PHONE */}
                  <label className="alCLLabel">Phone</label>
                  <div className="alSearchContainer">
                    <div className="searchIconContainer">
                      <FaPhoneAlt color={COLORS.background} size={"2.5rem"} />
                    </div>

                    <input
                      className="al-search-input"
                      placeholder="Enter your phone number"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/** PASSWORD */}
              <label className="alCLLabel">Password</label>
              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <MdOutlinePassword
                    color={COLORS.background}
                    size={"2.5rem"}
                  />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/** CONFIMRM PASSWORD */}
              <label className="alCLLabel">Confirm Password</label>
              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <MdOutlinePassword
                    color={COLORS.background}
                    size={"2.5rem"}
                  />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/** SELECT COUNTRY */}
              <label className="alCLLabel">Country</label>
              <div className="alSearchContainer" onClick={settingAC}>
                <div className="searchIconContainer">
                  <TbWorld color={COLORS.background} size={"2.5rem"} />
                </div>

                <label
                  className="al-search-input"
                  style={{ alignSelf: "center" }}
                >
                  {selectedCountry}
                </label>
                <div className="searchIconContainer">
                  <CiCircleChevDown color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>

              {/** NAME */}
              <label className="alCLLabel">Partner Id</label>
              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <FaRegUserCircle color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Partner ID (Optional)"
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                />
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
                <div onClick={submitHandler} className="lBottomContainer">
                  <label className="alBottomContainerlabel">Submit</label>
                </div>
              )}

              <div className="lfContainer">
                <label className="alBottomContainerlabel">
                  Already have an account?{" "}
                </label>
                <label
                  onClick={() => navigation("/login")}
                  className="lBottomContainerlabel"
                >
                  Login
                </label>
              </div>
            </div>
          )}

          {showCountry && (
            <div className="rightParenCMainR">
              {/** TOP NAVIGATION CONTATINER */}
              <div className="alCreatLocationTopContainer">
                <div className="searchIconContainer" onClick={backhandlerAC}>
                  <IoArrowBackCircleOutline
                    color={COLORS.white_s}
                    size={"2.5rem"}
                  />
                </div>
                <div className="alCreatLocationTopContaineCL">
                  <label className="alCreatLocationTopContainerlabel">
                    All Country
                  </label>
                </div>
              </div>
              <label className="labelHeader">Select your Country</label>

              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <CiSearch color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Search"
                  label="Search"
                  onChange={handleSearch}
                />
              </div>

              {/** SELECT COUNTRY */}

              {isLoading ? (
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
                filteredData.map((item, index) => (
                  <div
                    key={index}
                    className="alSearchContainer"
                    onClick={() => selectingContryContainer(item)}
                  >
                    <div className="c-iconContainer">
                      {item?.countryicon ? (
                        <img
                          src={`${serverName}/uploads/currency/${item.countryicon}`}
                          alt="country icon"
                          className="c-icon"
                        />
                      ) : (
                        <img
                          src={images.user}
                          alt="country icon"
                          className="c-icon"
                        />
                      )}
                    </div>

                    <label
                      className="al-search-input"
                      style={{ alignSelf: "center" }}
                    >
                      {item.countryname}
                    </label>
                    <div className="searchIconContainer">
                      <CiCircleChevDown
                        color={COLORS.background}
                        size={"2.5rem"}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Register;
