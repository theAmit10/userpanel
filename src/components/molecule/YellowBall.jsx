import React from "react";
import "./TextCon.css";

const YellowBall = ({ number }) => {
  return (
    <div
      className="small-ball-con"
      style={{
        background: `linear-gradient(180deg, #FFD75F, #F7AD19)`,
      }}
    >
      <label className="small-ball-label">{number}</label>
    </div>
  );
};

export default YellowBall;
