import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadAllPromotion, loadProfile } from "../../redux/actions/userAction";
import {
  getAllResult,
  getAllResultAccordingToLocation,
  getNextResult,
} from "../../redux/actions/resultAction";
import { showErrorToast, showWarningToast } from "../helper/showErrorToast";
import {
  useGetAllLocationWithTimeQuery,
  useGetPlayHistoryQuery,
} from "../../redux/api";
import CircularProgressBar from "../helper/CircularProgressBar";

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
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleLocationClick = (location) => {
    console.log("clicked");
    console.log(JSON.stringify(location));
    setSelectedLocation(location);
  };
  useEffect(() => {
    console.log("location changed");
  }, [selectedLocation]);

  const { user, accesstoken, loading } = useSelector((state) => state.user);
  const [showDate, setShowDate] = useState(true);
  const [nextResultTime, setNextResultTime] = useState(10);
  const [timeDifference, setTimeDifference] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());

  const navigation = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllPromotion(accesstoken));
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, [dispatch]);

  const [currentScreen, setCurrentScreen] = useState("");
  const [firstTimeClick, setFirstTimeClick] = useState(true);

  useEffect(
    useCallback(() => {
      setCurrentScreen("Home"); // Set the current screen to 'HomeScreen' when this screen is focused
      return () => setCurrentScreen(""); // Reset the current screen when the screen is blurred
    }, [])
  );

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
    setHomeResult(results[0]);
  }, [dispatch]);

  useEffect(() => {
    const firstThreeElements = results.slice(0, 15);
    if (firstTimeClick) {
      setHomeResult(firstThreeElements[0]);
    }
    setFilteredData(firstThreeElements);
  }, [results, homeResult]);

  const toogleView = () => {
    setShowDate(false);
  };

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
    console.log("Mine time");
    console.log(extractTime(item.nextresulttime));

    const { hour, minute, period } = extractTime(item.nextresulttime);
    console.log(hour);
    console.log(minute);
    console.log(period);
    // setNextResultTime(hour);
    const hour_time = hour + " " + period;
    console.log("Hour_time :: " + hour_time);
    settingTimerForNextResult(hour, minute, period);

    dispatch(
      getAllResultAccordingToLocation(accesstoken, item.lotlocation._id)
    );
    // dispatch(getNextResult(accesstoken, item.lotlocation._id));
  };

  // For Promotion Image Slider
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef();

  // Commenting this for Testing next result
  useEffect(() => {
    const interval = setInterval(() => {
      // const nextPage = (currentPage + 1) % images.length;
      const nextPage = (currentPage + 1) % promotions.length;
      setCurrentPage(nextPage);
      scrollViewRef.current?.scrollTo({ x: width * nextPage, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage]);

  const handlePageChange = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffset / width);
    setCurrentPage(page);
  };

  // Function to determine if the given time has passed
  function hasTimePassed(timeString) {
    if (timeString) {
      // Parse the given time string using moment.js
      const timeFormat = timeString.includes("-") ? "hh-mm A" : "hh:mm A";
      const givenTime = moment(timeString, timeFormat);

      // Get the current device time
      const currentTime = moment();

      // Compare the given time with the current time
      return givenTime.isBefore(currentTime);
    }
  }

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

  useEffect(() => {
    // Update current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [homeResult, currentTime, timeDifference]);

  const settingTimerForNextResult = async (hour, minute, period) => {
    let hour24 = parseInt(hour);

    if (period.toLowerCase() === "pm" && hour24 < 12) {
      hour24 += 12;
    } else if (period.toLowerCase() === "am" && hour24 === 12) {
      hour24 = 0;
    }

    const lotTime = new Date();
    lotTime.setHours(hour24);
    lotTime.setMinutes(parseInt(minute));
    lotTime.setSeconds(0);

    setTimeDifference(lotTime.getTime() - currentTime.getTime());

    console.log("Setting timer");
    console.log("lottime :: " + lotTime.getTime());
    console.log("currenttime :: " + currentTime.getTime());
    console.log(
      "Both Difference :: ",
      lotTime.getTime() - currentTime.getTime()
    );

    // Calculate time difference between current time and lot time
    setTimeDifference(lotTime.getTime() - currentTime.getTime());

    // Ensure that data is loaded before setting the timer
    await dispatch(getAllResult(accesstoken));
    await dispatch(
      getAllResultAccordingToLocation(accesstoken, homeResult?.lotlocation?._id)
    );
    await dispatch(getNextResult(accesstoken, homeResult?.lotlocation?._id));
  };

  // FOR DOWNLOAD PDF

  const htmlContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <title>Result</title>
            <link rel="license" href="https://www.opensource.org/licenses/mit-license/">
            <style>
              ${htmlStyles}
            </style>
          </head>
          <body>
            <header>
              <h1>RESULT</h1>
            </header>
            <article>
          
              <table class="inventory">
                <thead>
                  <tr>
                    <th><span>Location</span></th>
                    <th><span>Date</span></th>
                    <th><span>Time</span></th>
                    <th><span>Result</span></th>
                  </tr>
                </thead>
                <tbody>
                ${resultAccordingLocation
                  ?.map(
                    (item) => `
                <tr>
                  <td><span>${item.lotlocation?.lotlocation}</span></td>
                  <td><span>${item.lotdate?.lotdate}</span></td>
                  <td><span>${item.lottime?.lottime}</span></td>
                  <td><span>${item.resultNumber}</span></td>
                </tr>
              `
                  )
                  .join("")}
                </tbody>
              </table>
              
            </article>
            <aside>
              <h1><span>Since 1927</span></h1>
              <div>
                <p>Thank you for download</p>
              </div>
            </aside>
          </body>
        </html>
      `;

  const createPDF = async () => {
    if (!homeResult) {
      showErrorToast("No data available");
    } else {
      let options = {
        //Content to print
        html: htmlContent,
        //File Name
        fileName: `${homeResult.lotdate.lotdate}${homeResult.lottime.lottime}`,
        //File directory
        directory: "Download",

        base64: true,
      };

      let file = await RNHTMLtoPDF.convert(options);
      // console.log(file.filePath);
      alert(
        "Successfully Exported",
        "Path:" + file.filePath,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open", onPress: () => openFile(file.filePath) },
        ],
        { cancelable: true }
      );
    }
  };

  const openFile = (filepath) => {
    const path = filepath; // absolute-path-to-my-local-file.
    FileViewer.open(path)
      .then(() => {
        // success
        console.log("All Good no error found");
      })
      .catch((error) => {
        // error
        console.log("Found error :: " + error);
      });
  };

  const sliderData = promotions.map((promotion, index) => ({
    img: `${serverName}/uploads/promotion/${promotion.url}`,
  }));

  const shownotifee = () => {
    onDisplayNotification("Jammu Result", "11:00 AM Jammu Result Announced");
  };

  // Define state variables for error and retry
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const [loadings, setLoading] = useState(false);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      // Clear any previous error
      setError(null);
      // Set loading state
      setLoading(true);
      // Dispatch actions to fetch data
      await dispatch(loadAllPromotion(accesstoken));
      await dispatch(loadProfile(accesstoken));
      await dispatch(getAllResult(accesstoken));
      await dispatch(
        getAllResultAccordingToLocation(
          accesstoken,
          homeResult?.lotlocation?._id
        )
      );
      await dispatch(getNextResult(accesstoken, homeResult?.lotlocation?._id));
      // Data fetched successfully, set loading state to false
      setLoading(false);
    } catch (error) {
      // Set error state if there is an issue with fetching data
      setError(error.message);
      // Data fetching failed, set loading state to false
      setLoading(false);
    }
  };

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle retry
  const handleRetry = () => {
    // Set retrying state to true
    setRetrying(true);
    // Call the fetchData function to retry fetching data
    fetchData();
    // Reset retrying state after retrying
    setRetrying(false);
  };

  // Function to clear AsyncStorage data when the user logs out
  const clearAsyncStorage = async () => {
    try {
      await localStorage.clear();
      console.log("AsyncStorage data cleared successfully.");
      navigation("/login");
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'SplashScreen'}],
      // });
    } catch (error) {
      console.log("error");
    }
  };

  const logoutHandler = () => {
    console.log("Logging Off...");
    showWarningToast("Logging Out");

    setTimeout(() => {
      clearAsyncStorage();
    }, 1000);
  };

  // Auto Reload HomeScreen
  const [previousData, setPreviousData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('Auto Reloading start');
        dispatch(getAllResult(accesstoken));
        const { results } = useSelector((state) => state.result);

        if (!isEqual(previousData, results)) {
          setPreviousData(results);
          // Refresh your home screen here
          // For example, force a re-render of the home screen component
          // or use some state to trigger a re-render.
        }
      } catch (error) {
        // console.log('Auto Reloading error');
        // console.log(error);
      }
    };

    // Fetch data initially when component mounts
    fetchData();

    // Background fetch every 8 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 8000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch, accesstoken, previousData]);

  const isEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

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
      setSelectedLocation(filtertype[0]._id);

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

  const handleSearch = (text) => {
    const filtered = dataAllLocation?.locationData.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDataAllLocation(filtered);
  };

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
                  {homeResult?.nextresulttime ? "00:00:00" : ""}
                </label>
              </div>
            </div>
            <div className="rlbottomcontainer">
              <div className="rlbottomcontentcontainer">
                <div className="rlbottomcontentcontainerCalContainer">
                  <SlCalender size={"20px"} color={COLORS.background} />
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
                  selectedFilterAllLocation == item._id
                    ? COLORS.green
                    : COLORS.grayHalfBg,
                borderWidth: "2px",
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
            {selectedLocation?.times?.map((item, index) => (
              <div className="rightlocationcontent" key={item._id}>
                <label className="rightlocationcontentLabel">{item.time}</label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rightcontainer">
        {/** App sidebar */}
        <div className="rightsidebartop">
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
        </div>

        {/** play History */}
        <div className="rightsidebarmiddle">
          <label className="topWinnerOfDayLabel" style={{ marginTop: "5px" }}>
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
