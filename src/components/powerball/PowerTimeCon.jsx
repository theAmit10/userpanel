import React from "react";
import "./PowerballHome.css";
import { GiDiamondTrophy } from "react-icons/gi";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";

const PowerTimeCon = ({ time }) => {
  return (
    <div className="power-time-con">
      <div className="ptc-first">
        <label className="ptc-time-label">{time}</label>
        <label className="ptc-playnow-label">Play Now</label>
      </div>
      <div className="ptc-second">
        <div className="ptcs-first">
          <GiDiamondTrophy color={COLORS.white_s} size={"3rem"} />
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
