import React, { useEffect, useState } from "react";
import "./Gamedescription.css";
import FONT from "../../assets/constants/fonts";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocations } from "../../redux/actions/locationAction";
import COLORS from "../../assets/constants/colors";
import CircularProgressBar from "../helper/CircularProgressBar";
import { LoadingComponent } from "../helper/LoadingComponent";
import { showWarningToast } from "../helper/showErrorToast";

function Gamedescriptionc({ reloadKey }) {
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
  }, [dispatch, accesstoken, reloadKey]);

  useEffect(() => {
    setFilteredData(locations); // Update filteredData whenever locations change
  }, [locations, reloadKey]);

  console.log(filteredData);

  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    console.log("reloadKey :: " + reloadKey);

    setSelectedItem("");
  }, [reloadKey]);

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
          <div className="GDLC">
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
                        ? COLORS.orange
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
            {/* <div className="gdcontent-container">
              <div className="title-container-gd">
                <label className="location-header-label">Title</label>
                <label className="subtitle-label">
                  {selectedItem.locationTitle === ""
                    ? "NA"
                    : selectedItem.locationTitle}
                </label>
              </div>
            </div> */}

            <div className="gdcontent-container" style={{
              padding: "1rem"
            }}>
              <div className="title-container-gd">
                <label className="location-header-label">
                  {selectedItem.locationTitle === ""
                    ? "Title"
                    : selectedItem.locationTitle}
                </label>
                <label className="subtitle-label">
                  {selectedItem.locationDescription === ""
                    ? "Description"
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

// /* Set a fixed width and height for the Lot Date column */
// .resultTable th.lotdate-column,
// .resultTable td.lotdate-column {
//   min-width: 12rem;
//   min-height: 5rem; /* Set the height to 4rem */
// }

// /* Set fixed width and height for the Time cells */
// .resultTable th.time-column,
// .resultTable td.time-column {
//     min-width: 8rem;  /* Set the width to 8rem */
//     min-height: 4rem; /* Set the height to 4rem */
// }

// /* Set fixed width and height for the Result cells */
// .resultTable td.result-column {
//     min-width: 8rem;  /* Set the width to 8rem */
//     min-height: 4rem; /* Set the height to 4rem */
// }

// /* Existing styles for the table */
// .resultTable {
//   width: 100%;
//   border-collapse: collapse;
// }

// .resultTable th,
// .resultTable td {
//   padding: 1rem;
//   text-align: center;
//   border: 0.1rem solid var(--result_lightblue);
//   background-color: var(--background);

// }

// .resultTable th {
//   background-color: var(--result_lightblue);
//   border-radius: 0.5rem;
//   color: white;
//   padding: 1rem;
//   border: 0.2rem solid var(--background);
// }

// .tdlabel {
//   color: var(--white_s);
//   font-size: 1.5rem;
//   font-family: "MR";
//   background-color: var(--green);
// }

// .time-column{
//     color: var(--white_s);
//     font-size: 1rem;
//     font-family: "MSB";
// }

// .thlabel {
//   color: var(--white_s);
//   font-size: 1.5rem;
//   font-family: "MSB";
//   background-color: var(--green);
// }

// .tddatelabel {
//   color: var(--white_s);
//   font-size: 1.5rem;
//   font-family: "MSB";
//   background-color: cyan;
// }

// /* Add horizontal and vertical scroll behavior */

//   .alContainer{
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     background: linear-gradient(180deg, #0162AF, #011833);
//     border-radius: 1rem;
//   }

// .ARLCC{
//   max-height: 7rem;
//   width: 80vw;
//   background-color: pink;
//   margin-left: 2rem;
//   margin-right: 2rem;
//   border-radius: 1rem;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   overflow-x: scroll;
// }

// .ARLocConCC {
//   min-width: 30rem; /* Fixed width for the left container */
//   height: 100%;

// }

//   .PLLLocContainer{
//     height: 5rem;
//     background-color: var(--background);
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     padding-right: 1rem;
//     padding-left: 1rem;
//     align-items: center;
//     margin: 1rem;
//     border-radius: 1rem;
//   }

//   .limitLabel{
//     color: var(--white_s);
//     font-family: "MR";
//     font-size: 1rem;

//   }

//   .locLabel{
//     color: var(--white_s);
//     font-family: "MSB";
//     font-size: 1.5rem;

//   }

//   .ARMC{
//     background: linear-gradient(180deg, #0162AF, #011833);
//     width: 80vw;
//     height: 60vh;
//     margin-left: 2rem;
//     margin-right: 2rem;
//     overflow-x: scroll;
//     overflow-y: scroll;
//     display: flex;
//     flex-direction: row;

//   }

//   .ARMCContent{
//     width: 20rem;
//     height: 100%;

//     display: flex;
//     flex-direction: column;
//   }

//   .ARMCContentTC{
//     height: 5rem;
//     background-color: var(--background);
//     margin: 1rem;
//     border-radius: 1rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }

//   .ARMCContentDC{
//     flex: 1;

//     display: flex;
//     flex-direction: column;
//     position: relative;
//     gap: 0.1px;
//     height: 40vh;
//     overflow-y: scroll;

//   }
//   .ARMCContentDConC{
//     min-height: 5rem;
//     display: flex;
//     flex-direction: row;
//     margin-left: 1rem;
//     margin-right: 1rem;
//     margin-bottom: 0.2rem;
//     gap: 2px;

//   }

//   .ARMCContentDConCDate{
//     width: 15rem;
//     background-color:  var(--background);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border-top-left-radius: 1rem;
//     border-bottom-left-radius: 1rem;
//   }

//   .ARMCContentDConCResult{
//     width: 5rem;
//     background-color: var(--background);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border-top-right-radius: 1rem;
//     border-bottom-right-radius: 1rem;
//   }

//   .tdlabel{
//     color: var(--white_s);
//     font-size: 1.5rem;
//     font-family: "MR";
//     background-color: var(--green);
//   }

//   .thlabel{
//     color: var(--white_s);
//     font-size: 1.5rem;
//     font-family: "MSB";
//     background-color: var(--green);
//   }

//   .tddatelabel{
//     color: var(--white_s);
//     font-size: 1.5rem;
//     font-family: "MSB";
//     background-color: cyan;
//   }

//   .stitle{
//     color: var(--background);
//     background-color: var(--green);
//     font-size: 2rem;
//     font-family: "MR";
//     text-align: center;
//     padding: 1rem;
//   }

//   .SRMC{
//     background: linear-gradient(180deg, #0162AF, #011833);
//     width: 80vw;
//     height: 60vh;
//     margin-left: 2rem;
//     margin-right: 2rem;
//     overflow-y: scroll;
//     display: flex;
//     flex-direction: column;

//   }

//   .yeartitle{
//     color: var(--white_s);
//     background-color: var(--background);
//     font-size: 2rem;
//     font-family: "MR";
//     text-align: center;
//     padding: 2rem;
//     margin: 2rem;
//     border-radius: 1rem;
//   }

//   .submitTitleCon{
//     color: var(--white_s);
//     background-color: var(--green);
//     font-size: 2rem;
//     font-family: "MR";
//     text-align: center;
//     padding: 1.5rem;
//     margin: 2rem;
//     border-radius: 1rem;
//     min-width: 90%;

//   }

//   .bottomSearcConAllResult{
//     height: 8rem;
//     background-color: var(--background);
//     margin: 1rem;
//     border-radius: 2rem;
//     display: flex;
//     flex-direction: row;

//   }

//   .bottomSearcConAllResultM{
//     flex: 1;

//     background-color: var(--blue);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 1rem;
//     margin: 2rem;
//     border-radius: 2rem;
//     padding-left: 0.5rem;
//     padding-right: 0.5rem;
//     cursor: pointer;
//   }

//   .bottomSearcConAllResultY{
//     flex: 1;
//     background-color: var(--blue);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 1rem;
//     margin: 2rem;
//     border-radius: 2rem;
//     padding-left: 0.5rem;
//     padding-right: 0.5rem;
//     cursor: pointer;

//   }

//   .bottomSearcConAllResultS{
//     flex: 0.5;
//     background-color: var(--green);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 1rem;
//     margin: 2rem;
//     border-radius: 2rem;
//     padding-left: 0.5rem;
//     padding-right: 0.5rem;
//     cursor: pointer;

//   }

//   .bottomSearcConAllResultD{
//     flex: 0.5;
//     background-color: var(--blue);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     gap: 1rem;
//     margin: 2rem;
//     border-radius: 1rem;
//     padding-left: 0.5rem;
//     padding-right: 0.5rem;
//     cursor: pointer;
//   }

//   .msbLabel{
//     color: var(--white_s);
//     font-size: 1.5rem;
//     font-family: "MSB";
//   }
