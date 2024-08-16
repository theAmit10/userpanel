import React, { useEffect, useState } from "react";
import "./Setting.css";
import FONT from "../../assets/constants/fonts";
import images from "../../assets/constants/images";
import { CiSearch } from "react-icons/ci";
import { BsBank2 } from "react-icons/bs";
import COLORS from "../../assets/constants/colors";
import { FaWallet } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { AiFillAndroid } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { TbFileDescription } from "react-icons/tb";
import { IoIosInformationCircle } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import HomeDashboard from "../../components/dashboard/HomeDashboard";
import AllLocation from "../../components/alllocation/AllLocation";
import Settingc from "../../components/setting/Settingc";
import Gamedescriptionc from "../../components/gamedescription/Gamedescriptionc.jsx";
import { MdPayment } from "react-icons/md";
import { TbHistoryToggle } from "react-icons/tb";
import { PiHandDepositBold } from "react-icons/pi";
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
import { loadProfile } from "../../redux/actions/userAction.js";
import Balancetransfer from "../../components/balancetransfer/Balancetransfer.jsx";
import AllResult from "../../components/result/AllResult.jsx";
import Aboutus from "../../components/about/Aboutus.jsx";
import ChangePassword from "../../components/changepassword/ChangePassword.jsx";
import UpdateProfile from "../../components/updateprofile/UpdateProfile.jsx";
import Wallet from "../../components/wallet/Walllet.jsx";
import Notification from "../../components/notification/Notification.jsx";
import { IoHome } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { useGetLogoutQuery } from "../../redux/api.js";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/helper/showErrorToast.jsx";
import Logout from "../../components/logout/Logout.jsx";

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

  const handleComponentClick = (comp) => {
    console.log("clicked");
    setSelectedComponent(comp);
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

  const loggingOff = () => {
    console.log("STARTING LOGGING OFF");

    const { data, error, isLoading } = useGetLogoutQuery(accesstoken);

    console.log(isLoading);

    if (data) {
      showSuccessToast("Logout Successfully");
      localStorage.clear();
      navigate("/login");
    } else if (error) {
      showErrorToast("Something went wrong");
    }
  };

  return (
    <div className="main-parent">
      {/** Top bar */}
      <div className="topheaderd">
        <div className="lefttopcontinerd">
          <div className="ltcleftd">
            <label className="helloLabel">Hello,</label>
            <label className="usernameLabel">Wasu</label>
          </div>
          <div className="ltcrightd">
            <div className="ltcrightimaged">
              <img
                src={images.user}
                alt="Profile Picture"
                className="user-imaged"
              />
            </div>
          </div>
        </div>
        <div className="righttopcontinerd">
          {/** deposit */}
          <div
            className="depositcontainerd"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedComponent("deposit")}
          >
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <PiHandDepositBold color={COLORS.white_s} size={"1.5vw"} />
            </div>

            <label className="depositLabel" style={{ cursor: "pointer" }}>
              DEPOSIT
            </label>
          </div>

          {/** withdraw */}
          <div
            className="depositcontainerd"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedComponent("withdraw")}
          >
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <PiHandWithdrawFill color={COLORS.white_s} size={"1.5vw"} />
            </div>

            <label className="depositLabel" style={{ cursor: "pointer" }}>
              WITHDRAW
            </label>
          </div>
          {/** location */}
          <div
            onClick={() => handleComponentClick("wallet")}
            style={{ cursor: "pointer" }}
            className="iconcontainerd"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <FaWallet color={COLORS.background} size={"30px"} />
            </div>
          </div>
          {/** notification */}
          <div
            className="iconcontainerd"
            style={{ cursor: "pointer" }}
            onClick={() => handleComponentClick("notification")}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <IoIosNotifications color={COLORS.background} size={"30px"} />
            </div>
          </div>
          {/** setting */}
          <div
            onClick={() => navigate("/dashboard")}
            style={{ cursor: "pointer" }}
            className="iconcontainerd"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <IoHome color={COLORS.background} size={"30px"} />
            </div>
          </div>
        </div>
      </div>
      {/** content */}
      <div className="contentcontainer">
        {/** Left Container */}
        <div className="leftcontainerS">
          {/** App sidebar left */}
          <div className="leftsidebartopS">
            {/** Setting content */}
            <div className="settingContainer">
              <label className="left-content-label-title">Setting</label>

              <div
                style={{
                  display: "flex",
                }}
              >
                <IoIosSettings color={COLORS.background} size={"22px"} />
              </div>
            </div>

            {/** UPDATE PROFILE */}
            <div
              className="lscontentS"
              key={"updateprofile"}
              onClick={() => handleComponentClick("updateprofile")}
              style={{
                background:
                  selectedComponent === "updateprofile"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="left-content-icon-container">
                <FaUserPen color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="left-content-label">Update Profile</label>
            </div>

            {/** BALANCE TRANSFER */}

            <div
              className="lscontentS"
              key={"balancetransfer"}
              onClick={() => handleComponentClick("balancetransfer")}
              style={{
                background:
                  selectedComponent === "balancetransfer"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="left-content-icon-container">
                <FaMoneyBillTransfer color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="left-content-label">Balance Transfer</label>
            </div>

            {/** CHANGE PASSWORD */}
            <div
              className="lscontentS"
              key={"changepassword"}
              onClick={() => handleComponentClick("changepassword")}
              style={{
                background:
                  selectedComponent === "changepassword"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="left-content-icon-container">
                <RiLockPasswordLine color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="left-content-label">Change Password</label>
            </div>
            {/** Results */}
            <div
              className="lscontentS"
              key={"result"}
              onClick={() => handleComponentClick("result")}
              style={{
                background:
                  selectedComponent === "result"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="left-content-icon-container">
                <FaTrophy color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="left-content-label">Result</label>
            </div>

            {/** Deposit */}
            {/* <div
              className="lscontentS"
              key={"deposit"}
              onClick={() => handleComponentClick("deposit")}
              style={{
                background:
                  selectedComponent === "deposit"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="left-content-icon-container">
                <PiHandDepositBold color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="left-content-label">Deposit</label>
            </div> */}

            {/** Withdraw */}
            {/* <div
              className="lscontentS"
              key={"withdraw"}
              onClick={() => handleComponentClick("withdraw")}
              style={{
                background:
                  selectedComponent === "withdraw"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="left-content-icon-container">
                <PiHandWithdrawFill color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="left-content-label">Withdraw</label>
            </div> */}

            {/** Play History */}
            <div
              className="lscontentS"
              key={"playhistory"}
              onClick={() => handleComponentClick("playhistory")}
              style={{
                background:
                  selectedComponent === "playhistory"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="left-content-icon-container">
                <TbHistoryToggle color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="left-content-label">Play History</label>
            </div>

            {/** History */}
            <div
              className="lscontentS"
              key={"history"}
              onClick={() => handleComponentClick("history")}
              style={{
                background:
                  selectedComponent === "history"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="left-content-icon-container">
                <FaHistory color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="left-content-label">History</label>
            </div>

            {/** Game Description */}
            <div
              className="lscontentS"
              key={"gamedescription"}
              onClick={() => handleComponentClick("gamedescription")}
              style={{
                background:
                  selectedComponent === "gamedescription"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="left-content-icon-container">
                <TbFileDescription color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="left-content-label">Game Description</label>
            </div>

            {/** About Us */}
            <div
              className="lscontentS"
              key={"aboutus"}
              onClick={() => handleComponentClick("aboutus")}
              style={{
                background:
                  selectedComponent === "aboutus"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="left-content-icon-container">
                <IoIosInformationCircle color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="left-content-label">About Us</label>
            </div>

            {/** LOG OUT */}
            <div
              className="lscontentS"
              key={"logout"}
              onClick={() => handleComponentClick("logout")}
              style={{
                background:
                  selectedComponent === "logout"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="left-content-icon-container">
                <IoIosLogOut color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="left-content-label">Log out</label>
            </div>
          </div>
        </div>

        {/** Main Containt */}
        <div className="main-center-content">
          {selectedComponent === "home" && <HomeDashboard />}
          {selectedComponent === "alllocation" && <AllLocation />}
          {selectedComponent === "setting" && <Settingc />}

          {selectedComponent === "history" && <Historyc />}
          {selectedComponent === "play" && <Play />}
          {selectedComponent === "playhistory" && <Playhistory />}
          {selectedComponent === "deposit" && <Paymentdeposit />}
          {selectedComponent === "withdraw" && <Withdrawpayment />}
          {selectedComponent === "balancetransfer" && <Balancetransfer />}
          {selectedComponent === "result" && <AllResult />}
          {selectedComponent === "aboutus" && <Aboutus />}
          {selectedComponent === "changepassword" && <ChangePassword />}
          {selectedComponent === "updateprofile" && <UpdateProfile />}
          {selectedComponent === "wallet" && <Wallet />}
          {selectedComponent === "notification" && <Notification />}
          {selectedComponent === "gamedescription" && <Gamedescriptionc />}
          {selectedComponent === "logout" && <Logout />}
        </div>
      </div>
    </div>
  );
};

export default Setting;
