import React, { useEffect, useState } from "react";
import "./Upideposit.css";
import FONT from "../../assets/constants/fonts";
import { FaRegPlayCircle } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { flushSync } from "react-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateDepositMutation } from "../../redux/api";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import CircularProgressBar from "../helper/CircularProgressBar";
import { ToastContainer } from "react-toastify";
import { LoadingComponent } from "../helper/LoadingComponent";

function Upideposit({ selectingPaymentType }) {
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
      formData.append("paymenttype", "Upi");
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
      const url = `${UrlHelper.PARTNER_USER_UPI_API}/${user.rechargePaymentId}`;
      const { data } = await axios.get(url, {
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
    <div className="upideposit-main-container">
      {/** TOP CONTAINER */}

      <div className="alCreatLocationTopContainer">
        <div className="searchIconContainer" onClick={goToPreviousPage}>
          <IoArrowBackCircleOutline color={COLORS.white_s} size={"2.5rem"} />
        </div>
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            UPI Payment
          </label>
        </div>
      </div>

      {/** TITLE CONTAINER */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
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
            <div className="upinextcontatiner-upi-deposit">
              <label
                className="deposit-content-container-right-lebel"
                style={{
                  fontFamily: FONT.Montserrat_SemiBold,
                  fontSize: "1.5rem",
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

      <div className="upideposit-container-or">
        <div className="upideposit-content-container-main-upi-or">
          {/** LEFT LIST OF DEPOSIT */}

          {loadingAllData ? (
            <LoadingComponent />
          ) : (
            !showPaymentForm && (
              <div className="upideposit-content-container-left-upi-left-or">
                {allDepositdata.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => selecetingItemForDeposit(item)}
                    className="upideposit-content-container-left-upi-content"
                    style={{
                      border:
                        selectedItem?._id === item._id
                          ? `2px solid ${COLORS.green}`
                          : "none",
                    }}
                  >
                    <div className="deposit-content-container-left">
                      <div className="hdContenContainerIcon">
                        <img
                          src={images.upi}
                          color={COLORS.background}
                          size={"2.5rem"}
                          className="paymenticon"
                        />
                      </div>
                    </div>
                    <div className="deposit-content-container-right">
                      <label className="deposit-content-container-right-lebel">
                        UPI ID
                      </label>
                    </div>

                    <div className="deposit-content-container-right">
                      <label className="deposit-content-container-right-lebel">
                        {item.paymentId}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/** DEPOSIT FORM */}
          {selectedItem !== "" && showPaymentForm && (
            <div className="upideposit-content-container-left-upi-left-or">
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
            <div className="upideposit-content-container-left-upi-or">
              <div className="upideposit-content-container-right-upi-content-or">
                <div className="upideposit-content-container-right">
                  <div className="upideposit-content-content-left-content-icon-container-qrcode">
                    <img
                      src="https://imgs.search.brave.com/WG5U5I_hK20P2PRulDBEmG_XZQQvgV5AmR11MbwxWyE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9xcmNv/ZGUudGVjLWl0LmNv/bS9BUEkvUVJDb2Rl/P2RhdGE9UVIrQ29k/ZStHZW5lcmF0b3Ir/YnkrVEVDLUlU.jpeg"
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
                    {selectedItem.upiholdername}
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
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Upideposit;
