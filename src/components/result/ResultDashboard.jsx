import React, { useState } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import PowerTimeCon from "../powerball/PowerTimeCon";
import "../powerball/PowerballHome.css";
import AllResult from "./AllResult";

const ResultDashboard = ({ reloadKey }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const selectingTime = () => {
    setSelectedCategory("playarenaresult");
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
              selectingTime={selectingTime}
              iconname="FaRegPlayCircle"
            />
            <PowerTimeCon
              time={"Powerball"}
              subtitle={"Get all results"}
              selectingTime={selectingTime}
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
    </>
  );
};

export default ResultDashboard;
