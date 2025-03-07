import React from "react";
import "./TextCon.css";

const BluePowerBall = ({ number }) => {
  return (
    <div className="blue-ball-con">
      <label className="blue-ball-label">{number}</label>
    </div>
  );
};

export default BluePowerBall;
