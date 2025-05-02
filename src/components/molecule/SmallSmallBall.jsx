import React from "react";
import "./TextCon.css";

const SmallSmallBall = ({ number, onclick, item, isSelected, ticketIndex }) => {
  return (
    <div
      className="small-small-ball-con"
      style={{
        background: isSelected
          ? `linear-gradient(180deg, #7EC630, #7EC630)`
          : `linear-gradient(180deg, #0162AF, #011833)`,
      }}
      onClick={() => onclick(item, ticketIndex)}
    >
      <label className="small-small-ball-label">{number}</label>
    </div>
  );
};

export default SmallSmallBall;
