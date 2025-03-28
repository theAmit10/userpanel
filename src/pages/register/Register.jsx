import React, { useEffect, useState } from "react";
import "./Register.css";
import images from "../../assets/constants/images";
import COLORS from "../../assets/constants/colors";
import { useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/helper/showErrorToast";
import { ToastContainer } from "react-toastify";
import {
  useCreateRegisterMutation,
  useGetAllCountryQuery,
} from "../../helper/Networkcall";
import CircularProgressBar from "../../components/helper/CircularProgressBar";
import { FaPhoneAlt } from "react-icons/fa";
import { serverName } from "../../redux/store";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { CiCircleChevDown } from "react-icons/ci";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

function Register() {
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
