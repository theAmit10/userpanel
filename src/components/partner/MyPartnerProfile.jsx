import React from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import "./Partner.css";
import TextCon from "../molecule/TextCon";
import { FaCopy } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import { showSuccessToast } from "../helper/showErrorToast";

const MyPartnerProfile = ({ setSelectedCategory }) => {
  const handleCopyClick = (e, stringToCopy) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(stringToCopy)
      .then(() => {
        showSuccessToast("Text Copied");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="partner-main-container">
      <HeaderComp title={"Profile"} setSelectedCategory={setSelectedCategory} />
      <div className="container-scrollable">
        <div className="textConContainer">
          <label className="textConLabel">Partner ID</label>
          <div className="textContainer">
            <label className="textConLabel">1020</label>
            <div
              onClick={(e) => handleCopyClick(e, "1020")}
              className="copyCon"
            >
              <FaCopy color={COLORS.background} size={"2rem"} />
            </div>
          </div>
        </div>
        <TextCon title={"Profit Percentage"} value={"20 %"} />
        <TextCon title={"Recharge Percentage"} value={"10 %"} />
        <TextCon title={"Total no. of user's"} value={"35"} />
      </div>
    </div>
  );
};

export default MyPartnerProfile;
