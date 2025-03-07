import React from "react";
import "./PowerballHome.css";
import { GiDiamondTrophy } from "react-icons/gi";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import BluePowerBall from "../molecule/BluePowerBall";
import HeaderComp from "../helpercomp/HeaderComp";
import PowerTimeCon from "./PowerTimeCon";

const PowerTime = ({ setSelectedCategory }) => {
  return (
    <div className="partner-main-container">
      {/** HEADER  */}
      <HeaderComp
        title={"Powerball Time"}
        setSelectedCategory={setSelectedCategory}
      />
      {/* CONTENT CONTAINER */}
      <div className="partner-container">
        <PowerTimeCon time={"10 : 00 AM"} />

        {/** PRIZE DISTRIBUTION */}
      </div>
    </div>
  );
};

export default PowerTime;
