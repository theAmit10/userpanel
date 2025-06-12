import React from "react";
import "./PowerballHome.css";
import { GiDiamondTrophy } from "react-icons/gi";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { FaRegPlayCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getTimeAccordingToTimezone } from "../alllocation/AllLocation";

const PowerTimeCon = ({
  time,
  selectingTime,
  subtitle = "Play Now",
  iconname,
  item,
  nextTime,
}) => {
  const { user } = useSelector((state) => state.user);
  return (
    <div
      className={`power-time-con ${
        time === nextTime?.powertime ? "highlighted" : ""
      }`}
      onClick={() => selectingTime(item)}
    >
      <div className="ptc-first">
        <label className="ptc-time-label">
          {getTimeAccordingToTimezone(time, user?.country?.timezone)}
        </label>
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
