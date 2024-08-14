import React, { useEffect, useState } from "react";
import "./Aboutus.css";
import FONT from "../../assets/constants/fonts";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocations } from "../../redux/actions/locationAction";
import COLORS from "../../assets/constants/colors";
import CircularProgressBar from "../helper/CircularProgressBar";
import { loadAllAboutUs } from "../../redux/actions/userAction";

function Aboutus() {
  const { accesstoken, loadingAbout, abouts } = useSelector(
    (state) => state.user
  );

  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = abouts.filter((item) =>
      item.aboutTitle.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    dispatch(loadAllAboutUs(accesstoken));
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(abouts); // Update filteredData whenever locations change
  }, [abouts]);

  return (
    <div className="main-content-container-gamedescrition">
      <div>
        {/* Game desc title */}
        <div className="title-container">
          <label className="title-label">About us</label>
        </div>

        {/* Search Container */}
        <div className="searchcontainerGD">
          <div className="search-icon">
            <CiSearch size={"2rem"} />
          </div>
          <input
            style={{
              flex: 1,
              padding: "0.5vw",
              backgroundColor: "transparent",
              border: "none",
              fontFamily: FONT.Montserrat_Regular,
              fontSize: "1em",
              outline: "none",
            }}
            placeholder="Search"
            label="Search"
            onChange={handleSearch} // Use onChange instead of onChangeText
          />
        </div>

        {loadingAbout ? (
          <div
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgressBar />
          </div>
        ) : (
            filteredData.map((item, index) => (
                <div  key={index} className="gdcontent-container-about">
                <div className="about-content-contatiner">
                  <div className="about-content-contatiner-title">
                    <label className="about-content-contatiner-title-label">
                      {item.aboutTitle}
                    </label>
                  </div>
                  <div className="about-content-contatiner-sub-title">
                    <label className="about-content-contatiner-sub-title-label">
                      {item.aboutDescription}
                    </label>
                  </div>
                </div>
              </div>
              ))
          
        )}
      </div>
    </div>
  );
}

export default Aboutus;




