import React, { useEffect, useState } from "react";
import "./Aboutus.css";
import FONT from "../../assets/constants/fonts";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getAllLocations } from "../../redux/actions/locationAction";
import COLORS from "../../assets/constants/colors";
import CircularProgressBar from "../helper/CircularProgressBar";
import { loadAllAboutUs } from "../../redux/actions/userAction";
import { LoadingComponent } from "../helper/LoadingComponent";

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
    <div className="aboutus-container">
      <div>
        {/* Title */}
        <div className="aboutus-title-container">
          <label className="aboutus-title-label">About us</label>
        </div>

        {/* Search Container */}
        <div className="aboutus-search-container">
          <div className="aboutus-search-icon">
            <CiSearch size={"2rem"} />
          </div>
          <input
            className="aboutus-search-input"
            placeholder="Search"
            label="Search"
            onChange={handleSearch}
          />
        </div>

        <div className="aboutus-content-container">
          {loadingAbout ? (
            <LoadingComponent/>
          ) : (
            filteredData?.map((item, index) => (
              <div key={index} className="aboutus-content">
                <div className="aboutus-content-title">
                  <label className="aboutus-content-title-label">
                    {item.aboutTitle}
                  </label>
                </div>
                <div className="aboutus-content-subtitle">
                  <label className="aboutus-content-subtitle-label">
                    {item.aboutDescription}
                  </label>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Aboutus;

// .main-content-container-gamedescrition {
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   padding: 2vh;
//   gap: 4%;
//   background: linear-gradient(180deg, #0162AF, #011833);
//   border-radius: 2vh;
//   padding: 2vh;
//   margin: 2vh;
// }

// .title-container {
//   height: 4vh;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   padding: 2vh;
// }

// .title-label {
//   color: white;
//   font-family: "MB";
//   font-size: 4vh;
// }

// .searchcontainerAbout {
//   padding: 1vw;
//   margin: 2vh;
//   border-radius: 2vh;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   background-color: pink;
//   margin-top: 5vh;
//   height: 10px;
// }

// .search-icon {
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .search-label {
//   color: black;
//   font-family: 'MR';
//   font-size: 3vh;
//   text-align: center;
//   padding-left: 1vh;
// }

// .gdcontent-container-about {

//   height: 60vh;
//   display: flex;
//   padding: 2vh;
//   flex-direction: column;
//   overflow-y: scroll;
//   gap: 2vh;
//   border-radius: 2vh;
//   margin-top: 2vh;
//   margin: 1vw;
//   background: linear-gradient(90deg, #0162AF, #011833);
// }

// .location-header-result{
//   height: 7vh;
//   border-radius: 2vh;

// }

// .about-content-contatiner{
//   min-height: 20vh;
//   background-color: #011833;
//   border-radius: 2vh;
// }

// .about-content-contatiner-title{
//   min-height: 10vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .about-content-contatiner-sub-title{
//   min-height: 10vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .about-content-contatiner-title-label {
//   color: white;
//   font-family: "MSB";
//   font-size: 1.5vw;
// }

// .about-content-contatiner-sub-title-label {
//   color: white;
//   font-family: "MR";
//   font-size: 1vw;
// }

// .gdcontent {
//   height: 7vh;
//   width: 100%;
//   background-color: var(--background);
//   border-radius: 2vh;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 2vh;
// }

// .gdcontent-title {
//   color: white;
//   font-family: "MR";
//   font-size: 3vh;
// }

// .gdcontent-limit {
//   color: white;
//   font-family: "MR";
//   font-size: 2vh;
// }

// .all-location-gd{

//   background: linear-gradient(90deg, #0162AF, #011833);
//   border-radius: 10px;
//   display: flex;
//   flex-direction: row;
//   overflow-x: scroll;
//   align-items: center;
//   margin-left: 1vw;
//   margin-right: 1vw;
//   padding: 0.1vw;

// }

// .title-container-gd{
//   height: 10%;
//   background: linear-gradient(90deg, #0162AF, #011833);
//   display: flex;
//   flex-direction: column;

// }

// @media (max-width: 768px) {
//   .title-label {
//     font-size: 4vh;
//   }

//   .search-label {
//     font-size: 2vh;
//   }

//   .gdcontent-title {
//     font-size: 2.5vh;
//   }
//   .gdcontent-limit {
//       font-size: 2vh;
//   }
// }

// /* .main-content-container-gamedescrition {
//   display: flex;
//   flex-direction: column;
//   flex: 1;
//   padding: 1vh;
//   gap: 4%;
// }

// .searchcontainerGD{
//   padding: 1vh;
//   margin: 1vh;
//   border-radius: 2vh;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   background-color: var(--grayHalfBg);
//   margin-top: 5vh;
// }

// .gdcontent-continer{
//   flex: 1;
//   display: flex;
//   background: linear-gradient(180deg, #0162AF, #011833);
//   height: 60vh;
//   padding: 2vh;
//   flex-direction: column;
//   overflow-y: scroll;
//   gap: 2vh;
//   border-radius: 2vh;
//   margin-top: 2vh;
//   margin: 1vh;

// }
// .gdcontent{
//   height: 7vh;
//   width: 100%;
//   background-color: var(--background);
//   border-radius: 2vh;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 2vh;
// } */

// // import React, { useEffect, useState } from "react";
// // import "./Aboutus.css";
// // import FONT from "../../assets/constants/fonts";
// // import { CiSearch } from "react-icons/ci";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getAllLocations } from "../../redux/actions/locationAction";
// // import COLORS from "../../assets/constants/colors";
// // import CircularProgressBar from "../helper/CircularProgressBar";
// // import { loadAllAboutUs } from "../../redux/actions/userAction";

// // function Aboutus() {
// //   const { accesstoken, loadingAbout, abouts } = useSelector(
// //     (state) => state.user
// //   );

// //   const [filteredData, setFilteredData] = useState([]);
// //   const dispatch = useDispatch();

// //   const handleSearch = (e) => {
// //     const text = e.target.value;
// //     const filtered = abouts.filter((item) =>
// //       item.aboutTitle.toLowerCase().includes(text.toLowerCase())
// //     );
// //     setFilteredData(filtered);
// //   };

// //   useEffect(() => {
// //     dispatch(loadAllAboutUs(accesstoken));
// //   }, [dispatch]);

// //   useEffect(() => {
// //     setFilteredData(abouts); // Update filteredData whenever locations change
// //   }, [abouts]);

// //   return (
// //     <div className="main-content-container-gamedescrition">
// //       <div>
// //         {/* Game desc title */}
// //         <div className="title-container">
// //           <label className="title-label">About us</label>
// //         </div>

// //         {/* Search Container */}
// //         <div className="searchcontainerAbout">
// //           <div className="search-icon">
// //             <CiSearch size={"2rem"} />
// //           </div>
// //           <input
// //             style={{
// //               flex: 1,
// //               padding: "0.1vw",
// //               backgroundColor: "transparent",
// //               border: "none",
// //               fontFamily: FONT.Montserrat_Regular,
// //               fontSize: "1em",
// //               outline: "none",
// //             }}
// //             placeholder="Search"
// //             label="Search"
// //             onChange={handleSearch} // Use onChange instead of onChangeText
// //           />
// //         </div>

// //         {loadingAbout ? (
// //           <div
// //             style={{
// //               flex: "1",
// //               display: "flex",
// //               justifyContent: "center",
// //               alignItems: "center",
// //             }}
// //           >
// //             <CircularProgressBar />
// //           </div>
// //         ) : (
// //             filteredData?.map((item, index) => (
// //                 <div  key={index} className="gdcontent-container-about">
// //                 <div className="about-content-contatiner">
// //                   <div className="about-content-contatiner-title">
// //                     <label className="about-content-contatiner-title-label">
// //                       {item.aboutTitle}
// //                     </label>
// //                   </div>
// //                   <div className="about-content-contatiner-sub-title">
// //                     <label className="about-content-contatiner-sub-title-label">
// //                       {item.aboutDescription}
// //                     </label>
// //                   </div>
// //                 </div>
// //               </div>
// //               ))

// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Aboutus;
