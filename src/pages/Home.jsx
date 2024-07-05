import React from "react";
import "./Home.css";
import FONT from "../assets/constants/fonts";
import images from "../assets/constants/images";
import { CiSearch } from "react-icons/ci";
import { BsBank2 } from "react-icons/bs";
import COLORS from "../assets/constants/colors";
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

const Home = () => {
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
        <div className="leftcontainer">
          {/** App sidebar left */}
          <div className="leftsidebartop">
            {/** Home */}

            <div className="lscontent">
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
            <div className="lscontent">
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
            <div className="lscontent">
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

            <div className="lscontent">
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
            <div className="lscontent">
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
            <div className="lscontent">
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
            <div className="lscontent">
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

        <div className="middlecontainer">
          {/** Result contatiner */}
          <div className="resultcontainer">
            <div className="resultleftcontainer">
              <div className="rltopcontainer">
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_BOLD,
                      fontSize: "24px",
                    }}
                  >
                    Japan
                  </label>
                </div>
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "14px",
                    }}
                  >
                    Next Result
                  </label>
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "16px",
                    }}
                  >
                    10:00 AM
                  </label>
                </div>
              </div>
              <div className="rlmiddlecontainer">
                <div
                  style={{
                    flex: 1,
                    display: "flex",

                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_BOLD,
                      fontSize: "100px",
                    }}
                  >
                    56
                  </label>
                </div>
                <div
                  style={{
                    width: "40%",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "16px",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    00:00:00
                  </label>
                </div>
              </div>
              <div className="rlbottomcontainer">
                <div className="rlbottomcontentcontainer">
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: COLORS.white_s,
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <SlCalender size={"20px"} color={COLORS.background} />
                  </div>
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "14px",
                    }}
                  >
                    12-05-2024
                  </label>
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "14px",
                    }}
                  >
                    09:00 AM
                  </label>
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "14px",
                    }}
                  >
                    56
                  </label>
                </div>
              </div>
            </div>
            <div className="resultrightcontainer">
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={images.gamecontroller}
                  alt="game controller Image"
                  className="gamecontroller"
                />
                <img
                  src={images.cups}
                  alt="game controller Image"
                  className="cupontroller"
                />
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={images.cat}
                  alt="game controller Image"
                  className="catcontroller"
                />
              </div>
            </div>
          </div>

          {/** Result list contatiner */}
          <div className="resultlistcontainer">
            {playHistoryData.map((item, index) => (
              <div className="resultlistcontentcontainer">
                <div
                  style={{
                    height: "25%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "16px",
                    }}
                  >
                    {item.location}
                  </label>
                </div>

                <div
                  style={{
                    flex: 1,

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "44px",
                    }}
                  >
                    {item.number}
                  </label>
                </div>

                <div
                  style={{
                    height: "25%",
                    width: "100%",

                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "14px",
                    }}
                  >
                    {item.time}
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/** filter contatiner */}
          {/** Location contatiner */}
        </div>

        <div className="rightcontainer">
          {/** App sidebar */}
          <div className="rightsidebartop">
            <label
              style={{
                color: "white",
                fontFamily: FONT.HELVETICA_BOLD,
                fontSize: "16px",
              }}
            >
              Top Winners of the day
            </label>

            {topWinnerOfTheDay.map((item, index) => (
              <div className="rscontent">
                <div className="rtcrightimage">
                  <img
                    src={images.user}
                    alt="Profile Picture"
                    className="winner-user-image"
                  />
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
                  {item.name}
                </label>
                <label
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.HELVETICA_REGULAR,
                    fontSize: "14px",
                    textAlign: "center",
                    paddingLeft: "10px",
                  }}
                >
                  {item.amount}
                </label>
              </div>
            ))}
          </div>

          {/** play History */}
          <div className="rightsidebarmiddle">
            <label
              style={{
                color: "white",
                fontFamily: FONT.HELVETICA_BOLD,
                fontSize: "16px",
                padding: "12px",
              }}
            >
              Game History
            </label>

            {playHistoryData.map((item, index) => (
              <div className="rsbottomcontent">
                <div className="lefthistory">
                  <label
                    style={{
                      color: COLORS.white_s,
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    {item.location}
                  </label>
                </div>
                <div className="middlehistory">
                  <label
                    style={{
                      color: COLORS.white_s,
                      fontFamily: FONT.HELVETICA_BOLD,
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    {item.number}
                  </label>
                  <label
                    style={{
                      color: COLORS.white_s,
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "8px",
                      textAlign: "center",
                    }}
                  >
                    {item.amount}
                  </label>
                </div>
                <div className="righthistory">
                  <label
                    style={{
                      color: COLORS.white_s,
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "8px",
                      textAlign: "center",
                    }}
                  >
                    {item.time}
                  </label>
                  <label
                    style={{
                      color: COLORS.white_s,
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "8px",
                      textAlign: "center",
                    }}
                  >
                    {item.date}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
