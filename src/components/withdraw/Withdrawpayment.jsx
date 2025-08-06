import React, { useEffect, useState } from "react";
import "./Withdrawpayment.css";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import UpiWithdraw from "./UpiWithdraw";
import BankWithdraw from "./BankWithdraw";
import PaypalWithdraw from "./PaypalWithdraw";
import SkrillWithdraw from "./SkrillWithdraw";
import CryptoWithdraw from "./CryptoWithdraw";
import { CiEdit } from "react-icons/ci";
import { FaWallet } from "react-icons/fa";
import { HiMiniWallet } from "react-icons/hi2";
import HeaderComp from "../helpercomp/HeaderComp";
import Balancetransfer from "../balancetransfer/Balancetransfer";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { PiContactlessPaymentFill } from "react-icons/pi";

export const roundToInteger = (input) => {
  // Convert input to a float
  const floatValue = parseFloat(input);

  // Check if it's a valid number
  if (isNaN(floatValue)) {
    return "Invalid number"; // Handle invalid input
  }

  // Check if the number is already an integer
  if (Number.isInteger(floatValue)) {
    return floatValue; // Return the number as it is
  }

  // Return the integer part (without rounding)
  return Math.floor(floatValue);
};
function Withdrawpayment({ reloadKey }) {
  const { user, accesstoken } = useSelector((state) => state.user);
  const [selectedPayment, setSelectedPayment] = useState("withdrawdashboard");

  const selectingPaymentType = (item) => {
    setSelectedPayment(item);
  };

  useEffect(() => {
    console.log("reloadKey :: " + reloadKey);
    setSelectedPayment("withdrawdashboard");
  }, [reloadKey]);

  const closeWithdraw = () => {
    setSelectedPayment("withdrawdashboard");
  };
  const closeBalanceTransfer = () => {
    setSelectedPayment("withdrawdashboard");
  };

  return (
    <div className="pdContainer">
      {selectedPayment === "withdrawdashboard" && (
        <div className="alCreatLocationTopContainer">
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              Payment Withdraw
            </label>
          </div>
        </div>
      )}

      {selectedPayment === "withdrawdashboard" && (
        <div className="pnMainContainer">
          <div className="hdAllContainer" style={{ background: "transparent" }}>
            {/** CRYPTO  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("balancetransfer")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Balance Transfer
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Transfer balance to game wallet
                </label>

                <div className="hdContenContainerIcon">
                  <HiMiniWallet color={"#000"} size={"2.5rem"} />
                </div>
              </div>
            </div>

            {/** PAYPAL  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Withdraw
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  {roundToInteger(user?.walletOne?.balance)}{" "}
                  {user?.country?.countrycurrencysymbol}
                </label>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Transfer money to personal wallet
                </label>

                <div className="hdContenContainerIcon">
                  <FaWallet color={"#000"} size={"2.5rem"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPayment === "" && (
        <div
          style={{
            margin: "1rem",
          }}
        >
          <HeaderComp
            title={"Select Withdrawal Option"}
            closePartnerDetails={closeWithdraw}
          />
        </div>
      )}

      {/** SHOWING ALL WALLET */}
      {selectedPayment === "" && (
        <div className="pnMainContainer">
          <div className="hdAllContainer" style={{ background: "transparent" }}>
            {/** CRYPTO  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("crypto")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Crypto
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Crypto Payment Withdraw
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.crypto}
                    color={COLORS.background}
                    size={"2.5rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>

            {/** PAYPAL  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("paypal")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Paypal
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Paypal Payment Withdraw
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.paypal}
                    color={COLORS.background}
                    size={"2.5rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>

            {/** SKRILL */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("skrill")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Skrill
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Skrill Payment Withdraw
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.skrill}
                    color={COLORS.background}
                    size={"2.5rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>

            {/** Bank */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("bank")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Bank
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Bank Payment Withdraw
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.bank}
                    color={COLORS.background}
                    className="pdicon"
                    size={"2.5rem"}
                  />
                </div>
              </div>
            </div>

            {/** UPI  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("upi")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">UPI</label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create UPI Payment Withdraw
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.upi}
                    color={COLORS.background}
                    size={"1rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>

            {/** OTHER  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("other")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Other
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Other Payment Withdraw
                </label>
                <div className="hdContenContainerIcon">
                  <PiContactlessPaymentFill
                    color={COLORS.background}
                    size={"2.5rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPayment === "upi" && (
        <UpiWithdraw selectingPaymentType={selectingPaymentType} />
      )}
      {selectedPayment === "bank" && (
        <BankWithdraw selectingPaymentType={selectingPaymentType} />
      )}
      {selectedPayment === "skrill" && (
        <SkrillWithdraw selectingPaymentType={selectingPaymentType} />
      )}
      {selectedPayment === "paypal" && (
        <PaypalWithdraw selectingPaymentType={selectingPaymentType} />
      )}
      {selectedPayment === "crypto" && (
        <CryptoWithdraw selectingPaymentType={selectingPaymentType} />
      )}

      {selectedPayment === "balancetransfer" && (
        <Balancetransfer
          reloadKey={reloadKey}
          showbackbuttion={true}
          closeBalanceTransfer={closeBalanceTransfer}
        />
      )}
    </div>
  );
}

export default Withdrawpayment;
