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

  const [selectedItem, setSelectedItem] = useState("");

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
          <div className="all-location-gd">
            {filteredData.map((item, index) => (
              <div
              onClick={() => setSelectedItem(item)}
                key={item._id}
                className="location-header-result"
                style={{
                  background:
                    index % 2 === 0
                      ? "linear-gradient(90deg, #1993FF, #0F5899)"
                      : "linear-gradient(90deg, #7EC630, #3D6017)",
                      border: `2px solid ${selectedItem?._id === item._id ? COLORS.green : 'transparent'}`, // Set border color to green if selected
                      
                }}
              >
                <label className="location-header-label">
                  {item.lotlocation}
                </label>
                <label className="location-header-max-label">
                  Max {item.maximumRange}
                </label>
              </div>
            ))}
          </div>
        )}

        {selectedItem !== "" && (
         <>
          <div className="gdcontent-container">
            <div className="title-container-gd">
            <label className="location-header-label">
                Title
              </label>
              <label className="location-header-label">
                {selectedItem.locationTitle === "" ? "NA" : selectedItem.locationTitle }
              </label>
            </div>
          </div>

          <div className="gdcontent-container">
            <div className="title-container-gd">
            <label className="location-header-label">
                Description
              </label>
              <label className="location-header-label">
                {selectedItem.locationDescription === "" ? "NA" : selectedItem.locationDescription }
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
