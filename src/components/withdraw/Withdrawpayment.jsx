import React, { useState } from "react";
import "./Withdrawpayment.css";
import FONT from "../../assets/constants/fonts";
import { FaRegPlayCircle } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import UpiWithdraw from "./UpiWithdraw";
import { ToastContainer } from "react-toastify";
import BankWithdraw from "./BankWithdraw";
import PaypalWithdraw from "./PaypalWithdraw";
import SkrillWithdraw from "./SkrillWithdraw";
import CryptoWithdraw from "./CryptoWithdraw";

function Withdrawpayment() {
  const [selectedPayment, setSelectedPayment] = useState("");

  const selectingPaymentType = (item) => {
    setSelectedPayment(item);
  };

  return (
    <div className="history-main-container">
      {selectedPayment === "" && (
        <>
          {/** TITLE CONTAINER */}
          <label className="h-title-label-h">Withdraw</label>
          {/** TITLE CONTAINER */}
          <label className="h-title-label-h">Choose Method</label>

          {/** Main Conatiner */}

          <div className="deposit-container">
            {/** UPI AND BANK */}
            <div className="deposit-content-container-main">
              {/** UPI */}
              <div
                className="deposit-content-container"
                onClick={() => selectingPaymentType("UPI")}
              >
                <div className="deposit-content-container-left-deposit">
                  <div
                    className="deposit-content-content-left-content-icon-container"
                    style={{
                      borderRadius: "1vh",
                    }}
                  >
                    <img
                      src={images.upi}
                      alt="UPI"
                      className="deposit-content-image-setting"
                    />
                  </div>
                </div>
                <div className="deposit-content-container-right">
                  <label className="deposit-content-container-right-lebel-or">
                    UPI Payment
                  </label>
                </div>
              </div>

              {/** BANK */}
              <div
                className="deposit-content-container"
                onClick={() => selectingPaymentType("BANK")}
              >
                <div className="deposit-content-container-left-deposit">
                  <div
                    className="deposit-content-content-left-content-icon-container"
                    style={{
                      borderRadius: "1vh",
                    }}
                  >
                    <img
                      src={images.bank}
                      alt="UPI"
                      className="deposit-content-image-setting"
                    />
                  </div>
                </div>
                <div className="deposit-content-container-right">
                  <label className="deposit-content-container-right-lebel-or">
                    Bank Payment
                  </label>
                </div>
              </div>
            </div>

            {/** PAYAPAL AND SKRILL */}
            <div className="deposit-content-container-main">
              {/** PAYPAL */}
              <div
                className="deposit-content-container"
                onClick={() => selectingPaymentType("PAYPAL")}
              >
                <div className="deposit-content-container-left-deposit">
                  <div
                    className="deposit-content-content-left-content-icon-container"
                    style={{
                      borderRadius: "1vh",
                    }}
                  >
                    <img
                      src={images.paypal}
                      alt="UPI"
                      className="deposit-content-image-setting"
                    />
                  </div>
                </div>
                <div className="deposit-content-container-right">
                  <label className="deposit-content-container-right-lebel-or">
                    Paypal Payment
                  </label>
                </div>
              </div>

              {/** SKRILL */}
              <div
                className="deposit-content-container"
                onClick={() => selectingPaymentType("SKRILL")}
              >
                <div className="deposit-content-container-left-deposit">
                  <div
                    className="deposit-content-content-left-content-icon-container"
                    style={{
                      borderRadius: "1vh",
                    }}
                  >
                    <img
                      src={images.skrill}
                      alt="UPI"
                      className="deposit-content-image-setting"
                    />
                  </div>
                </div>
                <div className="deposit-content-container-right">
                  <label className="deposit-content-container-right-lebel-or">
                    Skrill Payment
                  </label>
                </div>
              </div>
            </div>

            {/** CRYPTO  */}
            <div className="deposit-content-container-main">
              {/** CRYPTO */}
              <div
                className="deposit-content-container"
                onClick={() => selectingPaymentType("CRYPTO")}
              >
                <div className="deposit-content-container-left-deposit">
                  <div
                    className="deposit-content-content-left-content-icon-container"
                    style={{
                      borderRadius: "1vh",
                    }}
                  >
                    <img
                      src={images.crypto}
                      alt="UPI"
                      className="deposit-content-image-setting"
                    />
                  </div>
                </div>
                <div className="deposit-content-container-right">
                  <label className="deposit-content-container-right-lebel-or">
                    Crypto Payment
                  </label>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedPayment === "UPI" && (
        <UpiWithdraw selectingPaymentType={selectingPaymentType} />
      )}
      {selectedPayment === "BANK" && (
        <BankWithdraw selectingPaymentType={selectingPaymentType} />
      )}

      {selectedPayment === "PAYPAL" && (
        <PaypalWithdraw selectingPaymentType={selectingPaymentType} />
      )}

      {selectedPayment === "SKRILL" && (
        <SkrillWithdraw selectingPaymentType={selectingPaymentType} />
      )}

      {selectedPayment === "CRYPTO" && (
        <CryptoWithdraw selectingPaymentType={selectingPaymentType} />
      )}

      <ToastContainer />
    </div>
  );
}

export default Withdrawpayment;
