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
import { CiEdit } from "react-icons/ci";
import { LoadingComponent } from "../helper/LoadingComponent";

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

  const { accesstoken, user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, []);

  const [showPN, setShowPN] = useState(true);
  const [showAU, setShowAU] = useState(false);

  return (
    <div className="pn-containter">
      {/** TOP NAVIGATION CONTATINER */}
      {/** SHOWING ALL WALLET */}
      {showPN && (
        <>
          <div className="alCreatLocationTopContainer">
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Wallet
              </label>
            </div>
          </div>

          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <div className="pnMainContainer">
                <div
                  className="hdAllContainer"
                  style={{ background: "transparent" }}
                >
                  {/** ALL USERS */}
                  <div className="hdAllContainerContent">
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {user.walletOne?.walletName}
                      </label>
                      {/* <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div> */}
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        {user.walletOne.balance}{" "}
                        {user?.country?.countrycurrencysymbol}
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>

                  {/** SINGLE USERS */}
                  <div className="hdAllContainerContent">
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {user.walletTwo?.walletName}
                      </label>
                      {/* <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div> */}
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        {user.walletTwo.balance}{" "}
                        {user?.country?.countrycurrencysymbol}
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default Wallet;
