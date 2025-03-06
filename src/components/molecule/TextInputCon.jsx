import React from "react";
import "./TextCon.css";
import { FaCopy } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import { CiSearch } from "react-icons/ci";
import { LuFileText } from "react-icons/lu";

const TextInputCon = ({
  searchvalue,
  setSearchValue,
  placeholder,
  iconname,
  title,
}) => {
  return (
    <div className="textConContainer">
      <label className="textConLabel">{title}</label>
      <div className="search-con">
        {iconname === "CiSearch" && (
          <CiSearch color={COLORS.background} size={"2rem"} />
        )}
        {iconname === "LuFileText" && (
          <LuFileText color={COLORS.background} size={"2rem"} />
        )}
        <input
          className="search-input-con"
          placeholder={placeholder}
          value={searchvalue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextInputCon;
