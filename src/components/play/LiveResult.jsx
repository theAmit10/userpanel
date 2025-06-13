import React, { useCallback, useEffect, useState } from "react";
import "./Play.css";
import COLORS from "../../assets/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "../../redux/actions/userAction";
import {
  useGetAllLocationWithTimeQuery,
  useGetPowerballQuery,
  useGetPowetTimesQuery,
} from "../../redux/api";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showWarningToast } from "../helper/showErrorToast";
import { LoadingComponent } from "../helper/LoadingComponent";
import { getTimeAccordingToTimezone } from "../alllocation/AllLocation";
import moment from "moment-timezone";

export function getDateTimeAccordingToUserTimezone(time, date, userTimeZone) {
  // Combine the passed date and time into a full datetime string in IST
  const dateTimeIST = `${date} ${time}`;

  // Convert the combined date and time to a moment object in the IST timezone
  const istDateTime = moment.tz(
    dateTimeIST,
    "DD-MM-YYYY hh:mm A",
    "Asia/Kolkata"
  );

  // Convert the IST datetime to the user's target timezone
  const userTimeDateTime = istDateTime.clone().tz(userTimeZone);

  // Format the date and time in the target timezone and return it
  return userTimeDateTime.format("DD-MM-YYYY");
}

export function getCurrentDateInTimezone() {
  // Get the current date in the user's timezone
  const currentDate = moment.tz("Asia/Kolkata").format("DD-MM-YYYY");

  // Return the formatted date
  return currentDate;
}

