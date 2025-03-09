import React, { useEffect, useState } from "react";
import "./PowerballHome.css";
import HeaderComp from "../helpercomp/HeaderComp";
import PowerTimeCon from "./PowerTimeCon";
import { useSelector } from "react-redux";
import { useGetPowetTimesQuery } from "../../redux/api";
import Loader from "../molecule/Loader";

const PowerTime = ({ setSelectedCategory, selectedTime, setSelectedTime }) => {
  const selectingTime = (item) => {
    setSelectedCategory("PowerballGame");
    setSelectedTime(item);
  };

  const { user, accesstoken } = useSelector((state) => state.user);

  const [powertimes, setPowertimes] = useState(null);
  // Network call
  const { data, error, isLoading } = useGetPowetTimesQuery({ accesstoken });

  useEffect(() => {
    if (!isLoading && data) {
      setPowertimes(data.powerTimes);
      console.log(data);
    }

    if (error) {
      console.error("Error fetching powerball data:", error);
    }
  }, [data, isLoading, error]); // Correct dependencies

  return (
    <div className="partner-main-container">
      {/** HEADER  */}
      <HeaderComp
        title={"Powerball Time"}
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
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default PowerTime;
