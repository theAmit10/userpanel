import React, { useCallback, useEffect, useState } from "react";
import "./History.css";
import { PiHandDepositBold, PiHandWithdrawBold } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { useSelector } from "react-redux";
import { useGetHistoryQuery } from "../../helper/Networkcall";
import moment from "moment";
import { LoadingComponent } from "../helper/LoadingComponent";

function Historyc() {
  const { accesstoken, user } = useSelector((state) => state.user);
  const [expandedItems, setExpandedItems] = useState({});
  const [reloadKey, setReloadKey] = useState(0); // For reloading the component

  console.log("Accesstoken :: " + accesstoken);
  console.log("User ID :: " + user.userId);

  const {
    data: historyapidatas,
    error,
    isLoading,
    refetch,
  } = useGetHistoryQuery({ accesstoken: accesstoken, userId: user.userId });

  useEffect(
    useCallback(() => {
      // Refetch the data when the screen is focused
      refetch();
    }, [refetch])
  );

  // Toggle item details
  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Reload component function
  const handleItemClick = (id) => {
    if (expandedItems[id]) {
      // If the same item is clicked, force reload by updating the reloadKey
      setReloadKey((prevKey) => prevKey + 1);
    }
    toggleItem(id);
  };

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format("MMMM DD, YYYY");
  };

  return (
    <div className="history-main-container-org" key={reloadKey}> {/* Key forces re-render when reloadKey changes */}
      {/** TITLE CONTAINER */}
      <div className="alCreatLocationTopContainer">
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">History</label>
        </div>
      </div>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container-org">
        {/** CONTENT */}
        {isLoading ? (
          <LoadingComponent />
        ) : (
          historyapidatas?.transactions.map((item, index) => (
            <div
              key={item.transactionId} // Ensure each item has a unique key
              className="h-content-org"
              onClick={() => handleItemClick(item.transactionId)} // Handle item click
            >
              {/** FIRST CONTAINER */}
              <div className="h-content-first-history">
                <div className="iconcontainertop">
                  {item.transactionType === "Deposit" ? (
                    <PiHandDepositBold color={COLORS.background} size={"3rem"} />
                  ) : (
                    <PiHandWithdrawBold color={COLORS.background} size={"3rem"} />
                  )}
                </div>
              </div>

              {/** SECOND CONTAINER */}
              <div className="h-content-second">
                <div className="h-content-second-content-container-top">
                  <label className="h-content-second-content-container-top-amount">
                    Amount :{" "}
                  </label>
                  <label className="h-content-second-content-container-top-amount-val">
                    {" "}{item.amount} {user.country.countrycurrencysymbol}
                  </label>
                </div>
                <div className="h-content-second-content-container-bottom">
                  <label className="h-content-second-content-container-top-date">
                    {formatDateTime(item.createdAt)}
                  </label>
                </div>
              </div>
              {/** THIRD CONTAINER */}
              <div className="h-content-third">
                <div className="h-content-third-content-container-top">
                  <label className="h-content-third-content-container-top-payment">
                    Payment Method
                  </label>
                </div>
                <div className="h-content-third-content-container-bottom">
                  <label className="h-content-third-content-container-top-payment-val">
                    {item.paymentType}
                  </label>
                </div>
              </div>
              {/** FOURTH CONTAINER */}
              <div className="h-content-fourth">
                <div className="h-content-third-content-container-top">
                  <label className="h-content-third-content-container-top-payment">
                    {item.transactionType === "Deposit" ? "Transaction ID" : ""}
                  </label>
                </div>
                <div className="h-content-third-content-container-bottom">
                  <label className="h-content-third-content-container-top-payment-val">
                    {item.transactionId}
                  </label>
                </div>
              </div>
              {/** FIFTH CONTAINER */}
              <div className="h-content-fifth">
                <div className="h-content-third-content-container-top">
                  {item.paymentStatus === "Completed" && (
                    <FaRegCheckCircle color={COLORS.green} size={"1.3em"} />
                  )}
                  {item.paymentStatus === "Pending" && (
                    <MdPendingActions color={COLORS.yellow} size={"1.3em"} />
                  )}
                  {item.paymentStatus === "Cancelled" && (
                    <FcCancel color={COLORS.red} size={"1.3em"} />
                  )}
                </div>
                <div className="h-content-third-content-container-bottom">
                  <label
                    className="h-content-third-content-container-bottom-status"
                    style={{
                      color:
                        item.paymentStatus === "Completed"
                          ? COLORS.green
                          : item.paymentStatus === "Cancelled"
                          ? COLORS.red
                          : COLORS.yellow,
                    }}
                  >
                    {item.paymentStatus}
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

export default Historyc;


// import React, { useCallback, useEffect, useState } from "react";
// import "./History.css";
// import { PiHandDepositBold } from "react-icons/pi";
// import { PiHandWithdrawFill } from "react-icons/pi";
// import COLORS from "../../assets/constants/colors";
// import FONT from "../../assets/constants/fonts";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { useGetHistoryQuery } from "../../helper/Networkcall";
// import CircularProgressBar from "../helper/CircularProgressBar";
// import moment from "moment";
// import { MdPendingActions } from "react-icons/md";
// import { FcCancel } from "react-icons/fc";
// import { PiHandWithdrawBold } from "react-icons/pi";
// import { LoadingComponent } from "../helper/LoadingComponent";



// function Historyc() {
//   const { accesstoken, user } = useSelector((state) => state.user);
//   const [expandedItems, setExpandedItems] = useState({});

//   console.log("Accesstoken :: " + accesstoken);
//   console.log("User ID :: " + user.userId);

//   const {
//     data: historyapidatas,
//     error,
//     isLoading,
//     refetch,
//   } = useGetHistoryQuery({ accesstoken: accesstoken, userId: user.userId });

//   useEffect(
//     useCallback(() => {
//       // Refetch the data when the screen is focused
//       refetch();
//     }, [refetch])
//   );

//   const toggleItem = (id) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const formatDateTime = (dateTimeString) => {
//     return moment(dateTimeString).format("MMMM DD, YYYY");
//   };

//   return (
//     <div className="history-main-container-org">
//       {/** TITLE CONTAINER */}
//       <div className="alCreatLocationTopContainer">
//         <div className="alCreatLocationTopContaineCL">
//           <label className="alCreatLocationTopContainerlabel">History</label>
//         </div>
//       </div>
//       {/** CONTENT CONTAINER */}
//       <div className="h-content-container-org">
//         {/** CONTENT */}
//         {isLoading ? (
//           <LoadingComponent />
//         ) : (
//           historyapidatas?.transactions.map((item, index) => (
//             <div className="h-content-org">
//               {/** FIRST CONTAINER */}
//               <div className="h-content-first-history">
//                 <div className="iconcontainertop">
//                   {item.transactionType === "Deposit" ? (
//                     <PiHandDepositBold
//                       color={COLORS.background}
//                       size={"3rem"}
//                     />
//                   ) : (
//                     <PiHandWithdrawBold
//                       color={COLORS.background}
//                       size={"3rem"}
//                     />
//                   )}
//                 </div>
//               </div>

//               {/** SECOND CONTAINER */}
//               <div className="h-content-second">
//                 <div className="h-content-second-content-container-top">
//                   <label className="h-content-second-content-container-top-amount">
//                     Amount :{" "}
//                   </label>
//                   <label className="h-content-second-content-container-top-amount-val">
//                     {" "}{item.amount} {user.country.countrycurrencysymbol}
//                   </label>
//                 </div>
//                 <div className="h-content-second-content-container-bottom">
//                   <label className="h-content-second-content-container-top-date">
//                     {formatDateTime(item.createdAt)}
//                   </label>
//                 </div>
//               </div>
//               {/** THIRD CONTAINER */}
//               <div className="h-content-third">
//                 <div className="h-content-third-content-container-top">
//                   <label className="h-content-third-content-container-top-payment">
//                     Payment Method
//                   </label>
//                 </div>
//                 <div className="h-content-third-content-container-bottom">
//                   <label className="h-content-third-content-container-top-payment-val">
//                     {item.paymentType}
//                   </label>
//                 </div>
//               </div>
//               {/** FOURTH CONTAINER */}
//               <div className="h-content-fourth">
//                 <div className="h-content-third-content-container-top">
//                   <label className="h-content-third-content-container-top-payment">
//                     {item.transactionType === "Deposit" ? "Transaction ID" : ""}
//                   </label>
//                 </div>
//                 <div className="h-content-third-content-container-bottom">
//                   <label className="h-content-third-content-container-top-payment-val">
//                     {item.transactionId}
//                   </label>
//                 </div>
//               </div>
//               {/** FIFTH CONTAINER */}
//               <div className="h-content-fifth">
//                 <div className="h-content-third-content-container-top">
//                   {item.paymentStatus === "Completed" && (
//                     <FaRegCheckCircle color={COLORS.green} size={"1.3em"} />
//                   )}
//                   {item.paymentStatus === "Pending" && (
//                     <MdPendingActions color={COLORS.yellow} size={"1.3em"} />
//                   )}
//                   {item.paymentStatus === "Cancelled" && (
//                     <FcCancel color={COLORS.red} size={"1.3em"} />
//                   )}
//                 </div>
//                 <div className="h-content-third-content-container-bottom">
//                   <label
//                     className="h-content-third-content-container-bottom-status"
//                     style={{
//                       color:
//                         item.paymentStatus === "Completed"
//                           ? COLORS.green
//                           : item.paymentStatus === "Cancelled"
//                           ? COLORS.red
//                           : COLORS.yellow,
//                     }}
//                   >
//                     {item.paymentStatus}
//                   </label>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Historyc;

