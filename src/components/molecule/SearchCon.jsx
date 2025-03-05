import React from "react";
import "./TextCon.css";
import { FaCopy } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import { CiSearch } from "react-icons/ci";

const SearchCon = ({ searchvalue, setSearchValue }) => {
  return (
    <div className="search-con">
      <CiSearch color={COLORS.background} size={"2rem"} />
      <input
        className="search-input-con"
        placeholder="Search for partner"
        value={searchvalue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchCon;
