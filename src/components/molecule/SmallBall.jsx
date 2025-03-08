import React from "react";
import "./TextCon.css";

const SmallBall = ({ number, style }) => {
  return (
    <div className="small-ball-con" style={style}>
      <label className="small-ball-label">{number}</label>
    </div>
  );
};

export default SmallBall;
