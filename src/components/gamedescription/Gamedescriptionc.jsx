import React, { useEffect, useState } from "react";
import "./Gamedescription.css";
import FONT from "../../assets/constants/fonts";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocations } from "../../redux/actions/locationAction";
import COLORS from "../../assets/constants/colors";
import CircularProgressBar from "../helper/CircularProgressBar";

function Gamedescriptionc() {
  const { accesstoken } = useSelector((state) => state.user);
  const { loading, locations } = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = locations.filter((item) =>
      item.lotlocation.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    dispatch(getAllLocations(accesstoken));
  }, [dispatch, accesstoken]);

  useEffect(() => {
    setFilteredData(locations); // Update filteredData whenever locations change
  }, [locations]);

  console.log(filteredData);

  return (
    <div className="main-content-container-gamedescrition">
      <div>
        {/* Game desc title */}
        <div className="title-container">
          <label className="title-label">Game Description</label>
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
            placeholder="Search for location"
        
            label="Search"
            onChange={handleSearch} // Use onChange instead of onChangeText
          />
        </div>

        <div className="gdcontent-container">
          {loading ? (
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
              <div key={item._id} className="gdcontent">
                <label className="gdcontent-title">{item.lotlocation}</label>
                <label className="gdcontent-limit">
                  Max {item.maximumRange}
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Gamedescriptionc;
