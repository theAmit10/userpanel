import React, { useEffect, useState } from "react";
import "./Setting.css";
import images from "../../assets/constants/images";
import COLORS from "../../assets/constants/colors";
import { FaWallet } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import HomeDashboard from "../../components/dashboard/HomeDashboard";
import AllLocation from "../../components/alllocation/AllLocation";
import Settingc from "../../components/setting/Settingc";
import Gamedescriptionc from "../../components/gamedescription/Gamedescriptionc.jsx";
import { TbHistoryToggle } from "react-icons/tb";
import { PiHandWithdrawFill } from "react-icons/pi";
import Historyc from "../../components/history/Historyc.jsx";
import Play from "../../components/play/Play.jsx";
import Playhistory from "../../components/playhistory/Playhistory.jsx";
import Paymentdeposit from "../../components/deposit/Paymentdeposit.jsx";
import Withdrawpayment from "../../components/withdraw/Withdrawpayment.jsx";
import { useNavigate } from "react-router-dom";
import { FaUserPen } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllNotification,
  loadProfile,
} from "../../redux/actions/userAction.js";
import Balancetransfer from "../../components/balancetransfer/Balancetransfer.jsx";
import AllResult from "../../components/result/AllResult.jsx";
import Aboutus from "../../components/about/Aboutus.jsx";
import ChangePassword from "../../components/changepassword/ChangePassword.jsx";
import UpdateProfile from "../../components/updateprofile/UpdateProfile.jsx";
import Wallet from "../../components/wallet/Walllet.jsx";
import Notification from "../../components/notification/Notification.jsx";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

import {
  showErrorToast,
  showSuccessToast,
} from "../../components/helper/showErrorToast.jsx";
import Logout from "../../components/logout/Logout.jsx";
import { serverName } from "../../redux/store.js";
import { PiHandDepositFill } from "react-icons/pi";
import { FaInfoCircle } from "react-icons/fa";
import { GiDiamondTrophy, GiTrophy } from "react-icons/gi";
import { ToastContainer } from "react-toastify";
import Partner from "../../components/partner/Partner.jsx";
import { TiGroup } from "react-icons/ti";
import PowerballDashboard from "../../components/powerball/PowerballDashboard.jsx";
import ResultDashboard from "../../components/result/ResultDashboard.jsx";
import { useGetPowerballQuery } from "../../redux/api.js";
import { MdNotificationAdd } from "react-icons/md";

