import React from "react";
import "./TextCon.css";
import { CiSearch } from "react-icons/ci";
import { LuFileText } from "react-icons/lu";

const TextAreaCon = ({
  searchvalue,
  setSearchValue,
  placeholder,
  iconname,
  title,
  disabled = false,
}) => {
  return (
    <div className="textConContainer">
      <label className="textConLabel">{title}</label>
      <div className="scrollable-input-container">
        <div className="text-icon-container">
          {iconname === "CiSearch" && <CiSearch size={"2rem"} />}
          {iconname === "LuFileText" && <LuFileText size={"2rem"} />}
        </div>

        <textarea
          className="scrollable-input"
          placeholder={placeholder}
          value={searchvalue}
          onChange={(e) => setSearchValue(e.target.value)}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default TextAreaCon;
