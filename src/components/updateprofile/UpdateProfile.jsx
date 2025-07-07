import React, { useCallback, useEffect, useState } from "react";
import "./UpdateProfile.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { loadProfile } from "../../redux/actions/userAction";
import images from "../../assets/constants/images";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { serverName } from "../../redux/store";
import { MdAccountCircle } from "react-icons/md";
import { IoIosArrowDropright } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { PiSubtitles } from "react-icons/pi";
import { LoadingComponent } from "../helper/LoadingComponent";

function UpdateProfile({ reloadKey }) {
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
    backhandlerUPP();
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
                  src={images?.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer" style={{ gap: "0.2rem" }}>
              <label className="upContentContainerLabelB">
                {user ? user?.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user?.email : ""}
              </label>
              {user && user?.contact != user?.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user?.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user?.userId : ""}
              </label>
              <label className="upContentContainerLabel">
                Country : {user ? user?.country?.countryname : ""}
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
            <div className="alUpdatePContainer" onClick={settingUPUP}>
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
                  src={images?.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user?.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user?.email : ""}
              </label>
              {user && user?.contact != user?.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user?.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user?.userId : ""}
              </label>
              <label className="upContentContainerLabel">
                Country : {user ? user.country?.countryname : ""}
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
                  src={`${serverName}/uploads/${user?.avatar?.url}`}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              ) : (
                <img
                  src={images?.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user?.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user?.email : ""}
              </label>
              {user && user?.contact != user?.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user?.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user?.userId : ""}
              </label>
              <label className="upContentContainerLabel">
                Country : {user ? user.country?.countryname : ""}
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
                  src={`${serverName}/uploads/${user?.avatar?.url}`}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              ) : (
                <img
                  src={images?.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user?.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user?.email : ""}
              </label>
              {user && user.contact != user.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user?.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user?.userId : ""}
              </label>
              <label className="upContentContainerLabel">
                Country : {user ? user.country?.countryname : ""}
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
                  src={`${serverName}/uploads/${user?.avatar?.url}`}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              ) : (
                <img
                  src={images?.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user?.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user?.email : ""}
              </label>
              {user && user?.contact != user?.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user?.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user?.userId : ""}
              </label>
              <label className="upContentContainerLabel">
                Country : {user ? user.country?.countryname : ""}
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
                  src={`${serverName}/uploads/${user?.avatar?.url}`}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              ) : (
                <img
                  src={images?.user}
                  alt="Profile Picture"
                  className="upuserimg"
                />
              )}
            </div>

            <div className="userDetailContainer">
              <label className="upContentContainerLabelB">
                {user ? user?.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user?.email : ""}
              </label>
              {user && user?.contact != user?.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user?.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user?.userId : ""}
              </label>
              <label className="upContentContainerLabel">
                Country : {user ? user.country?.countryname : ""}
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
                {user ? user?.name : ""}
              </label>
              <label className="upContentContainerLabel">
                {user ? user?.email : ""}
              </label>
              {user && user?.contact != user?.userId ? (
                <label className="upContentContainerLabel">
                  {user ? user?.contact : ""}
                </label>
              ) : null}
              <label className="upContentContainerLabel">
                User ID : {user ? user?.userId : ""}
              </label>
              <label className="upContentContainerLabel">
                Country : {user ? user.country?.countryname : ""}
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
