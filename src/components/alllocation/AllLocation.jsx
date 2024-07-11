import React, { useEffect, useState } from "react";
import FONT from "../../assets/constants/fonts";
import "./Alllocation.css";
import COLORS from "../../assets/constants/colors";
import { FaWallet } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import images from "../../assets/constants/images";
import { SlCalender } from "react-icons/sl";

const filterdata = [
  { val: "All" },
  { val: "2X" },
  { val: "5X" },
  { val: "10X" },
  { val: "50X" },
  { val: "100X" },
  { val: "200X" },
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
      { id: "18", time: "09:00 AM" },
      { id: "19", time: "10:00 AM" },
      { id: "20", time: "11:00 AM" },
      { id: "21", time: "12:00 PM" },
      { id: "22", time: "01:00 PM" },
      { id: "23", time: "02:00 PM" },
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

const datedata = [
  {
    date: "29-04-2024",
    id: "1",
  },
  {
    date: "28-04-2024",
    id: "2",
  },

  {
    date: "27-04-2024",
    id: "3",
  },
  {
    date: "26-04-2024",
    id: "4",
  },
  {
    date: "25-04-2024",
    id: "5",
  },
  {
    date: "24-04-2024",
    id: "6",
  },
  {
    date: "23-04-2024",
    id: "7",
  },
];

function AllLocation() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItem, setSelectedItem] = useState(true);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const handleSelecteditemClick = (item, timedata) => {
    setSelectedItem(false);
    setSelectedLocation(item);
    setSelectedTime(timedata);
  };

  const handleSelectedDateClick = (datedate) => {
    setSelectedDate(datedate);
  };

  const removeSelecteditemClick = () => {
    setSelectedItem(true);
    setSelectedLocation(null);
    setSelectedTime(null);
    setSelectedDate(null);
  };

  useEffect(() => {
    console.log(
      "Selected item location :: " + JSON.stringify(selectedLocation)
    );
    console.log("Selected item time :: " + JSON.stringify(selectedLocation));
    console.log("Selected item date :: " + JSON.stringify(selectedDate));
  }, [selectedItem, selectedLocation, selectedDate]);

  return (
    <div className="main-content-container-all-location">
      {/** Location and time */}

      {selectedItem && (
        <>
          {/** Filter container */}
          <div className="filtercontaineral">
            {filterdata.map((item, index) => (
              <div className="filtercontental" key={index}>
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

          {/** Location container */}

          <div className="allocationcontainer">
            {locationdata.map((item, index) => (
              <div className="location-item" key={index}>
                <div className="location-details">
                  <div
                    className="location-header"
                    style={{
                      background:
                        index % 2 === 0
                          ? "linear-gradient(90deg, #1993FF, #0F5899)"
                          : "linear-gradient(90deg, #7EC630, #3D6017)",
                    }}
                  >
                    <span
                      style={{
                        color: COLORS.white_s,
                        fontFamily: FONT.Montserrat_Bold,
                        fontSize: "2vh",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        color: COLORS.white_s,
                        fontFamily: FONT.Montserrat_Regular,
                        fontSize: "1.5vh",
                      }}
                    >
                      Max {item.limit}
                    </span>
                  </div>
                </div>

                <div className="time-items-container">
                  {item.times.map((timedata, timeindex) => (
                    <div
                      onClick={() => handleSelecteditemClick(item, timedata)}
                      className="time-item"
                      key={timeindex}
                    >
                      <span
                        style={{
                          color: COLORS.white_s,
                          fontFamily: FONT.Montserrat_SemiBold,
                          fontSize: "2vh",
                        }}
                      >
                        {timedata.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/** date */}

      {selectedLocation && selectedTime && !selectedDate && !selectedItem && (
        <div className="alllocationdatecontainer">
          {/** Top Container */}
          <div className="date-title-container">
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div
                className="back-container"
                onClick={() => removeSelecteditemClick()}
              >
                <IoIosArrowRoundBack color={COLORS.background} size={"30px"} />
              </div>

              <span
                style={{
                  color: COLORS.white_s,
                  fontFamily: FONT.Montserrat_Bold,
                  fontSize: "3vh",
                  marginRight: "2vh",
                  marginLeft: "2vh",
                }}
              >
                {selectedLocation.name}
              </span>

              <span
                style={{
                  color: COLORS.white_s,
                  fontFamily: FONT.Montserrat_Regular,
                  fontSize: "2.5vh",
                }}
              >
                {selectedLocation.limit}
              </span>
            </div>

            <div
              style={{
                flex: 1,

                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <span
                style={{
                  color: COLORS.white_s,
                  fontFamily: FONT.Montserrat_Bold,
                  fontSize: "3vh",
                }}
              >
                {selectedTime.time}
              </span>
            </div>
          </div>

          {/** select date */}
          <span
            style={{
              color: COLORS.white_s,
              fontFamily: FONT.Montserrat_Bold,
              fontSize: "4vh",
              paddingLeft: "3vh",
            }}
          >
            Select Date
          </span>

          {/** date container */}

          <div className="dateconatainer">
            {datedata.map((item, index) => (
              <div
                onClick={() => handleSelectedDateClick(item)}
                className="datecontainer-content"
              >
                <span className="datecontainer-content-label">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/** result */}
      {selectedLocation && selectedTime && selectedDate && !selectedItem && (
        <div className="alllocationdatecontainer">
          {/** Top Container */}
          <div className="date-title-container">
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div
                className="back-container"
                onClick={() => removeSelecteditemClick()}
              >
                <IoIosArrowRoundBack color={COLORS.background} size={"30px"} />
              </div>

              {/** selected date */}
              <span
                style={{
                  color: COLORS.white_s,
                  fontFamily: FONT.Montserrat_Bold,
                  fontSize: "4vh",
                  paddingLeft: "3vh",
                }}
              >
                Result
              </span>
            </div>
          </div>

          {/** result container */}

          <div className="dateconatainer">
            {/** Result contatiner */}
            <div className="resultcontaineral">
              <div className="resultleftcontaineral">
                <div className="rltopcontaineral">
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
                        fontSize: "5vh",
                      }}
                    >
                      {selectedLocation.name}
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
                        fontFamily: FONT.Montserrat_Regular,
                        fontSize: "2vh",
                      }}
                    >
                      {selectedTime.time}
                    </label>
                  </div>
                </div>
                <div className="rlmiddlecontaineral">
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
                        fontSize: "18vh",
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
                  ></div>
                </div>
                <div className="rlbottomcontaineral">
                  <div className="rlbottomcontentcontaineral">
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: COLORS.grayHalfBg,
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      <SlCalender size={"20px"} color={COLORS.background} />
                    </div>
                    <label
                      style={{
                        color: "white",
                        fontFamily: FONT.Montserrat_Regular,
                        fontSize: "2vh",
                      }}
                    >
                      {selectedDate.date}
                    </label>
                    <label
                      style={{
                        color: "white",
                        fontFamily: FONT.Montserrat_Regular,
                        fontSize: "2vh",
                      }}
                    >
                      {selectedTime.time}
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
              <div className="resultrightcontaineral">
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
                    className="gamecontrolleral"
                  />
                  <img
                    src={images.cups}
                    alt="game controller Image"
                    className="cupontrolleral"
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
                    className="catcontrolleral"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllLocation;
