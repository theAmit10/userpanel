import React, { useEffect, useState } from "react";
import "./Dashboard.css";
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
import Play from "../../components/play/Play";
import Historyc from "../../components/history/Historyc";
import Gamedescriptionc from "../../components/gamedescription/Gamedescriptionc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "../../redux/actions/userAction";
import { PiHandDepositBold } from "react-icons/pi";
import { PiHandWithdrawFill } from "react-icons/pi";
import Wallet from "../../components/wallet/Walllet";
import Notification from "../../components/notification/Notification";
import Paymentdeposit from "../../components/deposit/Paymentdeposit";
import Withdrawpayment from "../../components/withdraw/Withdrawpayment";
import Userprofile from "../../components/profile/Userprofile";
import AllResult from "../../components/result/AllResult";
import Aboutus from "../../components/about/Aboutus";
import ImageSlider from "../../components/helper/ImageSlider";
import { showSuccessToast } from "../../components/helper/showErrorToast";
import { serverName } from "../../redux/store";

const locationdata = [
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

const timedata = [
  {
    val: "09:00 AM",
  },
  {
    val: "10:00 AM",
  },
  {
    val: "11:00 AM",
  },
  {
    val: "12:00 PM",
  },
  {
    val: "01:00 PM",
  },

  {
    val: "02:00 PM",
  },
  {
    val: "03:00 PM",
  },

  {
    val: "04:00 PM",
  },
  {
    val: "04:00 PM",
  },
  {
    val: "06:00 PM",
  },

  {
    val: "07:00 PM",
  },
  {
    val: "08:00 PM",
  },
];

const imagesdata = [
  "https://img.freepik.com/premium-vector/big-sale-banner-template-abstract-background_219363-47.jpg?w=1800",
  "https://img.freepik.com/free-vector/sales-banner-origami-style_23-2148399967.jpg?w=1800&t=st=1723879042~exp=1723879642~hmac=f9cfd426b3814e6e88981c431f20daf1611dd0e064bdd3ab33441ce2e3145743",
  "https://img.freepik.com/free-vector/geometric-background_23-2148101184.jpg?w=1060&t=st=1723879573~exp=1723880173~hmac=a4ca0aa35d3e224973bc3293b9eb217d00e8fc6bc23fab46077c51bb3f7d1432",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const gotoNavigation = () => {
    navigate("/setting");
  };

  const [selectedLocation, setSelectedLocation] = useState(locationdata[0]);
  const [selectedComponent, setSelectedComponent] = useState("home");

  const handleLocationClick = (location) => {
    console.log("clicked");
    console.log(JSON.stringify(location));
    setSelectedLocation(location);
  };

  const handleComponentClick = (comp) => {
    console.log("clicked");
    setSelectedComponent(comp);
  };

  useEffect(() => {
    console.log("location changed");
  }, [selectedLocation, selectedComponent]);

  const { user, accesstoken, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, []);

  console.log(loading, user);

  return (
    <div className="main-parent">
      {/** Top bar */}
      <div className="topheaderd">
        <div className="lefttopcontinerd">
          <div className="ltcleftd">
            <label className="helloLabel">Hello,</label>
            <label className="usernameLabel">{user ? user.name : ""}</label>
          </div>
          <div
            className="ltcrightd"
            onClick={() => setSelectedComponent("userprofile")}
          >
            <div className="ltcrightimaged">
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
          </div>
        </div>
        <div className="righttopcontinerd">
          {/** search */}
          {/* <div className="searchcontainerd">
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <CiSearch size={"25px"} />
            </div>

            <label className="searchLabel">Search for location</label>
          </div> */}
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
            className="iconcontainerd"
            onClick={() => handleComponentClick("wallet")}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <FaWallet color={COLORS.background} size={"25px"} />
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
              <IoIosNotifications color={COLORS.background} size={"25px"} />
            </div>
          </div>
          {/** setting */}
          <div
            className="iconcontainerd"
            onClick={gotoNavigation}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <IoIosSettings color={COLORS.background} size={"25px"} />
            </div>
          </div>
        </div>
      </div>
      {/** content */}
      <div className="contentcontainerd">
        {/** Left Container */}
        <div className="leftcontainerd">
          {/** App sidebar left */}
          <div className="leftsidebartopd">
            {/** Home */}
            <div
              className="lscontentd"
              key={"home"}
              onClick={() => handleComponentClick("home")}
              style={{
                background:
                  selectedComponent === "home"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="lscontentIconContiner">
                <FaHome color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="sidebar-label">Home</label>
            </div>
            {/** All Location */}
            <div
              className="lscontentd"
              key={"alllocation"}
              onClick={() => handleComponentClick("alllocation")}
              style={{
                background:
                  selectedComponent === "alllocation"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="lscontentIconContiner">
                <IoLocationSharp color={COLORS.white_s} size={"20px"} />
              </div>

              <label className="sidebar-label">All Location</label>
            </div>
            {/** Results */}
            <div
              className="lscontentd"
              key={"result"}
              onClick={() => handleComponentClick("result")}
              style={{
                background:
                  selectedComponent === "result"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="lscontentIconContiner">
                <FaTrophy color={COLORS.white_s} size={"20px"} />
              </div>
              <label className="sidebar-label">Result</label>
            </div>

            {/** Play */}

            <div
              className="lscontentd"
              key={"play"}
              onClick={() => handleComponentClick("play")}
              style={{
                background:
                  selectedComponent === "play"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="lscontentIconContiner">
                <FaPlay color={COLORS.white_s} size={"18px"} />
              </div>
              <label className="sidebar-label"> Play</label>
            </div>

            {/** History */}
            <div
              className="lscontentd"
              key={"history"}
              onClick={() => handleComponentClick("history")}
              style={{
                background:
                  selectedComponent === "history"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="lscontentIconContiner">
                <FaHistory color={COLORS.white_s} size={"20px"} />
              </div>
              <label className="sidebar-label">History</label>
            </div>

            {/** Game Description */}
            {/* <div
              className="lscontentd"
              key={"gamedescription"}
              onClick={() => handleComponentClick("gamedescription")}
              style={{
                background:
                  selectedComponent === "gamedescription"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="lscontentIconContiner">
                <TbFileDescription color={COLORS.white_s} size={"20px"} />
              </div>
              <label className="sidebar-label">Game Description</label>
            </div> */}

            {/** About Us */}
            <div
              className="lscontentd"
              key={"aboutus"}
              onClick={() => handleComponentClick("aboutus")}
              style={{
                background:
                  selectedComponent === "aboutus"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div className="lscontentIconContiner">
                <IoIosInformationCircle color={COLORS.white_s} size={"20px"} />
              </div>
              <label className="sidebar-label">About Us</label>
            </div>
          </div>

          {/** promotion */}
          <div className="leftsidebarmiddled">
            <label className="promotionLable">Promotions</label>
            <div className="ImageSlider">
              <ImageSlider images={imagesdata} />
            </div>
          </div>

          {/** Apps Available on */}
          <div className="leftsidebarbottomd">
            <div className="appiconcontainerd"
            onClick={() => showSuccessToast("Get Android App")}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <AiFillAndroid color={COLORS.background} size={"30px"} />
              </div>
            </div>

            <label className="getTheApplabel">Get the App</label>

            <div className="appiconcontainerd"
               onClick={() => showSuccessToast("Get Ios App")}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <FaApple color={COLORS.background} size={"30px"} />
              </div>
            </div>
          </div>
        </div>

        {/** Main Containt */}
        <div className="main-center-contentd">
          {selectedComponent === "home" && <HomeDashboard />}
          {selectedComponent === "alllocation" && <AllLocation />}
          {selectedComponent === "play" && <Play />}
          {selectedComponent === "history" && <Historyc />}
          {selectedComponent === "gamedescription" && <Gamedescriptionc />}
          {selectedComponent === "wallet" && <Wallet />}
          {selectedComponent === "notification" && <Notification />}
          {selectedComponent === "deposit" && <Paymentdeposit />}
          {selectedComponent === "withdraw" && <Withdrawpayment />}
          {selectedComponent === "userprofile" && <Userprofile />}
          {selectedComponent === "result" && <AllResult />}
          {selectedComponent === "aboutus" && <Aboutus />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
