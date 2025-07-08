import React, { useEffect, useState } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import PowerTimeCon from "../powerball/PowerTimeCon";
import "../powerball/PowerballHome.css";
import AllResult from "./AllResult";
import PowerResult from "./PowerResult";
import ResultCon from "../powerball/ResultCon";

const ResultDashboard = ({ reloadKey, setReloadKey }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (reloadKey > 0) {
      setSelectedCategory("");
      setReloadKey(0);
    }
  }, [reloadKey]);

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
            <ResultCon
              time={"Play Arena"}
              subtitle={"Get all results"}
              selectingTime={selectingPlayArenaResult}
              iconname="FaRegPlayCircle"
            />
            <ResultCon
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
          setReloadKey={setReloadKey}
          selectedCategory={selectedCategory}
        />
      )}
      {selectedCategory === "powerballresult" && (
        <PowerResult
          setSelectedCategory={setSelectedCategory}
          reloadKey={reloadKey}
          setReloadKey={setReloadKey}
          selectedCategory={selectedCategory}
        />
      )}
    </>
  );
};

export default ResultDashboard;
