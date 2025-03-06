import React from "react";
import "./AtomStyle.css";

const SubmitButton = ({ label, onClickHandler }) => {
  return (
    <div className="submit-button-main-con">
      <div className="submit-button-con" onClick={onClickHandler}>
        <label className="submit-button-label">{label}</label>
      </div>
    </div>
  );
};

export default SubmitButton;
