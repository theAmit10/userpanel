import React, { useEffect, useState } from "react";
import "./HD.css";
import images from "../../assets/constants/images";
import CircularProgressBar from "../helper/CircularProgressBar";
import COLORS from "../../assets/constants/colors";
import { LoadingComponent } from "../helper/LoadingComponent";

const HD = () => {
  const [timeVisible, setTimeVisible] = useState(true);
  const [dateVisible, setDateVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const settingTimeVisbility = (val) => {
    setResultVisible(false);
    setTimeVisible(true);
    setDateVisible(false);
  };

  const dateBackhandler = () => {
    setResultVisible(false);
    setTimeVisible(true);
    setDateVisible(false);
  };

  const resultBackhandler = () => {
    setResultVisible(false);
    setTimeVisible(false);
    setDateVisible(true);
  };

  const loadingdate = false;
  const loadingResult = false;

  useEffect(() => {
    setSelectedLocation(locationdata[0]);
  }, []);

  return (
    <div className="hdcontainer">
      {/** LEFT CONTAINER */}
      {}
      <div className="hdLeftC">
        {/** TOP */}
        <div className="hdLeftCTop">
          <div className="hdlTL">
            <div className="hdlTLT">
              <div className="hdlTLTL">
                <label className="hdlTLTLCountry">India</label>
              </div>
              <div className="hdlTLTR">
                <label className="hdlTLTLNextResult">Next Result</label>
                <label className="hdlTLTLNR">09:00 AM</label>
              </div>
            </div>
            <div className="hdlTLM">
              <div className="hdlTLML">
                <label className="hdlMNumber">09</label>
              </div>
              <div className="hdlTLMR">
                <label className="hdlTLTLNRtimer">00:00:00</label>
              </div>
            </div>
            <div className="hdlTLB">
              <label className="hdlTLTLNRB">30-08-2024</label>
              <label className="hdlTLTLNRB">09:00 AM</label>
              <label className="hdlTLTLNRB">09</label>
            </div>
          </div>
          <div className="hdlTR">
            <div className="hdlTRLeft">
              <div className="hdlTRLeftT">
                <img src={images.gamecontroller} className="hdtrophyimage" />
              </div>
              <div className="hdlTRLeftB">
                <img src={images.cups} className="hdtrophyimage" />
              </div>
            </div>
            <div className="hdlTRRight">
              <img src={images.cat} className="hdcatimage" />
            </div>
          </div>
        </div>
        {/** MIDDLE */}
        <div className="hdLeftCMiddle">
          {topWinnerOfTheDay.map((item, index) => (
            <div
              className="hdMC"
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #1993FF, #0F5899)",
              }}
              key={index}
            >
              <div className="hdMCT">
                <label className="hdMCTCountry">Paris</label>
              </div>
              <div className="hdMCM">
                <label className="hdMCTResult">09</label>
              </div>
              <div className="hdMCB">
                <label className="hdMCTTime">09:00 AM</label>
              </div>
            </div>
          ))}
        </div>
        {/** BOTTOM */}
        <div className="hdLeftCBottom">
          {/** FILTER SEARCH CONTAINER */}
          <div className="hdFContainer">
            <label className="hdFCContenL">2x</label>
          </div>

          <div className="hdlocC">
            <div className="hdLocationContainer">
              <div className="hdLocationContainerLeft">
                {false ? (
                  <LoadingComponent />
                ) : (
                  locationdata.map((item, index) => (
                    <div
                      className="hdLocationContainerLeftContent"
                      onClick={() => selectingLocation(item)}
                      style={{
                        background:
                          index % 2 === 0
                            ? "linear-gradient(90deg, #1993FF, #0F5899)"
                            : "linear-gradient(90deg, #7EC630, #3D6017)",
                        borderColor:
                          selectedLocation?._id === item._id
                            ? COLORS.white_s
                            : "transparent", // Use transparent for no border
                        borderWidth: "2px",
                        borderStyle:
                          selectedLocation?._id === item._id ? "solid" : "none", // Apply border style conditionally
                      }}
                    >
                      <label className="hdLocationContainerLeftContentNameLabel">
                        {item.name}
                      </label>
                      <label className="hdLocationContainerLeftContentLimitLabel">
                        Max {item.limit}
                      </label>
                    </div>
                  ))
                )}
              </div>
              {/** RIGHT */}
              <div className="hdLocationContainerRight">
                {selectedLocation === null ? (
                  <LoadingComponent />
                ) : (
                  timeVisible && (
                    <div className="hdLocationContainerRightTimeContainer">
                      {/** TOP */}
                      <div className="hdLocationContainerRightTimeContainerTop">
                        <label className="hdLocationContainerLeftContentNameLabel">
                          {selectedLocation.name}
                        </label>
                        <label className="hdLocationContainerLeftContentLimitLabel">
                          Max {selectedLocation.limit}
                        </label>
                      </div>

                      {/** Time content container */}
                      <div className="hdLocationContainerRightTimeContainerContentContainer">
                        {selectedLocation.times.length === 0 ? (
                          <div className="NC">
                            <label className="hdLocationContainerLeftContentNameLabel">
                              No available time
                            </label>
                          </div>
                        ) : (
                          selectedLocation.times.map((titem, tindex) => (
                            <div
                              className="hdLocationContainerRightTimeContainerContentContainer-time"
                              onClick={() => selectingTimezone(titem)}
                            >
                              <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                                {titem.time}
                              </label>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )
                )}

                {selectedLocation === null &&
                selectedTime === null &&
                loadingdate ? (
                  <LoadingComponent />
                ) : (
                  dateVisible && (
                    <div className="hdLocationContainerRightTimeContainer">
                      {/** TOP */}
                      <div
                        onClick={dateBackhandler}
                        className="hdLocationContainerRightTimeContainerTop"
                      >
                        <IoArrowBackCircleOutline
                          color={COLORS.white_s}
                          size={"2.5rem"}
                        />
                        <label className="hdLocationContainerLeftContentNameLabel">
                          {selectedLocation.name}
                        </label>
                        <label className="hdLocationContainerLeftContentLimitLabel">
                          Max {selectedLocation.limit}
                        </label>
                      </div>

                      {/** Time content container */}
                      <div className="hdLocationContainerRightTimeContainerContentContainer">
                        {dates.length === 0 ? (
                          <div className="NC">
                            <label className="hdLocationContainerLeftContentNameLabel">
                              No available date
                            </label>
                          </div>
                        ) : (
                          dates?.map((item, index) => (
                            <div
                              className="hdLocationContainerRightTimeContainerContentContainer-time"
                              onClick={() => seletingDate(item)}
                            >
                              <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                                {item.lotdate}
                              </label>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )
                )}

                {selectedLocation === null &&
                selectedTime === null &&
                selectedDate === null &&
                loadingResult ? (
                  <div className="NC">
                    <CircularProgressBar />
                  </div>
                ) : (
                  resultVisible && (
                    <div className="hdLocationContainerRightTimeContainer">
                      {/** TOP */}
                      <div
                        onClick={resultBackhandler}
                        className="hdLocationContainerRightTimeContainerTop"
                      >
                        <IoArrowBackCircleOutline
                          color={COLORS.white_s}
                          size={"2.5rem"}
                        />
                        <label className="hdLocationContainerLeftContentNameLabel">
                          {selectedLocation.name}
                        </label>
                        <label className="hdLocationContainerLeftContentLimitLabel">
                          Max {selectedLocation.limit}
                        </label>
                      </div>

                      {/** Time content container */}
                      <div className="hdLocationContainerRightTimeContainerContentContainer-result">
                        <div className="hdLocationContainerRightTimeContainerContentContainer-resultright">
                          <div className="trophyimagecontainer">
                            <img
                              src={images.cups}
                              alt="trphy"
                              className="catandtrophyimg"
                            />
                          </div>

                          <div className="hdLocationContainerRightTimeContainerContentContainer-resultleft">
                            {results.length === 0 ? (
                              <label
                                className="hdLocationContainerLeftContentNameLabel"
                                style={{ marginBottom: "2rem" }}
                              >
                                Comming soon
                              </label>
                            ) : (
                              <label className="hdLocationContainerRightTimeContainerContentContainer-resultleft-number">
                                {results[0].resultNumber}
                              </label>
                            )}
                            <label className="hdLocationContainerRightTimeContainerContentContainer-resultleft-date">
                              {selectedDate.lotdate}
                            </label>
                          </div>

                          <div className="catimagecontainer">
                            <img
                              src={images.cat}
                              alt="cat"
                              className="catandtrophyimg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** RIGHT CONTAINER */}
      <div className="hdRightC">
        <label className="hdrLabel">GAME HISTORY</label>

        <div className="hdRightCContainer">
          {topWinnerOfTheDay.map((item, index) => (
            <div className="hdrContentC">
              <div className="hdrcL">
                <label className="hdrcLLabel">Paris</label>
              </div>
              <div className="hdrcM">
                <label className="hdrcMResultLabel">20</label>
                <label className="hdrcMAmoutLabel">10 GER</label>
              </div>
              <div className="hdrcR">
                <label className="hdrcRResultLabel">06:00 AM</label>
                <label className="hdrcMAmoutLabel">Aug 30, 2024</label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HD;
