import React from "react";
import "./TextCon.css";

const SmallBall = ({ number, onclick, item, isSelected }) => {
  return (
    <div
      className="small-ball-con"
      style={{
        background: isSelected
          ? `linear-gradient(180deg, #7EC630, #7EC630)`
          : `linear-gradient(180deg, #0162AF, #011833)`,
      }}
      onClick={() => onclick(item)}
    >
      <label className="small-ball-label">{number}</label>
    </div>
  );
};

export default SmallBall;
