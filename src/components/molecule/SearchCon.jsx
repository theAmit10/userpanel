import React from "react";
import "./TextCon.css";
import { FaCopy } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import { CiSearch } from "react-icons/ci";

const SearchCon = ({ searchvalue, setSearchValue, placeholder, iconname }) => {
  return (
    <div className="search-con">
      {iconname === "CiSearch" && (
        <CiSearch color={COLORS.background} size={"2rem"} />
      )}
      <input
        className="search-input-con"
        placeholder={placeholder}
        value={searchvalue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchCon;
