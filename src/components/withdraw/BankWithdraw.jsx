import React, { useEffect, useState } from "react";
import "./UpiWithdraw.css";
import FONT from "../../assets/constants/fonts";
import { FaRegPlayCircle } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { flushSync } from "react-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCreateDepositMutation,
  useCreateWithdrawMutation,
} from "../../redux/api";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../helper/showErrorToast";
import CircularProgressBar from "../helper/CircularProgressBar";
import { ToastContainer } from "react-toastify";

const upiapidata = [
  { name: "Wasu", upiid: "9876543210@ybl", id: "1" },
  { name: "Aman", upiid: "8876543210@ybl", id: "2" },
  { name: "Zasu", upiid: "7876543210@ybl", id: "3" },
  { name: "Masu", upiid: "1876543210@ybl", id: "4" },
  { name: "Kasu", upiid: "2876543210@ybl", id: "5" },
];

function BankWithdraw({ selectingPaymentType }) {
  const goToPreviousPage = () => {
    selectingPaymentType(""); // Resetting selectedPayment in the parent
    console.log("GOING PREVIOUS PAGE");
  };

  const navigation = useNavigate();
  const { accesstoken, user } = useSelector((state) => state.user);

  const [amountval, setAmountval] = useState("");
  const [remarkval, setRemarkval] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankIFSC, setBankIFSC] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");

  const [showProgressBar, setProgressBar] = useState(false);
  const [createWithdraw, { isLoading, error }] = useCreateWithdrawMutation();

  const submitHandler = async () => {
    if (!amountval) {
      showErrorToast("Enter Amount");
    } else if (!bankName) {
      showErrorToast("Enter Bank Name");
    } else if (!accountHolderName) {
      showErrorToast("Enter account holder name");
    } else if (!bankIFSC) {
      showErrorToast("Enter Bank IFSC code");
    } else if (!bankAccountNumber) {
      showErrorToast("Enter Account Number");
    } else {
      try {
        const body = {
          amount: amountval,
          remark: remarkval,
          paymenttype: "Bank",
          username: user.name,
          userid: user.userId,
          paymentstatus: "Pending",
          transactionType: "Withdraw",
          bankName,
          accountHolderName,
          bankIFSC,
          bankAccountNumber,
        };

        const res = await createWithdraw({
          accessToken: accesstoken,
          body,
        }).unwrap();

        showSuccessToast(res.message);

        goToPreviousPage();
      } catch (error) {
        showErrorToast("Something went wrong");
      }
    }
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
          <label className="h-title-label">Bank Withdraw</label>
        </div>
      </div>

      {/** TITLE CONTAINER */}
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      ></div>

      {/** Main Conatiner */}

      <div className="deposit-container">
        <div className="deposit-content-container-main-upi">
          {/** LEFT LIST OF DEPOSIT */}

          {/** DEPOSIT FORM */}

          <div className="deposit-content-container-left-upi-left">
            <div className="upiDepositFormContainer">
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
                  value={amountval}
                  onChange={(e) => setAmountval(e.target.value)}
                />
              </div>
              {/** BANK NAME */}
              <div className="formUpiDepositFormContainerContent">
                <label className="formUpiDepositFormContainerContentLabel">
                  Bank Name
                </label>
                <input
                  className="formUpiDepositFormContainerContentInput"
                  type="text"
                  name="bankName"
                  placeholder="Enter bank name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>

              {/** ACCOUNT HOLDER NAME */}
              <div className="formUpiDepositFormContainerContent">
                <label className="formUpiDepositFormContainerContentLabel">
                  Account Holder Name
                </label>
                <input
                  className="formUpiDepositFormContainerContentInput"
                  type="text"
                  name="accountHolderName"
                  placeholder="Enter account holder name"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                />
              </div>

               {/** IFSC CODE */}
               <div className="formUpiDepositFormContainerContent">
                <label className="formUpiDepositFormContainerContentLabel">
                  IFSC Code
                </label>
                <input
                  className="formUpiDepositFormContainerContentInput"
                  type="text"
                  name="bankIFSC"
                  placeholder="Enter IFSC code"
                  value={bankIFSC}
                  onChange={(e) => setBankIFSC(e.target.value)}
                />
              </div>

              {/** ACCOUNT NUMBER */}
              <div className="formUpiDepositFormContainerContent">
                <label className="formUpiDepositFormContainerContentLabel">
                  Account number
                </label>
                <input
                  className="formUpiDepositFormContainerContentInput"
                  type="text"
                  name="bankAccountNumber"
                  placeholder="Enter account number"
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
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
                    minHeight: "2vw",
                  }}
                  type="text"
                  name="remark"
                  placeholder="Enter remark"
                  value={remarkval}
                  onChange={(e) => setRemarkval(e.target.value)}
                />
              </div>

              {/** DEPOSIT BUTTON */}
              <div
                style={{
                  marginTop: "2vw",
                }}
              >
                {isLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2vw",
                    }}
                  >
                    <CircularProgressBar />
                  </div>
                ) : (
                  <button
                    className="submit-btn-login-deposit"
                    onClick={submitHandler}
                  >
                    Withdraw
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default BankWithdraw;
