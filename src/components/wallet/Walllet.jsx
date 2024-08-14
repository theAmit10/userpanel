import React, { useCallback, useEffect, useState } from "react";
import "./Wallet.css";
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

function Wallet() {
  const dispatch = useDispatch();

  const { accesstoken, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadProfile(accesstoken))
  },[])


  return (
    <div className="history-main-container">
      {/** TITLE CONTAINER */}
      <label className="h-title-label" style={{marginLeft: '1vw'}}>All Wallet</label>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container-bt">
        {/** CONTENT */}

        {/** LEFT CONTAINER */}
        <div className="left-container-bt" style={{flexDirection: 'row'}}>
          <div className="right-container-bt-one">
            <label className="h-title-label">
              {user.walletOne.walletName}
            </label>
            <label className="h-title-label-medium">Balance</label>

            <div className="walletcontainer-bt">
              <FaWallet color={COLORS.background} size={"30px"} />
            </div>

            <label className="h-title-label-medium">
              {user.walletOne.balance} {user?.country?.countrycurrencysymbol}
            </label>
          </div>

          <div className="right-container-bt-two">
            <label className="h-title-label">
              {user.walletTwo.walletName}
            </label>
            <label className="h-title-label-medium">Balance</label>

            <div className="walletcontainer-bt">
              <FaWallet color={COLORS.background} size={"30px"} />
            </div>

            <label className="h-title-label-medium">
              {user.walletTwo.balance} {user?.country?.countrycurrencysymbol}
            </label>
          </div>
        </div>


   
        
      </div>
      <ToastContainer />
    </div>
  );
}

export default Wallet;
