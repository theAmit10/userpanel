import React, { useState } from "react";
import "./Upideposit.css";
import FONT from "../../assets/constants/fonts";
import { FaRegPlayCircle } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { flushSync } from "react-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const upiapidata = [
  { name: "Wasu", upiid: "9876543210@ybl", id: "1" },
  { name: "Aman", upiid: "8876543210@ybl", id: "2" },
  { name: "Zasu", upiid: "7876543210@ybl", id: "3" },
  { name: "Masu", upiid: "1876543210@ybl", id: "4" },
  { name: "Kasu", upiid: "2876543210@ybl", id: "5" },
];

function Skrilldeposit({ selectingPaymentType }) {
  const navigate = useNavigate();
  const [amountval, setAmountval] = useState("");
  const [transactionval, setTransactionval] = useState("");
  const [remarkval, setRemarkval] = useState("");

  const goToPreviousPage = () => {
    selectingPaymentType(""); // Resetting selectedPayment in the parent
    console.log("GOING PREVIOUS PAGE");
  };

  const [selectedItem, setSelecetedItem] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const selecetingItemForDeposit = (item) => {
    setSelecetedItem(item);
  };

  const showingPaymentForm = () => {
    setShowPaymentForm(true);
  };

  return (
    <div className="deposit-main-container">
      {/** TOP CONTAINER */}
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <IoArrowBackCircleOutline
          onClick={goToPreviousPage}
          color={COLORS.white_s}
          size={"2.5em"}
        />

        {/** TITLE CONTAINER */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label className="h-title-label">Skrill Deposit</label>
        </div>
      </div>

      {/** TITLE CONTAINER */}
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <label
          className="h-title-label"
          style={{ fontFamily: FONT.Montserrat_Regular }}
        >
          Choose Method
        </label>
        {/** NEXT CONTAINER AFTER SELECTING PAYMENT */}
        {selectedItem !== "" && !showPaymentForm && (
          <div
            onClick={showingPaymentForm}
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div className="nextcontatiner-upi-deposit">
              <label
                className="deposit-content-container-right-lebel"
                style={{
                  fontFamily: FONT.Montserrat_SemiBold,
                  fontSize: "1.5vw",
                  cursor: "pointer",
                }}
              >
                Next
              </label>
            </div>
          </div>
        )}
      </div>

      {/** Main Conatiner */}

      <div className="deposit-container">
        <div className="deposit-content-container-main-upi">
          {/** LEFT LIST OF DEPOSIT */}

          {!showPaymentForm && (
            <div className="deposit-content-container-left-upi-left">
              {upiapidata.map((item, index) => (
                <div
                  key={index}
                  onClick={() => selecetingItemForDeposit(item)}
                  className="deposit-content-container-left-upi-content"
                  style={{
                    border:
                      selectedItem?.id === item.id
                        ? `2px solid ${COLORS.green}`
                        : "none",
                  }}
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
                      Skrill ID
                    </label>
                  </div>

                  <label className="deposit-content-container-right-lebel">
                    {item.id}
                  </label>
                </div>
              ))}
            </div>
          )}

          {/** DEPOSIT FORM */}
          {selectedItem !== "" && showPaymentForm && (
            <div className="deposit-content-container-left-upi-left">
              <div className="upiDepositFormContainer">
                <form>
                  {/** AMOUNT */}
                  <div className="formUpiDepositFormContainerContent">
                    <label className="formUpiDepositFormContainerContentLabel">
                      Amount
                    </label>
                    <input
                      className="formUpiDepositFormContainerContentInput"
                      type="number"
                      name="amount"
                      placeholder="Enter amount"
                    />
                  </div>
                  {/** TRANSACTION NUMBER */}
                  <div className="formUpiDepositFormContainerContent">
                    <label className="formUpiDepositFormContainerContentLabel">
                      Transaction number
                    </label>
                    <input
                      className="formUpiDepositFormContainerContentInput"
                      type="number"
                      name="transaction"
                      placeholder="Enter transaction number"
                    />
                  </div>

                  {/** RECEIPT */}
                  <div className="formUpiDepositFormContainerContent">
                    <label className="formUpiDepositFormContainerContentLabel">
                      Receipt
                    </label>
                    <input
                      className="formUpiDepositFormContainerContentInput"
                      type="number"
                      name="labvel"
                      placeholder="Choose a file"
                    />
                  </div>

                  {/** REMARK    */}
                  <div className="formUpiDepositFormContainerContent">
                    <label className="formUpiDepositFormContainerContentLabel">
                      Remark
                    </label>
                    <input
                      className="formUpiDepositFormContainerContentInput"
                      style={{
                        minHeight: '2vw'
                      }}
                      type="text"
                      name="remark"
                      placeholder="Enter remark"
                    />
                  </div>

                  {/** DEPOSIT BUTTON */}
                  <div style={{
                  marginTop: '2vw'
                  }}>
                    <button className="submit-btn-login-deposit" type="submit">
                      Deposit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/** SELECTED PAYMENT */}
          {selectedItem !== ""  && (
            <div className="deposit-content-container-left-upi">
              <div className="deposit-content-container-right-upi-content">
                <div className="deposit-content-container-right">
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
                  <label
                    className="deposit-content-container-right-lebel-title"
                    style={{ fontFamily: FONT.Montserrat_Regular }}
                  >
                    UPI Holder name
                  </label>
                  <label className="deposit-content-container-right-lebel">
                    {selectedItem.name}
                  </label>
                  <label
                    className="deposit-content-container-right-lebel-title"
                    style={{ fontFamily: FONT.Montserrat_Regular }}
                  >
                    UPI ID
                  </label>
                  <label className="deposit-content-container-right-lebel">
                    {selectedItem.upiid}
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Skrilldeposit;
