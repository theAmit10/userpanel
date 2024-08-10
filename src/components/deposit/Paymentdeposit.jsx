import React, { useState } from "react";
import "./Paymentdeposit.css";
import FONT from "../../assets/constants/fonts";
import { FaRegPlayCircle } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import Upideposit from "./Upideposit";
import Bankdeposit from "./Bankdeposit";
import Skrilldeposit from "./Skrilldeposit";
import Paypaldeposit from "./Paypaldeposit";
import Cryptodeposit from "./Cryptodeposit";

function Paymentdeposit() {
  const [selectedPayment, setSelectedPayment] = useState("");

  const selectingPaymentType = (item) => {
    setSelectedPayment(item);
  };

  return (
    <div className="deposit-main-container">
      {selectedPayment === "" && (
        <>
        
          {/** TITLE CONTAINER */}
          <label className="h-title-label">Deposit</label>
          {/** TITLE CONTAINER */}
          <label className="h-title-label">Choose Method</label>

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
            <div
              className="deposit-content-container-main"
              onClick={() => selectingPaymentType("CRYPTO")}
            >
              {/** CRYPTO */}
              <div className="deposit-content-container">
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
        </>
      )}

      {selectedPayment === "UPI" && <Upideposit selectingPaymentType={selectingPaymentType} />}
      {selectedPayment === "BANK" && <Bankdeposit selectingPaymentType={selectingPaymentType} />}
      {selectedPayment === "SKRILL" && <Skrilldeposit selectingPaymentType={selectingPaymentType} />}
      {selectedPayment === "PAYPAL" && <Paypaldeposit selectingPaymentType={selectingPaymentType} />}
      {selectedPayment === "CRYPTO" && <Cryptodeposit selectingPaymentType={selectingPaymentType} />}
    </div> 
  );
}

export default Paymentdeposit;
