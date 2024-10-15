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
import { MdAccountCircle } from "react-icons/md";
import { IoIosArrowDropright } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiSubtitles } from "react-icons/pi";
import { LoadingComponent } from "../helper/LoadingComponent";

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

function UpdateProfile({reloadKey}) {
  const dispatch = useDispatch();

  const [showUP, setShowUP] = useState(true);
  const [showUPPic, setShowUPPic] = useState(false);
  const [showUPName, setShowUPName] = useState(false);
  const [showUPCEmail, setShowUPCEmail] = useState(false);
  const [showUPCPhone, setShowUPCPhone] = useState(false);
  const [showUPAEmail, setShowUPAEmail] = useState(false);
  const [showUPAPhone, setShowUPAPhone] = useState(false);

  const backhandlerUPP = () => {
    setShowUP(true);
    setShowUPPic(false);
    setShowUPName(false);
    setShowUPCEmail(false);
    setShowUPCPhone(false);
    setShowUPAEmail(false);
    setShowUPAPhone(false);
  };

  const settingUPP = () => {
    setShowUP(false);
    setShowUPPic(true);
    setShowUPName(false);
    setShowUPCEmail(false);
    setShowUPCPhone(false);
    setShowUPAEmail(false);
    setShowUPAPhone(false);
  };

  const settingUPN = () => {
    setShowUP(false);
    setShowUPPic(false);
    setShowUPName(true);
    setShowUPCEmail(false);
    setShowUPCPhone(false);
    setShowUPAEmail(false);
    setShowUPAPhone(false);
  };

  const settingUPUE = () => {
    setShowUP(false);
    setShowUPPic(false);
    setShowUPName(false);
    setShowUPCEmail(true);
    setShowUPCPhone(false);
    setShowUPAEmail(false);
    setShowUPAPhone(false);
  };

  const settingUPUP = () => {
    setShowUP(false);
    setShowUPPic(false);
    setShowUPName(false);
    setShowUPCEmail(false);
    setShowUPCPhone(true);
    setShowUPAEmail(false);
    setShowUPAPhone(false);
  };

  const settingUPAE = () => {
    setShowUP(false);
    setShowUPPic(false);
    setShowUPName(false);
    setShowUPCEmail(false);
    setShowUPCPhone(false);
    setShowUPAEmail(true);
    setShowUPAPhone(false);
  };

  const settingUPAP = () => {
    setShowUP(false);
    setShowUPPic(false);
    setShowUPName(false);
    setShowUPCEmail(false);
    setShowUPCPhone(false);
    setShowUPAEmail(false);
    setShowUPAPhone(true);
  };

  useEffect(() => {
    console.log("reloadKey :: " + reloadKey);
    backhandlerUPP()
  }, [reloadKey]);

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
    <div className="upContainer">
      {showUP && (
        <div className="alCreatLocationTopContainer">
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              Update Profile
            </label>
          </div>
        </div>
      )}

      {showUP && (
        <div
          className="upsMainContainer"
          style={{ backgroundColor: COLORS.background }}
        >
          {/** USER DETAILS CONTAINER */}
          <div className="upContentContainer">
            <div className="upuserimage">
              {user?.avatar?.url ? (
                <img
                  src={`${serverName}/uploads/${user?.avatar.url}`}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              ) : (
                <img
                  src={images.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user.email : ""}
              </label>
              {user && user.contact != user.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user.userId : ""}
              </label>
            </div>
          </div>

          {/** PROFILE PICTURE */}
          <div className="alUpdatePContainer" onClick={settingUPP}>
            <div className="searchIconContainer">
              <MdAccountCircle color={COLORS.background} size={"2.5rem"} />
            </div>

            <label className="al-search-input">Profile Picture</label>

            <div className="searchIconContainer">
              <IoIosArrowDropright color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>

          {/** NAME */}
          <div className="alUpdatePContainer" onClick={settingUPN}>
            <div className="searchIconContainer">
              <MdDriveFileRenameOutline
                color={COLORS.background}
                size={"2.5rem"}
              />
            </div>

            <label className="al-search-input">Name</label>

            <div className="searchIconContainer">
              <IoIosArrowDropright color={COLORS.background} size={"2.5rem"} />
            </div>
          </div>

          {/** UPDATE EMAIL */}
          {/** UPDATE PHONE NUMBER */}
          {checkEmailOrPhone(user.email) ? (
            <div className="alUpdatePContainer" onClick={settingUPUE}>
              <div className="searchIconContainer">
                <MdEmail color={COLORS.background} size={"2.5rem"} />
              </div>

              <label className="al-search-input">Change Email</label>

              <div className="searchIconContainer">
                <IoIosArrowDropright
                  color={COLORS.background}
                  size={"2.5rem"}
                />
              </div>
            </div>
          ) : (
            <div className="alUpdatePContainer" onClick={settingUPUN}>
              <div className="searchIconContainer">
                <FaPhoneAlt color={COLORS.background} size={"2.5rem"} />
              </div>

              <label className="al-search-input">Change Phone Number</label>

              <div className="searchIconContainer">
                <IoIosArrowDropright
                  color={COLORS.background}
                  size={"2.5rem"}
                />
              </div>
            </div>
          )}

          {/** ADD EMAIL */}
          {/** ADD PHONE NUMBER */}
          {checkEmailOrPhone(user.email) ? (
            <div className="alUpdatePContainer" onClick={settingUPAP}>
              <div className="searchIconContainer">
                <FaPhoneAlt color={COLORS.background} size={"2.5rem"} />
              </div>

              <label className="al-search-input">Add Phone Number</label>

              <div className="searchIconContainer">
                <IoIosArrowDropright
                  color={COLORS.background}
                  size={"2.5rem"}
                />
              </div>
            </div>
          ) : (
            <div className="alUpdatePContainer" onClick={settingUPAE}>
              <div className="searchIconContainer">
                <MdEmail color={COLORS.background} size={"2.5rem"} />
              </div>

              <label className="al-search-input">Add Email</label>

              <div className="searchIconContainer">
                <IoIosArrowDropright
                  color={COLORS.background}
                  size={"2.5rem"}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {showUPPic && (
        <div
          className="upsMainContainer"
          style={{ backgroundColor: COLORS.background }}
        >
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerUPP}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Upload Profile Picture
              </label>
            </div>
          </div>

          {/** USER DETAILS CONTAINER */}
          <div className="upContentContainer">
            <div className="upuserimage">
              {user?.avatar?.url ? (
                <img
                  src={`${serverName}/uploads/${user?.avatar.url}`}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              ) : (
                <img
                  src={images.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user.email : ""}
              </label>
              {user && user.contact != user.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user.userId : ""}
              </label>
            </div>
          </div>

          {/** TITLE */}
          <label className="alCLLabel">Select Image</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <div className="imageContainerAC">
              <input
                className="al-search-input"
                placeholder="Enter country symbol"
                type="file"
                name="file"
                onChange={selectDoc}
              />
            </div>
          </div>

          {showProgressBar ? (
            <LoadingComponent />
          ) : (
            <div className="alBottomContainer" onClick={handleUpdateProfile}>
              <label className="alBottomContainerlabel">Upload Image</label>
            </div>
          )}
        </div>
      )}

      {showUPName && (
        <div
          className="upsMainContainer"
          style={{ backgroundColor: COLORS.background }}
        >
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerUPP}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Update Name
              </label>
            </div>
          </div>

          {/** USER DETAILS CONTAINER */}
          <div className="upContentContainer">
            <div className="upuserimage">
              {user?.avatar?.url ? (
                <img
                  src={`${serverName}/uploads/${user?.avatar.url}`}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              ) : (
                <img
                  src={images.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user.email : ""}
              </label>
              {user && user.contact != user.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user.userId : ""}
              </label>
            </div>
          </div>

          <label className="alCLLabel">Name</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter name"
              value={enterValue}
              onChange={(e) => setEnterValue(e.target.value)}
            />
          </div>

          {showProgressBar ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={() => updateProfileNameHandler()}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}

      {/** UPDATE EMAIL  */}
      {showUPCEmail && (
        <div
          className="upsMainContainer"
          style={{ backgroundColor: COLORS.background }}
        >
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerUPP}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Update Email
              </label>
            </div>
          </div>

          {/** USER DETAILS CONTAINER */}
          <div className="upContentContainer">
            <div className="upuserimage">
              {user?.avatar?.url ? (
                <img
                  src={`${serverName}/uploads/${user?.avatar.url}`}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              ) : (
                <img
                  src={images.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user.email : ""}
              </label>
              {user && user.contact != user.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user.userId : ""}
              </label>
            </div>
          </div>

          <label className="alCLLabel">Email</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter email address"
              type="email"
              value={enterValue}
              onChange={(e) => setEnterValue(e.target.value)}
            />
          </div>

          {showProgressBar ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={() => updateProfileEmailandPhoneHandler("Email")}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}
      {/** UPDATE PHONE  */}
      {showUPCPhone && (
        <div
          className="upsMainContainer"
          style={{ backgroundColor: COLORS.background }}
        >
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerUPP}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Update Phone
              </label>
            </div>
          </div>

          {/** USER DETAILS CONTAINER */}
          <div className="upContentContainer">
            <div className="upuserimage">
              {user?.avatar?.url ? (
                <img
                  src={`${serverName}/uploads/${user?.avatar.url}`}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              ) : (
                <img
                  src={images.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user.email : ""}
              </label>
              {user && user.contact != user.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user.userId : ""}
              </label>
            </div>
          </div>

          <label className="alCLLabel">Phone</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter phone number"
              type="tel"
              value={enterValue}
              onChange={(e) => setEnterValue(e.target.value)}
            />
          </div>

          {showProgressBar ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={() => updateProfileEmailandPhoneHandler("Phone")}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}
      {/** ADD EMAIL  */}
      {showUPAEmail && (
        <div
          className="upsMainContainer"
          style={{ backgroundColor: COLORS.background }}
        >
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerUPP}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Add Email Address
              </label>
            </div>
          </div>

          {/** USER DETAILS CONTAINER */}
          <div className="upContentContainer">
            <div className="upuserimage">
              {user?.avatar?.url ? (
                <img
                  src={`${serverName}/uploads/${user?.avatar.url}`}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              ) : (
                <img
                  src={images.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user.email : ""}
              </label>
              {user && user.contact != user.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user.userId : ""}
              </label>
            </div>
          </div>

          <label className="alCLLabel">Email address</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter email address"
              type="email"
              value={enterValue}
              onChange={(e) => setEnterValue(e.target.value)}
            />
          </div>

          {showProgressBar ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={() => updateProfileContactHandler("Email")}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}
      {/** ADD PHONE  */}
      {showUPAPhone && (
        <div
          className="upsMainContainer"
          style={{ backgroundColor: COLORS.background }}
        >
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={backhandlerUPP}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Add Phone Number
              </label>
            </div>
          </div>

          {/** USER DETAILS CONTAINER */}
          <div className="upContentContainer">
            <div className="upuserimage">
              {user?.avatar?.url ? (
                <img
                  src={`${serverName}/uploads/${user?.avatar.url}`}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              ) : (
                <img
                  src={images.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user.email : ""}
              </label>
              {user && user.contact != user.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user.userId : ""}
              </label>
            </div>
          </div>

          <label className="alCLLabel">Phone number</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter phone number"
              type="tel"
              value={enterValue}
              onChange={(e) => setEnterValue(e.target.value)}
            />
          </div>

          {showProgressBar ? (
            <LoadingComponent />
          ) : (
            <div
              className="alBottomContainer"
              onClick={() => updateProfileContactHandler("Phone")}
            >
              <label className="alBottomContainerlabel">Submit</label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;





// import React, { useCallback, useEffect, useState } from "react";
// import "./UpdateProfile.css";
// import { PiHandDepositBold } from "react-icons/pi";
// import { PiHandWithdrawFill } from "react-icons/pi";
// import COLORS from "../../assets/constants/colors";
// import FONT from "../../assets/constants/fonts";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { FaRegPlayCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetPlayHistoryQuery } from "../../helper/Networkcall";
// import CircularProgressBar from "../helper/CircularProgressBar";
// import { useTransferWalletBalanceMutation } from "../../redux/api";
// import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
// import { loadProfile } from "../../redux/actions/userAction";
// import { FaWallet } from "react-icons/fa";
// import { ToastContainer } from "react-toastify";
// import images from "../../assets/constants/images";
// import { IoArrowBackCircleOutline } from "react-icons/io5";
// import { FaRegUser } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { FaPhoneAlt } from "react-icons/fa";
// import { MdAddIcCall } from "react-icons/md";
// import { FaUserEdit } from "react-icons/fa";
// import { CiCircleChevDown } from "react-icons/ci";
// import axios from "axios";
// import UrlHelper from "../../helper/UrlHelper";
// import { serverName } from "../../redux/store";

// const historydata = [
//   {
//     id: 1,
//     type: "deposit",
//     amount: "200INR",
//     date: "Apr 19, 2024 05: 37 PM",
//     paymenmethod: "UPI",
//     transactionid: "3983983838833838",
//     status: "success",
//   },
//   {
//     id: 2,
//     type: "deposit",
//     amount: "200INR",
//     date: "Apr 19, 2024 05: 37 PM",
//     paymenmethod: "UPI",
//     transactionid: "3983983838833838",
//     status: "success",
//   },
//   {
//     id: 3,
//     type: "deposit",
//     amount: "200INR",
//     date: "Apr 19, 2024 05: 37 PM",
//     paymenmethod: "UPI",
//     transactionid: "3983983838833838",
//     status: "success",
//   },
//   {
//     id: 4,
//     type: "deposit",
//     amount: "200INR",
//     date: "Apr 19, 2024 05: 37 PM",
//     paymenmethod: "UPI",
//     transactionid: "3983983838833838",
//     status: "success",
//   },
//   {
//     id: 5,
//     type: "deposit",
//     amount: "200INR",
//     date: "Apr 19, 2024 05: 37 PM",
//     paymenmethod: "UPI",
//     transactionid: "3983983838833838",
//     status: "success",
//   },
//   {
//     id: 6,
//     type: "deposit",
//     amount: "200INR",
//     date: "Apr 19, 2024 05: 37 PM",
//     paymenmethod: "UPI",
//     transactionid: "3983983838833838",
//     status: "success",
//   },
//   {
//     id: 7,
//     type: "deposit",
//     amount: "200INR",
//     date: "Apr 19, 2024 05: 37 PM",
//     paymenmethod: "UPI",
//     transactionid: "3983983838833838",
//     status: "success",
//   },
//   {
//     id: 8,
//     type: "deposit",
//     amount: "200INR",
//     date: "Apr 19, 2024 05: 37 PM",
//     paymenmethod: "UPI",
//     transactionid: "3983983838833838",
//     status: "success",
//   },
// ];

// function UpdateProfile() {
//   const dispatch = useDispatch();

//   const { accesstoken, user } = useSelector((state) => state.user);

//   const [selectedActivity, setSelectedActivity] = useState("");

//   const selectingActivityType = (item) => {
//     setSelectedActivity(item);
//   };

//   const [showProgressBar, setProgressBar] = useState(false);
//   const [imageSource, setImageSource] = useState(null);
//   const [enterValue, setEnterValue] = useState("");

//   // For Opening PhoneStorage
//   const selectDoc = (e) => {
//     try {
//       console.log(e.target.files);
//       setImageSource(e.target.files[0]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleUpdateProfile = async () => {
//     if (!imageSource) {
//       showErrorToast("Add profile picture");
//     } else {
//       setProgressBar(true);

//       try {
//         const formData = new FormData();
//         formData.append("file", imageSource);

//         if (!imageSource) {
//           showErrorToast("Please select a image");
//         } else {
//           const response = await axios.post(
//             UrlHelper.USER_PROFILE_PIC_API,
//             formData,
//             {
//               headers: {
//                 Authorization: `Bearer ${accesstoken}`,
//               },
//             }
//           );
//           console.log("Profile updated successfully:", response.data);
//           showSuccessToast("Profile updated successfully");
//           setProgressBar(false);
//           setSelectedActivity("");
//           dispatch(loadProfile(accesstoken));
//         }

//         setProgressBar(false);
//       } catch (error) {
//         setProgressBar(false);
//         showErrorToast("Something went wrong");
//         console.log(error);
//       }
//     }
//   };

//   const updateProfileEmailandPhoneHandler = async (datatype) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

//     const forData = datatype;

//     if (forData === "Email") {
//       if (!enterValue) {
//         showErrorToast("Please enter your email");
//       } else if (!emailRegex.test(enterValue)) {
//         showErrorToast("Enter valid email address");
//       } else {
//         setProgressBar(true);

//         try {
//           const { data } = await axios.put(
//             UrlHelper.UPDATE_USER_PROFILE_API,
//             {
//               email: enterValue,
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accesstoken}`,
//               },
//             }
//           );

//           console.log("datat :: " + data);

//           dispatch(loadProfile(accesstoken));

//           showSuccessToast(data.message);
//           setProgressBar(false);
//           setSelectedActivity("");
//           setEnterValue("");
//         } catch (error) {
//           setProgressBar(false);
//           showErrorToast("Something went wrong");
//           console.log(error);
//         }
//       }
//     } else {
//       if (!enterValue) {
//         showErrorToast("Please enter your Phone Number");
//       } else if (!phoneRegex.test(enterValue)) {
//         showErrorToast("Enter valid Phone Number");
//       } else {
//         setProgressBar(true);
//         try {
//           const { data } = await axios.put(
//             UrlHelper.UPDATE_USER_PROFILE_API,
//             {
//               email: enterValue,
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accesstoken}`,
//               },
//             }
//           );

//           console.log("datat :: " + data);

//           dispatch(loadProfile(accesstoken));

//           showSuccessToast(data.message);
//           setProgressBar(false);
//           setSelectedActivity("");
//           setEnterValue("");
//         } catch (error) {
//           setProgressBar(false);
//           showErrorToast("Something went wrong");
//           console.log(error);
//         }
//       }
//     }
//   };

//   const checkEmailOrPhone = (str) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(str);
//   };

//   // FOR ADDING CONTACT
//   const updateProfileContactHandler = async (datatype) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;

//     const forData = datatype;

//     if (forData === "Email") {
//       if (!enterValue) {
//         showErrorToast("Please enter your email");
//       } else if (!emailRegex.test(enterValue)) {
//         showErrorToast("Enter valid email address");
//       } else {
//         setProgressBar(true);

//         try {
//           const { data } = await axios.put(
//             UrlHelper.UPDATE_USER_PROFILE_API,
//             {
//               contact: enterValue,
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accesstoken}`,
//               },
//             }
//           );

//           console.log("datat :: " + data);

//           dispatch(loadProfile(accesstoken));

//           showSuccessToast(data.message);
//           setProgressBar(false);
//           setSelectedActivity("");
//           setEnterValue("");
//         } catch (error) {
//           setProgressBar(false);
//           showErrorToast("Something went wrong");
//           console.log(error);
//         }
//       }
//     } else {
//       if (!enterValue) {
//         showErrorToast("Please enter your Phone Number");
//       } else if (!phoneRegex.test(enterValue)) {
//         showErrorToast("Enter valid Phone Number");
//       } else {
//         setProgressBar(true);

//         try {
//           const { data } = await axios.put(
//             UrlHelper.UPDATE_USER_PROFILE_API,
//             {
//               contact: enterValue,
//             },
//             {
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${accesstoken}`,
//               },
//             }
//           );

//           console.log("datat :: " + data);

//           dispatch(loadProfile(accesstoken));

//           showSuccessToast(data.message);
//           setProgressBar(false);
//           setSelectedActivity("");
//           setEnterValue("");
//         } catch (error) {
//           setProgressBar(false);
//           if (error.response.data.message === "Contact Already exist") {
//             showErrorToast(error.response.data.message);
//           } else {
//             showErrorToast("Something went wrong");
//           }

//           console.log(error);
//           console.log(error.response.data.message);
//         }
//       }
//     }
//   };

//   // FOR NAME
//   const updateProfileNameHandler = async () => {
//     if (!enterValue) {
//       showErrorToast("Please enter your name");
//     } else {
//       setProgressBar(true);

//       try {
//         const { data } = await axios.put(
//           UrlHelper.UPDATE_USER_PROFILE_API,
//           {
//             name: enterValue,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${accesstoken}`,
//             },
//           }
//         );

//         console.log("datat :: " + data);

//         dispatch(loadProfile(accesstoken));

//         showSuccessToast(data.message);
//         setProgressBar(false);
//         setSelectedActivity("");
//         setEnterValue("");
//       } catch (error) {
//         setProgressBar(false);
//         showErrorToast("Something went wrong");
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <div className="history-main-container">
//       {/** TITLE CONTAINER */}
//       <label className="aboutus-title-label">Update Profile</label>
//       {/** CONTENT CONTAINER */}
//       <div className="h-content-container-bt">
//         {/** CONTENT */}

//         {/** LEFT CONTAINER */}

//         {/** ALL ITEM */}
//         {selectedActivity === "" && (
//           <div className="left-container-bt">
//             {/** PROFILE PICTURE */}
//             <div
//               onClick={() => setSelectedActivity("profilepicure")}
//               className="content-container-up"
//             >
//               <div className="walletcontainer-up">
//                 <FaRegUser color={COLORS.background} size={"25px"} />
//               </div>
//               <label className="content-label-up" style={{ flex: 1 }}>
//                 Profile Picture
//               </label>
//               <div className="walletcontainer-up">
//                 <CiCircleChevDown color={COLORS.background} size={"25px"} />
//               </div>
//             </div>

//             {/** CHANGE EMAIL */}
//             {/** CHANGE PHONE NUMBER */}

//             {checkEmailOrPhone(user.email) ? (
//               <div
//                 onClick={() => setSelectedActivity("changeemail")}
//                 className="content-container-up"
//               >
//                 <div className="walletcontainer-up">
//                   <MdEmail color={COLORS.background} size={"25px"} />
//                 </div>
//                 <label className="content-label-up" style={{ flex: 1 }}>
//                   Change Email
//                 </label>
//                 <div className="walletcontainer-up">
//                   <CiCircleChevDown color={COLORS.background} size={"25px"} />
//                 </div>
//               </div>
//             ) : (
//               <div
//                 onClick={() => setSelectedActivity("changephonenumber")}
//                 className="content-container-up"
//               >
//                 <div className="walletcontainer-up">
//                   <FaPhoneAlt color={COLORS.background} size={"25px"} />
//                 </div>
//                 <label className="content-label-up" style={{ flex: 1 }}>
//                   Change Phone Number
//                 </label>
//                 <div className="walletcontainer-up">
//                   <CiCircleChevDown color={COLORS.background} size={"25px"} />
//                 </div>
//               </div>
//             )}

//             {/** ADD PHONE NUMNER */}
//             {checkEmailOrPhone(user.email) ? (
//               <div
//                 onClick={() => setSelectedActivity("addphonenumber")}
//                 className="content-container-up"
//               >
//                 <div className="walletcontainer-up">
//                   <MdAddIcCall color={COLORS.background} size={"25px"} />
//                 </div>
//                 <label className="content-label-up" style={{ flex: 1 }}>
//                   Add Phone Number
//                 </label>
//                 <div className="walletcontainer-up">
//                   <CiCircleChevDown color={COLORS.background} size={"25px"} />
//                 </div>
//               </div>
//             ) : (
//               <div
//                 onClick={() => setSelectedActivity("addemailaddress")}
//                 className="content-container-up"
//               >
//                 <div className="walletcontainer-up">
//                   <MdEmail color={COLORS.background} size={"25px"} />
//                 </div>
//                 <label className="content-label-up" style={{ flex: 1 }}>
//                   Update email address
//                 </label>
//                 <div className="walletcontainer-up">
//                   <CiCircleChevDown color={COLORS.background} size={"25px"} />
//                 </div>
//               </div>
//             )}

//             {/** CHANAGE NAME */}
//             <div
//               onClick={() => setSelectedActivity("changename")}
//               className="content-container-up"
//             >
//               <div className="walletcontainer-up">
//                 <FaUserEdit color={COLORS.background} size={"25px"} />
//               </div>
//               <label className="content-label-up" style={{ flex: 1 }}>
//                 Change Name
//               </label>
//               <div className="walletcontainer-up">
//                 <CiCircleChevDown color={COLORS.background} size={"25px"} />
//               </div>
//             </div>
//           </div>
//         )}

//         {/** PROFILE PICTURE */}
//         {selectedActivity === "profilepicure" && (
//           <div className="left-container-bt">
//             <IoArrowBackCircleOutline
//               onClick={() => selectingActivityType("")}
//               color={COLORS.white_s}
//               size={"2.5em"}
//             />
//             <label className="h-title-label-medium">
//               Update Profile Picture
//             </label>

//             {/** RECEIPT */}
//             <div className="content-container-up">
//               <input type="file" name="file" onChange={selectDoc} />
//             </div>

//             {/** DEPOSIT BUTTON */}
//             <div
//               style={{
//                 marginTop: "2vw",
//               }}
//             >
//               {showProgressBar ? (
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
//                 <button
//                   onClick={handleUpdateProfile}
//                   className="submit-btn-balance-transfer"
//                 >
//                   Upload
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {selectedActivity === "changeemail" && (
//           <div className="left-container-bt">
//             <IoArrowBackCircleOutline
//               onClick={() => selectingActivityType("")}
//               color={COLORS.white_s}
//               size={"2.5em"}
//             />
//             <label className="h-title-label-medium">Update Email</label>

//             <label className="h-title-label-small">Email Address</label>

//             {/** AMOUNT */}
//             <div className="content-container-up">
//               <input
//                 style={{
//                   flex: 1,
//                   padding: "0.5vw",
//                   backgroundColor: "transparent",
//                   border: "none",
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: "1em",
//                   outline: "none",
//                 }}
//                 type="email"
//                 name="email"
//                 placeholder="Enter email address"
//                 value={enterValue}
//                 onChange={(e) => setEnterValue(e.target.value)}
//               />
//             </div>

//             {/** DEPOSIT BUTTON */}
//             <div
//               style={{
//                 marginTop: "2vw",
//               }}
//             >
//               {showProgressBar ? (
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
//                 <button
//                   onClick={() => updateProfileEmailandPhoneHandler("Email")}
//                   className="submit-btn-balance-transfer"
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {selectedActivity === "changephonenumber" && (
//           <div className="left-container-bt">
//             <IoArrowBackCircleOutline
//               onClick={() => selectingActivityType("")}
//               color={COLORS.white_s}
//               size={"2.5em"}
//             />
//             <label className="h-title-label-medium">Update Phone Number</label>

//             <label className="h-title-label-small">Phone number</label>

//             {/** AMOUNT */}
//             <div className="content-container-up">
//               <input
//                 style={{
//                   flex: 1,
//                   padding: "0.5vw",
//                   backgroundColor: "transparent",
//                   border: "none",
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: "1em",
//                   outline: "none",
//                 }}
//                 type="tel"
//                 name="phonenumber"
//                 placeholder="Enter phone number"
//                 value={enterValue}
//                 onChange={(e) => setEnterValue(e.target.value)}
//               />
//             </div>

//             {/** DEPOSIT BUTTON */}
//             <div
//               style={{
//                 marginTop: "2vw",
//               }}
//             >
//               {showProgressBar ? (
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
//                 <button
//                   onClick={() => updateProfileEmailandPhoneHandler("Phone")}
//                   className="submit-btn-balance-transfer"
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {selectedActivity === "addphonenumber" && (
//           <div className="left-container-bt">
//             <IoArrowBackCircleOutline
//               onClick={() => selectingActivityType("")}
//               color={COLORS.white_s}
//               size={"2.5em"}
//             />
//             <label className="h-title-label-medium">Add Phone Number</label>

//             <label className="h-title-label-small">Phone number</label>

//             {/** AMOUNT */}
//             <div className="content-container-up">
//               <input
//                 style={{
//                   flex: 1,
//                   padding: "0.5vw",
//                   backgroundColor: "transparent",
//                   border: "none",
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: "1em",
//                   outline: "none",
//                 }}
//                 type="tel"
//                 name="phonenumber"
//                 placeholder="Enter phone number"
//                 value={enterValue}
//                 onChange={(e) => setEnterValue(e.target.value)}
//               />
//             </div>

//             {/** DEPOSIT BUTTON */}
//             <div
//               style={{
//                 marginTop: "2vw",
//               }}
//             >
//               {showProgressBar ? (
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
//                 <button
//                   onClick={() => updateProfileContactHandler("Phone")}
//                   className="submit-btn-balance-transfer"
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {selectedActivity === "addemailaddress" && (
//           <div className="left-container-bt">
//             <IoArrowBackCircleOutline
//               onClick={() => selectingActivityType("")}
//               color={COLORS.white_s}
//               size={"2.5em"}
//             />
//             <label className="h-title-label-medium">Add Email Address</label>

//             <label className="h-title-label-small">Email address</label>

//             {/** AMOUNT */}
//             <div className="content-container-up">
//               <input
//                 style={{
//                   flex: 1,
//                   padding: "0.5vw",
//                   backgroundColor: "transparent",
//                   border: "none",
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: "1em",
//                   outline: "none",
//                 }}
//                 type="email"
//                 name="emailaddress"
//                 placeholder="Enter email address"
//                 value={enterValue}
//                 onChange={(e) => setEnterValue(e.target.value)}
//               />
//             </div>

//             {/** DEPOSIT BUTTON */}
//             <div
//               style={{
//                 marginTop: "2vw",
//               }}
//             >
//               {showProgressBar ? (
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
//                 <button
//                   onClick={() => updateProfileContactHandler("Email")}
//                   className="submit-btn-balance-transfer"
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {selectedActivity === "changename" && (
//           <div className="left-container-bt">
//             <IoArrowBackCircleOutline
//               onClick={() => selectingActivityType("")}
//               color={COLORS.white_s}
//               size={"2.5em"}
//             />
//             <label className="h-title-label-medium">Change name</label>

//             <label className="h-title-label-small">name</label>

//             {/** AMOUNT */}
//             <div className="content-container-up">
//               <input
//                 style={{
//                   flex: 1,
//                   padding: "0.5vw",
//                   backgroundColor: "transparent",
//                   border: "none",
//                   fontFamily: FONT.Montserrat_Regular,
//                   fontSize: "1em",
//                   outline: "none",
//                 }}
//                 type="text"
//                 name="name"
//                 placeholder="Enter name"
//                 value={enterValue}
//                 onChange={(e) => setEnterValue(e.target.value)}
//               />
//             </div>

//             {/** DEPOSIT BUTTON */}
//             <div
//               style={{
//                 marginTop: "2vw",
//               }}
//             >
//               {showProgressBar ? (
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
//                 <button
//                   onClick={() => updateProfileNameHandler()}
//                   className="submit-btn-balance-transfer"
//                 >
//                   Submit
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/** LEFT CONTAINER END */}

//         {/** RIGHT CONTAINER */}
//         <div className="right-container-up-up">
//           <div className="right-container-one-up">
//             <div className="imagecontainer-up-up">
//               {user?.avatar?.url ? (
//                 <img
//                   src={`${serverName}/uploads/${user?.avatar.url}`}
//                   alt="Profile Picture"
//                   className="user-imaged"
//                 />
//               ) : (
//                 <img
//                   src={images.user}
//                   alt="Profile Picture"
//                   className="user-imaged"
//                 />
//               )}
//             </div>

//             <div className="profile-content-container">
//               <label className="h-title-label">{user ? user.name : ""}</label>
//               <label className="h-title-label-medium">
//                 {user ? user.email : ""}
//               </label>

//               {user && user.contact != user.userId ? (
//                 <label className="h-title-label-medium">
//                   {user ? user.contact : ""}
//                 </label>
//               ) : null}

//               <label className="h-title-label-medium">
//                 {" "}
//                 User ID - {user ? user.userId : ""}
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default UpdateProfile;


// // .history-main-container{
// //   display: flex;
// //   flex: 1;
// //   height: 80vh;
// //   background: linear-gradient(180deg, #0162AF, #011833);
// //   border-radius: 2rem;
// //   flex-direction: column;
// //   gap: 2rem;
// //   width: 40vw;
// //   padding: 1rem;
// // }

// // .h-title-label{
// //   color: var(--white_s);
// //   font-size: 2vw;
// //   font-family: 'MB';
// // }

// // .submit-btn-balance-transfer {
// //   padding: 10px;
// //   border-radius: 5px;
// //   background-color: #0179FE;
// //   color: white;
// //   border: none;
// //   cursor: pointer;
// //   width: 100%;
// // }

// // .h-content-container-bt{
  
// //   height: 70vh;
// //   overflow-y: scroll; /* Enable vertical scrolling */
// //   display: flex;
// //   flex-direction: column;
// //   gap: 1vh;
// //   flex-direction: row;
// // }


// // .left-container-bt{
// //   flex: 1;
// //   display: flex;
// //   flex-direction: column;
// //   gap: 1vw;
// // }

// // .right-container-up-up{
// //  flex: 1;
// //   display: flex;
// //   flex-direction: row;

// // }

// // .right-container-one-up{
 
// //  flex: 1;
// //  height: 80%;
// //   background-color: var(--background);
// //   margin: 2%;
// //   padding: 2%;
// //   border-radius: 10px;
// //   display: flex;
// //   flex-direction: column;
// //   justify-content: space-evenly;
// //   position: relative;
// //   margin-top: 4%;
  
// // }

// // .walletcontainer-up{
// //   height: 30px;
// //   width: 30px;
// //   background-color: var(--white_s);
// //   border-radius: 5px;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// // }



// // .h-title-label-medium{
// //   color: var(--white_s);
// //   font-size: 1em;
// //   font-family: 'MR';
// // }
// // .h-title-label-small{
// //   color: var(--white_s);
// //   font-size: 0.8em;
// //   font-family: 'MR';
// // }

// // .imagecontainer-up-up {
// //   height: 10em;
// //   width: 10em;
// //   background-color: white;
// //   padding: 2%;
// //   border-radius: 50%;
// //   overflow: hidden;
// //   display: flex;
// //   justify-content: center;
// //   align-items: center;
// //   position: absolute;
// //   top: -1vw;
// //   left: 35%;
// // }

// // .profile-content-container{
// //   flex: 1;

// //   margin-top: 9em;
// //   display: flex;
// //   justify-content: start;
// //   align-items: center;
// //   flex-direction: column;
// //   gap: 0.5vw;
// // }

// // .content-label-up{
// //   color: var(--background);
// //   font-size: 1em;
// //   font-family: 'MR';
// //   align-self: center;
// //   padding-left: 1vw;
// // }

// // .content-container-up{
// //   background-color: var(--white_s);
// //   padding: 1vw;
// //   border-radius: 1vw;
// //   display: flex;
// //   flex-direction: row;
// // }

// // .input-container-up{
// //   font-family: "MR";
// //   min-width: 100%;
// //   background-color: var(--white_s);
// //   padding: 0.5vw;
// //   border-color: var(--background);
// //   border-radius: 0.5vw;
// // }


// // @media (max-width: 1024px) {

// //   .imagecontainer-up-up {
// //       height: 7em;
// //       width: 7em;
// //       background-color: white;
// //       padding: 2%;
// //       border-radius: 50%;
// //       overflow: hidden;
// //       display: flex;
// //       justify-content: center;
// //       align-items: center;
// //       position: absolute;
// //       top: -1vw;
// //       left: 35%;
// //   }
// // }


// // @media (max-width: 768px) {

// //   .right-container-up-up{
// //       display: none;
// //   }

// //   .h-title-label-medium-bt{
// //       color: var(--white_s);
// //       font-size: 1em;
// //       font-family: 'MR';
// //   }
// //   .content-label-up{
// //       color: var(--background);
// //       font-size: 0.6em;
// //       font-family: 'MR';
// //       align-self: center;
// //       padding-left: 1vw;
// //   }

 
// // }
