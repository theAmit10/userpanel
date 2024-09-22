

import React, { useCallback, useEffect, useState } from "react";
import "./Playhistory.css";
import COLORS from "../../assets/constants/colors";
import { FaRegPlayCircle } from "react-icons/fa";
import {  useSelector } from "react-redux";
import { useGetPlayHistoryQuery } from "../../helper/Networkcall";
import { LoadingComponent } from "../helper/LoadingComponent";
import { showWarningToast } from "../helper/showErrorToast";

function Playhistory({reloadKey}) {

  const { accesstoken, user } = useSelector((state) => state.user);
  const [expandedItems, setExpandedItems] = useState({});

  const {
    data: historyapidatas,
    error,
    isLoading,
    refetch,
  } = useGetPlayHistoryQuery(accesstoken);

  // useEffect(
  //   useCallback(() => {
  //     // Refetch the data when the screen is focused
  //     refetch();
  //   }, [refetch])
  // );

  useEffect(() => {
    refetch();
    console.log("Relaoding again")
    showWarningToast("Loading...")
  },[refetch,reloadKey])

  const getPlaynumbersString = (playbets) => {
    // Map the array to extract playnumber and join them with ', '
    return playbets.map((playbet) => playbet.playnumber).join(" , ");
  };

  const calculateTotalAmount = (playbets) => {
    // Use reduce to accumulate the total amount
    return playbets.reduce((total, playbet) => total + playbet.amount, 0);
  };

  const formatDate = (dateString) => {
    // Split the date string into parts
    const [day, month, year] = dateString.split("-");

    // Create a Date object from the parts
    const date = new Date(`${year}-${month}-${day}`);

    // Use Intl.DateTimeFormat to format the date
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  console.log(isLoading, historyapidatas);

  return (
    <div className="history-main-container-org">
      {/** TITLE CONTAINER */}
      <div className="alCreatLocationTopContainer">
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Play History
          </label>
        </div>
      </div>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container">
        {/** CONTENT */}

        {isLoading ? (
          <LoadingComponent />
        ) : (
          historyapidatas.playbets.map((item, index) => (
            <div
              key={(item) => item._id.toString()}
              onClick={() => toggleItem(item._id)}
              style={{
                minHeight: expandedItems[item._id] ? "40rem" : "8rem",
                backgroundColor: COLORS.background,
                borderRadius: "2rem",
              }}
            >
              <div className="h-content-org">
                {/** FIRST CONTAINER */}
                <div className="h-content-first-history">
                  <div className="iconcontainertop">
                    <FaRegPlayCircle color={COLORS.background} size={"3rem"} />
                  </div>
                </div>
                {/** SECOND CONTAINER */}
                <div className="h-content-second">
                  <div className="h-content-second-content-container-top">
                    <label className="h-content-second-content-container-top-amount">
                    {`Amount : \u00A0`}
                    </label>
                    <label className="h-content-second-content-container-top-amount-val">
                      {calculateTotalAmount(item.playnumbers)}{" "}
                      {user.country.countrycurrencysymbol}
                    </label>
                  </div>
                  <div className="h-content-second-content-container-bottom">
                    <label className="h-content-second-content-container-top-date">
                      {formatDate(item.lotdate.lotdate)}
                    </label>
                  </div>
                </div>
                {/** THIRD CONTAINER */}
                <div className="h-content-third">
                  <div className="h-content-third-content-container-top">
                    <label className="h-content-third-content-container-top-payment">
                      Location
                    </label>
                  </div>
                  <div className="h-content-third-content-container-bottom">
                    <label className="h-content-third-content-container-top-payment-val">
                      {item.lotlocation.lotlocation}
                    </label>
                  </div>
                </div>
                {/** FOURTH CONTAINER */}
                <div className="h-content-fourth">
                  <div className="h-content-third-content-container-top">
                    <label className="h-content-third-content-container-top-payment">
                      Time
                    </label>
                  </div>
                  <div className="h-content-third-content-container-bottom">
                    <label className="h-content-third-content-container-top-payment-val">
                      {item.lottime.lottime}
                    </label>
                  </div>
                </div>

                <div className="h-content-fourth">
                  <div className="h-content-third-content-container-top">
                    <label className="h-content-third-content-container-top-payment">
                    Total bets
                    </label>
                  </div>
                  <div className="h-content-third-content-container-bottom">
                    <label className="h-content-third-content-container-top-payment-val">
                    {item.playnumbers.length}
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
                        Win Amt.
                      </label>
                    </div>
                  </div>

                  <div className="contentContainerPHD">
                    {item.playnumbers.map((pitem, pindex) => (
                      <div
                      key={pindex}
                      className="contentContainerPHDC">
                        <div className="hcphFirst">
                          <label className="h-content-third-content-container-top-payment-val">
                          {pitem.playnumber}
                          </label>
                        </div>
                        <div className="hcphSecond">
                          <label className="h-content-third-content-container-top-payment-val">
                          {pitem.amount}
                          </label>
                        </div>
                        <div className="hcphThird">
                          <label className="h-content-third-content-container-top-payment-val">
                          {pitem.winningamount}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Playhistory;
