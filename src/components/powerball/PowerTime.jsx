import React, { useEffect, useState } from "react";
import "./PowerballHome.css";
import HeaderComp from "../helpercomp/HeaderComp";
import PowerTimeCon from "./PowerTimeCon";
import { useSelector } from "react-redux";
import { useGetPowetTimesQuery } from "../../redux/api";
import Loader from "../molecule/Loader";
import moment from "moment-timezone";
import { showWarningToast } from "../helper/showErrorToast";
import { getTimeAccordingToTimezone } from "../alllocation/AllLocation";
const PowerTime = ({
  setSelectedCategory,
  selectedTime,
  setSelectedTime,
  reloadKey,
  setReloadKey,
}) => {
  const { user, accesstoken } = useSelector((state) => state.user);
  const selectingTime = (item) => {
    const now = moment.tz(user?.country?.timezone);
    console.log("Current Time: ", now.format("hh:mm A"));
    console.log("Current Date: ", now.format("DD-MM-YYYY"));

    const lotTimeMoment = moment.tz(
      getTimeAccordingToTimezone(item?.powertime, user?.country?.timezone),
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
      setSelectedCategory("PowerballGame");
      setSelectedTime(item);
    }
  };

  const [powertimes, setPowertimes] = useState(null);
  // Network call
  const { data, error, isLoading } = useGetPowetTimesQuery({ accesstoken });
  const [nextTime, setNextTime] = useState(null);
  useEffect(() => {
    if (!isLoading && data) {
      setPowertimes(data.powerTimes);

      const nextTime = getNextTimeForHighlights(
        data.powerTimes,
        user?.country?.timezone
      );
      setNextTime(nextTime);
      console.log(data);
    }

    if (error) {
      console.error("Error fetching powerball data:", error);
    }
  }, [data, isLoading, error]); // Correct dependencies

  useEffect(() => {
    if (reloadKey !== 0) {
      setReloadKey(0);
      setSelectedCategory("");
    }
  }, [reloadKey]);

  const getNextTimeForHighlights = (times, userTimezone) => {
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

  return (
    <div className="partner-main-container">
      {/** HEADER  */}
      <HeaderComp
        title={"All Time"}
        setSelectedCategory={setSelectedCategory}
      />
      {/* CONTENT CONTAINER */}
      <div className="partner-container">
        {isLoading ? (
          <Loader />
        ) : (
          powertimes?.map((item, index) => {
            return (
              <PowerTimeCon
                key={index}
                time={item.powertime}
                selectingTime={selectingTime}
                item={item}
                nextTime={nextTime}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default PowerTime;
