import React, { useCallback, useEffect, useState } from "react";
import "./UpdateProfile.css";
import { PiHandDepositBold } from "react-icons/pi";
import { PiHandWithdrawFill } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetPlayHistoryQuery } from "../../helper/Networkcall";
import CircularProgressBar from "../helper/CircularProgressBar";
import { useTransferWalletBalanceMutation } from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { loadProfile } from "../../redux/actions/userAction";
import { FaWallet } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import images from "../../assets/constants/images";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { CiCircleChevDown } from "react-icons/ci";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { serverName } from "../../redux/store";

const historydata = [
  {
    id: 1,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 2,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 3,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 4,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 5,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 6,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 7,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 8,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
];

function UpdateProfile() {
  const dispatch = useDispatch();

  const { accesstoken, user } = useSelector((state) => state.user);

  const [selectedActivity, setSelectedActivity] = useState("");

  const selectingActivityType = (item) => {
    setSelectedActivity(item);
  };

  const [showProgressBar, setProgressBar] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const [enterValue, setEnterValue] = useState("");

  // For Opening PhoneStorage
  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateProfile = async () => {
    if (!imageSource) {
      showErrorToast("Add profile picture");
    } else {
      setProgressBar(true);

      try {
        const formData = new FormData();
        formData.append("file", imageSource);

        if (!imageSource) {
          showErrorToast("Please select a image");
        } else {
          const response = await axios.post(
            UrlHelper.USER_PROFILE_PIC_API,
            formData,
            {
              headers: {
                Authorization: `Bearer ${accesstoken}`,
              },
            }
          );
          console.log("Profile updated successfully:", response.data);
          showSuccessToast("Profile updated successfully");
          setProgressBar(false);
          setSelectedActivity("");
          dispatch(loadProfile(accesstoken));
        }

        setProgressBar(false);
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  const updateProfileEmailandPhoneHandler = async (datatype) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

    const forData = datatype;

    if (forData === "Email") {
      if (!enterValue) {
        showErrorToast("Please enter your email");
      } else if (!emailRegex.test(enterValue)) {
        showErrorToast("Enter valid email address");
      } else {
        setProgressBar(true);

        try {
          const { data } = await axios.put(
            UrlHelper.UPDATE_USER_PROFILE_API,
            {
              email: enterValue,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`,
              },
            }
          );

          console.log("datat :: " + data);

          dispatch(loadProfile(accesstoken));

          showSuccessToast(data.message);
          setProgressBar(false);
          setSelectedActivity("");
          setEnterValue("");
        } catch (error) {
          setProgressBar(false);
          showErrorToast("Something went wrong");
          console.log(error);
        }
      }
    } else {
      if (!enterValue) {
        showErrorToast("Please enter your Phone Number");
      } else if (!phoneRegex.test(enterValue)) {
        showErrorToast("Enter valid Phone Number");
      } else {
        setProgressBar(true);
        try {
          const { data } = await axios.put(
            UrlHelper.UPDATE_USER_PROFILE_API,
            {
              email: enterValue,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`,
              },
            }
          );

          console.log("datat :: " + data);

          dispatch(loadProfile(accesstoken));

          showSuccessToast(data.message);
          setProgressBar(false);
          setSelectedActivity("");
          setEnterValue("");
        } catch (error) {
          setProgressBar(false);
          showErrorToast("Something went wrong");
          console.log(error);
        }
      }
    }
  };

  const checkEmailOrPhone = (str) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  };

  // FOR ADDING CONTACT
  const updateProfileContactHandler = async (datatype) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

    const forData = datatype;

    if (forData === "Email") {
      if (!enterValue) {
        showErrorToast("Please enter your email");
      } else if (!emailRegex.test(enterValue)) {
        showErrorToast("Enter valid email address");
      } else {
        setProgressBar(true);

        try {
          const { data } = await axios.put(
            UrlHelper.UPDATE_USER_PROFILE_API,
            {
              contact: enterValue,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`,
              },
            }
          );

          console.log("datat :: " + data);

          dispatch(loadProfile(accesstoken));

          showSuccessToast(data.message);
          setProgressBar(false);
          setSelectedActivity("");
          setEnterValue("");
        } catch (error) {
          setProgressBar(false);
          showErrorToast("Something went wrong");
          console.log(error);
        }
      }
    } else {
      if (!enterValue) {
        showErrorToast("Please enter your Phone Number");
      } else if (!phoneRegex.test(enterValue)) {
        showErrorToast("Enter valid Phone Number");
      } else {
        setProgressBar(true);

        try {
          const { data } = await axios.put(
            UrlHelper.UPDATE_USER_PROFILE_API,
            {
              contact: enterValue,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`,
              },
            }
          );

          console.log("datat :: " + data);

          dispatch(loadProfile(accesstoken));

          showSuccessToast(data.message);
          setProgressBar(false);
          setSelectedActivity("");
          setEnterValue("");
        } catch (error) {
          setProgressBar(false);
          if (error.response.data.message === "Contact Already exist") {
            showErrorToast(error.response.data.message);
          } else {
            showErrorToast("Something went wrong");
          }

          console.log(error);
          console.log(error.response.data.message);
        }
      }
    }
  };

  // FOR NAME
  const updateProfileNameHandler = async () => {
    if (!enterValue) {
      showErrorToast("Please enter your name");
    } else {
      setProgressBar(true);

      try {
        const { data } = await axios.put(
          UrlHelper.UPDATE_USER_PROFILE_API,
          {
            name: enterValue,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("datat :: " + data);

        dispatch(loadProfile(accesstoken));

        showSuccessToast(data.message);
        setProgressBar(false);
        setSelectedActivity("");
        setEnterValue("");
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <div className="history-main-container">
      {/** TITLE CONTAINER */}
      <label className="h-title-label">Update Profile</label>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container-bt">
        {/** CONTENT */}

        {/** LEFT CONTAINER */}

        {/** ALL ITEM */}
        {selectedActivity === "" && (
          <div className="left-container-bt">
            {/** PROFILE PICTURE */}
            <div
              onClick={() => setSelectedActivity("profilepicure")}
              className="content-container-up"
            >
              <div className="walletcontainer-up">
                <FaRegUser color={COLORS.background} size={"25px"} />
              </div>
              <label className="content-label-up" style={{ flex: 1 }}>
                Profile Picture
              </label>
              <div className="walletcontainer-up">
                <CiCircleChevDown color={COLORS.background} size={"25px"} />
              </div>
            </div>

            {/** CHANGE EMAIL */}
            {/** CHANGE PHONE NUMBER */}

            {checkEmailOrPhone(user.email) ? (
              <div
                onClick={() => setSelectedActivity("changeemail")}
                className="content-container-up"
              >
                <div className="walletcontainer-up">
                  <MdEmail color={COLORS.background} size={"25px"} />
                </div>
                <label className="content-label-up" style={{ flex: 1 }}>
                  Change Email
                </label>
                <div className="walletcontainer-up">
                  <CiCircleChevDown color={COLORS.background} size={"25px"} />
                </div>
              </div>
            ) : (
              <div
                onClick={() => setSelectedActivity("changephonenumber")}
                className="content-container-up"
              >
                <div className="walletcontainer-up">
                  <FaPhoneAlt color={COLORS.background} size={"25px"} />
                </div>
                <label className="content-label-up" style={{ flex: 1 }}>
                  Change Phone Number
                </label>
                <div className="walletcontainer-up">
                  <CiCircleChevDown color={COLORS.background} size={"25px"} />
                </div>
              </div>
            )}

            {/** ADD PHONE NUMNER */}
            {checkEmailOrPhone(user.email) ? (
              <div
                onClick={() => setSelectedActivity("addphonenumber")}
                className="content-container-up"
              >
                <div className="walletcontainer-up">
                  <MdAddIcCall color={COLORS.background} size={"25px"} />
                </div>
                <label className="content-label-up" style={{ flex: 1 }}>
                  Add Phone Number
                </label>
                <div className="walletcontainer-up">
                  <CiCircleChevDown color={COLORS.background} size={"25px"} />
                </div>
              </div>
            ) : (
              <div
                onClick={() => setSelectedActivity("addemailaddress")}
                className="content-container-up"
              >
                <div className="walletcontainer-up">
                  <MdEmail color={COLORS.background} size={"25px"} />
                </div>
                <label className="content-label-up" style={{ flex: 1 }}>
                  Update email address
                </label>
                <div className="walletcontainer-up">
                  <CiCircleChevDown color={COLORS.background} size={"25px"} />
                </div>
              </div>
            )}

            {/** CHANAGE NAME */}
            <div
              onClick={() => setSelectedActivity("changename")}
              className="content-container-up"
            >
              <div className="walletcontainer-up">
                <FaUserEdit color={COLORS.background} size={"25px"} />
              </div>
              <label className="content-label-up" style={{ flex: 1 }}>
                Change Name
              </label>
              <div className="walletcontainer-up">
                <CiCircleChevDown color={COLORS.background} size={"25px"} />
              </div>
            </div>
          </div>
        )}

        {/** PROFILE PICTURE */}
        {selectedActivity === "profilepicure" && (
          <div className="left-container-bt">
            <IoArrowBackCircleOutline
              onClick={() => selectingActivityType("")}
              color={COLORS.white_s}
              size={"2.5em"}
            />
            <label className="h-title-label-medium">
              Update Profile Picture
            </label>

            {/** RECEIPT */}
            <div className="content-container-up">
              <input type="file" name="file" onChange={selectDoc} />
            </div>

            {/** DEPOSIT BUTTON */}
            <div
              style={{
                marginTop: "2vw",
              }}
            >
              {showProgressBar ? (
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
                  onClick={handleUpdateProfile}
                  className="submit-btn-balance-transfer"
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        )}

        {selectedActivity === "changeemail" && (
          <div className="left-container-bt">
            <IoArrowBackCircleOutline
              onClick={() => selectingActivityType("")}
              color={COLORS.white_s}
              size={"2.5em"}
            />
            <label className="h-title-label-medium">Update Email</label>

            <label className="h-title-label-small">Email Address</label>

            {/** AMOUNT */}
            <div className="content-container-up">
              <input
                style={{
                  flex: 1,
                  padding: "0.5vw",
                  backgroundColor: "transparent",
                  border: "none",
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: "1em",
                  outline: "none",
                }}
                type="email"
                name="email"
                placeholder="Enter email address"
                value={enterValue}
                onChange={(e) => setEnterValue(e.target.value)}
              />
            </div>

            {/** DEPOSIT BUTTON */}
            <div
              style={{
                marginTop: "2vw",
              }}
            >
              {showProgressBar ? (
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
                  onClick={() => updateProfileEmailandPhoneHandler("Email")}
                  className="submit-btn-balance-transfer"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {selectedActivity === "changephonenumber" && (
          <div className="left-container-bt">
            <IoArrowBackCircleOutline
              onClick={() => selectingActivityType("")}
              color={COLORS.white_s}
              size={"2.5em"}
            />
            <label className="h-title-label-medium">Update Phone Number</label>

            <label className="h-title-label-small">Phone number</label>

            {/** AMOUNT */}
            <div className="content-container-up">
              <input
                style={{
                  flex: 1,
                  padding: "0.5vw",
                  backgroundColor: "transparent",
                  border: "none",
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: "1em",
                  outline: "none",
                }}
                type="tel"
                name="phonenumber"
                placeholder="Enter phone number"
                value={enterValue}
                onChange={(e) => setEnterValue(e.target.value)}
              />
            </div>

            {/** DEPOSIT BUTTON */}
            <div
              style={{
                marginTop: "2vw",
              }}
            >
              {showProgressBar ? (
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
                  onClick={() => updateProfileEmailandPhoneHandler("Phone")}
                  className="submit-btn-balance-transfer"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {selectedActivity === "addphonenumber" && (
          <div className="left-container-bt">
            <IoArrowBackCircleOutline
              onClick={() => selectingActivityType("")}
              color={COLORS.white_s}
              size={"2.5em"}
            />
            <label className="h-title-label-medium">Add Phone Number</label>

            <label className="h-title-label-small">Phone number</label>

            {/** AMOUNT */}
            <div className="content-container-up">
              <input
                style={{
                  flex: 1,
                  padding: "0.5vw",
                  backgroundColor: "transparent",
                  border: "none",
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: "1em",
                  outline: "none",
                }}
                type="tel"
                name="phonenumber"
                placeholder="Enter phone number"
                value={enterValue}
                onChange={(e) => setEnterValue(e.target.value)}
              />
            </div>

            {/** DEPOSIT BUTTON */}
            <div
              style={{
                marginTop: "2vw",
              }}
            >
              {showProgressBar ? (
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
                  onClick={() => updateProfileContactHandler("Phone")}
                  className="submit-btn-balance-transfer"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {selectedActivity === "addemailaddress" && (
          <div className="left-container-bt">
            <IoArrowBackCircleOutline
              onClick={() => selectingActivityType("")}
              color={COLORS.white_s}
              size={"2.5em"}
            />
            <label className="h-title-label-medium">Add Email Address</label>

            <label className="h-title-label-small">Email address</label>

            {/** AMOUNT */}
            <div className="content-container-up">
              <input
                style={{
                  flex: 1,
                  padding: "0.5vw",
                  backgroundColor: "transparent",
                  border: "none",
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: "1em",
                  outline: "none",
                }}
                type="email"
                name="emailaddress"
                placeholder="Enter email address"
                value={enterValue}
                onChange={(e) => setEnterValue(e.target.value)}
              />
            </div>

            {/** DEPOSIT BUTTON */}
            <div
              style={{
                marginTop: "2vw",
              }}
            >
              {showProgressBar ? (
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
                  onClick={() => updateProfileContactHandler("Email")}
                  className="submit-btn-balance-transfer"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {selectedActivity === "changename" && (
          <div className="left-container-bt">
            <IoArrowBackCircleOutline
              onClick={() => selectingActivityType("")}
              color={COLORS.white_s}
              size={"2.5em"}
            />
            <label className="h-title-label-medium">Change name</label>

            <label className="h-title-label-small">name</label>

            {/** AMOUNT */}
            <div className="content-container-up">
              <input
                style={{
                  flex: 1,
                  padding: "0.5vw",
                  backgroundColor: "transparent",
                  border: "none",
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: "1em",
                  outline: "none",
                }}
                type="text"
                name="name"
                placeholder="Enter name"
                value={enterValue}
                onChange={(e) => setEnterValue(e.target.value)}
              />
            </div>

            {/** DEPOSIT BUTTON */}
            <div
              style={{
                marginTop: "2vw",
              }}
            >
              {showProgressBar ? (
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
                  onClick={() => updateProfileNameHandler()}
                  className="submit-btn-balance-transfer"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )}

        {/** LEFT CONTAINER END */}

        {/** RIGHT CONTAINER */}
        <div className="right-container-up">
          <div className="right-container-one-up">
            <div className="imagecontainer-up">
              {user?.avatar?.url ? (
                <img
                  src={`${serverName}/uploads/${user?.avatar.url}`}
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

            <div className="profile-content-container">
              <label className="h-title-label">{user ? user.name : ""}</label>
              <label className="h-title-label-medium">
                {user ? user.email : ""}
              </label>

              {user && user.contact != user.userId ? (
                <label className="h-title-label-medium">
                  {user ? user.contact : ""}
                </label>
              ) : null}

              <label className="h-title-label-medium">
                {" "}
                User ID - {user ? user.userId : ""}
              </label>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdateProfile;
