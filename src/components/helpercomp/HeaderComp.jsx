import React from "react";
import "./HeaderCompStyle.css";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const HeaderComp = ({ title, setSelectedCategory }) => {
  return (
    <div className="comp-header">
      <IoChevronBackCircleOutline
        onClick={() => setSelectedCategory("")}
        size={"2.5rem"}
        color="var(--white_s)"
      />
      <div className="labelContainer">
        <label className="comp-header-label">{title}</label>
      </div>
    </div>
  );
};

export default HeaderComp;
