import React, { useCallback, useEffect, useState } from "react";
import "./Playhistory.css";
import { PiHandDepositBold } from "react-icons/pi";
import { PiHandWithdrawFill } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetPlayHistoryQuery } from "../../helper/Networkcall";
import CircularProgressBar from "../helper/CircularProgressBar";

const historydata = [
  {
    id: 1,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 2,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 3,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 4,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 5,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 6,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 7,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
  {
    id: 8,
    type: "deposit",
    amount: "200INR",
    date: "Apr 19, 2024 05: 37 PM",
    paymenmethod: "UPI",
    transactionid: "3983983838833838",
    status: "success",
  },
];

function Playhistory() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { accesstoken, user } = useSelector((state) => state.user);
  const [expandedItems, setExpandedItems] = useState({});

  const {
    data: historyapidatas,
    error,
    isLoading,
    refetch,
  } = useGetPlayHistoryQuery(accesstoken);

  useEffect(
    useCallback(() => {
      // Refetch the data when the screen is focused
      refetch();
    }, [refetch])
  );

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
    <div className="history-main-container">
      {/** TITLE CONTAINER */}
      <label className="h-title-label-h">Play History</label>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container">
        {/** CONTENT */}

        {isLoading ? (
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
          historyapidatas.playbets.map((item, index) => (
            <div className="h-content">
              {/** FIRST CONTAINER */}
              <div className="h-content-first">
                <div className="h-content-first-content">
                  <div className="h-content-left-content-icon-container">
                    <FaRegPlayCircle color={COLORS.background} size={"2vw"} />
                  </div>
                </div>
              </div>
              {/** SECOND CONTAINER */}
              <div className="h-content-second">
                <div className="h-content-second-content-container-top">
                  <label className="h-content-second-content-container-top-amount">
                    Amount{" "}:{" "}
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
              {/** FIFTH CONTAINER */}
              <div className="h-content-fifth">
                <div className="h-content-third-content-container-top">
                  <label className="h-content-third-content-container-top-payment">
                    Number
                  </label>
                </div>
                <div className="h-content-third-content-container-bottom">
                  <label className="h-content-third-content-container-top-payment-val">
                    {getPlaynumbersString(item.playnumbers)}
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

export default Playhistory;