function LiveResult({ reloadKey }) {
  const { user, accesstoken } = useSelector((state) => state.user);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedItem, setSelectedItem] = useState(true);

  const playdata = [];

  for (let i = 1; i <= 100; i++) {
    playdata.push({ number: i.toString(), id: i });
  }

  useEffect(() => {
    console.log(
      "Selected item location :: " + JSON.stringify(selectedLocation)
    );
  }, [selectedItem, selectedLocation]);

  // ######################
  //  STARTED
  // ######################

  const dispatch = useDispatch();

  // const handleSelecteditemClick = (item, timedata) => {
  //   console.log("showing time", timedata);
  //   const now = moment.tz(user?.country?.timezone);
  //   console.log("Current Time: ", now.format("hh:mm A"));
  //   console.log("Current Date: ", now.format("DD-MM-YYYY"));

  //   const lotTimeMoment = moment.tz(
  //     getTimeAccordingToTimezone(timedata?.time, user?.country?.timezone),
  //     "hh:mm A",
  //     user?.country?.timezone
  //   );
  //   console.log(`Lot Time for location : ${lotTimeMoment.format("hh:mm A")}`);

  //   const timerinMinutes = timedata.liveresulttimer;

  //   // Subtract 15 minutes from the lotTimeMoment
  //   const lotTimeMinus15Minutes = lotTimeMoment
  //     .clone()
  //     .subtract(timerinMinutes, "minutes");

  //   const isLotTimeClose =
  //     now.isSameOrAfter(lotTimeMinus15Minutes) && now.isBefore(lotTimeMoment);
  //   console.log(`Is it within 15 minutes of the lot time? ${isLotTimeClose}`);

  //   if (isLotTimeClose) {
  //     console.log("Navigating to PlayArena...");
  //     // showWarningToast("Entry is close for this session");
  //     // showWarningToast("Please choose next available time");
  //     console.log("showing time");
  //     // console.log(timedata);
  //     // console.log(timedata.liveresultlink);
  //     openLink(timedata.liveresultlink);
  //   } else {
  //     showWarningToast("It too early or past the time.");

  //     // setSelectedItem(false);
  //     // setSelectedLocation(item);
  //     // setSelectedTime(timedata);
  //   }
  // };

  const handleSelecteditemClick = (item, timedata) => {
    console.log("showing time", timedata);
    const now = moment.tz(user?.country?.timezone);
    console.log("Current Time: ", now.format("hh:mm A"));
    console.log("Current Date: ", now.format("DD-MM-YYYY"));

    const lotTimeMoment = moment.tz(
      getTimeAccordingToTimezone(timedata?.time, user?.country?.timezone),
      "hh:mm A",
      user?.country?.timezone
    );
    console.log(`Lot Time: ${lotTimeMoment.format("hh:mm A")}`);

    const timerinMinutes = timedata.liveresulttimer || 5; // Default to 5 minutes if not set
    const bufferSeconds = 59; // Allow actions up to 59 seconds after the lot time

    // Calculate the start time (lotTime - timerinMinutes + 1 minute)
    const startWindow = lotTimeMoment
      .clone()
      .subtract(timerinMinutes - 1, "minutes"); // 7:56:00 for 8:00 PM (5-min timer)

    // Calculate the end time (lotTime + 59 seconds)
    const endWindow = lotTimeMoment.clone().add(bufferSeconds, "seconds"); // 8:00:59

    const isWithinWindow = now.isBetween(startWindow, endWindow, null, "[]"); // Inclusive of both start and end
    console.log(
      `Is it within ${
        timerinMinutes - 1
      } mins before to 59s after? ${isWithinWindow}`
    );

    if (isWithinWindow) {
      console.log("Navigating to PlayArena...");
      openLink(timedata.liveresultlink); // Open the live result link
    } else {
      showWarningToast(
        now.isBefore(startWindow)
          ? "It's too early. Please wait."
          : "This session has expired. Choose the next available time."
      );
    }
  };

  // const handleSelecteditemClickPowerball = (item, timedata) => {
  //   console.log("showing time", timedata);
  //   const now = moment.tz(user?.country?.timezone);
  //   console.log("Current Time: ", now.format("hh:mm A"));
  //   console.log("Current Date: ", now.format("DD-MM-YYYY"));

  //   const lotTimeMoment = moment.tz(
  //     getTimeAccordingToTimezone(timedata?.powertime, user?.country?.timezone),
  //     "hh:mm A",
  //     user?.country?.timezone
  //   );
  //   console.log(`Lot Time for location : ${lotTimeMoment.format("hh:mm A")}`);

  //   const timerinMinutes = timedata.liveresulttimer;

  //   // Subtract 15 minutes from the lotTimeMoment
  //   const lotTimeMinus15Minutes = lotTimeMoment
  //     .clone()
  //     .subtract(timerinMinutes, "minutes");

  //   const isLotTimeClose =
  //     now.isSameOrAfter(lotTimeMinus15Minutes) && now.isBefore(lotTimeMoment);
  //   console.log(`Is it within 15 minutes of the lot time? ${isLotTimeClose}`);

  //   if (isLotTimeClose) {
  //     console.log("Navigating to PlayArena...");
  //     // showWarningToast("Entry is close for this session");
  //     // showWarningToast("Please choose next available time");
  //     console.log("showing time");
  //     // console.log(timedata);
  //     // console.log(timedata.liveresultlink);
  //     openLink(timedata.liveresultlink);
  //   } else {
  //     showWarningToast("It too early or past the time.");

  //     // setSelectedItem(false);
  //     // setSelectedLocation(item);
  //     // setSelectedTime(timedata);
  //   }
  // };
  const handleSelecteditemClickPowerball = (item, timedata) => {
    console.log("showing time", timedata);
    const now = moment.tz(user?.country?.timezone);
    console.log("Current Time: ", now.format("hh:mm A"));
    console.log("Current Date: ", now.format("DD-MM-YYYY"));

    const powertimeMoment = moment.tz(
      getTimeAccordingToTimezone(timedata?.powertime, user?.country?.timezone),
      "hh:mm A",
      user?.country?.timezone
    );
    console.log(`Powerball Time: ${powertimeMoment.format("hh:mm A")}`);

    const timerinMinutes = timedata.liveresulttimer || 5; // Default to 5 minutes if not set
    const bufferSeconds = 59; // Allow actions up to 59 seconds after the powerball time

    // Calculate the start time (powertime - timerinMinutes + 1 minute)
    const startWindow = powertimeMoment
      .clone()
      .subtract(timerinMinutes - 1, "minutes"); // e.g., 7:56:00 for 8:00 PM (5-min timer)

    // Calculate the end time (powertime + 59 seconds)
    const endWindow = powertimeMoment.clone().add(bufferSeconds, "seconds"); // e.g., 8:00:59

    const isWithinWindow = now.isBetween(startWindow, endWindow, null, "[]"); // Inclusive of both start and end
    console.log(
      `Is it between ${startWindow.format("hh:mm A")} and ${endWindow.format(
        "hh:mm A"
      )}? ${isWithinWindow}`
    );

    if (isWithinWindow) {
      console.log("Navigating to PlayArena...");
      openLink(timedata.liveresultlink);
    } else {
      showWarningToast(
        now.isBefore(startWindow)
          ? "It's too early. Please wait until " + startWindow.format("hh:mm A")
          : "This Powerball session has expired. Please choose the next available time."
      );
    }
  };

  // const openLink = (url) => {
  //   if (url) {
  //     if (!url.startsWith("http://") && !url.startsWith("https://")) {
  //       url = "https://" + url; // Default to HTTPS
  //     }
  //     window.open(url, "_blank");
  //   } else {
  //     showErrorToast("Invalid URL");
  //     showErrorToast(url);
  //   }
  // };

  const openLink = (url) => {
    if (typeof url !== "string" || url.trim() === "") {
      showErrorToast("No valid URL found");

      return;
    }

    let formattedUrl = url.trim();

    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = "https://" + formattedUrl;
    }

    try {
      // Validate URL format using URL constructor
      const validUrl = new URL(formattedUrl);
      window.open(validUrl.href, "_blank");
    } catch (error) {
      showErrorToast("Invalid URL format");
    }
  };

  useEffect(() => {
    console.log("Selected item time :: " + JSON.stringify(selectedTime));
  }, [selectedItem, selectedLocation]);

  const [alldatafiler, setalldatafilter] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, []);

  const { data, error, isLoading, refetch } = useGetAllLocationWithTimeQuery(
    accesstoken,

    { refetchOnMountOrArgChange: true }
  );

  const {
    data: pdata,
    isLoading: pisLoading,
    refetch: prefetch,
    error: perror,
  } = useGetPowerballQuery(
    {
      accesstoken,
    },
    { refetchOnMountOrArgChange: true }
  );

  const {
    isLoading: allTimeIsLoading,
    data: allTimeData,
    refetch: allTimeRefetch,
  } = useGetPowetTimesQuery(
    {
      accesstoken,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [updatename, setupdatename] = useState("");
  useEffect(() => {
    if (!pisLoading && pdata) {
      setupdatename(pdata?.games[0]?.name);
    }
  }, [pisLoading, pdata, prefetch]);

  const [nextTime, setNextTime] = useState(null);
  const [filteredDataT, setFilteredDataT] = useState([]);
  useEffect(() => {
    if (!allTimeIsLoading && allTimeData) {
      setFilteredDataT(allTimeData.powerTimes);

      const nextTime = getNextTimeForHighlightsPowerball(
        allTimeData.powerTimes,
        "Asia/Kolkata"
      );
      setNextTime(nextTime);
    }
  }, [allTimeData, allTimeIsLoading]); // Correct dependencies

  // FOR ALL FILTER TYPE DATA
  useEffect(() => {
    console.log("STARTING FOUND DATA :: ");
    if (!isLoading && data) {
      console.log("found data", data);
      const uniqueItems = new Set();
      const filtertype = [{ _id: "123", maximumReturn: "All" }]; // Default element

      data.locationData.forEach((item) => {
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

      setalldatafilter(filtertype);
      setSelectedFilter(filtertype[0]._id);

      console.log(filtertype);
    }
  }, [isLoading, data]);

  const settingFilterData = (itemf) => {
    setSelectedFilter(itemf._id);
    if (itemf.maximumReturn.toLowerCase() === "all") {
      // setFilteredData(data?.locationData);
      const sortedData = [...(data?.locationData || [])].sort((a, b) => {
        const aReturn = parseFloat(a.maximumReturn.replace("x", ""));
        const bReturn = parseFloat(b.maximumReturn.replace("x", ""));
        return bReturn - aReturn; // Sort from highest to lowest
      });
      setFilteredData(sortedData);
    } else {
      const filtered = data?.locationData.filter((item) =>
        item.maximumReturn
          .toLowerCase()
          .includes(itemf.maximumReturn.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (!isLoading && data) {
      const sortedData = [...(data?.locationData || [])].sort((a, b) => {
        const aReturn = parseFloat(a.maximumReturn.replace("x", ""));
        const bReturn = parseFloat(b.maximumReturn.replace("x", ""));
        return bReturn - aReturn; // Sort from highest to lowest
      });
      setFilteredData(sortedData); // Update filteredData whenever locations change
      console.log(sortedData);
    }
  }, [data, reloadKey]);

  const navigationHandler = (item, timeItem) => {
    const now = moment.tz(user?.country?.timezone);
    console.log("Current Time: ", now.format("hh:mm A"));
    console.log("Current Date: ", now.format("DD-MM-YYYY"));

    const lotTimeMoment = moment.tz(
      getTimeAccordingToTimezone(timeItem?.time, user?.country?.timezone),
      "hh:mm A",
      user?.country?.timezone
    );
    console.log(`Lot Time for location : ${lotTimeMoment.format("hh:mm A")}`);

    // Subtract 15 minutes from the lotTimeMoment
    const lotTimeMinus15Minutes = lotTimeMoment.clone().subtract(10, "minutes");

    const isLotTimeClose =
      now.isSameOrAfter(lotTimeMinus15Minutes) && now.isBefore(lotTimeMoment);
    console.log(`Is it within 15 minutes of the lot time? ${isLotTimeClose}`);

    if (isLotTimeClose) {
      console.log("Navigating to PlayArena...");
      showWarningToast("Entry is close for this session");
      showWarningToast("Please choose next available time");
    } else {
      console.log("It's too early or past the lot time.");
      navigation.navigate("PlayArena", {
        locationdata: item,
        timedata: timeItem,
      });
    }
  };

  const navigationHandlerForPowerball = (item, timeItem) => {
    const now = moment.tz(user?.country?.timezone);
    console.log("Current Time: ", now.format("hh:mm A"));
    console.log("Current Date: ", now.format("DD-MM-YYYY"));

    const lotTimeMoment = moment.tz(
      getTimeAccordingToTimezone(timeItem?.powertime, user?.country?.timezone),
      "hh:mm A",
      user?.country?.timezone
    );
    console.log(`Lot Time for location : ${lotTimeMoment.format("hh:mm A")}`);

    // Subtract 15 minutes from the lotTimeMoment
    const lotTimeMinus15Minutes = lotTimeMoment.clone().subtract(10, "minutes");

    const isLotTimeClose =
      now.isSameOrAfter(lotTimeMinus15Minutes) && now.isBefore(lotTimeMoment);
    console.log(`Is it within 15 minutes of the lot time? ${isLotTimeClose}`);

    if (isLotTimeClose) {
      console.log("Navigating to PlayArena...");
      showWarningToast("Entry is close for this session");
      showWarningToast("Please choose next available time");
    } else {
      console.log("It's too early or past the lot time.");
      navigation.navigate("PlayArena", {
        locationdata: item,
        timedata: timeItem,
      });
    }
  };

  const getNextTimeForHighlights = (times, userTimezone) => {
    if (times.length === 1) {
      return times[0];
    }

    // Get the current time in the user's timezone
    const currentRiyadhTime = moment().tz(userTimezone).format("hh:mm A");
    console.log("Current time in Riyadh timezone:", currentRiyadhTime);

    // Convert each time from IST to user timezone (Asia/Riyadh)
    const convertedTimes = times.map((item) => {
      const timeInIST = moment.tz(item.time, "hh:mm A", "Asia/Kolkata");
      const timeInRiyadh = timeInIST.clone().tz(userTimezone).format("hh:mm A");
      return { ...item, convertedTime: timeInRiyadh };
    });

    console.log("Converted times to Riyadh timezone:", convertedTimes);

    // Sort the times in the user's timezone
    const sortedTimes = convertedTimes.sort((a, b) =>
      moment(a.convertedTime, "hh:mm A").diff(
        moment(b.convertedTime, "hh:mm A")
      )
    );

    console.log("Sorted times:", sortedTimes);

    // Find the next available time
    for (let i = 0; i < sortedTimes.length; i++) {
      if (
        moment(currentRiyadhTime, "hh:mm A").isBefore(
          moment(sortedTimes[i].convertedTime, "hh:mm A")
        )
      ) {
        console.log("Next available time found:", sortedTimes[i]);
        return sortedTimes[i]; // Return the first future time
      }
    }

    console.log(
      "No future time found, returning the first sorted time:",
      sortedTimes[0]
    );
    // If no future time found, return the first time (next day scenario)
    return sortedTimes[0];
  };

  const getNextTimeForHighlightsPowerball = (times, userTimezone) => {
    if (times.length === 1) {
      return times[0];
    }

    // Get the current time in the user's timezone
    const currentRiyadhTime = moment().tz(userTimezone).format("hh:mm A");
    console.log("Current time in Riyadh timezone:", currentRiyadhTime);

    // Convert each time from IST to user timezone (Asia/Riyadh)
    const convertedTimes = times.map((item) => {
      const timeInIST = moment.tz(item.powertime, "hh:mm A", "Asia/Kolkata");
      const timeInRiyadh = timeInIST.clone().tz(userTimezone).format("hh:mm A");
      return { ...item, convertedTime: timeInRiyadh };
    });

    console.log("Converted times to Riyadh timezone:", convertedTimes);

    // Sort the times in the user's timezone
    const sortedTimes = convertedTimes.sort((a, b) =>
      moment(a.convertedTime, "hh:mm A").diff(
        moment(b.convertedTime, "hh:mm A")
      )
    );

    console.log("Sorted times:", sortedTimes);

    // Find the next available time
    for (let i = 0; i < sortedTimes.length; i++) {
      if (
        moment(currentRiyadhTime, "hh:mm A").isBefore(
          moment(sortedTimes[i].convertedTime, "hh:mm A")
        )
      ) {
        console.log("Next available time found:", sortedTimes[i]);
        return sortedTimes[i]; // Return the first future time
      }
    }

    console.log(
      "No future time found, returning the first sorted time:",
      sortedTimes[0]
    );
    // If no future time found, return the first time (next day scenario)
    return sortedTimes[0];
  };

  useEffect(() => {
    // setFilteredData([]);
    refetch();
  }, [reloadKey]);

  // CRETING BLINK BUTTON
  // const BlinkingButton = ({
  //   timeItem,
  //   nextTime,
  //   navigationHandler,
  //   item,
  //   user,
  //   idx,
  // }) => {
  //   const [isBlinking, setIsBlinking] = useState(false);
  //   const [shouldBlink, setShouldBlink] = useState(false);

  //   useEffect(() => {
  //     if (!nextTime || !nextTime.time || !user?.country?.timezone) return;

  //     const checkTimeDifference = () => {
  //       const userTimezone = user.country.timezone;
  //       const nextTimeInUserTZ = moment.tz(
  //         nextTime.time,
  //         "hh:mm A",
  //         userTimezone
  //       );
  //       const currentTimeInUserTZ = moment().tz(userTimezone);

  //       const timeDifference = nextTimeInUserTZ.diff(
  //         currentTimeInUserTZ,
  //         "minutes"
  //       );

  //       console.log("Time Difference:", timeDifference); // Debugging

  //       const timerinMinutes = timeItem.liveresulttimer || 10;

  //       setShouldBlink(timeDifference >= 0 && timeDifference <= timerinMinutes);
  //     };

  //     checkTimeDifference();
  //     const timer = setInterval(checkTimeDifference, 10000); // Check every 10s

  //     return () => clearInterval(timer);
  //   }, [nextTime, user]);

  //   useEffect(() => {
  //     let interval;
  //     if (shouldBlink) {
  //       interval = setInterval(() => {
  //         setIsBlinking((prev) => !prev);
  //       }, 500); // Blinking interval
  //     } else {
  //       setIsBlinking(false);
  //     }

  //     return () => clearInterval(interval);
  //   }, [shouldBlink]);

  //   return (
  //     <div
  //       key={timeItem._id}
  //       onClick={() => handleSelecteditemClick(item, timeItem)}
  //       className={`time-item ${
  //         timeItem.time === nextTime.time ? "highlighted" : ""
  //       }`}
  //       style={{
  //         borderColor:
  //           timeItem.time === nextTime.time
  //             ? isBlinking
  //               ? "transparent"
  //               : COLORS.orange
  //             : "transparent",
  //         borderWidth: timeItem.time === nextTime.time ? 3 : 3,
  //         borderRadius: "1rem",
  //         overflow: "hidden",
  //       }}
  //     >
  //       <span className="time-items-container-time-label">
  //         {getTimeAccordingToTimezone(timeItem.time, user?.country?.timezone)}
  //       </span>
  //     </div>
  //   );
  // };
  const BlinkingButton = ({
    timeItem,
    nextTime,
    navigationHandler,
    item,
    user,
    idx,
  }) => {
    const [isBlinking, setIsBlinking] = useState(false);
    const [shouldBlink, setShouldBlink] = useState(false);

    useEffect(() => {
      if (!nextTime || !nextTime.time || !user?.country?.timezone) return;

      const checkTimeDifference = () => {
        const userTimezone = user.country.timezone;
        const nextTimeInUserTZ = moment.tz(
          nextTime.time,
          "hh:mm A",
          userTimezone
        );
        const currentTimeInUserTZ = moment().tz(userTimezone);

        const timeDifferenceSeconds = nextTimeInUserTZ.diff(
          currentTimeInUserTZ,
          "seconds"
        );

        const timerDuration = (timeItem.liveresulttimer || 5) * 60; // Convert to seconds
        const startBlinkingAt = timerDuration - 60; // (timerDuration - 1 minute) in seconds

        // Start blinking when there's (timerDuration - 1 minute) left
        // Stop blinking at nextTime + 59 seconds (8:00:59)
        setShouldBlink(
          timeDifferenceSeconds <= startBlinkingAt &&
            timeDifferenceSeconds > -60
        );
      };

      checkTimeDifference();
      const timer = setInterval(checkTimeDifference, 1000); // Check every second

      return () => clearInterval(timer);
    }, [nextTime, user, timeItem.liveresulttimer]);

    useEffect(() => {
      let interval;
      if (shouldBlink) {
        interval = setInterval(() => {
          setIsBlinking((prev) => !prev);
        }, 500); // Blink every 500ms
      } else {
        setIsBlinking(false);
      }

      return () => clearInterval(interval);
    }, [shouldBlink]);

    return (
      <div
        key={timeItem._id}
        onClick={() => handleSelecteditemClick(item, timeItem)}
        className={`time-item ${
          timeItem.time === nextTime.time ? "highlighted" : ""
        }`}
        style={{
          borderColor:
            timeItem.time === nextTime.time
              ? isBlinking
                ? "transparent"
                : COLORS.orange
              : "transparent",
          borderWidth: 3,
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <span className="time-items-container-time-label">
          {getTimeAccordingToTimezone(timeItem.time, user?.country?.timezone)}
        </span>
      </div>
    );
  };

  // const BlinkingButtonPowerball = ({
  //   timeItem,
  //   nextTime,
  //   navigationHandler,
  //   item,
  //   user,
  //   idx,
  // }) => {
  //   const [isBlinking, setIsBlinking] = useState(false);
  //   const [shouldBlink, setShouldBlink] = useState(false);

  //   useEffect(() => {
  //     if (!nextTime || !nextTime.powertime || !user?.country?.timezone) return;

  //     const checkTimeDifference = () => {
  //       const userTimezone = user.country.timezone;
  //       const nextTimeInUserTZ = moment.tz(
  //         nextTime.powertime,
  //         "hh:mm A",
  //         userTimezone
  //       );
  //       const currentTimeInUserTZ = moment().tz(userTimezone);

  //       const timeDifference = nextTimeInUserTZ.diff(
  //         currentTimeInUserTZ,
  //         "minutes"
  //       );

  //       console.log("Time Difference:", timeDifference); // Debugging

  //       const timerinMinutes = timeItem.liveresulttimer || 10;

  //       setShouldBlink(timeDifference >= 0 && timeDifference <= timerinMinutes);
  //     };

  //     checkTimeDifference();
  //     const timer = setInterval(checkTimeDifference, 10000); // Check every 10s

  //     return () => clearInterval(timer);
  //   }, [nextTime, user]);

  //   useEffect(() => {
  //     let interval;
  //     if (shouldBlink) {
  //       interval = setInterval(() => {
  //         setIsBlinking((prev) => !prev);
  //       }, 500); // Blinking interval
  //     } else {
  //       setIsBlinking(false);
  //     }

  //     return () => clearInterval(interval);
  //   }, [shouldBlink]);

  //   return (
  //     <div
  //       key={timeItem._id}
  //       onClick={() => handleSelecteditemClickPowerball(item, timeItem)}
  //       className={`time-item ${
  //         timeItem.powertime === nextTime.powertime ? "highlighted" : ""
  //       }`}
  //       style={{
  //         borderColor:
  //           timeItem.powertime === nextTime.powertime
  //             ? isBlinking
  //               ? "transparent"
  //               : COLORS.orange
  //             : "transparent",
  //         borderWidth: timeItem.powertime === nextTime.powertime ? 3 : 3,
  //         borderRadius: "1rem",
  //         overflow: "hidden",
  //       }}
  //     >
  //       <span className="time-items-container-time-label">
  //         {getTimeAccordingToTimezone(
  //           timeItem.powertime,
  //           user?.country?.timezone
  //         )}
  //       </span>
  //     </div>
  //   );
  // };
  const BlinkingButtonPowerball = ({
    timeItem,
    nextTime,
    navigationHandler,
    item,
    user,
    idx,
  }) => {
    const [isBlinking, setIsBlinking] = useState(false);
    const [shouldBlink, setShouldBlink] = useState(false);

    useEffect(() => {
      if (!nextTime || !nextTime.powertime || !user?.country?.timezone) return;

      const checkTimeDifference = () => {
        const userTimezone = user.country.timezone;
        const nextTimeInUserTZ = moment.tz(
          nextTime.powertime,
          "hh:mm A",
          userTimezone
        );
        const currentTimeInUserTZ = moment().tz(userTimezone);

        const timeDifferenceSeconds = nextTimeInUserTZ.diff(
          currentTimeInUserTZ,
          "seconds"
        );

        const timerinSeconds = (timeItem.liveresulttimer || 5) * 60; // Default to 5 minutes if not set
        const startBlinkingAt = timerinSeconds - 60; // (timerDuration - 1 minute) in seconds

        // Start blinking when there's (timerDuration - 1 minute) left
        // Stop blinking at powertime + 59 seconds
        setShouldBlink(
          timeDifferenceSeconds <= startBlinkingAt &&
            timeDifferenceSeconds > -60
        );
      };

      checkTimeDifference();
      const timer = setInterval(checkTimeDifference, 1000); // Check every second for precision

      return () => clearInterval(timer);
    }, [nextTime, user, timeItem.liveresulttimer]);

    useEffect(() => {
      let interval;
      if (shouldBlink) {
        interval = setInterval(() => {
          setIsBlinking((prev) => !prev);
        }, 500); // Blink every 500ms
      } else {
        setIsBlinking(false);
      }

      return () => clearInterval(interval);
    }, [shouldBlink]);

    return (
      <div
        key={timeItem._id}
        onClick={() => handleSelecteditemClickPowerball(item, timeItem)}
        className={`time-item ${
          timeItem.powertime === nextTime.powertime ? "highlighted" : ""
        }`}
        style={{
          borderColor:
            timeItem.powertime === nextTime.powertime
              ? isBlinking
                ? "transparent"
                : COLORS.orange
              : "transparent",
          borderWidth: 3,
          borderRadius: "1rem",
          overflow: "hidden",
        }}
      >
        <span className="time-items-container-time-label">
          {getTimeAccordingToTimezone(
            timeItem.powertime,
            user?.country?.timezone
          )}
        </span>
      </div>
    );
  };
  return (
    <div className="main-content-container-all-location">
      {/** Location and time */}
      <div
        className="alCreatLocationTopContainer"
        style={{ margin: "0 0 1rem 0" }}
      >
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Live Result
          </label>
        </div>
      </div>

      {selectedItem && (
        <>
          {/** Filter container */}
          <div className="filtercontaineral">
            {alldatafiler.map((item, index) => (
              <div
                className="filtercontental"
                onClick={() => settingFilterData(item)}
                key={item._id}
                style={{
                  borderColor:
                    selectedFilter === item._id ? COLORS.green : "transparent", // Use transparent for no border
                  borderWidth: "2px",
                  borderStyle: selectedFilter === item._id ? "solid" : "none", // Apply border style conditionally
                }}
              >
                <label className="filtercontentalLabel">
                  {item.maximumReturn}
                </label>
              </div>
            ))}
          </div>

          {/** Location container */}

          <div className="live-result-all">
            {!pisLoading && (
              <div className="location-item-all">
                <div className="location-details-all">
                  <div
                    className="location-header"
                    style={{
                      background:
                        1 % 2 === 0
                          ? "linear-gradient(90deg, #1993FF, #0F5899)"
                          : "linear-gradient(90deg, #7EC630, #3D6017)",
                      // borderColor: isBlinking ? "transparent" : COLORS.orange,

                      // borderWidth: isBlinking ? 3 : 0,
                      // borderRadius: "1rem",
                      // overflow: "hidden",
                    }}
                  >
                    <span className="location-header-label">{updatename}</span>
                    <span className="location-header-max-label"></span>
                  </div>
                </div>

                <div className="time-items-container">
                  {filteredDataT.map((timedata, timeindex) => (
                    <BlinkingButtonPowerball
                      timeItem={timedata}
                      idx={timeindex}
                      nextTime={nextTime}
                      navigation={navigationHandlerForPowerball}
                      item={timedata}
                      user={user}
                    />
                  ))}
                </div>
              </div>
            )}
            {isLoading ? (
              <LoadingComponent />
            ) : (
              filteredData?.map((item, index) => {
                const nextTime = getNextTimeForHighlights(
                  item?.times,
                  user?.country?.timezone
                );

                return (
                  <div className="location-item-all" key={index}>
                    <div className="location-details-all">
                      <div
                        className="location-header"
                        style={{
                          background:
                            index % 2 === 0
                              ? "linear-gradient(90deg, #1993FF, #0F5899)"
                              : "linear-gradient(90deg, #7EC630, #3D6017)",
                        }}
                      >
                        <span className="location-header-label">
                          {item.name}
                        </span>
                        <span className="location-header-max-label">
                          {item.maximumReturn}
                        </span>
                      </div>
                    </div>

                    <div className="time-items-container">
                      {item.times.map((timedata, timeindex) => (
                        <BlinkingButton
                          timeItem={timedata}
                          idx={timeindex}
                          nextTime={nextTime}
                          navigation={navigationHandler}
                          item={item}
                          user={user}
                        />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default LiveResult;
