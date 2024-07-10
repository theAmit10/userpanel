import React from "react";
import "./Gamedescription.css";
import FONT from "../../assets/constants/fonts";
import { CiSearch } from "react-icons/ci";
import { locationdata } from "../../pages/setting/Setting";

function Gamedescriptionc() {
  return (
    <div className="main-content-container-gamedescrition">
      <div>
        {/* Game desc title */}
        <div className="title-container">
          <label className="title-label">
            Game Description
          </label>
        </div>

        {/* Search Container */}
        <div className="searchcontainerGD">
          <div className="search-icon">
            <CiSearch size={"2rem"} />
          </div>
          <label className="search-label">
            Search for location
          </label>
        </div>

        <div className="gdcontent-container">
          {locationdata.map((item, index) => (
            <div key={index} className="gdcontent">
              <label className="gdcontent-title">
                {item.name}
              </label>
              <label className="gdcontent-limit">
                {item.limit}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gamedescriptionc;


// import React from "react";
// import "./Gamedescription.css";
// import FONT from "../../assets/constants/fonts";
// import { CiSearch } from "react-icons/ci";
// import { locationdata } from "../../pages/setting/Setting";

// function Gamedescriptionc() {
//   return (
//     <div className="main-content-container-gamedescrition">
//       <div>
//         {/** Game desc title */}
//         <div
//           style={{
//             height: "5%",
//             display: "flex",
//             flexDirection: "row",
//             width: "90%",
//             justifyContent: "space-between",
//             padding: "10px",
//           }}
//         >
//           <label
//             style={{
//               color: "white",
//               fontFamily: FONT.HELVETICA_BOLD,
//               fontSize: "4vh",
//             }}
//           >
//             Game Description
//           </label>
//         </div>

//         {/** Search Container */}
//         <div className="searchcontainerGD">
//           <div style={{ justifyContent: "center", alignItems: "center" }}>
//             <CiSearch size={"25px"} />
//           </div>

//           <label
//             style={{
//               color: "black",
//               fontFamily: FONT.HELVETICA_REGULAR,
//               fontSize: "18px",
//               textAlign: "center",
//               paddingLeft: "10px",
//             }}
//           >
//             Search for location
//           </label>
//         </div>

//         <div className="gdcontent-continer">
//           {locationdata.map((item, index) => {
//             return (
//               <div className="gdcontent">
//                 <label
//                   style={{
//                     color: "white",
//                     fontFamily: FONT.HELVETICA_BOLD,
//                     fontSize: "3vh",
//                   }}
//                 >
//                   {item.name}
//                 </label>
//                 <label
//                   style={{
//                     color: "white",
//                     fontFamily: FONT.HELVETICA_REGULAR,
//                     fontSize: "3vh",
//                   }}
//                 >
//                   {item.limit}
//                 </label>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Gamedescriptionc;
