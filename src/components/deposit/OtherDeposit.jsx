import React, { useEffect, useState } from "react";

import { IoArrowBackCircleOutline, IoSettings } from "react-icons/io5";
import COLORS from "../../assets/constants/colors";

import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";

import { PiContactlessPaymentFill, PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { useSelector } from "react-redux";

import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import CircularProgressBar from "../helper/CircularProgressBar";
import { ToastContainer } from "react-toastify";
import Loader from "../molecule/Loader";
import { serverName } from "../../redux/store";
import {
  useCreateDepositMutation,
  useCreateOtherPaymentAccountMutation,
  useDeleteOtherPaymentAccountMutation,
  useDeleteUpiAccountMutation,
  useGetOtherPaymentNameQuery,
} from "../../redux/api";
import { IoIosAddCircleOutline } from "react-icons/io";

const OtherDeposit = ({ selectingPaymentType }) => {
  const goToPreviousPage = () => {
    selectingPaymentType(""); // Resetting selectedPayment in the parent
    console.log("GOING PREVIOUS PAGE");
  };

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

  const [showU, setShowU] = useState(true);
  const [showCU, setShowCU] = useState(false);
  const [showUU, setShowUU] = useState(false);

  const settingShowCreateUpi = () => {
    setShowCU(true);
    setShowU(false);
    setShowUU(false);
  };

  const settingShowUpdate = () => {
    setShowCU(false);
    setShowU(false);
    setShowUU(true);
  };

  const backHandlerShowCreateUpi = () => {
    setShowCU(false);
    setShowUU(false);
    setShowU(true);
  };

  const [paymentnote, setpaymentnote] = useState("");

  const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  // ALL UPI DEPOSIT

  const { accesstoken, user, partner } = useSelector((state) => state.user);
  const [seletedItem, setSelectedItem] = useState("");

  const settingUpiId = (item) => {
    setSelectedUpiId(item);
    setUpiVisible(false);
  };

  const [loadingAllData, setLoadingAllData] = useState(false);
  const [allDepositdata, setAllDepositData] = useState([]);

  const [
    deleteOtherAccount,
    { isLoading: deleteIsLoading, isError: deleteIsError },
  ] = useDeleteOtherPaymentAccountMutation();

  useEffect(() => {
    allTheDepositData();
  }, []);

  const allTheDepositData = async () => {
    try {
      setLoadingAllData(true);
      const url = `${UrlHelper.PARTNER_USER_OTHER_API}/${user.rechargePaymentId}`;
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

  // FOR DELETING DATA

  const deletingData = async (item) => {
    console.log("Deleting Data");
    setSelectedItem(item._id);

    const res = await deleteOtherAccount({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    allTheDepositData();

    showSuccessToast(res.message);
  };

  const {
    isLoading: loadingOtherPayment,
    data: otherPaymentData,
    refetch: refetchOtherPayment,
  } = useGetOtherPaymentNameQuery({ accesstoken });

  const [firstInputName, setFirstInputName] = useState("");
  const [secondInputName, setSecondInputName] = useState("");
  const [thirdInputName, setThirdInputName] = useState("");
  const [fourthInputName, setFourthInputName] = useState("");

  useEffect(() => {
    if (!loadingOtherPayment && otherPaymentData) {
      setFirstInputName(otherPaymentData?.inputNames?.firstInputName);
      setSecondInputName(otherPaymentData?.inputNames?.secondInputName);
      setThirdInputName(otherPaymentData?.inputNames?.thirdInputName);
      setFourthInputName(otherPaymentData?.inputNames?.fourthInputName);
    }
  }, [loadingOtherPayment, otherPaymentData]);

  const [selectedItem, setSelecetedItem] = useState("");
  const selecetingItemForDeposit = (item) => {
    setSelecetedItem(item);
    setShowCU(true);
    setShowU(false);
  };

  const [createDeposit, { isLoading, error }] = useCreateDepositMutation();

  const [amountval, setAmountval] = useState("");
  const [transactionval, setTransactionval] = useState("");
  const [remarkval, setRemarkval] = useState("");

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
      formData.append("paymenttype", "Other");
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

  return (
    <div className="upicontiner">
      {showU && (
        <>
          {/** TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer" onClick={goToPreviousPage}>
              <IoArrowBackCircleOutline
                color={COLORS.white_s}
                size={"2.5rem"}
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Other Payment
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          {loadingAllData || loadingOtherPayment ? (
            <LoadingComponent />
          ) : (
            <>
              {allDepositdata.length === 0 ? (
                <NodataFound
                  title={"This payment method is temporarily unavailable."}
                />
              ) : (
                <>
                  <div
                    className="upipdMainContainer"
                    style={{
                      minHeight: "70vh",
                    }}
                  >
                    {allDepositdata.map((item, index) => (
                      <div
                        key={item._id}
                        onClick={() => selecetingItemForDeposit(item)}
                        className="upipdContentContainer"
                      >
                        {/** TOP */}
                        <div className="uCCTopC">
                          <div className="hdContenContainerIcon">
                            <PiContactlessPaymentFill
                              color={COLORS.background}
                              size={"2.5rem"}
                              className="paymenticon"
                            />
                          </div>

                          <label className="pdB">Other Payment</label>
                          <label
                            className="pdB"
                            style={{
                              color:
                                item.paymentStatus === "Pending"
                                  ? COLORS.orange
                                  : item.paymentStatus === "Cancelled"
                                  ? COLORS.red
                                  : COLORS.green,
                            }}
                          ></label>
                        </div>
                        {/** TOP */}

                        {/** FIRST */}
                        {otherPaymentData?.inputNames?.firstInputName && (
                          <div className="uCCMidC">
                            <div className="uCCTopFC">
                              <label className="pdSB">
                                {otherPaymentData?.inputNames?.firstInputName}
                              </label>
                            </div>
                            <div className="uCCTopSC">
                              <label className="pdR">{item.firstInput}</label>
                            </div>
                            <div className="thirdChildD">
                              <div
                                onClick={() => handleCopyClick(item.firstInput)}
                                className="copyCon"
                              >
                                <FaCopy
                                  color={COLORS.background}
                                  size={"2rem"}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/** SECOND */}
                        {otherPaymentData?.inputNames?.secondInputName && (
                          <div className="uCCMidC">
                            <div className="uCCTopFC">
                              <label className="pdSB">
                                {otherPaymentData?.inputNames?.secondInputName}
                              </label>
                            </div>
                            <div className="uCCTopSC">
                              <label className="pdR">{item.secondInput}</label>
                            </div>
                            <div className="thirdChildD">
                              <div
                                onClick={() =>
                                  handleCopyClick(item.secondInput)
                                }
                                className="copyCon"
                              >
                                <FaCopy
                                  color={COLORS.background}
                                  size={"2rem"}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {/** THIRD */}
                        {otherPaymentData?.inputNames?.thirdInputName && (
                          <div className="uCCMidC">
                            <div className="uCCTopFC">
                              <label className="pdSB">
                                {otherPaymentData?.inputNames?.thirdInputName}
                              </label>
                            </div>
                            <div className="uCCTopSC">
                              <label className="pdR">{item.thirdInput}</label>
                            </div>
                            <div className="thirdChildD">
                              <div
                                onClick={() => handleCopyClick(item.thirdInput)}
                                className="copyCon"
                              >
                                <FaCopy
                                  color={COLORS.background}
                                  size={"2rem"}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        {/** FOURTH */}
                        {otherPaymentData?.inputNames?.fourthInputName && (
                          <div className="qrcontiner">
                            <div className="qrcontinerMain">
                              <img
                                src={`${serverName}/uploads/upiqrcode/${item.qrcode}`}
                                className="qrimg"
                              />
                            </div>
                          </div>
                        )}

                        {/** Note   */}
                        <div className="NotePatentContainer">
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
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </>
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
                Create Other Payment Deposit
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          <div className="allLocationMainContainer">
            {/** Amount */}
            <label className="alCLLabel">Amount</label>
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
};

export default OtherDeposit;
