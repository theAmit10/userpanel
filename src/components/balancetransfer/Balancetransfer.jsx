import React, { useCallback, useEffect, useState } from "react";
import "./Balancetransfer.css";
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
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlinePriceChange } from "react-icons/md";
import { LoadingComponent } from "../helper/LoadingComponent";

function Balancetransfer({reloadKey}) {
  const dispatch = useDispatch();

  const { accesstoken, user } = useSelector((state) => state.user);
  const [amountval, setAmountval] = useState("");

  const [transferWalletBalance, { isLoading, error }] =
    useTransferWalletBalanceMutation();

  const submitHandler = async () => {
    if (!amountval) {
      showErrorToast("Enter Amount");
    }
    if (isNaN(amountval)) {
      showErrorToast("Enter Valid Amount");
      return;
    }
     else {
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
    <div className="bt-main-container">
      {/** TITLE CONTAINER */}

      <div className="alCreatLocationTopContainer">
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Balance Transfer
          </label>
        </div>
      </div>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container-bt">
        {/** CONTENT */}

        {/** LEFT CONTAINER */}
        <div className="left-container-bt">
          <label className="h-title-label-medium-bt">Transfer Amount</label>
          <label className="alCLLabel">
            {" "}
            {user.walletOne.walletName} to {user.walletTwo.walletName}
          </label>
          {/** AMOUNT */}

          <label className="alCLLabel">Amount</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <MdOutlinePriceChange color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              placeholder="Enter amount"
              value={amountval}
              onChange={(e) => setAmountval(e.target.value)}
            />
          </div>

          <div
            style={{
              flex: 1,
              padding: "2rem",
              alignContent: "end",
            }}
          >
            {/** DEPOSIT BUTTON */}
            <div
              style={{
                marginTop: "2rem",
              }}
            >
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <button
                  onClick={submitHandler}
                  className="submit-btn-balance-transfer"
                >
                  Send
                </button>
              )}
            </div>
          </div>
        </div>

        {/** RIGHT CONTAINER */}
        <div className="right-container-bt">
          <div className="right-container-bt-one">
            <label className="alCLLabel">{user.walletOne.walletName}</label>
            <label className="alCLLabel">Balance</label>

            <div className="walletcontainer-bt">
              <FaWallet color={COLORS.background} size={"3rem"} />
            </div>

            <label className="alCLLabel">
              {user.walletOne.balance} {user?.country?.countrycurrencysymbol}
            </label>
          </div>
          <div className="right-container-bt-two">
            <label className="alCLLabel">{user.walletTwo.walletName}</label>
            <label className="alCLLabel">Balance</label>

            <div className="walletcontainer-bt">
              <FaWallet color={COLORS.background} size={"3rem"} />
            </div>

            <label className="alCLLabel">
              {user.walletTwo.balance} {user?.country?.countrycurrencysymbol}
            </label>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Balancetransfer;
