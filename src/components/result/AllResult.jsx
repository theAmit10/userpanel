import React, { useCallback, useEffect, useState } from "react";
import "./AllResult.css";
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
import { useTransferWalletBalanceMutation } from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { loadProfile } from "../../redux/actions/userAction";
import { FaWallet } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

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
      { id: "18", time: "09:00 AM" },
      { id: "19", time: "10:00 AM" },
      { id: "20", time: "11:00 AM" },
      { id: "21", time: "12:00 PM" },
      { id: "22", time: "01:00 PM" },
      { id: "23", time: "02:00 PM" },
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

function AllResult() {
  const dispatch = useDispatch();

  const { accesstoken, user } = useSelector((state) => state.user);
  const [amountval, setAmountval] = useState("");

  const [transferWalletBalance, { isLoading, error }] =
    useTransferWalletBalanceMutation();

  const handleSelecteditemClick = (item, timedata) => {
    setSelectedItem(false);
    setSelectedLocation(item);
    setSelectedTime(timedata);
  };

  const submitHandler = async () => {
    if (!amountval) {
      showErrorToast("Enter Amount");
    } else {
      try {
        const body = {
          amount: amountval,
          userid: user._id,
        };

        console.log("Request body :: " + JSON.stringify(body));

        const res = await transferWalletBalance({
          accessToken: accesstoken,
          body,
        }).unwrap();

        console.log("Withdraw res :: " + JSON.stringify(res));

        showSuccessToast(res.message);
        dispatch(loadProfile(accesstoken));
        setAmountval("");
      } catch (error) {
        console.log("Error during withdraw:", error);
        showErrorToast("Balance transfer failed");
        showErrorToast(error.data.message);
      }
    }
  };

  return (
    <div className="history-main-container">
      {/** TITLE CONTAINER */}
      <label className="h-title-label">Results</label>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container-result">
        {/** CONTENT */}

        <div className="all-location-result">
          {locationdata.map((item, index) => (
            <div
              key={index}
              className="location-header-result"
              style={{
                background:
                  index % 2 === 0
                    ? "linear-gradient(90deg, #1993FF, #0F5899)"
                    : "linear-gradient(90deg, #7EC630, #3D6017)",
              }}
            >
              <span className="location-header-label">{item.name}</span>
              <span className="location-header-max-label">
                Max {item.limit}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AllResult;
