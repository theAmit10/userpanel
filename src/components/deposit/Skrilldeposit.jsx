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
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import CircularProgressBar from "../helper/CircularProgressBar";
import { LoadingComponent } from "../helper/LoadingComponent";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { NodataFound } from "../helper/NodataFound";
import { serverName } from "../../redux/store";
import { PiSubtitles } from "react-icons/pi";

const upiapidata = [
  { name: "Wasu", upiid: "9876543210@ybl", id: "1" },
  { name: "Aman", upiid: "8876543210@ybl", id: "2" },
  { name: "Zasu", upiid: "7876543210@ybl", id: "3" },
  { name: "Masu", upiid: "1876543210@ybl", id: "4" },
  { name: "Kasu", upiid: "2876543210@ybl", id: "5" },
];

function Skrilldeposit({ selectingPaymentType }) {
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
    setShowCU(true);
    setShowAllUpi(false)
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
    if (isNaN(amountval)) {
      showErrorToast("Enter Valid Amount");
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
      formData.append('paymenttype', 'Skrill');
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
      const { data } = await axios.get(UrlHelper.ALL_SKRILL_API, {
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

  const [showAllUpi, setShowAllUpi] = useState(true);

  const handleCopyClick = (stringToCopy) => {
    navigator.clipboard
      .writeText(stringToCopy)
      .then(() => {
        showSuccessToast("Text Copied");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };


  const [showCU, setShowCU] = useState(false);

  const backHandlerShowCreateUpi = () => {
    setShowCU(false);
    setShowAllUpi(true)
  };

  return (
    <div className="udC">
    {showAllUpi && (
      <div className="udMainCon">
        {/** TOP HEADER CONATINER */}
        <div className="alCreatLocationTopContainer">
          <div className="searchIconContainer" onClick={goToPreviousPage}>
            <IoArrowBackCircleOutline
              color={COLORS.white_s}
              size={"2.5rem"}
            />
          </div>
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              Skrill Payment
            </label>
          </div>
        </div>

        {loadingAllData ? (
          <LoadingComponent />
        ) : (
          <>
            {allDepositdata.length === 0 ? (
              <NodataFound title={"This payment method is temporarily unavailable."} />
            ) : (
             
              <>
              <div className="upipdMainContainer">
                {allDepositdata.map((item, index) => (
                  <div 
                  onClick={() => selecetingItemForDeposit(item)}
                  key={item._id}
                  className="upipdContentContainer">
                    {/** TOP */}
                    <div className="uCCTopC">
                      <div className="hdContenContainerIcon">
                        <img
                          src={images.skrill}
                          color={COLORS.background}
                          size={"2.5rem"}
                          className="paymenticon"
                        />
                      </div>

                      <label className="pdB">Skrill {item.paymentId}</label>

                     
                    </div>
                    {/** TOP */}

                    {/** TOP */}
                    <div className="uCCMidC">
                      <div className="uCCTopFC">
                        <label className="pdSB">Address</label>
                      </div>
                      <div className="uCCTopSC">
                        <label className="pdR">{item.address}</label>
                      </div>
                      <div
                        onClick={() => handleCopyClick(item.address)}
                        className="copyCon"
                      >
                        <FaCopy color={COLORS.background} size={"2rem"} />
                      </div>
                    </div>
                    {/** TOP */}
                    <div className="uCCBottomC">
                          <div className="uCCTopFC">
                            <label className="pdSB">Note</label>
                          </div>
                          <div className="uCCBottomSC">
                            <label className="pdRBottom">
                              {item.paymentnote}
                            </label>
                          </div>
                        </div>
                  </div>
                ))}
              </div>
              </>
            )}
          </>
        )}
      </div>
    )}

    {showCU && (
      <>
        {/** TOP NAVIGATION CONTATINER */}
        <div className="alCreatLocationTopContainer">
          <div
            className="searchIconContainer"
            onClick={backHandlerShowCreateUpi}
          >
            <IoArrowBackCircleOutline
              color={COLORS.white_s}
              size={"2.5rem"}
            />
          </div>
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              Create Skrill Deposit
            </label>
          </div>
        </div>
        {/** TOP NAVIGATION CONTATINER */}

        <div className="allLocationMainContainer">
          {/** Amount */}
          <label className="alCLLabel">Send Amount</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
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

          {/** Transaction number */}
          <label className="alCLLabel">Transaction number</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              type="text"
              name="transaction"
              placeholder="Enter transaction number"
              value={transactionval}
              onChange={(e) => setTransactionval(e.target.value)}
            />
          </div>
          {/** RECEIPT */}

          {/** TITLE */}
          <label className="alCLLabel">Upload Receipt</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <div className="imageContainerAC">
              <input
                className="al-search-input"
                placeholder="Receipt"
                type="file"
                name="file"
                onChange={selectDoc}
                accept="image/*"
              />
            </div>
          </div>

          <label className="alCLLabel">Remark</label>
          <div className="alSearchContainer">
            <div className="searchIconContainer">
              <PiSubtitles color={COLORS.background} size={"2.5rem"} />
            </div>

            <input
              className="al-search-input"
              style={{
                minHeight: "5rem",
              }}
              type="text"
              name="remark"
              placeholder="Enter remark"
              value={remarkval}
              onChange={(e) => setRemarkval(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingComponent />
        ) : (
          <div className="alBottomContainer" onClick={submitDepositRequest}>
            <label className="alBottomContainerlabel">Submit</label>
          </div>
        )}
      </>
    )}
  </div>
  );
}

export default Skrilldeposit;
