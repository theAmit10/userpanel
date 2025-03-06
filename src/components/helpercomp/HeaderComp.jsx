import React from "react";
import "./HeaderCompStyle.css";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const HeaderComp = ({ title, setSelectedCategory, closePartnerDetails }) => {
  const handlePress = () => {
    if (closePartnerDetails) {
      closePartnerDetails();
    }
    if (setSelectedCategory) {
      setSelectedCategory("");
    }
  };
  return (
    <div className="comp-header">
      <IoChevronBackCircleOutline
        onClick={handlePress}
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
