import React, { useState } from "react";
import "./Withdrawpayment.css";
import FONT from "../../assets/constants/fonts";
import { FaRegPlayCircle } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";

function Withdrawpayment() {
  const [selectedPayment, setSelectedPayment] = useState("");

  const selectingPaymentType = (item) => {
    setSelectedPayment(item);
  };

  return (
    <div className="deposit-main-container">
      {/** TITLE CONTAINER */}
      <label className="h-title-label">Withdraw</label>
      {/** TITLE CONTAINER */}
      <label
        className="h-title-label"
        style={{
          fontFamily: FONT.Montserrat_Regular,
          fontSize: "3vh",
        }}
      >
        Choose Method
      </label>

      {/** Main Conatiner */}

      <div className="deposit-container">
        {/** UPI AND BANK */}
        <div className="deposit-content-container-main">
          {/** UPI */}
          <div
            className="deposit-content-container"
            onClick={() => selectingPaymentType("UPI")}
          >
            <div className="deposit-content-container-left">
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
              <label className="deposit-content-container-right-lebel">
                UPI Payment
              </label>
            </div>
          </div>

          {/** BANK */}
          <div
            className="deposit-content-container"
            onClick={() => selectingPaymentType("BANK")}
          >
            <div className="deposit-content-container-left">
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
              <label className="deposit-content-container-right-lebel">
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
            <div className="deposit-content-container-left">
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
              <label className="deposit-content-container-right-lebel">
                Paypal Payment
              </label>
            </div>
          </div>

          {/** SKRILL */}
          <div
            className="deposit-content-container"
            onClick={() => selectingPaymentType("SKRILL")}
          >
            <div className="deposit-content-container-left">
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
              <label className="deposit-content-container-right-lebel">
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
            <div className="deposit-content-container-left">
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
              <label className="deposit-content-container-right-lebel">
                Crypto Payment
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdrawpayment;
