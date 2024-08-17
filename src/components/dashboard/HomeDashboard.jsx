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
import { showErrorToast } from "../helper/showErrorToast";
import {
  useGetAllLocationWithTimeQuery,
  useGetPlayHistoryQuery,
} from "../../redux/api";
import CircularProgressBar from "../helper/CircularProgressBar";
import CountdownTimer from "../helper/CountdownTimer";
import { getDateAccordingToLocationAndTime } from "../../redux/actions/dateAction";

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

function HomeDashboard() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const { loading: loadingdate, dates } = useSelector((state) => state.date);
  const { loadingResult, results: singleResult } = useSelector(
    (state) => state.result
  );

  const [firstTimeClick, setFirstTimeClick] = useState(true);
  useEffect(() => {
    console.log("location changed");
  }, [selectedLocation]);

  const { user, accesstoken, loading } = useSelector((state) => state.user);
  const [showDate, setShowDate] = useState(true);
  const [nextResultTime, setNextResultTime] = useState(null);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllPromotion(accesstoken));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, [dispatch]);

  const handleLocationClick = (location) => {
    console.log("clicked");
    console.log(JSON.stringify(location));

    setSelectedLocation(location);
    setSelectedTime(null);
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
  };

  const handleSelectedDateClick = (datedate) => {
    setSelectedDate(datedate);
    dispatch(
      getResultAccordingToLocationTimeDate(
        accesstoken,
        datedate._id,
        datedate.lottime._id,
        datedate.lottime.lotlocation
      )
    );

    if (singleResult) {
      console.log("Result FOUND");
      console.log(JSON.stringify(singleResult[0]));
      setHomeResult(singleResult[0]);
      setNextResultTime(singleResult[0]?.nextresulttime);
      setFirstTimeClick(false);

      dispatch(getAllResult(accesstoken));
      dispatch(
        getAllResultAccordingToLocation(
          accesstoken,
          homeResult?.lotlocation?._id
        )
      );
      setSelectedDate(null);
      setSelectedTime(null);
    }
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
    setFilteredDataAllLocation(dataAllLocation?.locationData); // Update filteredData whenever locations change
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
                <label className="rltopcontainerLocationLabel">
                  {homeResult?.lotlocation?.lotlocation}
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
                <label className="rltopcontainerNextLabel">
                  {homeResult?.nextresulttime ? "Next Result" : ""}
                </label>
                <label className="rltopcontainerNextTimeLabel">
                  {homeResult?.nextresulttime}
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
                  {homeResult?.resultNumber}
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
                <label className="rltopcontainerTimerLabel">
                  {/* <Countdown date={targetDate} renderer={renderer} /> */}
                  {/* {targetDate ? (
                    <Countdown date={targetDate} renderer={renderer} />
                  ) : (
                    <span>Loading...</span>
                  )} */}
                  {nextResultTime && (
                    <CountdownTimer timeString={nextResultTime} />
                  )}
                </label>
              </div>
            </div>
            <div className="rlbottomcontainer">
              <div className="rlbottomcontentcontainer">
                <div className="rlbottomcontentcontainerCalContainer">
                  <SlCalender size={"20px"} color={COLORS.white_s} />
                </div>
                <label className="rlbottomcontentcontainerCalDateLabel">
                  {homeResult?.lotdate?.lotdate}
                </label>
                <label className="rlbottomcontentcontainerCalDateLabel">
                  {homeResult?.lottime?.lottime}
                </label>
                <label className="rlbottomcontentcontainerCalDateLabel">
                  {homeResult?.resultNumber}
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
            <div className="catContainer">
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
          {filteredData.length === 0 ? (
            <div>
              <label className="rltopcontainerLocationLabel">
                No result available
              </label>
            </div>
          ) : (
            filteredData.map((item, index) => (
              <div
                onClick={() => settingHomeResultUsingLocation(item, index)}
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
                  <label className="resultlistcontentcontainerLocation">
                    {item.lotlocation.lotlocation}
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
                  <label className="resultlistcontentcontainerNumber">
                    {item.resultNumber}
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
                  <label className="resultlistcontentcontainerTime">
                    {item.lottime.lottime}
                  </label>
                </div>
              </div>
            ))
          )}
        </div>

        {/** filter contatiner */}

        <div className="filtercontainer">
          {alldatafilerAllLocation?.map((item, index) => (
            <div
              className="filtercontent"
              onClick={() => settingFilterData(item)}
              key={item._id}
              style={{
                borderColor:
                  selectedFilterAllLocation === item._id
                    ? COLORS.green
                    : "transparent", // Use transparent for no border
                borderWidth: "2px",
                borderStyle:
                  selectedFilterAllLocation === item._id ? "solid" : "none", // Apply border style conditionally
              }}
            >
              <label className="filtercontentLabel">{item.maximumReturn}</label>
            </div>
          ))}
        </div>

        {/** Location contatiner */}
        <div className="locationcontainer">
          <div className="leftlocation">
            {isLoadingAllLocation ? (
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgressBar />
              </div>
            ) : (
              filteredDataAllLocation?.map((item, index) => (
                <div
                  className="leftlocationcontent"
                  style={{
                    background:
                      selectedLocation._id === item._id
                        ? "linear-gradient(180deg, #7EC630, #3D6017)"
                        : "linear-gradient(180deg, #1993FF, #0F5899)",
                  }}
                  key={item.id}
                  onClick={() => handleLocationClick(item)}
                >
                  <label className="leftlocationcontentLabel">
                    {item.name}
                  </label>

                  <label className="leftlocationcontentMaxLabel">
                    {item.limit}
                  </label>
                </div>
              ))
            )}
          </div>

          <div className="rightlocation">
            {!selectedTime &&
              selectedLocation?.times?.map((item, index) => (
                <div
                  className="rightlocationcontent"
                  key={item._id}
                  onClick={() => getAllTheDateForLocationHome(item)}
                >
                  <label className="rightlocationcontentLabel">
                    {item.time}
                  </label>
                </div>
              ))}

            {selectedTime &&
              (loadingdate ? (
                <div
                  style={{
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgressBar />
                </div>
              ) : (
                dates?.map((item, index) => (
                  <div
                    className="rightlocationcontent"
                    key={item._id}
                    onClick={() => handleSelectedDateClick(item)}
                  >
                    <label className="rightlocationcontentLabel">
                      {item.lotdate}
                    </label>
                  </div>
                ))
              ))}
          </div>
        </div>
      </div>

      <div className="rightcontainer">
        {/** App sidebar */}
        {/* <div className="rightsidebartop">
          <label className="topWinnerOfDayLabel">Top Winners of the day</label>

          {topWinnerOfTheDay.map((item, index) => (
            <div className="rscontent">
              <div className="rtcrightimage">
                <img
                  src={images.user}
                  alt="Profile Picture"
                  className="winner-user-image"
                />
              </div>

              <label className="topWinnerOfDayNameLabel">{item.name}</label>
              <label className="topWinnerOfDayAmountLabel">{item.amount}</label>
            </div>
          ))}
        </div> */}

        {/** play History */}
        <div className="rightsidebarmiddle">
          <label className="topWinnerOfDayLabel" style={{ marginTop: "10px" }}>
            Game History
          </label>

          {historyIsLoading ? (
            <div
              style={{
                flex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgressBar />
            </div>
          ) : (
            <>
              {historyapidatas?.playbets.length === 0 ? (
                <div
                  style={{
                    flex: "1",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh",
                  }}
                >
                  <label className="h-title-label">No history available</label>
                </div>
              ) : (
                historyapidatas?.playbets?.map((item, index) => (
                  <div className="rsbottomcontent">
                    <div className="lefthistory">
                      <label className="topWinnerOfDayNameLabel">
                        {item.lotlocation.lotlocation}
                      </label>
                    </div>
                    <div className="middlehistory">
                      <label className="gameHistoryNumberLabel">
                        {getPlaynumbersString(item.playnumbers)}
                      </label>
                      <label className="gameHistoryDateLabel">
                        {calculateTotalAmount(item.playnumbers)}{" "}
                        {user?.country?.countrycurrencysymbol}
                      </label>
                    </div>
                    <div className="righthistory">
                      <label className="gameHistoryDateLabel">
                        {item.lottime.lottime}
                      </label>
                      <label className="gameHistoryDateLabel">
                        {formatDate(item.lotdate.lotdate)}
                      </label>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
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
