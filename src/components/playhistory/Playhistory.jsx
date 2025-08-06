import React, { useEffect, useState } from "react";
import "./Playhistory.css";
import COLORS from "../../assets/constants/colors";
import { FaHandshake, FaRegPlayCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetPlayHistoryQuery } from "../../helper/Networkcall";
import { LoadingComponent } from "../helper/LoadingComponent";
import { getTimeAccordingToTimezone } from "../alllocation/AllLocation";
import { getDateTimeAccordingToUserTimezone } from "../play/Play";
import { GiDiamondTrophy } from "react-icons/gi";
import {
  useGetPowerballQuery,
  useGetSingleUserPlayHistoryQuery,
} from "../../redux/api";
import { NodataFound } from "../helper/NodataFound";
import Loader from "../molecule/Loader";

function Playhistory({ reloadKey }) {
  const { accesstoken, user } = useSelector((state) => state.user);
  const [expandedItems, setExpandedItems] = useState({});
  // const [loading, setLoading] = useState(false); // New loading state

  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    data: paginatedData,
    isFetching: fetchingPaginated,
    isLoading: loadingPaginated,
    refetch,
  } = useGetSingleUserPlayHistoryQuery(
    { accesstoken, userId: user.userId, page, limit },
    { refetchOnMountOrArgChange: true } // Disable caching
  );

  useEffect(() => {
    setLoading(true); // Show loading indicator on reloadKey change
    // setPartners([]);
    setPage(1);
    refetch().then(() => {
      setLoading(false); // Hide loading indicator after data is fetched
    });
    setExpandedItems({}); // Reset expanded items state
  }, [reloadKey]);

  // Update Partners Data
  useEffect(() => {
    if (paginatedData?.playbets) {
      console.log(
        "Paginated data received for page",
        page,
        ":",
        paginatedData.playbets
      ); // Debug log
      setPartners((prev) => {
        // Filter out duplicates
        const newData = paginatedData.playbets.filter(
          (newItem) => !prev.some((prevItem) => prevItem._id === newItem._id)
        );
        return page === 1 ? paginatedData.playbets : [...prev, ...newData];
      });

      // Update hasMore correctly
      if (paginatedData.playbets.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [paginatedData, page]);

  // Load More Data
  const loadMore = () => {
    console.log("Loading more data..."); // Debug log
    if (!loading && hasMore) {
      setLoading(true);
      setPage((prev) => {
        console.log("Updating page to:", prev + 1); // Debug log
        return prev + 1;
      });
    }
  };

  // Handle Scroll for Pagination
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const threshold = 100; // Adjust this value as needed
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < threshold;
    console.log("Checking near bottom", isNearBottom); // Debug log
    if (isNearBottom && !loading && hasMore) {
      loadMore();
    }
  };

  // Reset loading state after data is fetched
  useEffect(() => {
    if (!fetchingPaginated) {
      setLoading(false);
    }
  }, [fetchingPaginated]);

  // Combined Loading State
  const isLoading = fetchingPaginated || loading;

  // useEffect(() => {
  //   refetch();
  //   console.log("Relaoding again");
  //   setExpandedItems({});
  // }, [refetch, reloadKey]);

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getPlaynumbersString = (playbets) => {
    return playbets.map((playbet) => playbet.playnumber).join(" , ");
  };

  const calculateTotalAmount = (playbets) => {
    return playbets.reduce((total, playbet) => total + playbet.amount, 0);
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  function extractNumberFromString(input) {
    return parseInt(input.slice(0, -1), 10);
  }

  function formatAmount(value) {
    if (typeof value === "string") {
      value = parseFloat(value); // Convert string to float if necessary
    }

    // Check if the number has decimals
    if (value % 1 === 0) {
      return value; // Return as is if it's a whole number
    } else {
      return parseFloat(value.toFixed(1)); // Return with one decimal point if it has decimals
    }
  }

  const [gameName, setGameName] = useState("");
  // Network call
  const { data, isLoading: powerballIsLoading } = useGetPowerballQuery(
    { accesstoken },
    { skip: !accesstoken }
  );

  useEffect(() => {
    if (!powerballIsLoading && data) {
      setGameName(data.games[0].name);
      console.log(data?.games[0].name);
    }
  }, [data, powerballIsLoading]); // Correct dependencies

  return (
    <div className="history-main-container-org">
      <div className="alCreatLocationTopContainer">
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Play History
          </label>
        </div>
      </div>

      {/* Show loading indicator if loading is true */}

      <div className="container-scrollable" onScroll={handleScroll}>
        {!loadingPaginated && partners.length === 0 ? (
          <NodataFound title={"No data Found"} />
        ) : (
          partners.map((item) => (
            <>
              {item.gameType === "playarena" ? (
                <div
                  key={item._id.toString()}
                  onClick={() => toggleItem(item._id)}
                  style={{
                    backgroundColor: COLORS.background,
                    borderRadius: "2rem",
                  }}
                >
                  <div className="h-content-org">
                    <div className="h-content-first-history">
                      <div className="iconcontainertop">
                        {item?.walletName ? (
                          item?.forProcess === "partnercredit" ? (
                            <FaHandshake color={COLORS.orange} size={"3rem"} />
                          ) : (
                            <FaRegPlayCircle
                              color={COLORS.orange}
                              size={"3rem"}
                            />
                          )
                        ) : (
                          <FaRegPlayCircle
                            color={COLORS.background}
                            size={"3rem"}
                          />
                        )}
                      </div>
                    </div>
                    <div className="h-content-second">
                      <div className="h-content-second-content-container-top">
                        <label className="h-content-second-content-container-top-amount">
                          {`Amount : \u00A0`}
                        </label>
                        <label className="h-content-second-content-container-top-amount-val">
                          {formatAmount(
                            calculateTotalAmount(item?.playnumbers)
                          )}{" "}
                          {user?.country?.countrycurrencysymbol}
                        </label>
                      </div>
                      <div className="h-content-second-content-container-bottom">
                        <label className="h-content-second-content-container-top-date">
                          {item?.lotdate?.lotdate
                            ? formatDate(
                                getDateTimeAccordingToUserTimezone(
                                  item?.lottime?.lottime,
                                  item?.lotdate?.lotdate,
                                  user?.country?.timezone
                                )
                              )
                            : ""}
                        </label>
                      </div>
                    </div>
                    <div className="h-content-third">
                      <div className="h-content-third-content-container-top">
                        <label className="h-content-third-content-container-top-payment">
                          Location
                        </label>
                      </div>
                      <div className="h-content-third-content-container-bottom">
                        <label className="h-content-third-content-container-top-payment-val">
                          {item?.lotlocation?.lotlocation}
                        </label>
                      </div>
                    </div>
                    <div className="h-content-fourth">
                      <div className="h-content-third-content-container-top">
                        <label className="h-content-third-content-container-top-payment">
                          Time
                        </label>
                      </div>
                      <div className="h-content-third-content-container-bottom">
                        <label className="h-content-third-content-container-top-payment-val">
                          {getTimeAccordingToTimezone(
                            item?.lottime?.lottime,
                            user?.country?.timezone
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="h-content-fourth">
                      <div className="h-content-third-content-container-top">
                        <label className="h-content-third-content-container-top-payment">
                          {item?.walletName
                            ? item?.forProcess === "partnercredit"
                              ? "Partner"
                              : "Winning No."
                            : "Total bets"}
                        </label>
                      </div>
                      <div className="h-content-third-content-container-bottom">
                        <label className="h-content-third-content-container-top-payment-val">
                          {item?.walletName
                            ? item?.forProcess === "partnercredit"
                              ? "Profit Credit"
                              : item?.playnumbers[0]?.playnumber
                            : item?.playnumbers?.length}
                        </label>
                      </div>
                    </div>
                  </div>

                  {expandedItems[item._id] && (
                    <>
                      <div className="headerContainerPH">
                        <div className="hcphFirst">
                          <label className="h-content-third-content-container-top-payment-val">
                            Number
                          </label>
                        </div>
                        <div className="hcphSecond">
                          <label className="h-content-third-content-container-top-payment-val">
                            {item?.walletName
                              ? item?.forProcess === "partnercredit"
                                ? ""
                                : "Amount"
                              : "Amount"}
                          </label>
                        </div>
                        <div className="hcphThird">
                          <label className="h-content-third-content-container-top-payment-val">
                            {item?.walletName
                              ? item?.forProcess === "partnercredit"
                                ? "Profit Amount"
                                : "Winning Amount"
                              : "Winning Amount"}
                          </label>
                        </div>
                      </div>

                      <div className="contentContainerPHD">
                        {item.playnumbers.map((pitem, pindex) => (
                          <div key={pindex} className="contentContainerPHDC">
                            <div className="hcphFirst">
                              <label className="h-content-third-content-container-top-payment-val">
                                {pitem?.playnumber}
                              </label>
                            </div>
                            <div className="hcphSecond">
                              <label className="h-content-third-content-container-top-payment-val">
                                {/* {item?.walletName
                                    ? pitem?.amount /
                                      extractNumberFromString(
                                        item?.lotlocation?.maximumReturn
                                      )
                                    : pitem?.amount} */}

                                {item?.walletName
                                  ? item?.forProcess === "partnercredit"
                                    ? ""
                                    : pitem?.amount /
                                      extractNumberFromString(
                                        item?.lotlocation?.maximumReturn
                                      )
                                  : pitem?.amount}
                              </label>
                            </div>
                            <div className="hcphThird">
                              <label className="h-content-third-content-container-top-payment-val">
                                {pitem?.winningamount}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div
                  key={item._id.toString()}
                  onClick={() => toggleItem(item._id)}
                  style={{
                    backgroundColor: COLORS.background,
                    borderRadius: "2rem",
                  }}
                >
                  <div className="h-content-org">
                    <div className="h-content-first-history">
                      <div className="iconcontainertop">
                        {item?.walletName ? (
                          item?.forProcess === "partnercredit" ? (
                            <FaHandshake color={COLORS.orange} size={"3rem"} />
                          ) : (
                            <GiDiamondTrophy
                              color={COLORS.orange}
                              size={"3rem"}
                            />
                          )
                        ) : (
                          <GiDiamondTrophy
                            color={COLORS.background}
                            size={"3rem"}
                          />
                        )}
                      </div>
                    </div>
                    <div className="h-content-second">
                      <div className="h-content-second-content-container-top">
                        <label className="h-content-second-content-container-top-amount">
                          {`Amount : \u00A0`}
                        </label>
                        <label className="h-content-second-content-container-top-amount-val">
                          {formatAmount(calculateTotalAmount(item?.tickets))}{" "}
                          {user?.country?.countrycurrencysymbol}
                        </label>
                      </div>
                      <div className="h-content-second-content-container-bottom">
                        <label className="h-content-second-content-container-top-date">
                          {item?.powerdate?.powerdate
                            ? formatDate(
                                getDateTimeAccordingToUserTimezone(
                                  item?.powertime?.powertime,
                                  item?.powerdate?.powerdate,
                                  user?.country?.timezone
                                )
                              )
                            : ""}
                        </label>
                      </div>
                    </div>

                    <div className="h-content-fourth">
                      <div className="h-content-third-content-container-top">
                        <label className="h-content-third-content-container-top-payment">
                          Playing
                        </label>
                      </div>
                      <div className="h-content-third-content-container-bottom">
                        <label className="h-content-third-content-container-top-payment-val">
                          {gameName}
                        </label>
                      </div>
                    </div>

                    <div className="h-content-fourth">
                      <div className="h-content-third-content-container-top">
                        <label className="h-content-third-content-container-top-payment">
                          Time
                        </label>
                      </div>
                      <div className="h-content-third-content-container-bottom">
                        <label className="h-content-third-content-container-top-payment-val">
                          {getTimeAccordingToTimezone(
                            item?.powertime?.powertime,
                            user?.country?.timezone
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="h-content-fourth">
                      <div className="h-content-third-content-container-top">
                        <label className="h-content-third-content-container-top-payment">
                          {item?.walletName
                            ? item?.forProcess === "partnercredit"
                              ? "Partner"
                              : "Winner"
                            : "Total Ticket"}
                        </label>
                      </div>
                      <div className="h-content-third-content-container-bottom">
                        <label className="h-content-third-content-container-top-payment-val">
                          {item?.walletName
                            ? item?.forProcess === "partnercredit"
                              ? "Profit Credit"
                              : "Ticket"
                            : item?.tickets.length}
                        </label>
                      </div>
                    </div>
                  </div>

                  {expandedItems[item._id] && (
                    <>
                      <div className="headerContainerPH">
                        <div className="hcphFirst">
                          <label className="h-content-third-content-container-top-payment-val">
                            Number
                          </label>
                        </div>
                        <div className="hcphSecond">
                          <label className="h-content-third-content-container-top-payment-val">
                            Tickets
                          </label>
                        </div>
                        <div className="hcphThird">
                          <label className="h-content-third-content-container-top-payment-val">
                            Amount
                          </label>
                        </div>
                      </div>

                      <div className="contentContainerPHD">
                        {item.tickets.map((pitem, pindex) => (
                          <div key={pindex} className="contentContainerPHDC">
                            <div className="hcphFirst">
                              <label className="h-content-third-content-container-top-payment-val">
                                {pindex + 1}
                              </label>
                            </div>
                            <div className="hcphSecond">
                              <label className="h-content-third-content-container-top-payment-val">
                                {pitem.usernumber.join(", ")}
                                {pitem.multiplier > 1
                                  ? ` - ${pitem.multiplier}X `
                                  : ""}
                              </label>
                            </div>
                            <div className="hcphThird">
                              <label className="h-content-third-content-container-top-payment-val">
                                {pitem.amount}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          ))
        )}

        {/* Show Loader only when fetching new data */}
        {isLoading && hasMore && <Loader />}

        {/* Show "No more data" message if there's no more data to load */}
        {/* {!hasMore && !isLoading && (
              <div style={{ textAlign: "center", padding: "10px" }}>
                No more data to load.
              </div>
            )} */}
      </div>
    </div>
  );
}

export default Playhistory;

// import React, { useCallback, useEffect, useState } from "react";
// import "./Playhistory.css";
// import COLORS from "../../assets/constants/colors";
// import { FaRegPlayCircle } from "react-icons/fa";
// import {  useSelector } from "react-redux";
// import { useGetPlayHistoryQuery } from "../../helper/Networkcall";
// import { LoadingComponent } from "../helper/LoadingComponent";
// import { showWarningToast } from "../helper/showErrorToast";
// import { getTimeAccordingToTimezone } from "../alllocation/AllLocation";
// import { getDateTimeAccordingToUserTimezone } from "../play/Play";

// function Playhistory({reloadKey}) {

//   const { accesstoken, user } = useSelector((state) => state.user);
//   const [expandedItems, setExpandedItems] = useState({});

//   console.log("Accesstoken :: " + accesstoken);
//   console.log("User ID :: " + user.userId);

//   const {
//     data: historyapidatas,
//     error,
//     isLoading,
//     refetch,
//   } = useGetPlayHistoryQuery(accesstoken);

//   useEffect(() => {
//     refetch();
//     console.log("Relaoding again");
//     setExpandedItems({});
//   }, [refetch, reloadKey]);

//   const toggleItem = (id) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const getPlaynumbersString = (playbets) => {
//     // Map the array to extract playnumber and join them with ', '
//     return playbets.map((playbet) => playbet.playnumber).join(" , ");
//   };

//   const calculateTotalAmount = (playbets) => {
//     // Use reduce to accumulate the total amount
//     return playbets.reduce((total, playbet) => total + playbet.amount, 0);
//   };

//   const formatDate = (dateString) => {
//     // Split the date string into parts
//     const [day, month, year] = dateString.split("-");

//     // Create a Date object from the parts
//     const date = new Date(`${year}-${month}-${day}`);

//     // Use Intl.DateTimeFormat to format the date
//     const options = { year: "numeric", month: "short", day: "numeric" };
//     const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
//       date
//     );

//     return formattedDate;
//   };

//   // console.log(isLoading, historyapidatas);

//   function extractNumberFromString(input) {
//     // Remove the last character (assuming it's always 'X') and convert the result to a number
//     return parseInt(input.slice(0, -1), 10);
//   }

//   // useEffect(() => {
//   //   if(historyapidatas){
//   //     console.log("getting bett");
//   //     console.log(historyapidatas.playbets[0])
//   //   }
//   // },[])

//   return (
//     <div className="history-main-container-org">
//       {/** TITLE CONTAINER */}
//       <div className="alCreatLocationTopContainer">
//         <div className="alCreatLocationTopContaineCL">
//           <label className="alCreatLocationTopContainerlabel">
//             Play History
//           </label>
//         </div>
//       </div>
//       {/** CONTENT CONTAINER */}
//       <div className="h-content-container">
//         {/** CONTENT */}

//         {isLoading ? (
//           <LoadingComponent />
//         ) : (
//           historyapidatas.playbets.map((item, index) => (
//             <div
//               key={(item) => item._id.toString()}
//               onClick={() => toggleItem(item._id)}
//               style={{
//                 minHeight: expandedItems[item._id] ? "40rem" : "8rem",
//                 backgroundColor: COLORS.background,
//                 borderRadius: "2rem",
//               }}
//             >
//               <div className="h-content-org">
//                 {/** FIRST CONTAINER */}
//                 <div className="h-content-first-history">
//                   <div className="iconcontainertop">
//                     <FaRegPlayCircle color={ item?.walletName ? COLORS.green : COLORS.background} size={"3rem"} />
//                   </div>
//                 </div>
//                 {/** SECOND CONTAINER */}
//                 <div className="h-content-second">
//                   <div className="h-content-second-content-container-top">
//                     <label className="h-content-second-content-container-top-amount">
//                     {`Amount : \u00A0`}
//                     </label>
//                     <label className="h-content-second-content-container-top-amount-val">
//                       {calculateTotalAmount(item?.playnumbers)}{" "}
//                       {user?.country?.countrycurrencysymbol}
//                     </label>
//                   </div>
//                   <div className="h-content-second-content-container-bottom">
//                     <label className="h-content-second-content-container-top-date">
//                       { item?.lotdate?.lotdate ? formatDate(getDateTimeAccordingToUserTimezone(
//                                       item?.lottime?.lottime,
//                                       item?.lotdate?.lotdate,
//                                       user?.country?.timezone
//                                     )): ""}
//                     </label>
//                   </div>
//                 </div>
//                 {/** THIRD CONTAINER */}
//                 <div className="h-content-third">
//                   <div className="h-content-third-content-container-top">
//                     <label className="h-content-third-content-container-top-payment">
//                       Location
//                     </label>
//                   </div>
//                   <div className="h-content-third-content-container-bottom">
//                     <label className="h-content-third-content-container-top-payment-val">
//                       {item?.lotlocation?.lotlocation}
//                     </label>
//                   </div>
//                 </div>
//                 {/** FOURTH CONTAINER */}
//                 <div className="h-content-fourth">
//                   <div className="h-content-third-content-container-top">
//                     <label className="h-content-third-content-container-top-payment">
//                       Time
//                     </label>
//                   </div>
//                   <div className="h-content-third-content-container-bottom">
//                     <label className="h-content-third-content-container-top-payment-val">
//                       {getTimeAccordingToTimezone(
//                                   item?.lottime?.lottime,
//                                   user?.country?.timezone,
//                                 )}
//                     </label>
//                   </div>
//                 </div>

//                 <div className="h-content-fourth">
//                   <div className="h-content-third-content-container-top">
//                     <label className="h-content-third-content-container-top-payment">
//                     {item?.walletName ? 'Winning No.' : "Total bets"}
//                     </label>
//                   </div>
//                   <div className="h-content-third-content-container-bottom">
//                     <label className="h-content-third-content-container-top-payment-val">
//                     {item?.walletName ? item?.playnumbers[0]?.playnumber : item?.playnumbers?.length}
//                     </label>
//                   </div>
//                 </div>

//               </div>

//               {expandedItems[item._id] && (
//                 <>
//                   <div className="headerContainerPH">
//                     <div className="hcphFirst">
//                       <label className="h-content-third-content-container-top-payment-val">
//                         Number
//                       </label>
//                     </div>
//                     <div className="hcphSecond">
//                       <label className="h-content-third-content-container-top-payment-val">
//                         Amount
//                       </label>
//                     </div>
//                     <div className="hcphThird">
//                       <label className="h-content-third-content-container-top-payment-val">
//                       Winning Amount
//                       </label>
//                     </div>
//                   </div>

//                   <div className="contentContainerPHD">
//                     {item.playnumbers.map((pitem, pindex) => (
//                       <div
//                       key={pindex}
//                       className="contentContainerPHDC">
//                         <div className="hcphFirst">
//                           <label className="h-content-third-content-container-top-payment-val">
//                           {pitem?.playnumber}
//                           </label>
//                         </div>
//                         <div className="hcphSecond">
//                           <label className="h-content-third-content-container-top-payment-val">
//                           {item?.walletName
//                               ? pitem?.amount /
//                                 extractNumberFromString(
//                                   item?.lotlocation?.maximumReturn
//                                 )
//                               : pitem?.amount}
//                           </label>
//                         </div>
//                         <div className="hcphThird">
//                           <label className="h-content-third-content-container-top-payment-val">
//                           {pitem?.winningamount}
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default Playhistory;
