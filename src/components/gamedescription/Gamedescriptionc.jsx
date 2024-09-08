import React, { useEffect, useState } from "react";
import "./Gamedescription.css";
import FONT from "../../assets/constants/fonts";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocations } from "../../redux/actions/locationAction";
import COLORS from "../../assets/constants/colors";
import CircularProgressBar from "../helper/CircularProgressBar";
import { LoadingComponent } from "../helper/LoadingComponent";

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

  const [selectedItem, setSelectedItem] = useState("");

  return (
    <div className="main-content-container-gamedescrition">
      <div>
        {/* Game desc title */}

        <div className="alCreatLocationTopContainer">
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              Game Description
            </label>
          </div>
        </div>

        {/* Search Container */}
        <div className="aboutus-search-container">
          <div className="aboutus-search-icon">
            <CiSearch size={"2rem"} />
          </div>
          <input
            className="aboutus-search-input"
            placeholder="Search for location"
            label="Search"
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <LoadingComponent />
        ) : (
          <div className="ARLCC">
            {filteredData.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className="ARLocConCC"
              >
                <div
                  className="PLLLocContainer"
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(90deg, #1993FF, #0F5899)"
                        : "linear-gradient(90deg, #7EC630, #3D6017)",
                    borderColor:
                      selectedItem?._id === item._id
                        ? COLORS.blue
                        : "transparent", // Use transparent for no border
                    borderWidth: "2px",
                    borderStyle:
                      selectedItem?._id === item._id ? "solid" : "none", // Apply border style conditionally
                  }}
                >
                  <label className="locLabel"> {item.lotlocation}</label>
                  <label className="limitLabel"> Max {item.maximumRange}</label>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedItem !== "" && (
          <>
            <div className="gdcontent-container">
              <div className="title-container-gd">
                <label className="location-header-label">Title</label>
                <label className="subtitle-label">
                  {selectedItem.locationTitle === ""
                    ? "NA"
                    : selectedItem.locationTitle}
                </label>
              </div>
            </div>

            <div className="gdcontent-container">
              <div className="title-container-gd">
                <label className="location-header-label">Description</label>
                <label className="subtitle-label">
                  {selectedItem.locationDescription === ""
                    ? "NA"
                    : selectedItem.locationDescription}
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Gamedescriptionc;
