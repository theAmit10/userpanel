import React, { useCallback, useEffect, useRef, useState } from "react";
import "./HomeDashboard.css";
import FONT from "../../assets/constants/fonts";
import images from "../../assets/constants/images";
import COLORS from "../../assets/constants/colors";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPromotion, loadProfile } from "../../redux/actions/userAction";
import {
  getAllResult,
  getAllResultAccordingToLocation,
  getNextResult,
  getResultAccordingToLocationTimeDate,
} from "../../redux/actions/resultAction";
import { showErrorToast, showSuccessToast, showWarningToast } from "../helper/showErrorToast";
import {
  useGetAllLocationWithTimeQuery,
  useGetPlayHistoryQuery,
} from "../../redux/api";
import CircularProgressBar from "../helper/CircularProgressBar";
import CountdownTimer from "../helper/CountdownTimer";
import { getDateAccordingToLocationAndTime } from "../../redux/actions/dateAction";
import { serverName } from "../../redux/store";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import { getTimeAccordingToTimezone } from "../../pages/userdashboard/Dashboard";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";
import { ToastContainer } from "react-toastify";

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

function HomeDashboard() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const { loading: loadingdate, dates } = useSelector((state) => state.date);
  const { loadingResult, results: singleResult } = useSelector(
    (state) => state.result
  );

  const [timeVisible, setTimeVisible] = useState(true);
  const [dateVisible, setDateVisible] = useState(false);
  const [resultVisible, setResultVisible] = useState(false);

  const settingTimeVisbility = () => {
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

  // const handleSelecteditemClick = (item, timedata) => {
  //   setSelectedItem(false);
  //   setSelectedLocation(item);
  //   setSelectedTime(timedata);

  //   dispatch(
  //     getDateAccordingToLocationAndTime(accesstoken, timedata._id, item._id)
  //   );
  // };

  const [firstTimeClick, setFirstTimeClick] = useState(true);
  useEffect(() => {
    console.log("location changed");
  }, [selectedLocation]);

  const { user, accesstoken, loading } = useSelector((state) => state.user);
  const [showDate, setShowDate] = useState(false);
  const [nextResultTime, setNextResultTime] = useState(null);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllPromotion(accesstoken));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, [dispatch]);

  // Use useEffect to log the state when it changes
  useEffect(() => {
    console.log("TIME VISIBLE :: ", timeVisible);
    console.log("DATE VISIBLE :: ", dateVisible);
    console.log("RESULT VISIBLE :: ", resultVisible);
  }, [timeVisible, dateVisible, resultVisible]);

  const handleLocationClick = (location) => {
    console.log(" loacation clicked");
    console.log(JSON.stringify(location));

    // setSelectedTime(null);
    setSelectedDate(null);
    // setShowDate(false);
    // setResultVisible(false);
    // setTimeVisible(true);
    settingTimeVisbility();
    setSelectedLocation(location);
  };

  const getAllTheDateForLocationHome = (item) => {
    console.log("time clicked");
    console.log(JSON.stringify(item));
    console.log(JSON.stringify(selectedLocation));
    setSelectedTime(item);

    dispatch(
      getDateAccordingToLocationAndTime(
        accesstoken,
        item._id,
        selectedLocation._id
      )
    );

    setTimeVisible(false);
    setDateVisible(true);
  };

  const handleSelecteditemClick = (item) => {
    setSelectedTime(item);

    dispatch(
      getDateAccordingToLocationAndTime(
        accesstoken,
        item._id,
        selectedLocation._id
      )
    );
  };

  const handleSelectedDateClick = async (datedate) => {
    showWarningToast("Processing, Please wait...")
    setSelectedDate(datedate);
    // dispatch(
    //   getResultAccordingToLocationTimeDate(
    //     accesstoken,
    //     datedate._id,
    //     datedate.lottime._id,
    //     datedate.lottime.lotlocation._id
    //   )
    // );

    console.log("SELECTED LOCATION"+datedate.lottime.lotlocation.lotlocation)
    console.log("SELECTED TIME"+datedate.lottime.lottime)
    console.log("SELECTED DATE"+ datedate.lotdate)


    try {
      const url = `${UrlHelper.RESULT_API}?lotdateId=${datedate._id}&lottimeId=${datedate.lottime._id}&lotlocationId=${datedate.lottime.lotlocation._id}`;
      console.log("URL :: " + url);

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("ACTION result :: " + JSON.stringify(data.results));

      // Check if the results array is empty
      if (data.results.length !== 0) {
        showSuccessToast("Result available")
        // setResult("Current date not found");
        setHomeResult(data.results[0]);
        setNextResultTime(data.results[0]?.nextresulttime);
        setFirstTimeClick(false);
      }
       else {
        // setResult(currentDate); // Set to the current date object if results are found
        console.log("no result found")
        showSuccessToast("Result not available")
      }
    } catch (error) {
      console.log(error)
      console.log("Error message:", error.response?.data?.message);
    }

    // if (singleResult) {
    //   console.log("Result FOUND");
    //   console.log(JSON.stringify(singleResult[0]));
      // setHomeResult(singleResult[0]);
      // setNextResultTime(singleResult[0]?.nextresulttime);
      // setFirstTimeClick(false);

    //   // dispatch(getAllResult(accesstoken));
    //   // dispatch(
    //   //   getAllResultAccordingToLocation(
    //   //     accesstoken,
    //   //     homeResult?.lotlocation?._id
    //   //   )
    //   // );
      // setSelectedDate(null);
      // setSelectedTime(null);
    // }
  };

  // console.log("Show date :: "+showDate)
  const {
    results,
    resultAccordingLocation,
    loadingForResultAccordingLocation,
    nextResult,
    loaderForNextResult,
  } = useSelector((state) => state.result);

  const { loadingPromotion, promotions } = useSelector(
    (state) => state.promotion
  );
  const [filteredData, setFilteredData] = useState([]);

  const [initialResultIndex, setInitialResultIndex] = useState(0);

  // For Big Result
  const [homeResult, setHomeResult] = useState([]);

  useEffect(() => {
    dispatch(getAllResult(accesstoken));
    dispatch(
      getAllResultAccordingToLocation(accesstoken, homeResult?.lotlocation?._id)
    );
    dispatch(getNextResult(accesstoken, homeResult?.lotlocation?._id));
    console.log("FIRST RESULT ITEM");
    console.log("FIRST RESULT ITEM" + JSON.stringify(results[0]));
    setHomeResult(results[0]);
    console.log("setting next result time :: " + results[0]?.nextresulttime);
    setNextResultTime(results[0]?.nextresulttime);
  }, [dispatch]);

  useEffect(() => {
    const firstThreeElements = results.slice(0, 7);
    if (firstTimeClick) {
      setHomeResult(firstThreeElements[0]);
    }
    setFilteredData(firstThreeElements);
  }, [results, homeResult]);

  useEffect(() => {
    const firstThreeElements = results.slice(0, 7);

    setFilteredData(firstThreeElements);
  }, [results]);

  // useEffect(() => {
  //   const firstThreeElements = results.slice(0, 7);
  //   if (firstTimeClick) {
  //     setHomeResult(firstThreeElements[0]);
  //   }
  //   setFilteredData(firstThreeElements);
  // }, [results, homeResult]);

  const afterTimerCompleted = () => {
    dispatch(getAllResult(accesstoken));
    dispatch(
      getAllResultAccordingToLocation(accesstoken, homeResult?.lotlocation?._id)
    );
    setHomeResult(results[initialResultIndex]);
  };

  const settingHomeResultUsingLocation = (item, index) => {
    setHomeResult(item);
    setFirstTimeClick(false);
    setInitialResultIndex(index);

    // Assuming extractTime returns { hour, minute, period }
    const { hour, minute, period } = extractTime(item.nextresulttime);

    setNextResultTime(item.nextresulttime); // Set the target date in ISO format
    console.log("item.nextresulttime  " + item.nextresulttime);
    dispatch(
      getAllResultAccordingToLocation(accesstoken, item.lotlocation._id)
    );
  };

  function extractTime(timeString) {
    // Remove whitespace from the time string and split it into time and period (AM/PM)
    const [timePart, period] = timeString.trim().split(/\s+/);

    // Determine the separator used in the time part (either "-" or ":")
    const separator = timePart.includes("-") ? "-" : ":";

    // Split the time part using the determined separator
    const [hour, minute] = timePart.split(separator);

    return {
      hour,
      minute,
      period,
    };
  }

  const sliderData = promotions.map((promotion, index) => ({
    img: `${serverName}/uploads/promotion/${promotion.url}`,
  }));

  // FOR FILTER AND BELOW CONTAINER

  const [alldatafilerAllLocation, setalldatafilterAllLocation] = useState([]);
  const [selectedFilterAllLocation, setSelectedFilterAllLocation] =
    useState(null);

  const {
    data: dataAllLocation,
    error: errorAllLocation,
    isLoading: isLoadingAllLocation,
  } = useGetAllLocationWithTimeQuery(accesstoken);

  // FOR ALL FILTER TYPE DATA
  useEffect(() => {
    console.log("STARTING FOUND DATA :: ");
    if (!isLoadingAllLocation && dataAllLocation) {
      console.log("found data", dataAllLocation);
      const uniqueItems = new Set();
      const filtertype = [{ _id: "123", maximumReturn: "All" }]; // Default element

      dataAllLocation.locationData.forEach((item) => {
        const key = item.maximumReturn;
        if (!uniqueItems.has(key)) {
          uniqueItems.add(key);
          filtertype.push({ _id: item._id, maximumReturn: item.maximumReturn });
        }
      });

      // Sorting the filtertype array
      filtertype.sort((a, b) => {
        if (a.maximumReturn === "All") return -1;
        if (b.maximumReturn === "All") return 1;
        const aReturn = parseFloat(a.maximumReturn.replace("x", ""));
        const bReturn = parseFloat(b.maximumReturn.replace("x", ""));
        return aReturn - bReturn;
      });

      setalldatafilterAllLocation(filtertype);
      setSelectedFilterAllLocation(filtertype[0]._id);
      setSelectedLocation(dataAllLocation.locationData[0]);

      console.log(filtertype);
    }
  }, [isLoadingAllLocation, dataAllLocation]);

  const settingFilterData = (itemf) => {
    setSelectedFilterAllLocation(itemf._id);
    if (itemf.maximumReturn.toLowerCase() === "all") {
      setFilteredDataAllLocation(dataAllLocation?.locationData);
    } else {
      const filtered = dataAllLocation?.locationData.filter((item) =>
        item.maximumReturn
          .toLowerCase()
          .includes(itemf.maximumReturn.toLowerCase())
      );
      setFilteredDataAllLocation(filtered);
    }
  };

  const [filteredDataAllLocation, setFilteredDataAllLocation] = useState([]);

  useEffect(() => {
    if (dataAllLocation) {
      setFilteredDataAllLocation(dataAllLocation?.locationData); // Update filteredData whenever locations change
    }
  }, [dataAllLocation]);

  // FOR GETTING GAME HISTORY
  const {
    data: historyapidatas,
    error: historyError,
    isLoading: historyIsLoading,
    refetch,
  } = useGetPlayHistoryQuery(accesstoken);

  useEffect(
    useCallback(() => {
      // Refetch the data when the screen is focused
      refetch();
    }, [refetch])
  );

  const getPlaynumbersString = (playbets) => {
    // Map the array to extract playnumber and join them with ', '
    return playbets.map((playbet) => playbet.playnumber).join(" , ");
  };

  const calculateTotalAmount = (playbets) => {
    // Use reduce to accumulate the total amount
    return playbets.reduce((total, playbet) => total + playbet.amount, 0);
  };

  const formatDate = (dateString) => {
    // Split the date string into parts
    const [day, month, year] = dateString.split("-");

    // Create a Date object from the parts
    const date = new Date(`${year}-${month}-${day}`);

    // Use Intl.DateTimeFormat to format the date
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  };

  // FOR TIMER
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    // Set the target date once when the component mounts
    const futureDate = new Date(Date.now() + 10000000); // Adjust as needed
    console.log("Future Date:", futureDate); // Log the future date to ensure it's correct
    setTargetDate(futureDate);
  }, []); // Empty dependency array ensures this runs only once

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>Time's up!</span>;
    } else {
      // Format time with leading zeros
      const formatTime = (num) => num.toString().padStart(2, "0");

      // Render countdown in HH:MM:SS format
      return (
        <div>
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
        </div>
      );
    }
  };

  return (
    <div className="hdcontainer">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {/** LEFT CONTAINER */}

          <div className="hdLeftC">
            {/** TOP MAIN RESULT DATA */}
            {homeResult && homeResult.length === 0 ? (
              <NodataFound title={"No data available"} />
            ) : (
              <div className="hdLeftCTop">
                <div className="hdlTL">
                  <div className="hdlTLT">
                    <div className="hdlTLTL">
                      <label className="hdlTLTLCountry">
                        {homeResult?.lotlocation?.lotlocation}
                      </label>
                    </div>
                    {loaderForNextResult ? null : (
                      <div className="hdlTLTR">
                        <label className="hdlTLTLNextResult">Next Result</label>
                        <label className="hdlTLTLNR">
                          {getTimeAccordingToTimezone(
                            homeResult?.nextresulttime,
                            user?.country?.timezone
                          )}
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="hdlTLM">
                    <div className="hdlTLML">
                      <label className="hdlMNumber">
                        {homeResult?.resultNumber}
                      </label>
                    </div>
                    {loaderForNextResult ? (
                      <LoadingComponent />
                    ) : (
                      <div className="hdlTLMR">
                        <label className="hdlTLTLNRtimer">
                          <CountdownTimer
                            timeString={getTimeAccordingToTimezone(
                              homeResult?.nextresulttime,
                              user?.country?.timezone
                            )}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="hdlTLB">
                    <label className="hdlTLTLNRB">
                      {homeResult?.lotdate?.lotdate}
                    </label>
                    <label className="hdlTLTLNRB">
                      {" "}
                      {getTimeAccordingToTimezone(
                        homeResult?.lottime?.lottime,
                        user?.country?.timezone
                      )}
                    </label>
                    <label className="hdlTLTLNRB">
                      {homeResult?.resultNumber}
                    </label>
                  </div>
                </div>
                <div className="hdlTR">
                  <div className="hdlTRLeft">
                    <div className="hdlTRLeftT">
                      <img
                        src={images.gamecontroller}
                        className="hdtrophyimage"
                      />
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
            )}

            {/** MIDDLE RESULT LIST CONTAINER */}
            {filteredData.length === 0 ? (
              <NodataFound title={"No result available"} />
            ) : (
              <div className="hdLeftCMiddle">
                {filteredData.map((item, index) => (
                  <div
                    className="hdMC"
                    onClick={() => settingHomeResultUsingLocation(item, index)}
                    style={{
                      background:
                        index % 2 === 0
                          ? "linear-gradient(180deg, #7EC630, #3D6017)"
                          : "linear-gradient(180deg, #1993FF, #0F5899)",
                    }}
                    key={index}
                  >
                    <div className="hdMCT">
                      <label className="hdMCTCountry">
                        {item.lotlocation.lotlocation}
                      </label>
                    </div>
                    <div className="hdMCM">
                      <label className="hdMCTResult">{item.resultNumber}</label>
                    </div>
                    <div className="hdMCB">
                      <label className="hdMCTTime">
                        {getTimeAccordingToTimezone(
                          item.lottime.lottime,
                          user?.country?.timezone
                        )}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/** BOTTOM LOCATION AND THE FITER */}
            {isLoadingAllLocation ? (
              <LoadingComponent />
            ) : (
              <div className="hdLeftCBottom">
                {/** FILTER SEARCH CONTAINER */}
                <div className="hdFContainer">
                  {alldatafilerAllLocation.map((item, index) => (
                    <label
                      onClick={() => settingFilterData(item)}
                      key={item._id}
                      className="hdFCContenL"
                      style={{
                        borderColor:
                          selectedFilterAllLocation === item._id
                            ? COLORS.green
                            : "transparent", // Use transparent for no border
                        borderWidth: "2px",
                        borderStyle:
                          selectedFilterAllLocation === item._id
                            ? "solid"
                            : "none", // Apply border style conditionally
                      }}
                    >
                      {item.maximumReturn}
                    </label>
                  ))}
                </div>

                <div className="hdlocC">
                  <div className="hdLocationContainer">
                    <div className="hdLocationContainerLeft">
                      {isLoadingAllLocation ? (
                        <LoadingComponent />
                      ) : (
                        filteredDataAllLocation.map((item, index) => (
                          <div
                          key={index}
                            className="hdLocationContainerLeftContent"
                            onClick={() => handleLocationClick(item)}
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
                                selectedLocation?._id === item._id
                                  ? "solid"
                                  : "none", // Apply border style conditionally
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
                      {timeVisible &&
                        (selectedLocation === null ? (
                          <LoadingComponent />
                        ) : (
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
                                    key={tindex}
                                    className="hdLocationContainerRightTimeContainerContentContainer-time"
                                    onClick={() =>
                                      getAllTheDateForLocationHome(titem)
                                    }
                                  >
                                    <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                                      {getTimeAccordingToTimezone(
                                        titem.time,
                                        user?.country?.timezone
                                      )}
                                    </label>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        ))}

                      {dateVisible &&
                        (
                        loadingdate ? (
                          <LoadingComponent />
                        ) : (
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
                                    key={index}
                                    className="hdLocationContainerRightTimeContainerContentContainer-time"
                                    onClick={() =>
                                      handleSelectedDateClick(item)
                                    }
                                  >
                                    <label className="hdLocationContainerRightTimeContainerContentContainer-time-label">
                                      {item.lotdate}
                                    </label>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        ))}

                      {resultVisible &&
                        (
                        loadingResult ? (
                          <LoadingComponent/>
                        ) : (
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
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/** RIGHT CONTAINER */}
          <div className="hdRightC">
            <label className="hdrLabel">GAME HISTORY</label>

            {historyIsLoading ? (
              <LoadingComponent />
            ) : historyapidatas.playbets.length === 0 ? (
              <NodataFound title={"No data found"} />
            ) : (
              <div className="hdRightCContainer">
                {historyapidatas.playbets.map((item, index) => (
                  <div className="hdrContentC" key={index}>
                    <div className="hdrcL">
                      <label className="hdrcLLabel">
                        {" "}
                        {item.lotlocation.lotlocation}
                      </label>
                    </div>
                    <div className="hdrcM">
                      <label className="hdrcMResultLabel">
                        {getPlaynumbersString(item.playnumbers)}
                      </label>
                      <label className="hdrcMAmoutLabel">
                        {calculateTotalAmount(item.playnumbers)}{" "}
                        {user.country.countrycurrencysymbol}
                      </label>
                    </div>
                    <div className="hdrcR">
                      <label className="hdrcRResultLabel">
                        {getTimeAccordingToTimezone(
                          item.lottime.lottime,
                          user?.country?.timezone
                        )}
                      </label>
                      <label className="hdrcMAmoutLabel">
                        {" "}
                        {formatDate(item.lotdate.lotdate)}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      <ToastContainer/>
    </div>
  );
}

const htmlStyles = `
*{
  border: 0;
  box-sizing: content-box;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
  vertical-align: top;
}

h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }

/* table */

table { font-size: 75%; table-layout: fixed; width: 100%; }
table { border-collapse: separate; border-spacing: 2px; }
th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: center; }
th, td { border-radius: 0.25em; border-style: solid; }
th { background: #EEE; border-color: #BBB; }
td { border-color: #DDD; }

/* page */

html { font: 16px/1 'Open Sans', sans-serif; overflow: auto; }
html { background: #999; cursor: default; }

body { box-sizing: border-box;margin: 0 auto; overflow: hidden; padding: 0.25in; }
body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }

/* header */

header { margin: 0 0 3em; }
header:after { clear: both; content: ""; display: table; }

header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }
header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }
header address p { margin: 0 0 0.25em; }
header span, header img { display: block; float: right; }
header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }
header img { max-height: 100%; max-width: 100%; }

/* article */

article, article address, table.meta, table.inventory { margin: 0 0 3em; }
article:after { clear: both; content: ""; display: table; }
article h1 { clip: rect(0 0 0 0); position: absolute; }

article address { float: left; font-size: 125%; font-weight: bold; }

/* table meta & balance */

table.meta, table.balance { float: right; width: 36%; }
table.meta:after, table.balance:after { clear: both; content: ""; display: table; }

/* table meta */

table.meta th { width: 40%; }
table.meta td { width: 60%; }

/* table items */

table.inventory { clear: both; width: 100%; }
table.inventory th { font-weight: bold; text-align: center; }

table.inventory td:nth-child(1) { width: 26%; }
table.inventory td:nth-child(2) { width: 38%; }
table.inventory td:nth-child(3) { text-align: center; width: 12%; }
table.inventory td:nth-child(4) { text-align: center; width: 12%; }
table.inventory td:nth-child(5) { text-align: center; width: 12%; }

/* table balance */

table.balance th, table.balance td { width: 50%; }
table.balance td { text-align: right; }

/* aside */

aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }
aside h1 { border-color: #999; border-bottom-style: solid; }
`;

export default HomeDashboard;
