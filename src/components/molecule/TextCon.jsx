import React from "react";
import "./TextCon.css";

const TextCon = ({ title, value }) => {
  return (
    <div className="textConContainer">
      <label className="textConLabel">{title}</label>
      <div className="textContainer">
        <label className="textConLabel">{value}</label>
      </div>
    </div>
  );
};

export default TextCon;
