import React from "react";
import "./TextCon.css";

const GreenBall = ({ number, style }) => {
  return (
    <div
      className="small-ball-con"
      style={{
        background: `linear-gradient(180deg, #7EC630, #7EC630)`,
      }}
    >
      <label className="small-ball-label">{number}</label>
    </div>
  );
};

export default GreenBall;
