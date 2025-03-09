import React from "react";
import "./HeaderCompStyle.css";
import { IoChevronBackCircleOutline } from "react-icons/io5";

const HeaderComp = ({
  title,
  left,
  right,
  setSelectedCategory,
  closePartnerDetails,
  selectedCategory,
  poweballbackhandler,
  showAllSeclectedBalls,
}) => {
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * This function is used to handle the event when the back button is
   * pressed. If closePartnerDetails is true, it will call the
/******  06fb441e-e08c-41fc-8c55-ca5b2afb1baa  *******/
  const handlePress = () => {
    if (closePartnerDetails) {
      closePartnerDetails();
    }
    if (poweballbackhandler) {
      if (showAllSeclectedBalls) {
        poweballbackhandler();
      } else {
        setSelectedCategory(selectedCategory);
      }

      return;
    }
    if (selectedCategory) {
      setSelectedCategory(selectedCategory);
      return;
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
      <label className="comp-header-label" style={{ paddingLeft: "1rem" }}>
        {left}
      </label>
      <div className="labelContainer">
        <label className="comp-header-label">{title}</label>
      </div>
      <label className="comp-header-label" style={{ paddingRight: "1rem" }}>
        {right}
      </label>
    </div>
  );
};

export default HeaderComp;
