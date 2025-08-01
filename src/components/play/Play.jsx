import React, { useCallback, useEffect, useState } from "react";
import FONT from "../../assets/constants/fonts";
import "./Play.css";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { RxCrossCircled } from "react-icons/rx";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getDateAccordingToLocationAndTime } from "../../redux/actions/dateAction";
import { loadProfile } from "../../redux/actions/userAction";
import {
  useCreatePlayMutation,
  useGetAllLocationWithTimeQuery,
  useGetDateAccToLocTimeQuery,
  useGetPlayHistoryQuery,
} from "../../redux/api";
import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../helper/showErrorToast";
import { LoadingComponent } from "../helper/LoadingComponent";
import { getTimeAccordingToTimezone } from "../alllocation/AllLocation";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";
import { NodataFound } from "../helper/NodataFound";
import moment from "moment-timezone";
import { extractMultiplerFromLocation } from "../../helper/HelperFunction.js";
const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

const findCurrentDateObject = (data, currentDate) => {
  console.log("Checking for the current date is availble in the database");
  // const currentDate = getCurrentDate();

  console.log("current data : " + currentDate);
  const lotdates = data.lotdates || [];

  const found = lotdates.find((item) => item.lotdate === currentDate);

  return found ? found : "Current date not found";
};

const createLocationDataArray = (maximumNumber) => {
  return Array.from({ length: maximumNumber }, (_, index) => ({
    id: index + 1,
    name: `${index + 1}`,
  }));
};

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

