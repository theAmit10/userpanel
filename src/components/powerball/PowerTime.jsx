import React from "react";
import "./PowerballHome.css";
import HeaderComp from "../helpercomp/HeaderComp";
import PowerTimeCon from "./PowerTimeCon";

const PowerTime = ({ setSelectedCategory }) => {
  const selectingTime = () => {
    setSelectedCategory("PowerballGame");
  };

  return (
    <div className="partner-main-container">
      {/** HEADER  */}
      <HeaderComp
        title={"Powerball Time"}
        setSelectedCategory={setSelectedCategory}
      />
      {/* CONTENT CONTAINER */}
      <div className="partner-container">
        <PowerTimeCon time={"10 : 00 AM"} selectingTime={selectingTime} />
      </div>
    </div>
  );
};

export default PowerTime;
