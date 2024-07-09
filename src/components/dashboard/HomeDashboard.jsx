import React, { useEffect, useState } from "react";
import "./HomeDashboard.css";
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

function HomeDashboard() {
    const [selectedLocation, setSelectedLocation] = useState(locationdata[0]);

    const handleLocationClick = (location) => {
      console.log("clicked");
      console.log(JSON.stringify(location));
      setSelectedLocation(location);
    };
  
    useEffect(() => {
      console.log("location changed");
    }, [selectedLocation]);
  return (
    <div className="main-content-container">
      {/** Middle Container */}

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
            <div
              className="resultlistcontentcontainer"
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #1993FF, #0F5899)",
              }}
              key={index}
            >
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

        <div className="filtercontainer">
          {filterdata.map((item, index) => (
            <div className="filtercontent">
              <label
                style={{
                  color: "white",
                  fontFamily: FONT.HELVETICA_REGULAR,
                  fontSize: "18px",
                }}
              >
                {item.val}
              </label>
            </div>
          ))}
        </div>

        {/** Location contatiner */}
        <div className="locationcontainer">
          <div className="leftlocation">
            {locationdata.map((item, index) => (
              <div
                className="leftlocationcontent"
                style={{
                  background:
                    selectedLocation.id === item.id
                      ? "linear-gradient(180deg, #7EC630, #3D6017)"
                      : "linear-gradient(180deg, #1993FF, #0F5899)",
                }}
                key={item.id}
                onClick={() => handleLocationClick(item)}
              >
                <label
                  style={{
                    color: "white",
                    fontFamily: FONT.HELVETICA_REGULAR,
                    fontSize: "18px",
                  }}
                >
                  {item.name}
                </label>

                <label
                  style={{
                    color: "white",
                    fontFamily: FONT.HELVETICA_REGULAR,
                    fontSize: "10px",
                  }}
                >
                  {item.limit}
                </label>
              </div>
            ))}
          </div>

          <div className="rightlocation">
            {selectedLocation.times.map((item, index) => (
              <div className="rightlocationcontent" key={item.id}>
                <label
                  style={{
                    color: "white",
                    fontFamily: FONT.HELVETICA_REGULAR,
                    fontSize: "60%",
                  }}
                >
                  {item.time}
                </label>
              </div>
            ))}
          </div>
        </div>

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
  );
}

export default HomeDashboard;

// {/** Right Container */}

// <div className="rightcontainer">
//  {/** App sidebar */}
//  <div className="rightsidebartop">
//    <label
//      style={{
//        color: "white",
//        fontFamily: FONT.HELVETICA_BOLD,
//        fontSize: "16px",
//      }}
//    >
//      Top Winners of the day
//    </label>

//    {topWinnerOfTheDay.map((item, index) => (
//      <div className="rscontent">
//        <div className="rtcrightimage">
//          <img
//            src={images.user}
//            alt="Profile Picture"
//            className="winner-user-image"
//          />
//        </div>

//        <label
//          style={{
//            color: COLORS.white_s,
//            fontFamily: FONT.HELVETICA_REGULAR,
//            fontSize: "14px",
//            textAlign: "center",
//            paddingLeft: "10px",
//          }}
//        >
//          {item.name}
//        </label>
//        <label
//          style={{
//            color: COLORS.white_s,
//            fontFamily: FONT.HELVETICA_REGULAR,
//            fontSize: "14px",
//            textAlign: "center",
//            paddingLeft: "10px",
//          }}
//        >
//          {item.amount}
//        </label>
//      </div>
//    ))}
//  </div>

//  {/** play History */}
//  <div className="rightsidebarmiddle">
//    <label
//      style={{
//        color: "white",
//        fontFamily: FONT.HELVETICA_BOLD,
//        fontSize: "16px",
//        padding: "12px",
//      }}
//    >
//      Game History
//    </label>

//    {playHistoryData.map((item, index) => (
//      <div className="rsbottomcontent">
//        <div className="lefthistory">
//          <label
//            style={{
//              color: COLORS.white_s,
//              fontFamily: FONT.HELVETICA_REGULAR,
//              fontSize: "14px",
//              textAlign: "center",
//            }}
//          >
//            {item.location}
//          </label>
//        </div>
//        <div className="middlehistory">
//          <label
//            style={{
//              color: COLORS.white_s,
//              fontFamily: FONT.HELVETICA_BOLD,
//              fontSize: "14px",
//              textAlign: "center",
//            }}
//          >
//            {item.number}
//          </label>
//          <label
//            style={{
//              color: COLORS.white_s,
//              fontFamily: FONT.HELVETICA_REGULAR,
//              fontSize: "8px",
//              textAlign: "center",
//            }}
//          >
//            {item.amount}
//          </label>
//        </div>
//        <div className="righthistory">
//          <label
//            style={{
//              color: COLORS.white_s,
//              fontFamily: FONT.HELVETICA_REGULAR,
//              fontSize: "8px",
//              textAlign: "center",
//            }}
//          >
//            {item.time}
//          </label>
//          <label
//            style={{
//              color: COLORS.white_s,
//              fontFamily: FONT.HELVETICA_REGULAR,
//              fontSize: "8px",
//              textAlign: "center",
//            }}
//          >
//            {item.date}
//          </label>
//        </div>
//      </div>
//    ))}
//  </div>
// </div>
