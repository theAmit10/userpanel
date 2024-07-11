
import React from "react";
import "./Playhistory.css";
import { PiHandDepositBold } from "react-icons/pi";
import { PiHandWithdrawFill } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";

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
  return (
    <div className="history-main-container">
      {/** TITLE CONTAINER */}
      <label className="h-title-label">Play History</label>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container">
        {/** CONTENT */}
        {historydata.map((item, index) => (
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
                <label
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_Regular,
                    fontSize: "1.5vh",
                  }}
                >
                  Amount{" "}
                </label>
                <label
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_Bold,
                    fontSize: "1.8vh",
                  }}
                >
                  : 500 INR
                </label>
              </div>
              <div className="h-content-second-content-container-bottom">
                <label
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_SemiBold,
                    fontSize: "1.8vh",
                  }}
                >
                  Apr 19, 2024 05: 37 PM
                </label>
              </div>
            </div>
            {/** THIRD CONTAINER */}
            <div className="h-content-third">
              <div className="h-content-third-content-container-top">
                <label
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_SemiBold,
                    fontSize: "1.5vh",
                  }}
                >
                  Location
                </label>
              </div>
              <div className="h-content-third-content-container-bottom">
                <label
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_SemiBold,
                    fontSize: "2vh",
                  }}
                >
                  Delhi
                </label>
              </div>
            </div>
            {/** FOURTH CONTAINER */}
            <div className="h-content-fourth">
              <div className="h-content-third-content-container-top">
                <label
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_SemiBold,
                    fontSize: "1.5vh",
                  }}
                >
                  Time
                </label>
              </div>
              <div className="h-content-third-content-container-bottom">
                <label
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_SemiBold,
                    fontSize: "2vh",
                  }}
                >
                  09:00 AM
                </label>
              </div>
            </div>
            {/** FIFTH CONTAINER */}
            <div className="h-content-fifth">
            <div className="h-content-third-content-container-top">
                <label
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_SemiBold,
                    fontSize: "1.5vh",
                  }}
                >
                  Number
                </label>
              </div>
              <div className="h-content-third-content-container-bottom">
                <label
                  style={{
                    color: COLORS.white_s,
                    fontFamily: FONT.Montserrat_SemiBold,
                    fontSize: "2vh",
                  }}
                >
                  99
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playhistory;