export const locationdata = [
  {
    id: "1",
    name: "Canada",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "2",
    name: "Japan",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "3",
    name: "Punjab",
    limit: "200 - 200X",
    times: [
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "4",
    name: "Pune",
    limit: "200 - 200X",
    times: [
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "5",
    name: "China",
    limit: "100 - 100X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "6",
    name: "India",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "7",
    name: "USA",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
    ],
  },
  {
    id: "8",
    name: "Korea",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
];

const Setting = () => {
  const [selectedComponent, setSelectedComponent] = useState("gamedescription");

  // const handleComponentClick = (comp) => {
  //   console.log("clicked");
  //   setSelectedComponent(comp);
  // };

  const [reloadKey, setReloadKey] = useState(0); // Key to force re-render

  const handleComponentClick = (comp) => {
    if (selectedComponent === comp) {
      // If the same component is clicked, increment the reloadKey to force a reload
      setReloadKey((prevKey) => prevKey + 1);
      // showWarningToast("processing :: "+reloadKey)
    } else {
      // Otherwise, set the selected component and reset the key
      // showWarningToast("processing :: "+reloadKey)
      setSelectedComponent(comp);
      setReloadKey(0);
    }
  };

  useEffect(() => {
    console.log("location changed");
  }, [selectedComponent]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotoNavigation = () => {
    navigate("/setting");
  };

  const getUserAccessToken = async () => {
    try {
      const val = await localStorage.getItem("accesstoken");
      console.log("From SS Access Token :: " + val);
      // dispatch(getUserAccessToken(val));
      dispatch({
        type: "getaccesstoken",
        payload: val,
      });

      dispatch(loadProfile(val));
    } catch (error) {
      console.log("error" + error);
    }
  };

  useEffect(() => {
    getUserAccessToken();
  }, []);

  const { accesstoken, user } = useSelector((state) => state.user);

  const [gameName, setGameName] = useState("Loading...");
  // Network call
  const { data, isLoading } = useGetPowerballQuery(
    { accesstoken },
    { skip: !accesstoken }
  );

  useEffect(() => {
    if (!isLoading && data) {
      setGameName(data.games[0].name);
      console.log(data?.games[0].name);
    }
  }, [data, isLoading]); // Correct dependencies

  const [newNotification, setNewNotification] = useState(true);
  const { notifications, loadingNotification } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (accesstoken) {
      dispatch(loadAllNotification(accesstoken, user?._id));
    }
  }, [dispatch, accesstoken]);

  useEffect(() => {
    if (accesstoken) {
      if (!loadingNotification && notifications && user) {
        checkingForNewNotification();
      }
    }
  }, [loadingNotification, notifications, user, accesstoken]);

  const checkingForNewNotification = () => {
    console.log("CHECKING FOR NEW NOTIFCATION");
    if (notifications) {
      const noti =
        notifications?.length === 0 ? true : notifications[0]?.seennow;
      console.log("seennow noti len :: " + notifications?.length);
      console.log("seennow :: " + noti);
      setNewNotification(noti);
    }
  };

  return (
    <div className="adminDashboardContainer">
      {/** TOP CONTAINER */}
      <div className="top-admin-d">
        {/** TOP LEFT */}
        <div className="top-left-d">
          <div className="top-left-left-d">
            <label className="hellolabel">Hello,</label>
            <label className="usernamelabel">{user ? user.name : ""}</label>
          </div>
          <div className="top-left-right-d">
            <div className="userimagecontainer">
              {/* <img
                src={images.user}
                alt="Profile Picture"
                className="userprofileimg"
              /> */}
              <img
                src={
                  user?.avatar?.url
                    ? `${serverName}/uploads/${user?.avatar.url}`
                    : images.user
                }
                alt="Profile Picture"
                className="userprofileimg"
                onError={(e) => {
                  e.target.onerror = null; // Prevents looping
                  e.target.src = images.user; // Fallback to default image on error
                }}
              />
            </div>
          </div>
        </div>

        {/** TOP RIGHT */}
        <div className="top-right-d">
          <div className="top-right-right-d">
            {/** DEPOSIT */}
            <div
              className="depositContainer"
              onClick={() => handleComponentClick("deposit")}
            >
              <label className="depositContainerLabel">DEPOSIT</label>
              <PiHandDepositFill color={COLORS.white_s} size={"2rem"} />
            </div>

            {/**  WITHDRAW */}
            <div
              className="depositContainer"
              onClick={() => handleComponentClick("withdraw")}
            >
              <label className="depositContainerLabel">WITHDRAW</label>
              <PiHandWithdrawFill color={COLORS.white_s} size={"2rem"} />
            </div>

            <div
              onClick={() => handleComponentClick("wallet")}
              className="iconcontainertop"
            >
              <FaWallet color={COLORS.background} size={"3rem"} />
            </div>

            <div
              onClick={() => handleComponentClick("notification")}
              className="iconcontainertop"
            >
              {newNotification ? (
                <IoIosNotifications color={COLORS.background} size={"3rem"} />
              ) : (
                <MdNotificationAdd color={COLORS.result_yellow} size={"3rem"} />
              )}
            </div>

            <div
              onClick={() => navigate("/dashboard")}
              className="iconcontainertop"
            >
              <FaHome color={COLORS.background} size={"3rem"} />
            </div>
          </div>
        </div>
      </div>
      {/** TOP CONTAINER END */}

      {/** MAIN CONTENT CONTAINER */}
      <div className="adminDashboardMainContainer">
        {/** LEFT  */}
        <div className="adLeftContainer">
          {/** CONTENT */}

          {/** Partner */}
          {user && user.partnerStatus && (
            <div
              className="adLContenContainer"
              key={"partner"}
              onClick={() => handleComponentClick("partner")}
              style={{
                background:
                  selectedComponent === "partner"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="adLContenContainerIcon">
                <TiGroup color={COLORS.white_s} size={"2.5rem"} />
              </div>
              <label className="adLContenContainerLabel">Partner</label>
            </div>
          )}

          {/** POWERBALL */}
          <div
            className="adLContenContainer"
            key={"partner"}
            onClick={() => handleComponentClick("powerball")}
            style={{
              background:
                selectedComponent === "powerball"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <GiDiamondTrophy color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">{gameName}</label>
          </div>

          {/** PLAY HISTORY */}
          <div
            className="adLContenContainer"
            key={"playhistory"}
            onClick={() => handleComponentClick("playhistory")}
            style={{
              background:
                selectedComponent === "playhistory"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <TbHistoryToggle color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Play History</label>
          </div>

          {/** ALL LOCATION */}
          <div
            className="adLContenContainer"
            key={"alllocation"}
            onClick={() => handleComponentClick("alllocation")}
            style={{
              background:
                selectedComponent === "alllocation"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <IoLocationSharp color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">All Location</label>
          </div>

          {/** BALANCE TRANSFER */}
          <div
            className="adLContenContainer"
            key={"balancetransfer"}
            onClick={() => handleComponentClick("balancetransfer")}
            style={{
              background:
                selectedComponent === "balancetransfer"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaMoneyBillTransfer color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Balance Transfer</label>
          </div>

          {/** HISTORY */}
          <div
            className="adLContenContainer"
            key={"history"}
            onClick={() => handleComponentClick("history")}
            style={{
              background:
                selectedComponent === "history"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaHistory color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">
              Transaction History
            </label>
          </div>

          {/** RESULT */}
          <div
            className="adLContenContainer"
            key={"result"}
            onClick={() => handleComponentClick("result")}
            style={{
              background:
                selectedComponent === "result"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <GiTrophy color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Result</label>
          </div>

          {/** CHANGE PASSWORD */}
          <div
            className="adLContenContainer"
            key={"changepassword"}
            onClick={() => handleComponentClick("changepassword")}
            style={{
              background:
                selectedComponent === "changepassword"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <RiLockPasswordLine color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Change Password</label>
          </div>

          {/** UPDATE PROFILE */}
          <div
            className="adLContenContainer"
            key={"updateprofile"}
            onClick={() => handleComponentClick("updateprofile")}
            style={{
              background:
                selectedComponent === "updateprofile"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaUserPen color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Update Profile</label>
          </div>

          {/** GAME DESCRIPTION */}
          <div
            className="adLContenContainer"
            key={"gamedescription"}
            onClick={() => handleComponentClick("gamedescription")}
            style={{
              background:
                selectedComponent === "gamedescription"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <TbFileDescription color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Game Description</label>
          </div>

          {/** ABOUT US */}
          <div
            className="adLContenContainer"
            key={"aboutus"}
            onClick={() => handleComponentClick("aboutus")}
            style={{
              background:
                selectedComponent === "aboutus"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaInfoCircle color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">About us</label>
          </div>

          {/** LOGOUT */}
          <div
            className="adLContenContainer"
            key={"logout"}
            onClick={() => handleComponentClick("logout")}
            style={{
              background:
                selectedComponent === "logout"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <IoIosLogOut color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Log out</label>
          </div>
        </div>

        {/** RIGHT CONTINER */}

        <div className="adRightContainer">
          {selectedComponent === "dashboard" && (
            <HomeDashboard
              selectedComponent={selectedComponent}
              handleComponentClick={handleComponentClick}
              reloadKey={reloadKey}
            />
          )}

          {selectedComponent === "home" && (
            <HomeDashboard reloadKey={reloadKey} />
          )}
          {selectedComponent === "alllocation" && (
            <AllLocation reloadKey={reloadKey} />
          )}
          {selectedComponent === "setting" && (
            <Settingc reloadKey={reloadKey} />
          )}
          {selectedComponent === "history" && (
            <Historyc reloadKey={reloadKey} />
          )}
          {selectedComponent === "play" && <Play reloadKey={reloadKey} />}
          {selectedComponent === "playhistory" && (
            <Playhistory reloadKey={reloadKey} />
          )}
          {selectedComponent === "deposit" && (
            <Paymentdeposit reloadKey={reloadKey} />
          )}
          {selectedComponent === "withdraw" && (
            <Withdrawpayment reloadKey={reloadKey} />
          )}
          {selectedComponent === "balancetransfer" && (
            <Balancetransfer reloadKey={reloadKey} />
          )}
          {/* {selectedComponent === "result" && (
            <AllResult reloadKey={reloadKey} />
          )} */}

          {selectedComponent === "result" && (
            <ResultDashboard reloadKey={reloadKey} />
          )}
          {selectedComponent === "aboutus" && <Aboutus reloadKey={reloadKey} />}
          {selectedComponent === "changepassword" && (
            <ChangePassword reloadKey={reloadKey} />
          )}
          {selectedComponent === "updateprofile" && (
            <UpdateProfile reloadKey={reloadKey} />
          )}
          {selectedComponent === "wallet" && <Wallet reloadKey={reloadKey} />}
          {selectedComponent === "notification" && (
            <Notification reloadKey={reloadKey} />
          )}
          {selectedComponent === "gamedescription" && (
            <Gamedescriptionc reloadKey={reloadKey} />
          )}
          {selectedComponent === "partner" && <Partner reloadKey={reloadKey} />}
          {selectedComponent === "powerball" && (
            <PowerballDashboard reloadKey={reloadKey} />
          )}
          {selectedComponent === "logout" && <Logout reloadKey={reloadKey} />}
        </div>
      </div>

      {/** MAIN CONTENT CONTAINER END */}

      <ToastContainer />
    </div>
  );
};

export default Setting;

// import React, { useEffect, useState } from "react";
// import "./Setting.css";
// import FONT from "../../assets/constants/fonts";
// import images from "../../assets/constants/images";
// import { CiSearch } from "react-icons/ci";
// import { BsBank2 } from "react-icons/bs";
// import COLORS from "../../assets/constants/colors";
// import { FaWallet } from "react-icons/fa";
// import { IoIosNotifications } from "react-icons/io";
// import { IoIosSettings } from "react-icons/io";
// import { AiFillAndroid } from "react-icons/ai";
// import { FaApple } from "react-icons/fa";
// import { FaHome } from "react-icons/fa";
// import { IoLocationSharp } from "react-icons/io5";
// import { FaTrophy } from "react-icons/fa6";
// import { FaPlay } from "react-icons/fa";
// import { FaHistory } from "react-icons/fa";
// import { TbFileDescription } from "react-icons/tb";
// import { IoIosInformationCircle } from "react-icons/io";
// import { SlCalender } from "react-icons/sl";
// import HomeDashboard from "../../components/dashboard/HomeDashboard";
// import AllLocation from "../../components/alllocation/AllLocation";
// import Settingc from "../../components/setting/Settingc";
// import Gamedescriptionc from "../../components/gamedescription/Gamedescriptionc.jsx";
// import { MdPayment } from "react-icons/md";
// import { TbHistoryToggle } from "react-icons/tb";
// import { PiHandDepositBold } from "react-icons/pi";
// import { PiHandWithdrawFill } from "react-icons/pi";
// import Historyc from "../../components/history/Historyc.jsx";
// import Play from "../../components/play/Play.jsx";
// import Playhistory from "../../components/playhistory/Playhistory.jsx";
// import Paymentdeposit from "../../components/deposit/Paymentdeposit.jsx";
// import Withdrawpayment from "../../components/withdraw/Withdrawpayment.jsx";
// import { useNavigate } from "react-router-dom";
// import { FaUserPen } from "react-icons/fa6";
// import { FaMoneyBillTransfer } from "react-icons/fa6";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { loadProfile } from "../../redux/actions/userAction.js";
// import Balancetransfer from "../../components/balancetransfer/Balancetransfer.jsx";
// import AllResult from "../../components/result/AllResult.jsx";
// import Aboutus from "../../components/about/Aboutus.jsx";
// import ChangePassword from "../../components/changepassword/ChangePassword.jsx";
// import UpdateProfile from "../../components/updateprofile/UpdateProfile.jsx";
// import Wallet from "../../components/wallet/Walllet.jsx";
// import Notification from "../../components/notification/Notification.jsx";
// import { IoHome } from "react-icons/io5";
// import { IoIosLogOut } from "react-icons/io";
// import { useGetLogoutQuery } from "../../redux/api.js";
// import {
//   showErrorToast,
//   showSuccessToast,
// } from "../../components/helper/showErrorToast.jsx";
// import Logout from "../../components/logout/Logout.jsx";
// import { serverName } from "../../redux/store.js";

// export const locationdata = [
//   {
//     id: "1",
//     name: "Canada",
//     limit: "200 - 200X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "12", time: "10:00 AM" },
//       { id: "13", time: "11:00 AM" },
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
//   {
//     id: "2",
//     name: "Japan",
//     limit: "200 - 200X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "12", time: "10:00 AM" },
//       { id: "13", time: "11:00 AM" },
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
//   {
//     id: "3",
//     name: "Punjab",
//     limit: "200 - 200X",
//     times: [
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
//   {
//     id: "4",
//     name: "Pune",
//     limit: "200 - 200X",
//     times: [
//       { id: "13", time: "11:00 AM" },
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
//   {
//     id: "5",
//     name: "China",
//     limit: "100 - 100X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
//   {
//     id: "6",
//     name: "India",
//     limit: "200 - 200X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "12", time: "10:00 AM" },
//       { id: "13", time: "11:00 AM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
//   {
//     id: "7",
//     name: "USA",
//     limit: "200 - 200X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "12", time: "10:00 AM" },
//       { id: "13", time: "11:00 AM" },
//       { id: "14", time: "12:00 PM" },
//     ],
//   },
//   {
//     id: "8",
//     name: "Korea",
//     limit: "200 - 200X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "12", time: "10:00 AM" },
//       { id: "13", time: "11:00 AM" },
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
// ];

// const Setting = () => {
//   const [selectedComponent, setSelectedComponent] = useState("gamedescription");

//   const handleComponentClick = (comp) => {
//     console.log("clicked");
//     setSelectedComponent(comp);
//   };

//   useEffect(() => {
//     console.log("location changed");
//   }, [selectedComponent]);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const gotoNavigation = () => {
//     navigate("/setting");
//   };

//   const getUserAccessToken = async () => {
//     try {
//       const val = await localStorage.getItem("accesstoken");
//       console.log("From SS Access Token :: " + val);
//       // dispatch(getUserAccessToken(val));
//       dispatch({
//         type: "getaccesstoken",
//         payload: val,
//       });

//       dispatch(loadProfile(val));
//     } catch (error) {
//       console.log("error" + error);
//     }
//   };

//   useEffect(() => {
//     getUserAccessToken();
//   }, []);

//   const { accesstoken, user } = useSelector((state) => state.user);

//   const loggingOff = () => {
//     console.log("STARTING LOGGING OFF");

//     const { data, error, isLoading } = useGetLogoutQuery(accesstoken);

//     console.log(isLoading);

//     if (data) {
//       showSuccessToast("Logout Successfully");
//       localStorage.clear();
//       navigate("/login");
//     } else if (error) {
//       showErrorToast("Something went wrong");
//     }
//   };

//   return (
//     <div className="main-parent">
//       {/** Top bar */}
//       <div className="topheaderd">
//         <div className="lefttopcontinerd">
//           <div className="ltcleftd">
//             <label className="helloLabel">Hello,</label>
//             <label className="usernameLabel">{user ? user.name : ""}</label>
//           </div>
//           <div className="ltcrightd">
//             <div className="ltcrightimaged">
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
//           </div>
//         </div>
//         <div className="righttopcontinerd">
//           {/** deposit */}
//           <div
//             className="depositcontainerd"
//             style={{ cursor: "pointer" }}
//             onClick={() => setSelectedComponent("deposit")}
//           >
//             <div
//               style={{
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <PiHandDepositBold color={COLORS.white_s} size={"1.5vw"} />
//             </div>

//             <label className="depositLabel" style={{ cursor: "pointer" }}>
//               DEPOSIT
//             </label>
//           </div>

//           {/** withdraw */}
//           <div
//             className="depositcontainerd"
//             style={{ cursor: "pointer" }}
//             onClick={() => setSelectedComponent("withdraw")}
//           >
//             <div
//               style={{
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <PiHandWithdrawFill color={COLORS.white_s} size={"1.5vw"} />
//             </div>

//             <label className="depositLabel" style={{ cursor: "pointer" }}>
//               WITHDRAW
//             </label>
//           </div>
//           {/** location */}
//           <div
//             onClick={() => handleComponentClick("wallet")}
//             style={{ cursor: "pointer" }}
//             className="iconcontainerd"
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <FaWallet color={COLORS.background} size={"30px"} />
//             </div>
//           </div>
//           {/** notification */}
//           <div
//             className="iconcontainerd"
//             style={{ cursor: "pointer" }}
//             onClick={() => handleComponentClick("notification")}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <IoIosNotifications color={COLORS.background} size={"30px"} />
//             </div>
//           </div>
//           {/** setting */}
//           <div
//             onClick={() => navigate("/dashboard")}
//             style={{ cursor: "pointer" }}
//             className="iconcontainerd"
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <IoHome color={COLORS.background} size={"30px"} />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/** content */}
//       <div className="contentcontainer">
//         {/** Left Container */}
//         <div className="leftcontainerS">
//           {/** App sidebar left */}
//           <div className="leftsidebartopS">
//             {/** Setting content */}
//             <div className="settingContainer">
//               <label className="left-content-label-title">Setting</label>

//               <div
//                 style={{
//                   display: "flex",
//                 }}
//               >
//                 <IoIosSettings color={COLORS.background} size={"22px"} />
//               </div>
//             </div>

//   {/** UPDATE PROFILE */}
//   <div
//     className="lscontentS"
//     key={"updateprofile"}
//     onClick={() => handleComponentClick("updateprofile")}
//     style={{
//       background:
//         selectedComponent === "updateprofile"
//           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//           : "linear-gradient(180deg, #011833, #011833)",
//     }}
//   >
//     <div className="left-content-icon-container">
//       <FaUserPen color={COLORS.white_s} size={"20px"} />
//     </div>

//     <label className="left-content-label">Update Profile</label>
//   </div>

//   {/** BALANCE TRANSFER */}

//   <div
//     className="lscontentS"
//     key={"balancetransfer"}
//     onClick={() => handleComponentClick("balancetransfer")}
//     style={{
//       background:
//         selectedComponent === "balancetransfer"
//           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//           : "linear-gradient(180deg, #011833, #011833)",
//     }}
//   >
//     <div className="left-content-icon-container">
//       <FaMoneyBillTransfer color={COLORS.white_s} size={"20px"} />
//     </div>

//     <label className="left-content-label">Balance Transfer</label>
//   </div>

//   {/** CHANGE PASSWORD */}
//   <div
//     className="lscontentS"
//     key={"changepassword"}
//     onClick={() => handleComponentClick("changepassword")}
//     style={{
//       background:
//         selectedComponent === "changepassword"
//           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//           : "linear-gradient(180deg, #011833, #011833)",
//     }}
//   >
//     <div className="left-content-icon-container">
//       <RiLockPasswordLine color={COLORS.white_s} size={"20px"} />
//     </div>

//     <label className="left-content-label">Change Password</label>
//   </div>
//   {/** Results */}
//   <div
//     className="lscontentS"
//     key={"result"}
//     onClick={() => handleComponentClick("result")}
//     style={{
//       background:
//         selectedComponent === "result"
//           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//           : "linear-gradient(180deg, #011833, #011833)",
//     }}
//   >
//     <div className="left-content-icon-container">
//       <FaTrophy color={COLORS.white_s} size={"20px"} />
//     </div>

//     <label className="left-content-label">Result</label>
//   </div>

//   {/** Deposit */}
//   {/* <div
//     className="lscontentS"
//     key={"deposit"}
//     onClick={() => handleComponentClick("deposit")}
//     style={{
//       background:
//         selectedComponent === "deposit"
//           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//           : "linear-gradient(180deg, #011833, #011833)",
//     }}
//   >
//     <div className="left-content-icon-container">
//       <PiHandDepositBold color={COLORS.white_s} size={"20px"} />
//     </div>

//     <label className="left-content-label">Deposit</label>
//   </div> */}

//   {/** Withdraw */}
//   {/* <div
//     className="lscontentS"
//     key={"withdraw"}
//     onClick={() => handleComponentClick("withdraw")}
//     style={{
//       background:
//         selectedComponent === "withdraw"
//           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//           : "linear-gradient(180deg, #011833, #011833)",
//     }}
//   >
//     <div className="left-content-icon-container">
//       <PiHandWithdrawFill color={COLORS.white_s} size={"20px"} />
//     </div>

//     <label className="left-content-label">Withdraw</label>
//   </div> */}

//   {/** Play History */}
//   <div
//     className="lscontentS"
//     key={"playhistory"}
//     onClick={() => handleComponentClick("playhistory")}
//     style={{
//       background:
//         selectedComponent === "playhistory"
//           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//           : "linear-gradient(180deg, #011833, #011833)",
//     }}
//   >
//     <div className="left-content-icon-container">
//       <TbHistoryToggle color={COLORS.white_s} size={"20px"} />
//     </div>

//     <label className="left-content-label">Play History</label>
//   </div>

//   {/** History */}
//   <div
//     className="lscontentS"
//     key={"history"}
//     onClick={() => handleComponentClick("history")}
//     style={{
//       background:
//         selectedComponent === "history"
//           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//           : "linear-gradient(180deg, #011833, #011833)",
//     }}
//   >
//     <div className="left-content-icon-container">
//       <FaHistory color={COLORS.white_s} size={"20px"} />
//     </div>

//     <label className="left-content-label">History</label>
//   </div>

//   {/** Game Description */}
//   <div
//     className="lscontentS"
//     key={"gamedescription"}
//     onClick={() => handleComponentClick("gamedescription")}
//     style={{
//       background:
//         selectedComponent === "gamedescription"
//           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//           : "linear-gradient(180deg, #011833, #011833)",
//     }}
//   >
//     <div className="left-content-icon-container">
//       <TbFileDescription color={COLORS.white_s} size={"20px"} />
//     </div>

//     <label className="left-content-label">Game Description</label>
//   </div>

//   {/** About Us */}
//   <div
//     className="lscontentS"
//     key={"aboutus"}
//     onClick={() => handleComponentClick("aboutus")}
//     style={{
//       background:
//         selectedComponent === "aboutus"
//           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//           : "linear-gradient(180deg, #011833, #011833)",
//     }}
//   >
//     <div className="left-content-icon-container">
//       <IoIosInformationCircle color={COLORS.white_s} size={"20px"} />
//     </div>

//     <label className="left-content-label">About Us</label>
//   </div>

//   {/** LOG OUT */}
//   <div
//     className="lscontentS"
//     key={"logout"}
//     onClick={() => handleComponentClick("logout")}
//     style={{
//       background:
//         selectedComponent === "logout"
//           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//           : "linear-gradient(180deg, #011833, #011833)",
//     }}
//   >
//     <div className="left-content-icon-container">
//       <IoIosLogOut color={COLORS.white_s} size={"20px"} />
//     </div>

//     <label className="left-content-label">Log out</label>
//   </div>
// </div>
//         </div>

//         {/** Main Containt */}
//         <div className="main-center-content">
//           {selectedComponent === "home" && <HomeDashboard />}
//           {selectedComponent === "alllocation" && <AllLocation />}
//           {selectedComponent === "setting" && <Settingc />}

//           {selectedComponent === "history" && <Historyc />}
//           {selectedComponent === "play" && <Play />}
//           {selectedComponent === "playhistory" && <Playhistory />}
//           {selectedComponent === "deposit" && <Paymentdeposit />}
//           {selectedComponent === "withdraw" && <Withdrawpayment />}
//           {selectedComponent === "balancetransfer" && <Balancetransfer />}
//           {selectedComponent === "result" && <AllResult />}
//           {selectedComponent === "aboutus" && <Aboutus />}
//           {selectedComponent === "changepassword" && <ChangePassword />}
//           {selectedComponent === "updateprofile" && <UpdateProfile />}
//           {selectedComponent === "wallet" && <Wallet />}
//           {selectedComponent === "notification" && <Notification />}
//           {selectedComponent === "gamedescription" && <Gamedescriptionc />}
//           {selectedComponent === "logout" && <Logout />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Setting;

// .main-parent {
//   height: 100vh;
//   width: 100%;
//   background-color: var(--background);
//   display: flex;
//   flex-direction: column;
// }

// .topheader-setting {
//   display: flex;
//   height: 10vh;
//   width: 100%;
//   margin-right: 2%;
//   flex-direction: row;
// }

// .lefttopcontiner-setting {
//   width: 18vw;
//   height: 100%;
//   display: flex;
// }

// .left-content-label{
//   color: white;
//   font-family: "MR";
//   font-size: 0.8em; /* Use relative units */
//   text-align: center;
//   flex: 1;
//   text-align: left;

// }

// .left-content-label-title{
//   color: var(--white);
//   font-family: "MB";
//   font-size: 3vh;
//   text-align: "center";
//   padding: 1vh;

// }

// .left-content-icon-container{
//   display: flex;
//   min-width: 3vw;
//   justify-content: right;
//   align-items: center;
// }

// .ltcleft-setting {
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   padding-left: 10%;
// }

// .ltcrightimage-setting {
//   height: 8vh;
//   width: 8vh;
//   background-color: white;
//   padding: 2%;
//   border-radius: 50%;
//   overflow: hidden;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .user-image-setting {
//   height: 100%;
//   width: 100%;
//   object-fit: cover;
//   border-radius: 50%;
// }

// .ltcright-setting {
//   flex: 1;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   background-color: 'pink';
// }

// .depositcontainer-setting, .walletcontainer-setting, .iconcontainer-setting {
//   padding: 3vh;
//   margin: 2vh;
//   border-radius: 1vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;

// }

// .searchcontainer-setting {
//   flex: 1;
//   background-color: var(--grayHalfBg);
//   flex-direction: row;
//   justify-content: flex-start;
//   padding: 3vh;
//   margin: 2vh;
//   border-radius: 1vh;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// }

// .depositcontainer-setting {
//   width: 10%;
//   background: linear-gradient(180deg, #7EC630, #3D6017);
// }

// .walletcontainer-setting {
//   width: 10%;
//   background-color: var(--grayHalfBg);
// }

// .iconcontainer-setting {
//   width: 5vh;
//   height: 5vh;
//   background-color: var(--grayHalfBg);
// }

// .contentcontainer {
//   flex: 1;
//   display: flex;
//   width: 100%;
//   flex-direction: row;
//   height: 90vh;
// }

// .leftcontainerS {
//   width: 15%;
//   height: 90vh;

// }

// .leftsidebartopS {
//   height: 80%;
//   width: calc(100% - 10%); /* Adjust width to account for margin */
//   background: linear-gradient(180deg, #0162AF, #011833);
//   margin: 5%;
//   margin-right: 5%; /* Add specific margin for the right side */
//   border-radius: 3vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   gap: 10px;
// }

// .lscontent{
//   width: calc(100% - 10%); /* Adjust width to account for margin */
//   background-color: var(--background);
//   height: 10%;
//   padding: 2%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   border-radius: 8px;
//   gap: 10px;
//   align-self: center;
// }

// .lscontentS{
//   width: calc(100% - 10%); /* Adjust width to account for margin */
//   height: 10%;
//   padding: 2%;
//   display: flex;
//   flex-direction: row;
//   border-radius: 8px;
//   gap: 10px;
//   align-items: center;
//   justify-content: center;
// }

// .lscontent:hover{
//   border: 2px solid var(--green); /* Change border color on hover */
//   cursor: pointer;
// }

// .appiconcontainer{
//   width: 20%;
//   background-color: var(--grayHalfBg);
//   border-radius: 1vh;
//   padding: 3px;
// }

// .main-center-content{
//   display: flex;
//   flex: 1;

// }

// .righttopcontinersetting {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-end;
// }

// .settingContainer{
//   height: 8%;
//   display: flex;
//   flex-direction: row;
//   width: 90%;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 10%;
// }

// /* Medium devices (tablets) */
// @media (max-width: 1024px) {
//   /* CSS rules for tablets in landscape mode */
//   .helloLabel{
//       color: var(--white_s);
//       font-family: "HR";
//       font-size: 1.8vw;
//   }
//   .usernameLabel{
//       color: var(--white_s);
//       font-family: "HB";
//       font-size: 2vw;
//   }
//   .topheaderd {
//       display: flex;
//       height: 8%;
//       width: 100%;
//       margin-right: 2%;
//       flex-direction: row;
//   }
//   .searchLabel{
//       color: var(--black);
//       font-family: "MR";
//       font-size:  1em,;
//       padding-left: 10px;
//   }
// }

// /* Media query to hide the label on small screens */
// @media (max-width: 768px) {
//   .left-content-label {
//     display: none; /* Hide the label on screens smaller than 768px */
//   }

//   .lscontentd{
//       width: calc(100% - 10%); /* Adjust width to account for margin */
//       background-color: var(--background);
//       height: 10%;
//       padding: 2%;
//       display: flex;
//       flex-direction: row;
//       justify-content: center;
//       align-items: center;
//       border-radius: 8px;
//       gap: 10px;

//   }
//   .lscontentd:hover{
//       border: 2px solid var(--green); /* Change border color on hover */
//       cursor: pointer;
//   }
//   .lscontentIconContiner{
//       display: flex;
//       min-width: 3vw;
//       justify-content: center;
//       align-items: center;

//   }
//   .leftsidebarmiddled  {
//       display: none;
//   }
//   .getTheApplabel{
//       display: none;
//   }

//    .depositcontainerd, .iconcontainerd {
//       padding: 10px;
//       border-radius: 10px;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       height: 40px;
//       width: 40px;
//       cursor: pointer;
//   }
//   .walletcontainerd,.depositcontainerd,.searchcontainerd{
//       display: none;
//   }
//   .topheaderd {
//       display: flex;
//       height: 8%;
//       width: 100%;
//       margin-right: 2%;
//       flex-direction: row;
//   }
//   .lefttopcontinerd {
//       width: 18%;
//       height: 100%;
//       display: flex;
//       justify-content: left;
//       justify-content: flex-start;
//       align-items: flex-start;
//   }
//   .ltcleftd{
//       display: none;
//   }

//   .left-content-label-title{
//       display: none;
//   }

//   .settingContainer{
//       display: none;
//   }

//   .lscontentS{
//       width: calc(100% - 10%); /* Adjust width to account for margin */
//       height: 10%;
//       padding: 2%;
//       display: flex;
//       flex-direction: row;
//       border-radius: 8px;
//       gap: 10px;
//       align-items: center;
//       justify-content: center;
//       margin-top: 15%;
//   }
//   .leftcontainerS {
//       width: 60px;
//       height: 90vh;

//   }
//   .leftsidebartopS {

//       height: 75%;
//       width: 60px;/* Adjust width to account for margin */
//       background: linear-gradient(180deg, #0162AF, #011833);
//       margin: 5%;
//       margin-right: 5%; /* Add specific margin for the right side */
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-direction: column;
//       gap: 10px;
//       border-top-right-radius: 10px;
//       border-top-left-radius: 10px;
//   }
//   .lefttopcontinerd {
//       width: 50px;
//       height: 100%;
//       display: flex;
//       padding-left: 5px;
//   }

// }
