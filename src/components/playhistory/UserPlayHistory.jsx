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
import HeaderComp from "../helpercomp/HeaderComp";
import {
  useGetPowerballQuery,
  useGetSingleUserPlayHistoryQuery,
} from "../../redux/api";

function UserPlayHistory({ reloadKey, backHanndlerForPlayHistory, userdata }) {
  const { accesstoken, user } = useSelector((state) => state.user);
  console.log("userdata play history :: " + JSON.stringify(userdata));
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(false); // New loading state

  // const {
  //   data: historyapidatas,
  //   error,
  //   isLoading,
  //   refetch,
  // } = useGetPlayHistoryQuery(accesstoken);

  const {
    data: historyapidatas,
    error,
    isLoading,
    refetch,
  } = useGetSingleUserPlayHistoryQuery({
    accesstoken: accesstoken,
    userId: userdata.userId,
  });

  useEffect(() => {
    setLoading(true); // Show loading indicator on reloadKey change
    refetch().then(() => {
      setLoading(false); // Hide loading indicator after data is fetched
    });
    setExpandedItems({}); // Reset expanded items state
  }, [reloadKey, refetch]);

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
    if (!isLoading && data) {
      setGameName(data.games[0].name);
      console.log(data?.games[0].name);
    }
  }, [data, isLoading]); // Correct dependencies

  return (
    <div className="history-main-container-org">
      {/* <div className="alCreatLocationTopContainer">
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Play History
          </label>
        </div>
      </div> */}

      <div style={{ marginBottom: "1rem" }}>
        <HeaderComp
          title={"Play History"}
          closePartnerDetails={backHanndlerForPlayHistory}
        />
      </div>

      {/* Show loading indicator if loading is true */}
      {loading ? (
        <LoadingComponent /> // Show progress/loading component
      ) : (
        <div className="h-content-container">
          {isLoading ? (
            <LoadingComponent />
          ) : (
            historyapidatas?.playbets?.map((item) => (
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
                              <FaHandshake
                                color={COLORS.orange}
                                size={"3rem"}
                              />
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
                            {userdata?.country?.countrycurrencysymbol}
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
                              <FaHandshake
                                color={COLORS.orange}
                                size={"3rem"}
                              />
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
                            {userdata?.country?.countrycurrencysymbol}
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
        </div>
      )}
    </div>
  );
}

export default UserPlayHistory;
