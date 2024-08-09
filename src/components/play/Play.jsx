import React, { useEffect, useState } from "react";
import FONT from "../../assets/constants/fonts";
import "./Play.css";
import COLORS from "../../assets/constants/colors";
import { FaWallet } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import images from "../../assets/constants/images";
import { SlCalender } from "react-icons/sl";
import { RxCrossCircled } from "react-icons/rx";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";

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

function Play() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItem, setSelectedItem] = useState(true);

  const [submitItemFlag, setSubmitItemFlag] = useState(false);

  const [selectedNumber, setSelectedNumber] = useState([]);

  const addSelectedNumber = (val) => {
    setSelectedNumber((prevSelected) => {
      const index = prevSelected.findIndex((item) => item.id === val.id);
      if (index !== -1) {
        // Item found, remove it
        const updatedSelected = [...prevSelected];
        updatedSelected.splice(index, 1);
        return updatedSelected;
      } else {
        // Item not found, add it
        return [...prevSelected, val];
      }
    });

    console.log("Mine selected list : " + JSON.stringify(selectedNumber));
  };

  const showSubmitContainer = () => {
    setSubmitItemFlag(true);
  };

  const hideSubmitContainer = () => {
    setSubmitItemFlag(false);
  };

  const playdata = [];

  for (let i = 1; i <= 100; i++) {
    playdata.push({ number: i.toString(), id: i });
  }

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
  };

  useEffect(() => {
    console.log(
      "Selected item location :: " + JSON.stringify(selectedLocation)
    );
    console.log("Selected item time :: " + JSON.stringify(selectedLocation));
  }, [selectedItem, selectedLocation]);

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
                 className="filtercontentalLabel"
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
                     className="location-header-label"
                    >
                      {item.name}
                    </span>
                    <span
                     className="location-header-max-label"
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
                       className="time-items-container-time-label"
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

      {selectedLocation &&
        selectedTime &&
        !selectedDate &&
        !selectedItem &&
        !submitItemFlag && (
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
                   className="date-title-container-limit-label"
                >
                  {selectedLocation.limit}
                </span>

                <span
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_Bold,
                    fontSize: "2.5vh",
                    marginLeft: "2vh",
                  }}
                >
                  {selectedTime.time}
                </span>
              </div>

              <div
                style={{
                  flex: 1,

                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  className="back-container"
                  onClick={() => removeSelecteditemClick()}
                >
                  <RxCrossCircled color={COLORS.red} size={"30px"} />
                </div>
              </div>
            </div>

            {/** Play Number container */}

            <div className="playconatainer">
              <div className="playcontainer-content">
                {playdata.map((item, index) => (
                  <div
                    onClick={() => addSelectedNumber(item)}
                    className="play-content"
                    style={{
                      width: "140px",
                      height: "80px",
                      backgroundColor: COLORS.background,
                      position: "relative",
                      flexDirection: "row",
                      margin: "1vh",
                    }}
                  >
                    <div
                      className="play-content-halfcontainer"
                      style={{
                        width: "70px",
                        height: "70px",

                        background: selectedNumber.some(
                          (selected) => selected.id === item.id
                        )
                          ? "linear-gradient(180deg, #7EC630, #FFFFFF)"
                          : "linear-gradient(180deg, #1993FF, #FFFFFF)",
                      }}
                    ></div>
                    <div
                      className="play-content-fullcontainer"
                      style={{
                        width: "130px",
                        height: "70px",
                        background: selectedNumber.some(
                          (selected) => selected.id === item.id
                        )
                          ? "linear-gradient(180deg, #7EC630, #3D6017)"
                          : "linear-gradient(180deg, #1993FF, #0F5899)",
                        position: "absolute",
                        top: 0,
                        margin: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: COLORS.white_s,
                          fontFamily: FONT.Montserrat_Regular,
                          fontSize: "2vh",
                          bottom: 0,
                          position: "absolute",
                          right: "25px",
                        }}
                      >
                        {selectedNumber.some(
                          (selected) => selected.id === item.id
                        )
                          ? "selected"
                          : "select"}
                      </span>
                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "transparent",
                          height: "70px",
                          width: "70px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span className="play-content-number">
                          {item.number}
                        </span>
                      </div>

                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: "45px solid transparent",
                          borderRight: "45px solid transparent",
                          borderBottom: `70px solid ${COLORS.background}`,
                          position: "absolute",
                          top: 0,
                          right: "-25px",

                          transform: "rotate(-90deg)",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/** Confirm Container */}
            <div className="playcontainer-bottomcontent">
              <div
                className="playcontainer-bottomcontent-container"
                onClick={() => showSubmitContainer()}
              >
                <span
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_SemiBold,
                    fontSize: "2.5vh",
                  }}
                >
                  Confirm
                </span>
              </div>
            </div>
          </div>
        )}

      {submitItemFlag && (
        <div className="alllocation-submit-container">
          <div className="alllocation-submit-container-left">
            {/** TOP TITLE CONTAINER */}
            <div className="alllocation-submit-container-left-top">
              <span className="alllocation-submit-container-left-top-label">
                Selected Number
              </span>
              <span className="alllocation-submit-container-left-top-label">
                Amount
              </span>
              <span className="alllocation-submit-container-left-top-label">
                You Win
              </span>
            </div>

            {/** CONTENT CONTAINER */}
            <div className="alllocation-submit-container-left-container">
              {/** ALL SELECTED NUMBERS */}

              {selectedNumber.map((item, index) => (
                <>
                <div className="alllocation-submit-container-left-content-container">
                  {/** LEFT CONTENT */}
                  <div className="alllocation-submit-container-left-content-container-left">
                    <div
                      className="play-content"
                      style={{
                        width: "140px",
                        height: "80px",
                        backgroundColor: COLORS.background,
                        position: "relative",
                        flexDirection: "row",
                        margin: "1vh",
                      }}
                    >
                      <div
                        className="play-content-halfcontainer"
                        style={{
                          width: "70px",
                          height: "70px",

                          background:
                            "linear-gradient(180deg, #7EC630, #FFFFFF)",
                        }}
                      ></div>
                      <div
                        className="play-content-fullcontainer"
                        style={{
                          width: "130px",
                          height: "70px",
                          background:
                            "linear-gradient(180deg, #7EC630, #3D6017)",

                          position: "absolute",
                          top: 0,
                          margin: "10px",
                        }}
                      >
                        <span
                          style={{
                            color: COLORS.white_s,
                            fontFamily: FONT.Montserrat_Regular,
                            fontSize: "2vh",
                            bottom: 0,
                            position: "absolute",
                            right: "25px",
                          }}
                        >
                          selected
                        </span>
                        <div
                          style={{
                            flex: 1,
                            backgroundColor: "transparent",
                            height: "70px",
                            width: "70px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <span className="play-content-number">
                            {item.number}
                          </span>
                        </div>

                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderLeft: "45px solid transparent",
                            borderRight: "45px solid transparent",
                            borderBottom: `70px solid ${COLORS.background}`,
                            position: "absolute",
                            top: 0,
                            right: "-25px",

                            transform: "rotate(-90deg)",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/** MIDDLE CONTENT */}
                  <div className="alllocation-submit-container-left-content-container-middle">
                    <div className="alllocation-submit-container-left-content-container-middle-left">
                      <div className="alllocation-submit-container-left-content-container-middle-left-containter">
                        <CiCircleMinus size={"5vh"} color={COLORS.background} />
                      </div>
                    </div>
                    <div className="alllocation-submit-container-left-content-container-middle-middle">
                      <div className="alllocation-submit-container-left-content-container-middle-middle-container">
                        <input
                          type="number"
                          placeholder="Enter Amount"
                          className="alllocation-submit-container-left-content-container-middle-middle-container-input"
                        />
                      </div>
                    </div>
                    <div className="alllocation-submit-container-left-content-container-middle-right">
                      <div className="alllocation-submit-container-left-content-container-middle-left-containter">
                        <CiCirclePlus size={"5vh"} color={COLORS.background} />
                      </div>
                    </div>
                  </div>

                  {/** RIGHT CONTENT */}
                  <div className="alllocation-submit-container-left-content-container-right">
                    <div className="alllocation-submit-container-left-content-container-middle-middle-container">
                      <label className="alllocation-submit-container-left-content-container-middle-middle-container-label">
                        0
                      </label>
                    </div>
                  </div>
                </div>


                <div className="alllocation-submit-container-left-content-container-low-screen">
                  {/** LEFT CONTENT */}
                  <div className="alllocation-submit-container-left-content-container-right">
                    <div className="alllocation-submit-container-left-content-container-middle-middle-container">
                      <label className="alllocation-submit-container-left-content-container-middle-middle-container-label">
                        0
                      </label>
                    </div>
                  </div>

                  {/** MIDDLE CONTENT */}
                  <div className="alllocation-submit-container-left-content-container-right">
                    <div className="alllocation-submit-container-left-content-container-middle-middle-container">
                      <label className="alllocation-submit-container-left-content-container-middle-middle-container-label">
                        0
                      </label>
                    </div>
                  </div>

                  {/** RIGHT CONTENT */}
                  <div className="alllocation-submit-container-left-content-container-right">
                    <div className="alllocation-submit-container-left-content-container-middle-middle-container">
                      <label className="alllocation-submit-container-left-content-container-middle-middle-container-label">
                        0
                      </label>
                    </div>
                  </div>
                </div>

                

                </>
              ))}
            </div>
          </div>

          {/** RIGHT CONTAINER */}
          <div className="alllocation-submit-container-right">
            <div
              style={{
                flex: 1,
                width: "100%",
              }}
            >
              {/** Top Container */}
              <div className="date-title-container">
                <div
                className="date-title-container-location"
                  
                >
                  <span
                    style={{
                      color: COLORS.white_s,
                      fontFamily: FONT.Montserrat_Bold,
                      fontSize: "2vh",
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
                      fontSize: "1.5vh",
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
                  <div
                    className="back-container"
                    onClick={() => hideSubmitContainer()}
                  >
                    <RxCrossCircled color={COLORS.red} size={"30px"} />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                flex: 2,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <img
                src={images.cat}
                alt="game controller Image"
                className="catcontrollerplay"
              />
            </div>

            <div
              style={{
                width: "100%",
                height: "20vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "90%",
                  backgroundColor: COLORS.green,
                  padding: "2vh",
                  borderRadius: "1vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_Bold,
                    fontSize: "2vh",
                  }}
                >
                  Submit
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Play;