function Play({ reloadKey }) {
  const { user, accesstoken } = useSelector((state) => state.user);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItem, setSelectedItem] = useState(true);
  const [submitItemFlag, setSubmitItemFlag] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState([]);

  const addSelectedNumber = (number) => {
    console.log("ADDING NUMBER TO LIST");

    setSelectedNumber((prevSelectedNumbers) => {
      const updatedList = [...prevSelectedNumbers];

      const index = updatedList.indexOf(number);
      if (index > -1) {
        // Number is already present, remove it
        updatedList.splice(index, 1);
      } else {
        // Number is not present, add it
        updatedList.push(number);
      }

      console.log("SELECTED NUMBER :: ", updatedList);
      return updatedList;
    });
  };

  const showSubmitContainer = () => {
    // setSubmitItemFlag(true);

    if (
      checkSelectedNumberLimit(
        playhistorydata,
        currentDate.lotdate,
        selectedTime.time ? selectedTime.time : selectedTime.lottime,
        selectedLocation.name
          ? selectedLocation.name
          : selectedLocation.lotlocation,
        mineplaynum,
        selectedNumber
      ) > playnumberlimit
    ) {
      if (parseInt(playnumberlimit) <= 0) {
        showWarningToast(
          `${findMissingNumbers(
            playhistorydata,
            currentDate.lotdate,
            selectedTime.time ? selectedTime.time : selectedTime.lottime,
            selectedLocation.name
              ? selectedLocation.name
              : selectedLocation.lotlocation,
            selectedLocation.maximumNumber
          )}  Not Allowed`
        );
        showWarningToast("Maximum number selection limit reached");
      } else {
        showWarningToast(
          `Kindly select any ${Math.abs(
            playnumberlimit
          )} numbers of your choice`
        );
        showWarningToast("Selecting all numbers is not permitted");
      }
    } else {
      setSubmitItemFlag(true);
    }
  };

  function checkSelectedNumberLimit(
    playbet,
    lotdate,
    lottime,
    lotlocation,
    limit,
    selectedNumber
  ) {
    console.log("Checking Selected Number Limit");
    console.log(playbet.length, lotdate, lottime, lotlocation, selectedNumber);
    console.log(JSON.stringify(playbet));

    // Ensure selectedNumber is valid
    if (!Array.isArray(selectedNumber)) {
      console.error("Error: selectedNumber is not a valid array");
      return 0;
    }

    // Step 1: Filter the playbet array based on provided lotdate, lottime, and lotlocation
    const filteredArray = playbet.filter(
      (item) =>
        item.gameType === "playarena" &&
        item.lotdate.lotdate === lotdate &&
        item.lottime.lottime === lottime &&
        item.lotlocation.lotlocation === lotlocation
    );

    console.log("Filtered array length :: ", filteredArray.length);

    // Step 2: Use a Set to store unique playnumbers from the filtered array
    const uniquePlaynumbers = new Set();
    filteredArray.forEach((item) => {
      item.playnumbers.forEach((numberObj) => {
        uniquePlaynumbers.add(String(numberObj.playnumber)); // Ensure all values are strings
      });
    });

    console.log("Unique Playnumbers :: ", Array.from(uniquePlaynumbers));

    // Step 3: Store the length of the selectedNumber array
    let remainingLimit = selectedNumber.length;

    // Step 4: Loop through the selectedNumber array
    selectedNumber.forEach((selected) => {
      const name = String(selected.name); // Ensure name is a string for comparison
      if (uniquePlaynumbers.has(name)) {
        remainingLimit -= 1; // Decrement the remainingLimit if name exists in the Set
      }
    });

    console.log(
      "Remaining Limit after processing selected numbers :: ",
      remainingLimit
    );

    // Step 5: Return the remainingLimit
    return remainingLimit;
  }

  function findMissingNumbers(
    playbet,
    lotdate,
    lottime,
    lotlocation,
    maxnumber
  ) {
    console.log("Finding Missing Numbers");
    console.log(playbet.length, lotdate, lottime, lotlocation, maxnumber);

    // Step 1: Filter the playbet array based on provided lotdate, lottime, and lotlocation
    const filteredArray = playbet.filter(
      (item) =>
        item.lotdate.lotdate === lotdate &&
        item.lottime.lottime === lottime &&
        item.lotlocation.lotlocation === lotlocation
    );

    console.log("Filtered array length :: ", filteredArray.length);

    // Step 2: Use a Set to store unique playnumbers from the filtered array
    const uniquePlaynumbers = new Set();
    filteredArray.forEach((item) => {
      item.playnumbers.forEach((numberObj) => {
        uniquePlaynumbers.add(Number(numberObj.playnumber)); // Ensure all values are numbers
      });
    });

    console.log("Unique Playnumbers :: ", Array.from(uniquePlaynumbers));

    // Step 3: Create an array from 1 to maxnumber
    const fullRange = Array.from({ length: maxnumber }, (_, i) => i + 1);
    console.log("Full Range :: ", fullRange);

    // Step 4: Find numbers that are in fullRange but not in uniquePlaynumbers
    const missingNumbers = fullRange.filter(
      (num) => !uniquePlaynumbers.has(num)
    );
    console.log("Missing Numbers :: ", missingNumbers);

    // Step 5: Return the missing numbers as a comma-separated string
    return missingNumbers.join(",");
  }

  const hideSubmitContainer = () => {
    setSubmitItemFlag(false);
  };

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

  const handleSelecteditemClick = (item, timedata) => {
    console.log("Selected item :: " + JSON.stringify(item));
    const now = moment.tz(user?.country?.timezone);
    console.log("Current Time: ", now.format("hh:mm A"));
    console.log("Current Date: ", now.format("DD-MM-YYYY"));

    const lotTimeMoment = moment.tz(
      getTimeAccordingToTimezone(timedata?.time, user?.country?.timezone),
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
      setSelectedItem(false);
      setSelectedLocation(item);
      setSelectedTime(timedata);

      dispatch(
        getDateAccordingToLocationAndTime(accesstoken, timedata._id, item._id)
      );
    }
  };

  const removeSelecteditemClick = () => {
    setSelectedItem(true);
    setSelectedLocation(null);
    setSelectedTime(null);
    setResult(null);
    setCurrentDate(null);
    setSelectedNumber([]);
    setSubmitItemFlag(false);
  };

  useEffect(() => {
    console.log("Selected item time :: " + JSON.stringify(selectedTime));
  }, [selectedItem, selectedLocation]);

  const [alldatafiler, setalldatafilter] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, []);

  const { data, error, isLoading } =
    useGetAllLocationWithTimeQuery(accesstoken);

  // FOR ALL FILTER TYPE DATA
  useEffect(() => {
    console.log("STARTING FOUND DATA :: ");
    if (!isLoading && data) {
      console.log("found data", data);
      const uniqueItems = new Set();
      const filtertype = [{ _id: "123", maximumReturn: "All" }]; // Default element

      data.locationData.forEach((item) => {
        const key = extractMultiplerFromLocation(item.limit);
        if (!uniqueItems.has(key)) {
          uniqueItems.add(key);
          filtertype.push({
            _id: item._id,
            maximumReturn: extractMultiplerFromLocation(item.limit),
          });
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
        extractMultiplerFromLocation(item.limit)
          .toLowerCase()
          .includes(itemf.maximumReturn.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const [filteredData, setFilteredData] = useState([]);

  // useEffect(() => {
  //   setFilteredData(data?.locationData); // Update filteredData whenever locations change
  // }, [data]);

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
  }, [data]);

  const [betnumberdata, setBetnumberdata] = useState([]);
  const [showSelectedVisible, setshowSelectedVisible] = useState(false);
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (event, id) => {
    const text = event.target.value;
    console.log("HANDLING INPUT :: " + text, id);
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: text,
    }));
  };

  const addAmountForInput = (id) => {
    setInputValues((prevValues) => {
      // Get the current amount, default to 0 if not present
      const currentAmount = parseInt(prevValues[id] || "0", 10);
      // Add 10 to the current amount and convert it back to a string
      return {
        ...prevValues,
        [id]: (currentAmount + 10).toString(),
      };
    });
  };

  const removeAmountForInput = (id) => {
    console.log("Removing :: " + id);
    setInputValues((prevValues) => {
      // Get the current amount, default to 0 if not present
      const currentAmount = parseInt(prevValues[id] || "0", 10);

      // If the current amount is 0 or less, return 0
      if (currentAmount <= 0) {
        return {
          ...prevValues,
          [id]: "0",
        };
      }

      // Subtract 10 from the current amount and convert it back to a string
      return {
        ...prevValues,
        [id]: (currentAmount - 10).toString(),
      };
    });
  };

  const handleAddClick = (id) => {
    addAmountForInput(id);
  };
  const handleRemoveClick = (id) => {
    removeAmountForInput(id);
  };
  const winningAmountPrice = (str1, str2) => {
    console.log("WINNING AMOUNT ::  ", str1, " :: ", str2);

    // Convert the first string to a number
    const number1 = parseFloat(str1);

    // Remove any whitespace and convert to lowercase for uniformity
    const cleanedStr2 = str2.trim().toLowerCase();

    // Find the position of 'x' or 'X' in the second string
    const xIndex = cleanedStr2.indexOf("x");

    // If 'x' or 'X' is found, extract the part before it and convert to a number
    const number2 =
      xIndex !== -1 ? parseFloat(cleanedStr2.substring(0, xIndex)) : 0;

    // Multiply the two numbers
    const result = number1 * number2;

    return result.toFixed(2);
  };

  // FOR CHECKING CURRENTDATE IS AVAILABLE FOR PLAY

  const {
    data: dataDate,
    isLoading: isLoadingDate,
    refetch: refetchDate,
  } = useGetDateAccToLocTimeQuery({
    accessToken: accesstoken,
    lottimeId: selectedTime?._id,
    lotlocationId: selectedLocation?._id,
  });

  const [result, setResult] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [showPlay, setShowPlay] = useState(false);

  const getResultAccordingToLocationTimeDate = async (
    lotdateId,
    lottimeId,
    lotlocationId
  ) => {
    try {
      const url = `${UrlHelper.RESULT_API}?lotdateId=${lotdateId}&lottimeId=${lottimeId}&lotlocationId=${lotlocationId}`;
      console.log("URL :: " + url);

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("ACTION result length :: " + data.results.length);
      console.log("ACTION result :: " + JSON.stringify(data.results));

      // Check if the results array is empty
      if (data.results.length !== 0) {
        console.log("Setting to Result IF :: " + "Current date not found");
        setResult("Current date not found");
      } else {
        console.log("Setting to Result ELSE :: " + JSON.stringify(currentDate));
        console.log(
          "Setting to Location ELSE :: " +
            JSON.stringify(selectedLocation.maximumNumber)
        );
        const maximumNumber = selectedLocation.maximumNumber; // Ensure `maximumNumber` exists in the data
        if (maximumNumber) {
          const generatedArray = createLocationDataArray(maximumNumber);
          setBetnumberdata(generatedArray);
        }
        setResult("yes"); // Set to the current date object if results are found
      }
      setShowPlay(false);
    } catch (error) {
      setShowPlay(false);
      console.log(error);
      console.log("Error message:", error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (!isLoadingDate && dataDate) {
      setShowPlay(true);

      // Get current time in Asia/Kolkata timezone
      const now = moment.tz("Asia/Kolkata");
      console.log("Current Time (IST): ", now.format("hh:mm A"));
      console.log("Current Date (IST): ", now.format("DD-MM-YYYY"));

      // Get the selected lot time (ensure it's correctly formatted)
      const currentDateString = now.format("DD-MM-YYYY"); // Current date as string
      const lotTimeString = selectedTime?.time; // Lot time from selectedTime

      // Debugging: Log the selected time to ensure it's correct
      console.log("Selected Lot Time String: ", lotTimeString);

      // Parse the lot time with the current date
      const lotTimeMoment = moment.tz(
        `${currentDateString} ${lotTimeString}`, // Combine date and time
        "DD-MM-YYYY hh:mm A", // Date and time format
        "Asia/Kolkata" // Timezone
      );

      // Debugging: Log the parsed lot time
      console.log(
        `Parsed Lot Time for location: ${lotTimeMoment.format("hh:mm A")}`
      );

      // Check if the current time is the same or after the lot time
      const isLotTimePassed = now.isSameOrAfter(lotTimeMoment);
      const nextDay = now.clone().add(1, "day");

      console.log(`Is Lot Time Passed: ${isLotTimePassed}`);
      console.log("Next Day Date: ", nextDay.format("DD-MM-YYYY"));

      if (isLotTimePassed) {
        // If lot time has passed, move to the next day
        console.log("You are inside the IF block (Lot time has passed)");
        const currentDate = nextDay.format("DD-MM-YYYY");
        console.log("Next Date (IST): " + currentDate);

        const currentDateObject = findCurrentDateObject(dataDate, currentDate);
        console.log("Next Day Play Data: ", JSON.stringify(currentDateObject));

        setResult(currentDateObject);
        setCurrentDate(currentDateObject);
        setSelectedDate(currentDateObject);

        if (currentDateObject !== "Current date not found") {
          console.log("Valid date object found");

          const maximumNumber = selectedLocation?.maximumNumber; // Ensure maximumNumber exists
          console.log("Maximum number: ", maximumNumber);

          if (maximumNumber) {
            const generatedArray = createLocationDataArray(maximumNumber);
            console.log("Generated Array: ", generatedArray);
            setBetnumberdata(generatedArray);
          }

          // Set to 'yes' if results are found
          setResult("yes");
          setShowPlay(false);
        }
      } else {
        // If lot time hasn't passed, handle current day
        console.log("You are inside the ELSE block (Lot time has not passed)");
        const currentDate = getCurrentDateInTimezone();
        console.log("Current Date in Timezone: " + currentDate);

        const currentDateObject = findCurrentDateObject(dataDate, currentDate);
        console.log("Today's Play Data: ", JSON.stringify(currentDateObject));

        setResult(currentDateObject);
        setCurrentDate(currentDateObject);
        setSelectedDate(currentDateObject);

        if (currentDateObject !== "Current date not found") {
          console.log("Valid date object found for today");

          const maximumNumber = selectedLocation?.maximumNumber; // Ensure maximumNumber exists
          console.log("Maximum number: ", maximumNumber);

          if (maximumNumber) {
            const generatedArray = createLocationDataArray(maximumNumber);
            console.log("Generated Array: ", generatedArray);
            setBetnumberdata(generatedArray);
          }

          // Set to 'yes' if results are found
          setResult("yes");
          setShowPlay(false);
        }
      }
    }
  }, [isLoadingDate, dataDate]);

  useEffect(() => {
    if (result) {
      console.log("Result LENGTH data :: " + JSON.stringify(result));
    }
  }, [result, showPlay]);

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

  useEffect(() => {
    console.log("reloadKey :: " + reloadKey);
    removeSelecteditemClick();
  }, [reloadKey]);

  const addingNumberForBetting = (number) => {
    console.log("ADDING NUMBER TO LIST");

    setSelectedNumber((prevSelectedNumbers) => {
      const updatedList = [...prevSelectedNumbers];

      const index = updatedList.indexOf(number);
      if (index > -1) {
        // Number is already present, remove it
        updatedList.splice(index, 1);
      } else {
        // Number is not present, add it
        updatedList.push(number);
      }

      console.log("SELECTED NUMBER :: ", updatedList);
      return updatedList;
    });
  };

  const showingSeletedContainer = () => {
    if (showSelectedVisible) {
      setshowSelectedVisible(false);
    } else {
      setshowSelectedVisible(true);
    }
  };

  const sumObjectValues = (obj) => {
    // Extract values, convert them to numbers, and sum them up
    return Object.values(obj)
      .map((value) => parseFloat(value)) // Convert each value to a number
      .reduce((sum, value) => sum + value, 0); // Sum them up
  };

  function canPlaceBet(walletBalanceStr, bettingAmountStr) {
    const walletBalance = parseFloat(walletBalanceStr);
    const bettingAmount = parseFloat(bettingAmountStr);

    if (isNaN(walletBalance) || isNaN(bettingAmount)) {
      throw new Error("Invalid input: Both inputs must be valid numbers.");
    }

    return walletBalance >= bettingAmount;
  }

  // USED TO GET SELECTED NUMBER WITH AMOUNT INVESTED
  const transformData = (inputValues, multiplier) => {
    return Object.entries(inputValues).map(([playnumber, amount]) => ({
      playnumber: parseInt(playnumber, 10),
      amount: parseFloat(amount),
      winningamount: winningAmountPrice(amount, multiplier),
    }));
  };

  const [createPlay, { isLoading: isPlayLoading, error: playError }] =
    useCreatePlayMutation();

  // TO CHECK THE AMOUNT IN EACH OF THE SELECTED NUMBER IS VALID
  const checkAmounOfSelectedNumberIsValid = (list) => {
    // Check if the object is empty
    if (Object.keys(list).length === 0) {
      return false;
    }

    // Check if any value is an empty string "" or "0"
    for (const key in list) {
      if (list[key] === "" || list[key] === "0") {
        return false;
      }
    }

    return true;
  };

  // const mineplaynum = parseInt(3);
  const mineplaynum = parseInt(selectedLocation?.bettinglimit);
  const [playnumberlimit, setplaynumberlimit] = useState(mineplaynum);

  // const {
  //   data: userplayhistory,
  //   error: userplayhistoryError,
  //   isLoading: userplayhistoryLoading,
  //   refetch: userplayhistoryRefetch,
  // } = useGetPlayHistoryQuery(accesstoken);

  const {
    data: userplayhistory,
    error: userplayhistoryError,
    isLoading: userplayhistoryLoading,
    refetch: userplayhistoryRefetch,
  } = useGetPlayHistoryQuery(
    {
      accesstoken,
      userId: user.userId,
      locationId: selectedLocation?._id,
      timeId: selectedTime?._id,
      dateId: selectedDate?._id,
    },
    {
      skip:
        !accesstoken ||
        selectedDate === null ||
        selectedTime === null ||
        selectedLocation === null,
    }
  );

  const limit = 3;

  const [playhistorydata, setPlayhistorydata] = useState([]);
  useEffect(() => {
    if (!userplayhistoryLoading && userplayhistory) {
      setPlayhistorydata(userplayhistory.playbets);
    }
  }, [userplayhistory, userplayhistoryLoading]);

  // useEffect(() => {
  //   console.log("SELECTED NUMBER :: LENTH ::", selectedNumber.length);
  //   console.log(playnumberlimit);
  //   if (currentDate && selectedTime && selectedLocation) {
  //     console.log(
  //       checkPlaybetLimit(
  //         playhistorydata,
  //         currentDate.lotdate,
  //         selectedTime.time ? selectedTime.time : selectedTime.lottime,
  //         selectedLocation.name
  //           ? selectedLocation.name
  //           : selectedLocation.lotlocation,
  //         mineplaynum
  //       )
  //     );
  //   }
  // }, [selectedNumber, currentDate, playhistorydata]);

  function checkPlaybetLimit(playbet, lotdate, lottime, lotlocation, limit) {
    console.log("Checking Playbet Limit");
    console.log(playbet.length, lotdate, lottime, lotlocation, limit);

    // Step 1: Filter the playbet array based on provided lotdate, lottime, and lotlocation
    const filteredArray = playbet.filter(
      (item) =>
        item.lotdate.lotdate === lotdate &&
        item.lottime.lottime === lottime &&
        item.lotlocation.lotlocation === lotlocation
    );

    console.log("Filtered array length :: ", filteredArray.length);

    // Step 2: Use a Set to store unique playnumbers from the filtered array
    const uniquePlaynumbers = new Set();
    filteredArray.forEach((item) => {
      item.playnumbers.forEach((playnumber) => {
        uniquePlaynumbers.add(playnumber.playnumber); // Add the playnumber value to the Set (not the whole object)
      });
    });

    const totalPlaynumbersCount = uniquePlaynumbers.size; // Get the size of the Set
    console.log("Total Playnumbers Count (unique) :: " + totalPlaynumbersCount);
    console.log("Unique Playnumbers :: ", Array.from(uniquePlaynumbers));

    const forplaycheck =
      parseInt(mineplaynum) - parseInt(totalPlaynumbersCount);
    console.log(
      "FOR PLAY CHECK :: " + forplaycheck,
      mineplaynum,
      totalPlaynumbersCount
    );

    setplaynumberlimit(forplaycheck);
    console.log(totalPlaynumbersCount <= limit);

    // Step 3: Check if the total count is equal to or less than the limit
    return totalPlaynumbersCount <= limit;
  }
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const submitHandler = async () => {
    setSubmitIsLoading(true);
    await userplayhistoryRefetch();
    if (sumObjectValues(inputValues) === 0) {
      showErrorToast("Add amount for bet");
      setSubmitIsLoading(false);
    } else if (
      !canPlaceBet(user.walletTwo.balance, sumObjectValues(inputValues))
    ) {
      showErrorToast("Insufficent Balance");
      setSubmitIsLoading(false);
    } else if (!checkAmounOfSelectedNumberIsValid(inputValues)) {
      showErrorToast("Add betting amount for all numbers");
      setSubmitIsLoading(false);
    } else {
      const now = moment.tz(user?.country?.timezone);
      console.log("Current Time: ", now.format("hh:mm A"));
      console.log("Current Date: ", now.format("DD-MM-YYYY"));

      const lotTimeMoment = moment.tz(
        getTimeAccordingToTimezone(selectedTime?.time, user?.country?.timezone),
        "hh:mm A",
        user?.country?.timezone
      );
      console.log(`Lot Time for location : ${lotTimeMoment.format("hh:mm A")}`);

      // Subtract 15 minutes from the lotTimeMoment
      const lotTimeMinus15Minutes = lotTimeMoment
        .clone()
        .subtract(10, "minutes");

      const isLotTimeClose =
        now.isSameOrAfter(lotTimeMinus15Minutes) && now.isBefore(lotTimeMoment);
      console.log(`Is it within 15 minutes of the lot time? ${isLotTimeClose}`);

      if (isLotTimeClose) {
        console.log("Navigating to PlayArena...");
        showWarningToast("Entry is close for this session");
        showWarningToast("Please choose next available time");
        setSubmitIsLoading(false);
      } else {
        try {
          console.log("SELECTED LOCATION", JSON.stringify(selectedLocation));
          console.log("SELECTED TIME", JSON.stringify(selectedTime));
          console.log("SELECTED DATE", JSON.stringify(selectedDate));
          console.log("SELECTED Current date", JSON.stringify(currentDate));

          const body = {
            playnumbers: transformData(
              inputValues,
              selectedLocation.maximumReturn
            ),
            lotdate: currentDate._id,
            lottime: selectedTime?._id,
            lotlocation: selectedLocation?._id,
          };

          console.log("Request body :: " + JSON.stringify(body));

          const res = await createPlay({
            accessToken: accesstoken,
            body,
          }).unwrap();
          console.log("Create Play res :: " + JSON.stringify(res));

          if (res.message === "Playbet entry added successfully") {
            showSuccessToast("Order Placed Successfully");
          }

          setInputValues({});
          dispatch(loadProfile(accesstoken));
          await userplayhistoryRefetch();
          // removeSelecteditemClick();
          hideSubmitContainer();
          setSubmitItemFlag(false);
          setSubmitIsLoading(false);
        } catch (error) {
          console.log("Error during withdraw:", error);
          showErrorToast("Something went wrong");
          setSubmitIsLoading(false);
        }
      }
    }
  };

  function addLeadingZero(value) {
    // Convert the input to a string to handle both string and number inputs
    const stringValue = value.toString();

    // Check if the value is between 1 and 9 (inclusive) and add a leading zero
    if (
      stringValue.length === 1 &&
      parseInt(stringValue) >= 1 &&
      parseInt(stringValue) <= 9
    ) {
      return "0" + stringValue;
    }

    // If the value is 10 or more, return it as is
    return stringValue;
  }

  // // const getNextTimeForHighlights = (times) => {
  // //   if (times.length === 1) {
  // //     return times[0];
  // //   }

  // //   const currentISTTime = moment().tz(user?.country?.timezone).format("hh:mm A");
  // //   const sortedTimes = [...times].sort((a, b) =>
  // //     moment(a.time, "hh:mm A").diff(moment(b.time, "hh:mm A"))
  // //   );

  // //   for (let i = 0; i < sortedTimes.length; i++) {
  // //     if (
  // //       moment(currentISTTime, "hh:mm A").isBefore(
  // //         moment(sortedTimes[i].time, "hh:mm A")
  // //       )
  // //     ) {
  // //       return sortedTimes[i];
  // //     }
  // //   }

  // //   return sortedTimes[0];
  // // };

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

  return (
    <div className="main-content-container-all-location">
      {/** Location and time */}

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

          <div className="allocationcontainer-all">
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
                          {extractMultiplerFromLocation(item.limit)} Win
                        </span>
                      </div>
                    </div>
                    {/* 
                    <div className="time-items-container">
                      {item.times.map((timedata, timeindex) => {
                        return (
                          <div
                            onClick={() =>
                              handleSelecteditemClick(item, timedata)
                            }
                            className={`time-item ${
                              timedata.time === nextTime.time
                                ? "highlighted"
                                : ""
                            }`}
                            key={timeindex}
                          >
                            <span className="time-items-container-time-label">
                              {getTimeAccordingToTimezone(
                                timedata.time,
                                user?.country?.timezone
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div> */}
                    <div className="time-items-container">
                      {/* First sort the times, then map through them */}
                      {[...item.times]
                        .sort((a, b) => {
                          // Helper function to convert time to minutes for comparison
                          const timeToMinutes = (timeStr) => {
                            const [time, period] = timeStr.split(" ");
                            const [hours, minutes] = time
                              .split(":")
                              .map(Number);
                            let total = hours * 60 + minutes;
                            if (period === "PM" && hours !== 12)
                              total += 12 * 60;
                            if (period === "AM" && hours === 12)
                              total -= 12 * 60;
                            return total;
                          };

                          return timeToMinutes(a.time) - timeToMinutes(b.time);
                        })
                        .map((timedata, timeindex) => (
                          <div
                            onClick={() =>
                              handleSelecteditemClick(item, timedata)
                            }
                            className={`time-item ${
                              timedata.time === nextTime.time
                                ? "highlighted"
                                : ""
                            }`}
                            key={timeindex}
                          >
                            <span className="time-items-container-time-label">
                              {getTimeAccordingToTimezone(
                                timedata.time,
                                user?.country?.timezone
                              )}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/** date */}

      {selectedLocation &&
        selectedTime &&
        !selectedItem &&
        !submitItemFlag &&
        (showPlay ? (
          <LoadingComponent />
        ) : result === "Current date not found" ? (
          <div className="alllocationdatecontainer">
            <div className="play-title-container">
              <div className="play-title-container-left">
                <span className="titleLabel">{selectedLocation.name}</span>
                <span className="titleLabel">{selectedLocation.limit}</span>
                <span className="titleLabel">
                  {getTimeAccordingToTimezone(
                    selectedTime.time,
                    user?.country?.timezone
                  )}
                </span>
                <div
                  className="back-container"
                  onClick={() => removeSelecteditemClick()}
                >
                  <RxCrossCircled color={COLORS.red} size={"3rem"} />
                </div>
              </div>
            </div>

            {/** Play Number container */}

            <div className="playconatainer">
              <div className="playcontainer-content">
                <NodataFound title={"No Game Available today"} />
              </div>
            </div>
          </div>
        ) : (
          <div className="alllocationdatecontainer">
            <div className="play-title-container">
              <div className="play-title-container-left">
                <span className="titleLabel">{selectedLocation.name}</span>
                <span className="titleLabel">{selectedLocation.limit}</span>
                <span className="titleLabel">
                  {getTimeAccordingToTimezone(
                    selectedTime.time,
                    user?.country?.timezone
                  )}
                </span>
                <span className="titleLabel">
                  {/* {selectedDate?.lotdate} */}
                  {getDateTimeAccordingToUserTimezone(
                    selectedTime.time,
                    selectedDate?.lotdate,
                    user?.country?.timezone
                  )
                    ? getDateTimeAccordingToUserTimezone(
                        selectedTime.time,
                        selectedDate?.lotdate,
                        user?.country?.timezone
                      )
                    : "loading"}
                </span>
                <div
                  className="back-container"
                  onClick={() => removeSelecteditemClick()}
                >
                  <RxCrossCircled color={COLORS.red} size={"3rem"} />
                </div>
              </div>
            </div>

            {/** Play Number container */}

            <div className="playconatainer">
              <div className="playcontainer-content">
                {betnumberdata?.map((item, index) => (
                  <div
                    onClick={() => addSelectedNumber(item)}
                    className="play-content"
                    key={index}
                  >
                    <div
                      className="play-content-halfcontainer"
                      style={{
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
                        background: selectedNumber.some(
                          (selected) => selected.id === item.id
                        )
                          ? "linear-gradient(180deg, #7EC630, #3D6017)"
                          : "linear-gradient(180deg, #1792fe, #1792fe)",
                      }}
                    >
                      <span className="seletedLabel">
                        {selectedNumber.includes(item) ? "Selected" : "Select"}
                      </span>
                      <div className="play-content-number-con">
                        <span className="play-content-number">
                          {addLeadingZero(item.name)}
                        </span>
                      </div>

                      <div className="numberbgstyle"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/** Confirm Container */}
            <div className="playcontainer-bottomcontent">
              {selectedNumber.length !== 0 && !showSelectedVisible && (
                <div
                  className="playcontainer-bottomcontent-container"
                  onClick={() => showSubmitContainer()}
                >
                  <span className="confirmL">Confirm</span>
                </div>
              )}
            </div>
          </div>
        ))}

      {submitItemFlag && (
        <div className="alllocation-submit-container">
          <div className="alllocation-submit-container-left">
            {/** TOP TITLE CONTAINER */}
            <div className="alllocation-submit-container-left-top">
              <span className="alllocation-submit-container-left-top-label">
                Selected Number
              </span>
              <span
                className="alllocation-submit-container-left-top-label"
                style={{ flex: 2 }}
              >
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
                <div
                  key={index.toString()}
                  className="alllocation-submit-container-left-content-container"
                >
                  {/** LEFT CONTENT */}
                  <div className="alllocation-submit-container-left-content-container-left">
                    <label className="selectedNL">
                      {addLeadingZero(item.name)}
                    </label>
                  </div>

                  {/** MIDDLE CONTENT */}
                  <div className="alllocation-submit-container-left-content-container-middle">
                    <div
                      className="alllocation-submit-container-left-content-container-middle-left"
                      onClick={() => handleRemoveClick(item.id)}
                    >
                      <div className="alllocation-submit-container-left-content-container-middle-left-containter">
                        <CiCircleMinus
                          size={"3rem"}
                          color={COLORS.background}
                        />
                      </div>
                    </div>
                    <div className="alllocation-submit-container-left-content-container-middle-middle">
                      <input
                        className="amountInput"
                        type="number"
                        placeholder="Amount"
                        inputMode="numeric"
                        value={inputValues[item.id]?.toString() || ""}
                        onChange={(event) => handleInputChange(event, item.id)}
                      />
                    </div>
                    <div
                      className="alllocation-submit-container-left-content-container-middle-right"
                      onClick={() => handleAddClick(item.id)}
                    >
                      <div className="alllocation-submit-container-left-content-container-middle-left-containter">
                        <CiCirclePlus size={"3rem"} color={COLORS.background} />
                      </div>
                    </div>
                  </div>

                  {/** RIGHT CONTENT */}
                  <div className="alllocation-submit-container-left-content-container-left">
                    <label className="selectedNL">
                      {/* {isNaN(
                          winningAmountPrice(
                            inputValues[item.id]?.toString(),
                            result?.lottime?.lotlocation?.maximumReturn
                          )
                        )
                          ? 0
                          : winningAmountPrice(
                              inputValues[item.id]?.toString(),
                              result?.lottime?.lotlocation?.maximumReturn
                            )} */}
                      {isNaN(
                        winningAmountPrice(
                          inputValues[item.id]?.toString(),
                          selectedLocation.maximumReturn
                        )
                      )
                        ? 0
                        : winningAmountPrice(
                            inputValues[item.id]?.toString(),
                            selectedLocation.maximumReturn
                          )}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="alllocation-submit-container-total">
              <span className="alllocation-submit-container-left-top-label">
                Total Amount
              </span>
              <span className="alllocation-submit-container-left-top-label">
                {sumObjectValues(inputValues)}
              </span>
            </div>
          </div>

          {/** RIGHT CONTAINER */}
          <div className="alllocation-submit-container-right">
            <div
              style={{
                flex: 1,
                width: "100%",
                height: "50%",
              }}
            >
              {/** Top Container */}
              <div className="play-title-container">
                <div
                  className="play-title-container-left"
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <span className="titleLabel">{selectedLocation.name}</span>
                  <div
                    className="back-container"
                    onClick={() => hideSubmitContainer()}
                  >
                    <RxCrossCircled color={COLORS.red} size={"3rem"} />
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
              {isPlayLoading || submitIsLoading ? (
                <LoadingComponent />
              ) : (
                <div
                  onClick={submitHandler}
                  style={{
                    width: "90%",
                    backgroundColor: COLORS.green,
                    padding: "2rem",
                    borderRadius: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <label
                    style={{
                      color: COLORS.white_s,
                      fontFamily: FONT.Montserrat_Bold,
                      fontSize: "2rem",
                      cursor: "pointer",
                    }}
                  >
                    Submit
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Play;

// import React, { useCallback, useEffect, useState } from "react";
// import FONT from "../../assets/constants/fonts";
// import "./Play.css";
// import COLORS from "../../assets/constants/colors";
// import images from "../../assets/constants/images";
// import { RxCrossCircled } from "react-icons/rx";
// import { CiCircleMinus } from "react-icons/ci";
// import { CiCirclePlus } from "react-icons/ci";
// import {  useDispatch, useSelector } from "react-redux";
// import { getDateAccordingToLocationAndTime } from "../../redux/actions/dateAction";
// import { loadProfile } from "../../redux/actions/userAction";
// import {
//   useCreatePlayMutation,
//   useGetAllLocationWithTimeQuery,
//   useGetDateAccToLocTimeQuery,
// } from "../../redux/api";
// import { ToastContainer } from "react-toastify";
// import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
// import { LoadingComponent } from "../helper/LoadingComponent";
// import { getTimeAccordingToTimezone } from "../alllocation/AllLocation";
// import UrlHelper from "../../helper/UrlHelper";
// import axios from "axios";
// import { NodataFound } from "../helper/NodataFound";

// const getCurrentDate = () => {
//   const today = new Date();
//   const day = String(today.getDate()).padStart(2, "0");
//   const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
//   const year = today.getFullYear();
//   return `${day}-${month}-${year}`;
// };
// const findCurrentDateObject = (data) => {
//   console.log("Checking for the current date is availble in the database");
//   const currentDate = getCurrentDate();

//   console.log("current data : " + currentDate);
//   const lotdates = data.lotdates || [];

//   const found = lotdates.find((item) => item.lotdate === currentDate);

//   return found ? found : "Current date not found";
// };
// const createLocationDataArray = (maximumNumber) => {
//   return Array.from({ length: maximumNumber }, (_, index) => ({
//     id: index + 1,
//     name: `${index + 1}`,
//   }));
// };

// function Play() {
//   const { user, accesstoken } = useSelector((state) => state.user);

//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(true);
//   const [submitItemFlag, setSubmitItemFlag] = useState(false);
//   const [selectedNumber, setSelectedNumber] = useState([]);

//   const addSelectedNumber = (number) => {
//     console.log("ADDING NUMBER TO LIST");

//     setSelectedNumber((prevSelectedNumbers) => {
//       const updatedList = [...prevSelectedNumbers];

//       const index = updatedList.indexOf(number);
//       if (index > -1) {
//         // Number is already present, remove it
//         updatedList.splice(index, 1);
//       } else {
//         // Number is not present, add it
//         updatedList.push(number);
//       }

//       console.log("SELECTED NUMBER :: ", updatedList);
//       return updatedList;
//     });
//   };

//   const showSubmitContainer = () => {
//     setSubmitItemFlag(true);
//   };

//   const hideSubmitContainer = () => {
//     setSubmitItemFlag(false);
//   };

//   const playdata = [];

//   for (let i = 1; i <= 100; i++) {
//     playdata.push({ number: i.toString(), id: i });
//   }

//   useEffect(() => {
//     console.log(
//       "Selected item location :: " + JSON.stringify(selectedLocation)
//     );
//     console.log("Selected item time :: " + JSON.stringify(selectedLocation));
//   }, [selectedItem, selectedLocation]);

//   // ######################
//   //  STARTED
//   // ######################

//   const dispatch = useDispatch();

//   const handleLocationClick = (location) => {
//     setSelectedLocation(location);
//   };

//   const handleSelecteditemClick = (item, timedata) => {
//     setSelectedItem(false);
//     setSelectedLocation(item);
//     setSelectedTime(timedata);

//     dispatch(
//       getDateAccordingToLocationAndTime(accesstoken, timedata._id, item._id)
//     );
//   };

//   const removeSelecteditemClick = () => {
//     setSelectedItem(true);
//     setSelectedLocation(null);
//     setSelectedTime(null);
//     setResult(null);
//     setCurrentDate(null);
//     setSelectedNumber([]);
//   };

//   useEffect(() => {
//     // console.log(
//     //   "Selected item location :: " + JSON.stringify(selectedLocation)
//     // );
//     console.log("Selected item time :: " + JSON.stringify(selectedTime));
//   }, [selectedItem, selectedLocation]);

//   const [alldatafiler, setalldatafilter] = useState([]);
//   const [selectedFilter, setSelectedFilter] = useState(null);

//   useEffect(() => {
//     dispatch(loadProfile(accesstoken));
//   }, []);

//   const { data, error, isLoading } =
//     useGetAllLocationWithTimeQuery(accesstoken);

//   // FOR ALL FILTER TYPE DATA
//   useEffect(() => {
//     console.log("STARTING FOUND DATA :: ");
//     if (!isLoading && data) {
//       console.log("found data", data);
//       const uniqueItems = new Set();
//       const filtertype = [{ _id: "123", maximumReturn: "All" }]; // Default element

//       data.locationData.forEach((item) => {
//         const key = item.maximumReturn;
//         if (!uniqueItems.has(key)) {
//           uniqueItems.add(key);
//           filtertype.push({ _id: item._id, maximumReturn: item.maximumReturn });
//         }
//       });

//       // Sorting the filtertype array
//       filtertype.sort((a, b) => {
//         if (a.maximumReturn === "All") return -1;
//         if (b.maximumReturn === "All") return 1;
//         const aReturn = parseFloat(a.maximumReturn.replace("x", ""));
//         const bReturn = parseFloat(b.maximumReturn.replace("x", ""));
//         return aReturn - bReturn;
//       });

//       setalldatafilter(filtertype);
//       setSelectedFilter(filtertype[0]._id);

//       console.log(filtertype);
//     }
//   }, [isLoading, data]);

//   const settingFilterData = (itemf) => {
//     setSelectedFilter(itemf._id);
//     if (itemf.maximumReturn.toLowerCase() === "all") {
//       setFilteredData(data?.locationData);
//     } else {
//       const filtered = data?.locationData.filter((item) =>
//         item.maximumReturn
//           .toLowerCase()
//           .includes(itemf.maximumReturn.toLowerCase())
//       );
//       setFilteredData(filtered);
//     }
//   };

//   const [filteredData, setFilteredData] = useState([]);

//   useEffect(() => {
//     setFilteredData(data?.locationData); // Update filteredData whenever locations change
//   }, [data]);

//   const [betnumberdata, setBetnumberdata] = useState([]);
//   const [showSelectedVisible, setshowSelectedVisible] = useState(false);
//   const [inputValues, setInputValues] = useState({});

//   const handleInputChange = (event, id) => {
//     const text = event.target.value;
//     console.log("HANDLING INPUT :: " + text, id);
//     setInputValues((prevValues) => ({
//       ...prevValues,
//       [id]: text,
//     }));
//   };

//   const addAmountForInput = (id) => {
//     setInputValues((prevValues) => {
//       // Get the current amount, default to 0 if not present
//       const currentAmount = parseInt(prevValues[id] || "0", 10);
//       // Add 10 to the current amount and convert it back to a string
//       return {
//         ...prevValues,
//         [id]: (currentAmount + 10).toString(),
//       };
//     });
//   };

//   const removeAmountForInput = (id) => {
//     console.log("Removing :: " + id);
//     setInputValues((prevValues) => {
//       // Get the current amount, default to 0 if not present
//       const currentAmount = parseInt(prevValues[id] || "0", 10);

//       // If the current amount is 0 or less, return 0
//       if (currentAmount <= 0) {
//         return {
//           ...prevValues,
//           [id]: "0",
//         };
//       }

//       // Subtract 10 from the current amount and convert it back to a string
//       return {
//         ...prevValues,
//         [id]: (currentAmount - 10).toString(),
//       };
//     });
//   };

//   const handleAddClick = (id) => {
//     addAmountForInput(id);
//   };
//   const handleRemoveClick = (id) => {
//     removeAmountForInput(id);
//   };
//   const winningAmountPrice = (str1, str2) => {
//     console.log("WINNING AMOUNT ::  ", str1, " :: ", str2);

//     // Convert the first string to a number
//     const number1 = parseFloat(str1);

//     // Extract numeric part from the second string
//     // Remove any whitespace and convert to lowercase for uniformity
//     const cleanedStr2 = str2.trim().toLowerCase();

//     // Find the position of 'x' or 'X' in the second string
//     const xIndex = cleanedStr2.indexOf("x");

//     // If 'x' or 'X' is found, extract the part before it and convert to a number
//     const number2 =
//       xIndex !== -1 ? parseFloat(cleanedStr2.substring(0, xIndex)) : 0;

//     // Multiply the two numbers
//     const result = number1 * number2;

//     return result;
//   };

//   // FOR CHECKING CURRENTDATE IS AVAILABLE FOR PLAY

//   const {
//     data: dataDate,
//     error: errorDate,
//     isLoading: isLoadingDate,
//     refetch: refetchDate,
//   } = useGetDateAccToLocTimeQuery({
//     accessToken: accesstoken,
//     lottimeId: selectedTime?._id,
//     lotlocationId: selectedLocation?._id,
//   });

//   const [result, setResult] = useState(null);
//   const [currentDate, setCurrentDate] = useState(null);
//   const [showPlay, setShowPlay] = useState(false);

//   // useEffect(() => {
//   //   if (!isLoadingDate && dataDate) {
//   //     console.log("GETTING LOCATION AND TIME ID");
//   //     console.log("LOCATION ID : " + selectedLocation?._id);
//   //     console.log("TIME ID : " + selectedTime?._id);
//   //     console.log("All Date length :: " + dataDate.lotdates.length);
//   //     console.log("All Date :: " + JSON.stringify(dataDate));
//   //     const currentDateObject = findCurrentDateObject(dataDate);
//   //     setResult(currentDateObject);

//   //     console.log("Today Play :: " + JSON.stringify(result));

//   //     if (result !== "Current date not found") {
//   //       console.log(" result !==  Current date not found ");
//   //       // const maximumNumber = locationdata.maximumNumber; // Ensure `maximumNumber` exists in the data
//   //       const maximumNumber = result?.lottime?.lotlocation?.maximumNumber; // Ensure `maximumNumber` exists in the data
//   //       console.log("Maximum number :: " + maximumNumber);
//   //       if (maximumNumber) {
//   //         const generatedArray = createLocationDataArray(maximumNumber);
//   //         setBetnumberdata(generatedArray);
//   //         console.log(generatedArray);
//   //       }
//   //     }
//   //   }
//   // }, [isLoadingDate, dataDate, result]);

//   const getResultAccordingToLocationTimeDate = async (
//     lotdateId,
//     lottimeId,
//     lotlocationId
//   ) => {
//     try {
//       const url = `${UrlHelper.RESULT_API}?lotdateId=${lotdateId}&lottimeId=${lottimeId}&lotlocationId=${lotlocationId}`;
//       console.log("URL :: " + url);

//       const { data } = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${accesstoken}`,
//         },
//       });

//       console.log("ACTION result length :: " + data.results.length);
//       console.log("ACTION result :: " + JSON.stringify(data.results));

//       // Check if the results array is empty
//       if (data.results.length !== 0) {
//         console.log("Setting to Result IF :: " + "Current date not found");
//         setResult("Current date not found");
//       } else {
//         console.log("Setting to Result ELSE :: " + JSON.stringify(currentDate));
//         console.log(
//           "Setting to Location ELSE :: " +
//             JSON.stringify(selectedLocation.maximumNumber)
//         );
//         const maximumNumber = selectedLocation.maximumNumber; // Ensure `maximumNumber` exists in the data
//         if (maximumNumber) {
//           const generatedArray = createLocationDataArray(maximumNumber);
//           setBetnumberdata(generatedArray);
//         }
//         setResult("yes"); // Set to the current date object if results are found
//       }
//       setShowPlay(false);
//     } catch (error) {
//       setShowPlay(false);
//       console.log(error);
//       console.log("Error message:", error.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     if (!isLoadingDate && dataDate) {
//       setShowPlay(true);
//       const currentDateObject = findCurrentDateObject(dataDate);
//       setResult(currentDateObject);
//       setCurrentDate(currentDateObject);
//       setSelectedDate(currentDateObject);

//       console.log("Today Play :: " + JSON.stringify(currentDateObject));

//       if (currentDateObject !== "Current date not found") {
//         console.log('result !== "Current date not found"');

//         const maximumNumber = result?.lottime?.lotlocation?.maximumNumber; // Ensure `maximumNumber` exists in the data
//         if (maximumNumber) {
//           const generatedArray = createLocationDataArray(maximumNumber);
//           setBetnumberdata(generatedArray);
//         }

//         console.log("GETTING THE DATA TO GET THE RESULT");
//         console.log(
//           "Date ID " + currentDateObject._id,
//           " :: " + currentDateObject.lotdate
//         );
//         console.log(
//           "Time ID " + currentDateObject?.lottime?._id,
//           " :: " + currentDateObject?.lottime?.lottime
//         );
//         console.log(
//           "Result ID " +
//             currentDateObject?.lottime?.lotlocation?._id +
//             " :: " +
//             currentDateObject?.lottime?.lotlocation?.lotlocation
//         );

//         // Fetch results using the API function
//         getResultAccordingToLocationTimeDate(
//           currentDateObject._id,
//           currentDateObject?.lottime?._id,
//           currentDateObject?.lottime?.lotlocation?._id
//         );
//       }
//     }
//   }, [isLoadingDate, dataDate]);

//   useEffect(() => {
//     if (result) {
//       console.log("Result LENGTH data :: " + JSON.stringify(result));
//     }
//   }, [result, showPlay]);

//   // useEffect(
//   //   useCallback(() => {
//   //     // Refetch the data when the screen is focused
//   //     refetchDate();
//   //   }, [refetchDate])
//   // );

//   const addingNumberForBetting = (number) => {
//     console.log("ADDING NUMBER TO LIST");

//     setSelectedNumber((prevSelectedNumbers) => {
//       const updatedList = [...prevSelectedNumbers];

//       const index = updatedList.indexOf(number);
//       if (index > -1) {
//         // Number is already present, remove it
//         updatedList.splice(index, 1);
//       } else {
//         // Number is not present, add it
//         updatedList.push(number);
//       }

//       console.log("SELECTED NUMBER :: ", updatedList);
//       return updatedList;
//     });
//   };

//   const showingSeletedContainer = () => {
//     if (showSelectedVisible) {
//       setshowSelectedVisible(false);
//     } else {
//       setshowSelectedVisible(true);
//     }
//   };

//   const sumObjectValues = (obj) => {
//     // Extract values, convert them to numbers, and sum them up
//     return Object.values(obj)
//       .map((value) => parseFloat(value)) // Convert each value to a number
//       .reduce((sum, value) => sum + value, 0); // Sum them up
//   };

//   function canPlaceBet(walletBalanceStr, bettingAmountStr) {
//     const walletBalance = parseFloat(walletBalanceStr);
//     const bettingAmount = parseFloat(bettingAmountStr);

//     if (isNaN(walletBalance) || isNaN(bettingAmount)) {
//       throw new Error("Invalid input: Both inputs must be valid numbers.");
//     }

//     return walletBalance >= bettingAmount;
//   }

//   // USED TO GET SELECTED NUMBER WITH AMOUNT INVESTED
//   const transformData = (inputValues, multiplier) => {
//     return Object.entries(inputValues).map(([playnumber, amount]) => ({
//       playnumber: parseInt(playnumber, 10),
//       amount: parseFloat(amount),
//       winningamount: winningAmountPrice(amount, multiplier),
//     }));
//   };

//   const [createPlay, { isLoading: isPlayLoading, error: playError }] =
//     useCreatePlayMutation();

//   // TO CHECK THE AMOUNT IN EACH OF THE SELECTED NUMBER IS VALID
//   const checkAmounOfSelectedNumberIsValid = (list) => {
//     // Check if the object is empty
//     if (Object.keys(list).length === 0) {
//       return false;
//     }

//     // Check if any value is an empty string "" or "0"
//     for (const key in list) {
//       if (list[key] === "" || list[key] === "0") {
//         return false;
//       }
//     }

//     return true;
//   };

//   const submitHandler = async () => {
//     if (sumObjectValues(inputValues) === 0) {
//       showErrorToast("Add amount for bet");
//     } else if (
//       !canPlaceBet(user.walletTwo.balance, sumObjectValues(inputValues))
//     ) {
//       showErrorToast("Insufficent Balance");
//     } else if (!checkAmounOfSelectedNumberIsValid(inputValues)) {
//       showErrorToast("Add betting amount for all numbers");
//     } else {
//       try {

//         console.log("SELECTED LOCATION",JSON.stringify(selectedLocation))
//         console.log("SELECTED TIME",JSON.stringify(selectedTime))
//         console.log("SELECTED DATE",JSON.stringify(selectedDate))
//         console.log("SELECTED Current date",JSON.stringify(currentDate))

//         const body = {
//           playnumbers: transformData(
//             inputValues,
//             selectedLocation.maximumReturn
//           ),
//           lotdate: currentDate._id,
//           lottime: selectedTime?._id,
//           lotlocation: selectedLocation?._id,
//         };

//         console.log("Request body :: " + JSON.stringify(body));

//         const res = await createPlay({
//           accessToken: accesstoken,
//           body,
//         }).unwrap();
//         console.log("Create Play res :: " + JSON.stringify(res));

//         if (res.message === "Playbet entry added successfully") {
//           showSuccessToast("Order Placed Successfully");
//         }

//         setInputValues({})

//         // removeSelecteditemClick();
//         hideSubmitContainer()
//         setSubmitItemFlag(false);
//       } catch (error) {
//         console.log("Error during withdraw:", error);
//         showErrorToast("Something went wrong");
//       }
//     }
//   };

//   function addLeadingZero(value) {
//     // Convert the input to a string to handle both string and number inputs
//     const stringValue = value.toString();

//     // Check if the value is between 1 and 9 (inclusive) and add a leading zero
//     if (
//       stringValue.length === 1 &&
//       parseInt(stringValue) >= 1 &&
//       parseInt(stringValue) <= 9
//     ) {
//       return "0" + stringValue;
//     }

//     // If the value is 10 or more, return it as is
//     return stringValue;
//   }

//   return (
//     <div className="main-content-container-all-location">
//       {/** Location and time */}

//       {selectedItem && (
//         <>
//           {/** Filter container */}
//           <div className="filtercontaineral">
//             {alldatafiler.map((item, index) => (
//               <div
//                 className="filtercontental"
//                 onClick={() => settingFilterData(item)}
//                 key={item._id}
//                 style={{
//                   borderColor:
//                     selectedFilter === item._id ? COLORS.green : "transparent", // Use transparent for no border
//                   borderWidth: "2px",
//                   borderStyle: selectedFilter === item._id ? "solid" : "none", // Apply border style conditionally
//                 }}
//               >
//                 <label className="filtercontentalLabel">
//                   {item.maximumReturn}
//                 </label>
//               </div>
//             ))}
//           </div>

//           {/** Location container */}

//           <div className="allocationcontainer-all">
//             {isLoading ? (
//               <LoadingComponent />
//             ) : (
//               filteredData?.map((item, index) => (
//                 <div className="location-item-all" key={index}>
//                   <div className="location-details-all">
//                     <div
//                       className="location-header"
//                       style={{
//                         background:
//                           index % 2 === 0
//                             ? "linear-gradient(90deg, #1993FF, #0F5899)"
//                             : "linear-gradient(90deg, #7EC630, #3D6017)",
//                       }}
//                     >
//                       <span className="location-header-label">{item.name}</span>
//                       <span className="location-header-max-label">
//                         Max {item.limit}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="time-items-container">
//                     {item.times.map((timedata, timeindex) => (
//                       <div
//                         onClick={() => handleSelecteditemClick(item, timedata)}
//                         className="time-item"
//                         key={timeindex}
//                       >
//                         <span className="time-items-container-time-label">
//                           {getTimeAccordingToTimezone(
//                             timedata.time,
//                             user?.country?.timezone
//                           )}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </>
//       )}

//       {/** date */}

//       {selectedLocation &&
//         selectedTime &&
//         !selectedItem &&
//         !submitItemFlag &&
//         (showPlay ? (
//           <LoadingComponent />
//         ) : result === "Current date not found" ? (
//           <div className="alllocationdatecontainer">
//             <div className="play-title-container">
//               <div className="play-title-container-left">
//                 <span className="titleLabel">{selectedLocation.name}</span>
//                 <span className="titleLabel">{selectedLocation.limit}</span>
//                 <span className="titleLabel">
//                   {getTimeAccordingToTimezone(
//                     selectedTime.time,
//                     user?.country?.timezone
//                   )}
//                 </span>
//                 <div
//                   className="back-container"
//                   onClick={() => removeSelecteditemClick()}
//                 >
//                   <RxCrossCircled color={COLORS.red} size={"3rem"} />
//                 </div>
//               </div>
//             </div>

//             {/** Play Number container */}

//             <div className="playconatainer">
//               <div className="playcontainer-content">
//                 <NodataFound title={"No Game Available today"} />
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="alllocationdatecontainer">
//             <div className="play-title-container">
//               <div className="play-title-container-left">
//                 <span className="titleLabel">{selectedLocation.name}</span>
//                 <span className="titleLabel">{selectedLocation.limit}</span>
//                 <span className="titleLabel">
//                   {getTimeAccordingToTimezone(
//                     selectedTime.time,
//                     user?.country?.timezone
//                   )}
//                 </span>
//                 <span className="titleLabel">{selectedDate?.lotdate}</span>
//                 <div
//                   className="back-container"
//                   onClick={() => removeSelecteditemClick()}
//                 >
//                   <RxCrossCircled color={COLORS.red} size={"3rem"} />
//                 </div>
//               </div>
//             </div>

//             {/** Play Number container */}

//             <div className="playconatainer">
//               <div className="playcontainer-content">
//                 {betnumberdata?.map((item, index) => (
//                   <div
//                     onClick={() => addSelectedNumber(item)}
//                     className="play-content"
//                     key={index}
//                   >
//                     <div
//                       className="play-content-halfcontainer"
//                       style={{
//                         background: selectedNumber.some(
//                           (selected) => selected.id === item.id
//                         )
//                           ? "linear-gradient(180deg, #7EC630, #FFFFFF)"
//                           : "linear-gradient(180deg, #1993FF, #FFFFFF)",
//                       }}
//                     ></div>
//                     <div
//                       className="play-content-fullcontainer"
//                       style={{
//                         background: selectedNumber.some(
//                           (selected) => selected.id === item.id
//                         )
//                           ? "linear-gradient(180deg, #7EC630, #3D6017)"
//                           : "linear-gradient(180deg, #1993FF, #0F5899)",
//                       }}
//                     >
//                       <span className="seletedLabel">
//                         {selectedNumber.includes(item) ? "Selected" : "Select"}
//                       </span>
//                       <div className="play-content-number-con">
//                         <span className="play-content-number">
//                           {addLeadingZero(item.name)}
//                         </span>
//                       </div>

//                       <div className="numberbgstyle"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/** Confirm Container */}
//             <div className="playcontainer-bottomcontent">
//               {selectedNumber.length !== 0 && !showSelectedVisible && (
//                 <div
//                   className="playcontainer-bottomcontent-container"
//                   onClick={() => showSubmitContainer()}
//                 >
//                   <span className="confirmL">Confirm</span>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}

//       {submitItemFlag && (
//           <div className="alllocation-submit-container">
//             <div className="alllocation-submit-container-left">
//               {/** TOP TITLE CONTAINER */}
//               <div className="alllocation-submit-container-left-top">
//                 <span className="alllocation-submit-container-left-top-label">
//                   Selected Number
//                 </span>
//                 <span
//                   className="alllocation-submit-container-left-top-label"
//                   style={{ flex: 2 }}
//                 >
//                   Amount
//                 </span>
//                 <span className="alllocation-submit-container-left-top-label">
//                   You Win
//                 </span>
//               </div>

//               {/** CONTENT CONTAINER */}
//               <div className="alllocation-submit-container-left-container">
//                 {/** ALL SELECTED NUMBERS */}

//                 {selectedNumber.map((item, index) => (
//                   <div
//                   key={index.toString()}
//                   className="alllocation-submit-container-left-content-container">
//                     {/** LEFT CONTENT */}
//                     <div className="alllocation-submit-container-left-content-container-left">
//                       <label className="selectedNL">{addLeadingZero(item.name)}</label>
//                     </div>

//                     {/** MIDDLE CONTENT */}
//                     <div className="alllocation-submit-container-left-content-container-middle">
//                       <div
//                         className="alllocation-submit-container-left-content-container-middle-left"
//                         onClick={() => handleRemoveClick(item.id)}
//                       >
//                         <div className="alllocation-submit-container-left-content-container-middle-left-containter">
//                           <CiCircleMinus
//                             size={"3rem"}
//                             color={COLORS.background}
//                           />
//                         </div>
//                       </div>
//                       <div className="alllocation-submit-container-left-content-container-middle-middle">
//                         <input
//                           className="amountInput"
//                           type="number"
//                           placeholder="Amount"
//                           inputMode="numeric"
//                           value={inputValues[item.id]?.toString() || ""}
//                           onChange={(event) =>
//                             handleInputChange(event, item.id)
//                           }
//                         />
//                       </div>
//                       <div
//                         className="alllocation-submit-container-left-content-container-middle-right"
//                         onClick={() => handleAddClick(item.id)}
//                       >
//                         <div className="alllocation-submit-container-left-content-container-middle-left-containter">
//                           <CiCirclePlus
//                             size={"3rem"}
//                             color={COLORS.background}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/** RIGHT CONTENT */}
//                     <div className="alllocation-submit-container-left-content-container-left">
//                       <label className="selectedNL">
//                         {/* {isNaN(
//                           winningAmountPrice(
//                             inputValues[item.id]?.toString(),
//                             result?.lottime?.lotlocation?.maximumReturn
//                           )
//                         )
//                           ? 0
//                           : winningAmountPrice(
//                               inputValues[item.id]?.toString(),
//                               result?.lottime?.lotlocation?.maximumReturn
//                             )} */}
//                               {isNaN(
//                             winningAmountPrice(
//                               inputValues[item.id]?.toString(),
//                               selectedLocation.maximumReturn,
//                             ),
//                           )
//                             ? 0
//                             : winningAmountPrice(
//                                 inputValues[item.id]?.toString(),
//                                 selectedLocation.maximumReturn,
//                               )}
//                       </label>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="alllocation-submit-container-total">
//                 <span className="alllocation-submit-container-left-top-label">
//                   Total Amount
//                 </span>
//                 <span className="alllocation-submit-container-left-top-label">
//                   {sumObjectValues(inputValues)}
//                 </span>
//               </div>
//             </div>

//             {/** RIGHT CONTAINER */}
//             <div className="alllocation-submit-container-right">
//               <div
//                 style={{
//                   flex: 1,
//                   width: "100%",
//                   height: "50%",
//                 }}
//               >
//                 {/** Top Container */}
//                 <div className="play-title-container">
//                   <div
//                     className="play-title-container-left"
//                     style={{
//                       backgroundColor: "transparent",
//                     }}
//                   >
//                     <span className="titleLabel">{selectedLocation.name}</span>
//                     <div
//                       className="back-container"
//                       onClick={() => hideSubmitContainer()}
//                     >
//                       <RxCrossCircled color={COLORS.red} size={"3rem"} />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div
//                 style={{
//                   flex: 2,
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   alignItems: "flex-end",
//                 }}
//               >
//                 <img
//                   src={images.cat}
//                   alt="game controller Image"
//                   className="catcontrollerplay"
//                 />
//               </div>

//               <div
//                 style={{
//                   width: "100%",
//                   height: "20vh",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "flex-start",
//                 }}
//               >
//                 {isPlayLoading ? (
//                   <LoadingComponent />
//                 ) : (
//                   <div
//                     onClick={submitHandler}
//                     style={{
//                       width: "90%",
//                       backgroundColor: COLORS.green,
//                       padding: "2rem",
//                       borderRadius: "1rem",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <label
//                       style={{
//                         color: COLORS.white_s,
//                         fontFamily: FONT.Montserrat_Bold,
//                         fontSize: "2rem",
//                       }}
//                     >
//                       Submit
//                     </label>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//       )}
//       <ToastContainer />
//     </div>
//   );
// }

// export default Play;
