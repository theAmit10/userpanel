import React from "react";
import "./PowerballHome.css";
import { GiDiamondTrophy } from "react-icons/gi";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { FaRegPlayCircle } from "react-icons/fa";

const PowerTimeCon = ({
  time,
  selectingTime,
  subtitle = "Play Now",
  iconname,
}) => {
  return (
    <div className="power-time-con" onClick={selectingTime}>
      <div className="ptc-first">
        <label className="ptc-time-label">{time}</label>
        <label className="ptc-playnow-label">{subtitle}</label>
      </div>
      <div className="ptc-second">
        <div className="ptcs-first">
          {iconname === "GiDiamondTrophy" && (
            <GiDiamondTrophy color={COLORS.white_s} size={"3rem"} />
          )}
          {iconname === "FaRegPlayCircle" && (
            <FaRegPlayCircle color={COLORS.white_s} size={"3rem"} />
          )}
        </div>
        <div className="ptcs-second">
          <div className="btc-cat-con">
            <img
              src={images.cat}
              alt="cat"
              color={COLORS.background}
              size={"2.5rem"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerTimeCon;
