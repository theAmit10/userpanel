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

  return (
    <div className="main-parent">
      {/** Top bar */}
      <div className="topheader-setting">
        <div className="lefttopcontiner-setting">
          <div className="ltcleft-setting">
            <label
              style={{
                color: COLORS.white_s,
                fontFamily: FONT.Montserrat_Regular,
                fontSize: "18px",
              }}
            >
              Hello,
            </label>
            <label
              style={{
                color: "white",
                fontFamily: FONT.Montserrat_Bold,
                fontSize: "4vh",
              }}
            >
              Wasu
            </label>
          </div>
          <div className="ltcright-setting">
            <div className="ltcrightimage-setting">
              <img
                src={images.user}
                alt="Profile Picture"
                className="user-image-setting"
              />
            </div>
          </div>
        </div>
        <div className="righttopcontinersetting">
          {/** search */}

          {false && (
            <div className="searchcontainer-setting">
              <div style={{ justifyContent: "center", alignItems: "center" }}>
                <CiSearch size={"25px"} />
              </div>

              <label
                style={{
                  color: "black",
                  fontFamily: FONT.HELVETICA_REGULAR,
                  fontSize: "18px",
                  textAlign: "center",
                  paddingLeft: "10px",
                }}
              >
                Search for location
              </label>
            </div>
          )}

          {/** deposit */}
          <div className="depositcontainer-setting">
            <div style={{ justifyContent: "center", alignItems: "center" }}>
              <BsBank2 color={COLORS.white_s} size={"20px"} />
            </div>

            <label
              style={{
                color: COLORS.white_s,
                fontFamily: FONT.HELVETICA_REGULAR,
                fontSize: "14px",
                textAlign: "center",
                paddingLeft: "10px",
              }}
            >
              DEPOSIT
            </label>
          </div>
          {/** wallet */}
          <div className="walletcontainer-setting">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaWallet color={COLORS.background} size={"18px"} />
            </div>

            <label
              style={{
                color: COLORS.background,
                fontFamily: FONT.HELVETICA_REGULAR,
                fontSize: "14px",
                textAlign: "center",
                paddingLeft: "10px",
              }}
            >
              1000 INR
            </label>
          </div>
          {/** location */}
          <div className="iconcontainer-setting">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaWallet color={COLORS.background} size={"30px"} />
            </div>
          </div>
          {/** notification */}
          <div className="iconcontainer-setting">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IoIosNotifications color={COLORS.background} size={"30px"} />
            </div>
          </div>
          {/** setting */}
          <div className="iconcontainer-setting">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FaHome color={COLORS.background} size={"30px"} />
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
            <div
              style={{
                height: "8%",
                display: "flex",
                flexDirection: "row",
                width: "90%",
                justifyContent: "space-between",
                alignItems: 'center',
                paddingTop: '10%'
                
              }}
            >
              <label
                className="left-content-label-title"
              >
                Setting
              </label>

              <div
                style={{
                  display: "flex",
                }}
              >
                <IoIosSettings color={COLORS.background} size={"22px"} />
              </div>
            </div>

            {/** All Location */}
            <div
              className="lscontent"
              key={"alllocation"}
              onClick={() => handleComponentClick("alllocation")}
              style={{
                background:
                  selectedComponent === "alllocation"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div
                className="left-content-icon-container"
              >
                <IoLocationSharp color={COLORS.white_s} size={"20px"} />
              </div>

              <label
                className="left-content-label"
              >
                All Location
              </label>
            </div>
            {/** Results */}
            <div
              className="lscontent"
              key={"results"}
              onClick={() => handleComponentClick("results")}
              style={{
                background:
                  selectedComponent === "results"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div
               className="left-content-icon-container"
              >
                <FaTrophy color={COLORS.white_s} size={"20px"} />
              </div>

              <label
                className="left-content-label"
              >
                Result
              </label>
            </div>
            {/** Play */}
            <div
              className="lscontent"
              key={"play"}
              onClick={() => handleComponentClick("play")}
              style={{
                background:
                  selectedComponent === "play"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div
                className="left-content-icon-container"
              >
                <FaPlay color={COLORS.white_s} size={"18px"} />
              </div>

              <label
                 className="left-content-label"
              >
                Play
              </label>
            </div>

            {/** Deposit */}
            <div
              className="lscontent"
              key={"deposit"}
              onClick={() => handleComponentClick("deposit")}
              style={{
                background:
                  selectedComponent === "home"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div
                className="left-content-icon-container"
              >
                <PiHandDepositBold color={COLORS.white_s} size={"20px"} />
              </div>

              <label
                className="left-content-label"
              >
                Deposit
              </label>
            </div>

            {/** Withdraw */}
            <div
              className="lscontent"
              key={"withdraw"}
              onClick={() => handleComponentClick("withdraw")}
              style={{
                background:
                  selectedComponent === "home"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div
                className="left-content-icon-container"
              >
                <PiHandWithdrawFill color={COLORS.white_s} size={"20px"} />
              </div>

              <label
                 className="left-content-label"
              >
                Withdraw
              </label>
            </div>

            {/** Payment */}
            <div
              className="lscontent"
              key={"payment"}
              onClick={() => handleComponentClick("payment")}
              style={{
                background:
                  selectedComponent === "home"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div
               className="left-content-icon-container"
              >
                <MdPayment color={COLORS.white_s} size={"20px"} />
              </div>

              <label
                 className="left-content-label"
              >
                Payment
              </label>
            </div>

            {/** Play History */}
            <div
              className="lscontent"
              key={"playhistory"}
              onClick={() => handleComponentClick("playhistory")}
              style={{
                background:
                  selectedComponent === "home"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div
                className="left-content-icon-container"
              >
                <TbHistoryToggle color={COLORS.white_s} size={"20px"} />
              </div>

              <label
                 className="left-content-label"
              >
                Play History
              </label>
            </div>

            {/** History */}
            <div
              className="lscontent"
              key={"history"}
              onClick={() => handleComponentClick("history")}
              style={{
                background:
                  selectedComponent === "history"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div
               className="left-content-icon-container"
              >
                <FaHistory color={COLORS.white_s} size={"20px"} />
              </div>

              <label
                 className="left-content-label"
              >
                History
              </label>
            </div>

            {/** Game Description */}
            <div
              className="lscontent"
              key={"gamedescription"}
              onClick={() => handleComponentClick("gamedescription")}
              style={{
                background:
                  selectedComponent === "gamedescription"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div
                className="left-content-icon-container"
              >
                <TbFileDescription color={COLORS.white_s} size={"20px"} />
              </div>

              <label
                 className="left-content-label"
              >
                Game Description
              </label>
            </div>

            {/** About Us */}
            <div
              className="lscontent"
              key={"aboutus"}
              onClick={() => handleComponentClick("aboutus")}
              style={{
                background:
                  selectedComponent === "aboutus"
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #011833, #011833)",
              }}
            >
              <div
                className="left-content-icon-container"
              >
                <IoIosInformationCircle color={COLORS.white_s} size={"20px"} />
              </div>

              <label
                 className="left-content-label"
              >
                About Us
              </label>
            </div>
          </div>
        </div>

        {/** Main Containt */}
        <div className="main-center-content">
          {selectedComponent === "home" && <HomeDashboard />}
          {selectedComponent === "alllocation" && <AllLocation />}
          {selectedComponent === "setting" && <Settingc />}
          {selectedComponent === "gamedescription" && <Gamedescriptionc />}
          {selectedComponent === "history" && <Historyc />}
        </div>
      </div>
    </div>
  );
};

export default Setting;
