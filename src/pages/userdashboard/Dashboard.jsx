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

const topWinnerOfTheDay = [
  {
    name: "Aaron",
    amount: "78000 INR",
  },
  {
    name: "Zoya",
    amount: "28000 INR",
  },
  {
    name: "Ron",
    amount: "18000 INR",
  },
  {
    name: "Mary",
    amount: "10000 INR",
  },
  {
    name: "jack",
    amount: "8000 INR",
  },
];

const playHistoryData = [
  {
    location: "Paris",
    number: "89",
    amount: "5000 INR",
    time: "09:00 AM",
    date: "12-04-2024",
  },
  {
    location: "Japan",
    number: "09",
    amount: "2800 INR",
    time: "10:00 AM",
    date: "13-04-2024",
  },
  {
    location: "Korea",
    number: "69",
    amount: "5000 INR",
    time: "09:00 AM",
    date: "12-04-2024",
  },
  {
    location: "China",
    number: "103",
    amount: "5000 INR",
    time: "09:00 AM",
    date: "12-04-2024",
  },
  {
    location: "India",
    number: "67",
    amount: "5000 INR",
    time: "09:00 AM",
    date: "12-04-2024",
  },
  {
    location: "Pakistan",
    number: "65",
    amount: "5000 INR",
    time: "09:00 AM",
    date: "12-04-2024",
  },
];

const filterdata = [
  {
    val: "All",
  },
  {
    val: "2X",
  },
  {
    val: "5X",
  },
  {
    val: "10X",
  },
  {
    val: "50X",
  },
  {
    val: "100X",
  },
  {
    val: "200X",
  },
];

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

const Dashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState(locationdata[0]);
  const [selectedComponent, setSelectedComponent] = useState("home")

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
  }, [selectedLocation,selectedComponent]);

  return (
    <div className="main-parent">
      {/** Top bar */}
      <div className="topheader">
        <div className="lefttopcontiner">
          <div className="ltcleft">
            <label
              style={{
                color: "white",
                fontFamily: FONT.HELVETICA_REGULAR,
                fontSize: "18px",
              }}
            >
              Hello,
            </label>
            <label
              style={{
                color: "white",
                fontFamily: FONT.HELVETICA_BOLD,
                fontSize: "24px",
              }}
            >
              Wasu
            </label>
          </div>
          <div className="ltcright">
            <div className="ltcrightimage">
              <img
                src={images.user}
                alt="Profile Picture"
                className="user-image"
              />
            </div>
          </div>
        </div>
        <div className="righttopcontiner">
          {/** search */}
          <div className="searchcontainer">
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
          {/** deposit */}
          <div className="depositcontainer">
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
          <div className="walletcontainer">
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
          <div className="iconcontainer">
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
          <div className="iconcontainer">
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
          <div className="iconcontainer">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IoIosSettings color={COLORS.background} size={"30px"} />
            </div>
          </div>
        </div>
      </div>
      {/** content */}
      <div className="contentcontainer">
        {/** Left Container */}
        <div className="leftcontainer">
          {/** App sidebar left */}
          <div className="leftsidebartop">
            {/** Home */}
            <div className="lscontent"
            key={"home"}
            onClick={() => handleComponentClick("home")}
            style={{
                background : selectedComponent === "home"
                      ? "linear-gradient(180deg, #7EC630, #3D6017)"
                      : "linear-gradient(180deg, #011833, #011833)",
            }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "5px",
                }}
              >
                <FaHome color={COLORS.white_s} size={"20px"} />
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
                Home
              </label>
            </div>
            {/** All Location */}
            <div className="lscontent"
            key={"alllocation"}
            onClick={() => handleComponentClick("alllocation")}
            style={{
                background : selectedComponent === "alllocation"
                      ? "linear-gradient(180deg, #7EC630, #3D6017)"
                      : "linear-gradient(180deg, #011833, #011833)",
            }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "5px",
                }}
              >
                <IoLocationSharp color={COLORS.white_s} size={"20px"} />
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
                All Location
              </label>
            </div>
            {/** Results */}
            <div className="lscontent"
            key={"results"}
            onClick={() => handleComponentClick("results")}
            style={{
                background : selectedComponent === "results"
                      ? "linear-gradient(180deg, #7EC630, #3D6017)"
                      : "linear-gradient(180deg, #011833, #011833)",
            }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "5px",
                }}
              >
                <FaTrophy color={COLORS.white_s} size={"20px"} />
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
                Result
              </label>
            </div>
            {/** Play */}

            <div className="lscontent"
            key={"play"}
            onClick={() => handleComponentClick("play")}
            style={{
                background : selectedComponent === "play"
                      ? "linear-gradient(180deg, #7EC630, #3D6017)"
                      : "linear-gradient(180deg, #011833, #011833)",
            }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "5px",
                }}
              >
                <FaPlay color={COLORS.white_s} size={"18px"} />
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
                Play
              </label>
            </div>
            {/** History */}
            <div className="lscontent"
            key={"history"}
            onClick={() => handleComponentClick("history")}
            style={{
                background : selectedComponent === "history"
                      ? "linear-gradient(180deg, #7EC630, #3D6017)"
                      : "linear-gradient(180deg, #011833, #011833)",
            }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "5px",
                }}
              >
                <FaHistory color={COLORS.white_s} size={"20px"} />
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
                History
              </label>
            </div>

            {/** Game Description */}
            <div className="lscontent"
            key={"gamedescription"}
            onClick={() => handleComponentClick("gamedescription")}
            style={{
                background : selectedComponent === "gamedescription"
                      ? "linear-gradient(180deg, #7EC630, #3D6017)"
                      : "linear-gradient(180deg, #011833, #011833)",
            }}
            
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "5px",
                }}
              >
                <TbFileDescription color={COLORS.white_s} size={"20px"} />
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
                Game Description
              </label>
            </div>

            {/** About Us */}
            <div className="lscontent"
            key={"aboutus"}
            onClick={() => handleComponentClick("aboutus")}
            style={{
                background : selectedComponent === "aboutus"
                      ? "linear-gradient(180deg, #7EC630, #3D6017)"
                      : "linear-gradient(180deg, #011833, #011833)",
            }}
            
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "5px",
                }}
              >
                <IoIosInformationCircle color={COLORS.white_s} size={"20px"} />
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
                About Us
              </label>
            </div>
          </div>

          {/** promotion */}
          <div className="leftsidebarmiddle">
            <label
              style={{
                color: "white",
                fontFamily: FONT.HELVETICA_BOLD,
                fontSize: "24px",
              }}
            >
              Promotions
            </label>
            <img
              src={images.user}
              alt="Profile Picture"
              className="promotion-banner"
            />
          </div>

          {/** Apps Available on */}
          <div className="leftsidebarbottom">
            <div className="appiconcontainer">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AiFillAndroid color={COLORS.background} size={"30px"} />
              </div>
            </div>

            <label
              style={{
                color: COLORS.white_s,
                fontFamily: FONT.HELVETICA_REGULAR,
                fontSize: "14px",
                textAlign: "center",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              Get the App
            </label>

            <div className="appiconcontainer">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaApple color={COLORS.background} size={"30px"} />
              </div>
            </div>
          </div>
        </div>

        {/** Main Containt */}
        <div className="main-center-content">
            {
                selectedComponent === "home" && (<HomeDashboard/>)
            }
            {
                selectedComponent === "alllocation" && (<AllLocation/>)
            }
           
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
