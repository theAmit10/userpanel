import React from "react";
import "./AtomStyle.css";
import { CiSearch } from "react-icons/ci";
import COLORS from "../../assets/constants/colors";
import { MdAdminPanelSettings } from "react-icons/md";

const IconButton = ({ label, onClickHandler, style }) => {
  return (
    <div className="submit-button-main-con">
      <div className="icon-button-con" style={style} onClick={onClickHandler}>
        <MdAdminPanelSettings color={COLORS.background} size={"2rem"} />
        <label className="submit-button-label">{label}</label>
      </div>
    </div>
  );
};

export default IconButton;
