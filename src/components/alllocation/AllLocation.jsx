import React, { useState } from "react";
import FONT from "../../assets/constants/fonts";
import "./Alllocation.css";

const filterdata = [
  { val: "All" },
  { val: "2X" },
  { val: "5X" },
  { val: "10X" },
  { val: "50X" },
  { val: "100X" },
  { val: "200X" },
];

const locationdata = [
  {
    id: "1",
    name: "Canada",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "2",
    name: "Japan",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
    ],
  },
  {
    id: "3",
    name: "Punjab",
    limit: "200 - 200X",
    times: [
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "4",
    name: "Pune",
    limit: "200 - 200X",
    times: [
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "5",
    name: "China",
    limit: "100 - 100X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "6",
    name: "India",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "7",
    name: "USA",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
    ],
  },
  {
    id: "8",
    name: "Korea",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
];

function AllLocation() {
  const [selectedLocation, setSelectedLocation] = useState(locationdata[0]);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="main-content-container-all-location">
      {/** Filter container */}
      <div className="filtercontainer">
        {filterdata.map((item, index) => (
          <div className="filtercontent" key={index}>
            <label
              style={{
                color: "white",
                fontFamily: FONT.HELVETICA_REGULAR,
                fontSize: "18px",
              }}
            >
              {item.val}
            </label>
          </div>
        ))}
      </div>

      {/** Location container */}
      <div className="allocationcontainer">
        <div className="alleftlocation">
          {locationdata.map((item) => (
            <div
              className="leftlocationcontent"
              style={{
                background:
                  selectedLocation.id === item.id
                    ? "linear-gradient(180deg, #7EC630, #3D6017)"
                    : "linear-gradient(180deg, #1993FF, #0F5899)",
              }}
              key={item.id}
              onClick={() => handleLocationClick(item)}
            >
              <label
                style={{
                  color: "white",
                  fontFamily: FONT.HELVETICA_REGULAR,
                  fontSize: "18px",
                }}
              >
                {item.name}
              </label>
              <label
                style={{
                  color: "white",
                  fontFamily: FONT.HELVETICA_REGULAR,
                  fontSize: "10px",
                }}
              >
                {item.limit}
              </label>
            </div>
          ))}
        </div>

        <div className="alrightlocation">
          {locationdata.map((locationitem) => (
            <div key={locationitem.id}>
              
              <div style={{
                flex: 1,
                display : "flex",
                justifyContent: "center",
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              {locationitem.times.map((item) => (
                <div className="rightlocationcontent" key={item.id}>
                  <label
                    style={{
                      color: "white",
                      fontFamily: FONT.HELVETICA_REGULAR,
                      fontSize: "60%",
                    }}
                  >
                    {item.time}
                  </label>
                </div>
              ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllLocation;


// import React, { useEffect, useState } from "react";
// import FONT from "../../assets/constants/fonts";
// import "./Alllocation.css";

// const filterdata = [
//   { val: "All" },
//   { val: "2X" },
//   { val: "5X" },
//   { val: "10X" },
//   { val: "50X" },
//   { val: "100X" },
//   { val: "200X" },
// ];

// const locationdata = [
//   {
//     id: "1",
//     name: "Canada",
//     limit: "200 - 200X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "12", time: "10:00 AM" },
//       { id: "13", time: "11:00 AM" },
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
//   {
//     id: "2",
//     name: "Japan",
//     limit: "200 - 200X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "12", time: "10:00 AM" },
//       { id: "13", time: "11:00 AM" },
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//     ],
//   },
//   {
//     id: "3",
//     name: "Punjab",
//     limit: "200 - 200X",
//     times: [
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
//   {
//     id: "4",
//     name: "Pune",
//     limit: "200 - 200X",
//     times: [
//       { id: "13", time: "11:00 AM" },
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
//   {
//     id: "5",
//     name: "China",
//     limit: "100 - 100X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
//   {
//     id: "6",
//     name: "India",
//     limit: "200 - 200X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "12", time: "10:00 AM" },
//       { id: "13", time: "11:00 AM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
//   {
//     id: "7",
//     name: "USA",
//     limit: "200 - 200X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "12", time: "10:00 AM" },
//       { id: "13", time: "11:00 AM" },
//       { id: "14", time: "12:00 PM" },
//     ],
//   },
//   {
//     id: "8",
//     name: "Korea",
//     limit: "200 - 200X",
//     times: [
//       { id: "11", time: "09:00 AM" },
//       { id: "12", time: "10:00 AM" },
//       { id: "13", time: "11:00 AM" },
//       { id: "14", time: "12:00 PM" },
//       { id: "15", time: "01:00 PM" },
//       { id: "16", time: "02:00 PM" },
//       { id: "17", time: "03:00 PM" },
//     ],
//   },
// ];

// function AllLocation() {
//   const [selectedLocation, setSelectedLocation] = useState(locationdata[0]);

//   const handleLocationClick = (location) => {
//     console.log("clicked");
//     console.log(JSON.stringify(location));
//     setSelectedLocation(location);
//   };

//   useEffect(() => {
//     console.log("location changed");
//   }, [selectedLocation]);

//   return (
//     <div className="main-content-container">
//       {/** filter contatiner */}

//       <div className="filtercontainer">
//         {filterdata.map((item, index) => (
//           <div className="filtercontent">
//             <label
//               style={{
//                 color: "white",
//                 fontFamily: FONT.HELVETICA_REGULAR,
//                 fontSize: "18px",
//               }}
//             >
//               {item.val}
//             </label>
//           </div>
//         ))}
//       </div>

//       {/** Location contatiner */}
//       <div className="locationcontainer">
//         <div className="leftlocation">
//           {locationdata.map((item, index) => (
//             <div
//               className="leftlocationcontent"
//               style={{
//                 background:
//                   selectedLocation.id === item.id
//                     ? "linear-gradient(180deg, #7EC630, #3D6017)"
//                     : "linear-gradient(180deg, #1993FF, #0F5899)",
//               }}
//               key={item.id}
//               onClick={() => handleLocationClick(item)}
//             >
//               <label
//                 style={{
//                   color: "white",
//                   fontFamily: FONT.HELVETICA_REGULAR,
//                   fontSize: "18px",
//                 }}
//               >
//                 {item.name}
//               </label>

//               <label
//                 style={{
//                   color: "white",
//                   fontFamily: FONT.HELVETICA_REGULAR,
//                   fontSize: "10px",
//                 }}
//               >
//                 {item.limit}
//               </label>
//             </div>
//           ))}
//         </div>

//         <div className="rightlocation">
//             {
//                 locationdata.map((locationitem, index) => (
//                     locationitem.times.map((item, index) => (
//                         <div className="rightlocationcontent" key={item.id}>
//                           <label
//                             style={{
//                               color: "white",
//                               fontFamily: FONT.HELVETICA_REGULAR,
//                               fontSize: "60%",
//                             }}
//                           >
//                             {item.time}
//                           </label>
//                         </div>
//                       ))
//                 ))
//             }
          
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AllLocation;


// .main-content-container{
//     display: flex;
//     flex-direction: column;
//     flex: 1;

//     padding: 10px; /* Add some padding for better spacing */
// }

// .filtercontainer{
//     display: flex;
//     height: 5%;
//     width: calc(100% - 4%);
//     background-color: var(--grayHalfBg);
//     justify-content: center;
//     align-items: center;
//     border-radius: 40px;
//     margin-left: 2%;
//     margin-right: 2%;
    
// }

// .filtercontent{
//     display: flex;
//     width: 10%;
//     height: calc(100% - 6%);
//     background-color: var(--background);
//     border-radius: 10px;
//     margin: 2%;
//     justify-content: center;
//     align-items: center;
// }

// .locationcontainer{
//     height: 25%;
//     width: calc(100% - 2%); /* Adjust width to account for margin */
//     background: linear-gradient(180deg, #0162AF, #011833);
//     margin: 1%;
//     border-radius: 3vh;
//     display: flex;
//     flex-direction: row;

// }



// .leftlocation {
//     width: 20%;
//     height: 100%;
//     max-height: 100%; /* Ensure it doesn't exceed its parent container's height */
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start; /* Changed from center to flex-start */
//     align-items: center;
//     overflow-y: auto; /* Enable vertical scrolling */
//     gap: 5px;
//     padding: 5px; /* Add padding if necessary */
//     padding-left: 2%;
// }


// .leftlocationcontent{
//     height: 20%;
//     width: calc(100% - 5%);
//     background-color: var(--background);
//     padding: 10px;
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//     border-radius: 10px;
// }

// .leftlocationcontent:hover {
//     border: 2px solid var(--green); /* Change border color on hover */
//     cursor: pointer;
//   }


