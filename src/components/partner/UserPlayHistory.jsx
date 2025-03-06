import React, { useEffect, useState } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import "./Partner.css";
import { useSelector } from "react-redux";
import { useGetSingleUserPlayHistoryQuery } from "../../redux/api";
import Loader from "../molecule/Loader";
import COLORS from "../../assets/constants/colors";
import { FaRegPlayCircle } from "react-icons/fa";
import { GiDiamondTrophy } from "react-icons/gi";
import { getDateTimeAccordingToUserTimezone } from "../play/Play";
import { getTimeAccordingToTimezone } from "../alllocation/AllLocation";

const UserPlayHistory = ({ setSelectedCategory, selectedPartner }) => {
  const { accesstoken, user } = useSelector((state) => state.user);
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(false); // New loading state

  const {
    data: historyapidatas,
    error,
    isLoading,
    refetch,
  } = useGetSingleUserPlayHistoryQuery({
    accesstoken: accesstoken,
    userId: selectedPartner.userId,
  });

  useEffect(() => {
    setLoading(true); // Show loading indicator on change
    refetch().then(() => {
      setLoading(false); // Hide loading indicator after data is fetched
    });
    setExpandedItems({}); // Reset expanded items state
  }, [refetch]);

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

  return (
    <div className="partner-main-container">
      <HeaderComp
        title={"Play History"}
        setSelectedCategory={setSelectedCategory}
        left={selectedPartner?.userId}
        right={selectedPartner?.name}
      />

      <div className="container-scrollable">
        {isLoading ? (
          <Loader />
        ) : (
          historyapidatas?.playbets?.map((item) => (
            <>
              {item.gameType === "playarena" ? (
                <div
                  key={item._id.toString()}
                  onClick={() => toggleItem(item._id)}
                  style={{
                    minHeight: expandedItems[item._id] ? "40rem" : "8rem",
                    backgroundColor: COLORS.background,
                    borderRadius: "2rem",
                  }}
                >
                  <div className="h-content-org">
                    <div className="h-content-first-history">
                      <div className="iconcontainertop">
                        <FaRegPlayCircle
                          color={
                            item?.walletName ? COLORS.green : COLORS.background
                          }
                          size={"3rem"}
                        />
                      </div>
                    </div>
                    <div className="h-content-second">
                      <div className="h-content-second-content-container-top">
                        <label className="h-content-second-content-container-top-amount">
                          {`Amount : \u00A0`}
                        </label>
                        <label className="h-content-second-content-container-top-amount-val">
                          {calculateTotalAmount(item?.playnumbers)}{" "}
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
                          {item?.walletName ? "Winning No." : "Total bets"}
                        </label>
                      </div>
                      <div className="h-content-third-content-container-bottom">
                        <label className="h-content-third-content-container-top-payment-val">
                          {item?.walletName
                            ? item?.playnumbers[0]?.playnumber
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
                            Amount
                          </label>
                        </div>
                        <div className="hcphThird">
                          <label className="h-content-third-content-container-top-payment-val">
                            Winning Amount
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
                                {item?.walletName
                                  ? pitem?.amount /
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
                    minHeight: expandedItems[item._id] ? "40rem" : "8rem",
                    backgroundColor: COLORS.background,
                    borderRadius: "2rem",
                  }}
                >
                  <div className="h-content-org">
                    <div className="h-content-first-history">
                      <div className="iconcontainertop">
                        <GiDiamondTrophy
                          color={
                            item?.walletName ? COLORS.green : COLORS.background
                          }
                          size={"3rem"}
                        />
                      </div>
                    </div>
                    <div className="h-content-second">
                      <div className="h-content-second-content-container-top">
                        <label className="h-content-second-content-container-top-amount">
                          {`Amount : \u00A0`}
                        </label>
                        <label className="h-content-second-content-container-top-amount-val">
                          {calculateTotalAmount(item?.tickets)}{" "}
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
                          {item?.walletName ? "Winner Ticket" : "Total Ticket"}
                        </label>
                      </div>
                      <div className="h-content-third-content-container-bottom">
                        <label className="h-content-third-content-container-top-payment-val">
                          {item?.walletName
                            ? item.playnumbers[0]?.playnumber
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
    </div>
  );
};

export default UserPlayHistory;
