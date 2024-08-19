import React, { useEffect, useState } from "react";
import "./Bankdeposit.css";
import FONT from "../../assets/constants/fonts";
import { FaRegPlayCircle } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { flushSync } from "react-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { useCreateDepositMutation } from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import CircularProgressBar from "../helper/CircularProgressBar";

const upiapidata = [
  {
    name: "Wasu",
    acccontno: "9876543210@ybl",
    id: "1",
    ifsccode: "837377SBIco",
    bankname: "SBI",
  },
  {
    name: "Aman",
    acccontno: "8876543210@ybl",
    id: "2",
    ifsccode: "037377SBIco",
    bankname: "PND",
  },
  {
    name: "Zasu",
    acccontno: "7876543210@ybl",
    id: "3",
    ifsccode: "537377SBIco",
    bankname: "HDFC",
  },
  {
    name: "Masu",
    acccontno: "1876543210@ybl",
    id: "4",
    ifsccode: "137377SBIco",
    bankname: "SBI",
  },
  {
    name: "Kasu",
    acccontno: "2876543210@ybl",
    id: "5",
    ifsccode: "437377SBIco",
    bankname: "SBI",
  },
];

function Bankdeposit({ selectingPaymentType }) {
  const navigate = useNavigate();

  const [amountval, setAmountval] = useState("");
  const [transactionval, setTransactionval] = useState("");
  const [remarkval, setRemarkval] = useState("");
  const { accesstoken, user } = useSelector((state) => state.user);

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

  const hideAllform = () => {
    setShowPaymentForm(false);
    setSelecetedItem("");
  
  };

  const [createDeposit, { isLoading, error }] = useCreateDepositMutation();

  const [imageSource, setImageSource] = useState(null);

  // For Opening PhoneStorage
  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const submitDepositRequest = async () => {
    if (!amountval) {
      showErrorToast("Enter Deposit Amount");
      return;
    }
    if (!transactionval) {
      showErrorToast("Enter Transaction Number");
      return;
    }
    if (!imageSource) {
      showErrorToast("Add Transaction Screenshot");
      return;
    }
    try {
      console.log("ELSE RUNNING");
      console.log(amountval, transactionval, remarkval);

      const formData = new FormData();
      formData.append("amount", amountval);
      formData.append("transactionid", transactionval);
      formData.append("remark", remarkval);
      formData.append('paymenttype', 'Bank');
      formData.append("paymenttypeid", selectedItem.paymentId);
      formData.append("username", user.name);
      formData.append("userid", user.userId);
      formData.append("paymentstatus", "Pending");
      formData.append("receipt", imageSource);
      formData.append("transactionType", "Deposit");

      console.log("FORM DATA :: " + JSON.stringify(formData));
      console.log(formData);

      // Logging form data for inspection
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      console.log(formData); // To see the complete FormData object

      const res = await createDeposit({
        accessToken: accesstoken,
        body: formData,
      }).unwrap();

      console.log("Success");
      console.log(res);
      console.log(res.message);

      await showSuccessToast(res.message);

      hideAllform();
      goToPreviousPage();
    } catch (error) {
      console.log("Error during deposit:", error);
      if (error.response) {
        Toast.show({ type: "error", text1: error.response.data });
        showErrorToast(error.response.data);
      } else if (error.request) {
        showErrorToast("Request was made, but no response was received");
      } else {
        showErrorToast(error.message);
      }
    }
  };

  const [loadingAllData, setLoadingAllData] = useState(false);
  const [allDepositdata, setAllDepositData] = useState([]);

  useEffect(() => {
    allTheDepositData();
  }, []);

  const allTheDepositData = async () => {
    try {
      setLoadingAllData(true);
      const { data } = await axios.get(UrlHelper.ALL_BANK_API, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + JSON.stringify(data));
      setAllDepositData(data.payments);
      setLoadingAllData(false);
    } catch (error) {
      setLoadingAllData(false);
      showErrorToast("Something went wrong");
      console.log(error);
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
          <label className="h-title-label">Bank Deposit</label>
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
        <div className="deposit-content-container-main-upi-or">
          {/** LEFT LIST OF DEPOSIT */}

          {loadingAllData ? (
            <div
              style={{
                flex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgressBar />
            </div>
          ) : (
            !showPaymentForm && (
              <div className="deposit-content-container-left-upi-left-or">
                {allDepositdata.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => selecetingItemForDeposit(item)}
                    className="deposit-content-container-left-upi-content"
                    style={{
                      border:
                        selectedItem?._id === item._id
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
                          src={images.bank}
                          alt="UPI"
                          className="deposit-content-image-setting"
                        />
                      </div>
                    </div>
                    <div className="deposit-content-container-right">
                      <label className="deposit-content-container-right-lebel">
                        Bank ID
                      </label>
                    </div>

                    <label className="deposit-content-container-right-lebel">
                      {item.paymentId}
                    </label>
                  </div>
                ))}
              </div>
            )
          )}

          {/** DEPOSIT FORM */}
          {selectedItem !== "" && showPaymentForm && (
            <div className="deposit-content-container-left-upi-left-or">
               <div className="upiDepositFormContainer">
                
                {/** AMOUNT */}
                <div className="formUpiDepositFormContainerContent-or">
                  <label className="formUpiDepositFormContainerContentLabel-or">
                    Amount
                  </label>
                  <input
                    className="formUpiDepositFormContainerContentInput-or"
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    value={amountval}
                    onChange={(e) => setAmountval(e.target.value)}
                  />
                </div>
                {/** TRANSACTION NUMBER */}
                <div className="formUpiDepositFormContainerContent-or">
                  <label className="formUpiDepositFormContainerContentLabel-or">
                    Transaction number
                  </label>
                  <input
                    className="formUpiDepositFormContainerContentInput-or"
                    type="text"
                    name="transaction"
                    placeholder="Enter transaction number"
                    value={transactionval}
                    onChange={(e) => setTransactionval(e.target.value)}
                  />
                </div>

                {/** RECEIPT */}
                <div className="formUpiDepositFormContainerContent-or">
                  <label className="formUpiDepositFormContainerContentLabel-or">
                    Receipt
                  </label>
                  <input
                    className="formUpiDepositFormContainerContentInput-or"
                    type="file"
                    name="file"
                    onChange={selectDoc}
                  />
                </div>

                {/** REMARK    */}
                <div className="formUpiDepositFormContainerContent-or">
                  <label className="formUpiDepositFormContainerContentLabel-or">
                    Remark
                  </label>
                  <input
                    className="formUpiDepositFormContainerContentInput-or"
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
                      onClick={submitDepositRequest}
                    >
                      Deposit
                    </button>
                  )}
                </div>
             
            </div>
            </div>
          )}

          {/** SELECTED PAYMENT */}
          {selectedItem !== "" && (
            <div className="deposit-content-container-left-upi-or">
              <div className="deposit-content-container-right-upi-content-or">
                <div className="deposit-content-container-right">
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
                  <label
                    className="deposit-content-container-right-lebel-title"
                    style={{ fontFamily: FONT.Montserrat_Regular }}
                  >
                    Bank name
                  </label>
                  <label className="deposit-content-container-right-lebel">
                    {selectedItem.bankname}
                  </label>
                  <label
                    className="deposit-content-container-right-lebel-title"
                    style={{ fontFamily: FONT.Montserrat_Regular }}
                  >
                    Account no.
                  </label>
                  <label className="deposit-content-container-right-lebel">
                    {selectedItem.accountnumber}
                  </label>
                  <label
                    className="deposit-content-container-right-lebel-title"
                    style={{ fontFamily: FONT.Montserrat_Regular }}
                  >
                    IFSC code
                  </label>
                  <label className="deposit-content-container-right-lebel">
                    {selectedItem.ifsccode}
                  </label>
                  <label
                    className="deposit-content-container-right-lebel-title"
                    style={{ fontFamily: FONT.Montserrat_Regular }}
                  >
                    Acc. holder name
                  </label>
                  <label className="deposit-content-container-right-lebel">
                    {selectedItem.accountholdername}
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

export default Bankdeposit;
