import React, { useEffect, useState } from "react";
import "./UpiWithdraw.css";
import COLORS from "../../assets/constants/colors";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateWithdrawMutation } from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import CircularProgressBar from "../helper/CircularProgressBar";
import { IoDocumentText } from "react-icons/io5";

function OtherWithdraw({ selectingPaymentType }) {
  const goToPreviousPage = () => {
    selectingPaymentType(""); // Resetting selectedPayment in the parent
    console.log("GOING PREVIOUS PAGE");
  };

  const navigation = useNavigate();
  const { accesstoken, user } = useSelector((state) => state.user);

  const [amountval, setAmountval] = useState("");
  const [upiHolderName, setUpiHolderName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [remarkval, setRemarkval] = useState("");
  const [showProgressBar, setProgressBar] = useState(false);
  const [createWithdraw, { isLoading, error }] = useCreateWithdrawMutation();

  const settingDefaultValue = () => {
    setAmountval("");
    setRemarkval("");
    setUpiHolderName("");
    setUpiId("");
  };

  const MIN_WITHDRAW_AMOUNT = 100;

  const submitHandler = async () => {
    if (!amountval) {
      showErrorToast("Enter Amount");
    } else if (isNaN(amountval)) {
      showErrorToast("Enter Valid Amount");
      return;
    } else if (parseFloat(amountval) < MIN_WITHDRAW_AMOUNT) {
      showErrorToast(`Minimum Amount to withdraw is ${MIN_WITHDRAW_AMOUNT}`);
      return; // Stop further execution if the amount is too low
    } else if (parseFloat(user?.walletOne?.balance) < parseFloat(amountval)) {
      showErrorToast(
        `You have insufficent balance in ${user?.walletOne?.walletName} wallet`
      );
      return; // Stop further execution if the amount is too low
    } else if (!upiHolderName) {
      showErrorToast("Enter UPI Holder Name");
    } else if (!upiId) {
      showErrorToast("Enter UPI ID");
    } else {
      try {
        const body = {
          amount: amountval,
          remark: remarkval,
          paymenttype: "Upi",
          username: user.name,
          userid: user.userId,
          paymentstatus: "Pending",
          transactionType: "Withdraw",
          upiHolderName,
          upiId,
        };

        console.log("Request body :: " + JSON.stringify(body));

        const res = await createWithdraw({
          accessToken: accesstoken,
          body,
        }).unwrap();

        console.log("Withdraw res :: " + JSON.stringify(res));

        showSuccessToast(res.message);
        settingDefaultValue();
        // showSuccessToast("Success");
        // // goToPreviousPage();
      } catch (error) {
        console.log("Error during withdraw:", error);
        showErrorToast("Something went wrong");
      }
    }
  };

  return (
    <div className="cp-container">
      {/** TOP NAVIGATION CONTATINER */}
      <div className="alCreatLocationTopContainer">
        <div className="searchIconContainer" onClick={goToPreviousPage}>
          <IoArrowBackCircleOutline color={COLORS.white_s} size={"2.5rem"} />
        </div>

        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Other Withdraw
          </label>
        </div>
      </div>
      <div className="cp-container-main">
        {/** AMOUNT */}

        <label className="alCLLabel">Amount</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <IoDocumentText color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={amountval}
            onChange={(e) => setAmountval(e.target.value)}
          />
        </div>

        {/** UPI HOLDER NAME */}
        <label className="alCLLabel">UPI Holder Name</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <IoDocumentText color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            type="text"
            name="upiHolderName"
            placeholder="Enter upi holder name"
            value={upiHolderName}
            onChange={(e) => setUpiHolderName(e.target.value)}
          />
        </div>

        {/** upi id */}
        <label className="alCLLabel">UPI ID</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <IoDocumentText color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            type="text"
            name="upiId"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>

        {/** REMARK    */}
        <label className="alCLLabel">Remark</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <IoDocumentText color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            type="text"
            style={{
              minHeight: "2rem",
            }}
            name="remark"
            placeholder="Enter remark"
            value={remarkval}
            onChange={(e) => setRemarkval(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="NC">
          <CircularProgressBar />
        </div>
      ) : (
        <div className="alBottomContainer" onClick={submitHandler}>
          <label className="alBottomContainerlabel">Withdraw</label>
        </div>
      )}
    </div>
  );
}

export default OtherWithdraw;
