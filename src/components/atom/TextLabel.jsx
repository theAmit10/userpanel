import React from "react";
import "./AtomStyle.css";

const TextLabel = ({ label, style }) => {
  return (
    <div className="atom-textLabel" style={style}>
      {label}
    </div>
  );
};

export default TextLabel;
