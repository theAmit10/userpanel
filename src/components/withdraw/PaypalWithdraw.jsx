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



function PaypalWithdraw({ selectingPaymentType }) {
  const goToPreviousPage = () => {
    selectingPaymentType(""); // Resetting selectedPayment in the parent
    console.log("GOING PREVIOUS PAGE");
  };

  const {accesstoken, user} = useSelector(state => state.user);

  const [amountval, setAmountval] = useState('');
  const [paypalEmail, setpaypalEmail] = useState('');
  const [remarkval, setRemarkval] = useState('');

  const [createWithdraw, {isLoading, error}] = useCreateWithdrawMutation();

  const submitHandler = async () => {
    if (!amountval) {
        showErrorToast('Enter Amount')
    } else if (!paypalEmail) {
        showErrorToast('Enter paypal email address')
    } else {
     
      try {
        const body = {
          amount: amountval,
          remark: remarkval,
          paymenttype: 'Paypal',
          username: user.name,
          userid: user.userId,
          paymentstatus: 'Pending',
          transactionType: 'Withdraw',
          paypalEmail,
   
        };

        console.log('Request body :: ' + JSON.stringify(body));

        const res = await createWithdraw({
          accessToken: accesstoken,
          body,
        }).unwrap();
        console.log('Withdraw res :: ' + JSON.stringify(res));
       
        showSuccessToast(res.message)
        goToPreviousPage()
      } catch (error) {
        console.log('Error during withdraw:', error);
        showErrorToast('Something went wrong')
       
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
          <label className="h-title-label">Paypal Withdraw</label>
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
              {/** Paypal email address */}
              <div className="formUpiDepositFormContainerContent">
                <label className="formUpiDepositFormContainerContentLabel">
                Paypal email address
                </label>
                <input
                  className="formUpiDepositFormContainerContentInput"
                  type="text"
                  name="paypalEmail"
                  placeholder="Enter paypal email address "
                  value={paypalEmail}
                  onChange={(e) => setpaypalEmail(e.target.value)}
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

export default PaypalWithdraw;