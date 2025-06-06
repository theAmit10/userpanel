import React, { useState } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import PowerTimeCon from "../powerball/PowerTimeCon";
import "../powerball/PowerballHome.css";
import AllResult from "./AllResult";
import PowerResult from "./PowerResult";

const ResultDashboard = ({ reloadKey }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const selectingPlayArenaResult = () => {
    setSelectedCategory("playarenaresult");
  };

  const selectingPowerballResult = () => {
    setSelectedCategory("powerballresult");
  };

  return (
    <>
      {selectedCategory === "" && (
        <div className="partner-main-container">
          {/** HEADER  */}

          <div className="alCreatLocationTopContainer">
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Result Dashboard
              </label>
            </div>
          </div>
          {/* CONTENT CONTAINER */}
          <div className="partner-container">
            <PowerTimeCon
              time={"Play Arena"}
              subtitle={"Get all results"}
              selectingTime={selectingPlayArenaResult}
              iconname="FaRegPlayCircle"
            />
            <PowerTimeCon
              time={"Powerball"}
              subtitle={"Get all results"}
              selectingTime={selectingPowerballResult}
              iconname="GiDiamondTrophy"
            />
          </div>
        </div>
      )}
      {selectedCategory === "playarenaresult" && (
        <AllResult
          setSelectedCategory={setSelectedCategory}
          reloadKey={reloadKey}
        />
      )}
      {selectedCategory === "powerballresult" && (
        <PowerResult
          setSelectedCategory={setSelectedCategory}
          reloadKey={reloadKey}
        />
      )}
    </>
  );
};

export default ResultDashboard;
