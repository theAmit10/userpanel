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
  useCreateOtherPaymentAccountMutation,
  useDeleteOtherPaymentAccountMutation,
  useDeleteUpiAccountMutation,
  useGetOtherPaymentNameQuery,
} from "../../redux/api";
import { IoIosAddCircleOutline } from "react-icons/io";

const PartnerOther = ({ selectingPaymentType }) => {
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
      const url = `${UrlHelper.PARTNER_OTHERPAYMENT_API}/${partner.rechargeModule}`;
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + JSON.stringify(data));
      setAllDepositData(data.otherList);
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

  //  FOR CREATING UPI

  const [createOtherPaymentAccount, { isLoading, error }] =
    useCreateOtherPaymentAccountMutation();

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

  // [for creating other payment]
  const [firstInput, setFirstInput] = useState("");
  const [secondInput, setSecondInput] = useState("");
  const [thirdInput, setThirdInput] = useState("");

  const submitCreateRequest = async () => {
    if (otherPaymentData) {
      if (firstInputName && !firstInput) {
        showErrorToast(
          `Enter ${otherPaymentData?.inputNames?.firstInputName || "value"}`
        );
        return;
      }
      if (secondInputName && !secondInput) {
        showErrorToast(
          `Enter ${otherPaymentData?.inputNames?.secondInputName || "value"}`
        );
        return;
      }
      if (thirdInputName && !thirdInput) {
        showErrorToast(
          `Enter ${otherPaymentData?.inputNames?.thirdInputName || "value"}`
        );
        return;
      }

      if (fourthInputName && !imageSource) {
        showErrorToast("Add QR code");
        return;
      }
      if (!paymentnote) {
        showErrorToast("Add payment note");
        return;
      } else {
        console.log("Create other payment Running");
        try {
          const formData = new FormData();
          // ✅ Append fields dynamically only if they have data
          if (firstInput) formData.append("firstInput", firstInput);
          if (secondInput) formData.append("secondInput", secondInput);
          if (thirdInput) formData.append("thirdInput", thirdInput);
          if (imageSource) formData.append("qrcode", imageSource);
          if (paymentnote) formData.append("paymentnote", paymentnote);
          formData.append("userId", user.userId);

          const res = await createOtherPaymentAccount({
            accesstoken: accesstoken,
            body: formData,
          }).unwrap();

          showSuccessToast(res.message);
          allTheDepositData();
          backHandlerShowCreateUpi();
          setFirstInput("");
          setSecondInput("");
          setThirdInput("");
          setpaymentnote("");
          setImageSource(null);
        } catch (error) {
          showErrorToast("Something went wrong");
          console.log("Error during create upi:", error);
        }
      }
    } else {
      showErrorToast("Something went wrong");
      return;
    }
  };

  const [selectedItem, setSelecetedItem] = useState("");
  const selecetingItemForDeposit = (item) => {
    setSelecetedItem(item);
    setShowCU(true);
    setShowAllUpi(false);
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
            <div
              className="searchIconContainer"
              onClick={settingShowCreateUpi}
              style={{
                cursor: "pointer",
              }}
            >
              <IoIosAddCircleOutline color={COLORS.white_s} size={"2.5rem"} />
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
                      <div key={item._id} className="upipdContentContainer">
                        {/** TOP */}
                        <div className="uCCTopC">
                          <div className="hdContenContainerIcon">
                            <PiContactlessPaymentFill
                              color={COLORS.background}
                              size={"2.5rem"}
                              className="paymenticon"
                            />
                          </div>

                          {/* <label className="pdB">Other Payment</label> */}
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
                          >
                            {item.paymentStatus}
                          </label>
                          {deleteIsLoading ? (
                            seletedItem === item._id ? (
                              <div
                                style={{
                                  width: "3rem",
                                }}
                              >
                                <Loader />
                              </div>
                            ) : (
                              <div
                                onClick={() => deletingData(item)}
                                className="hdContenContainerIcon"
                              >
                                <MdDelete
                                  color={COLORS.background}
                                  size={"2.5rem"}
                                />
                              </div>
                            )
                          ) : (
                            <div
                              className="hdContenContainerIcon"
                              onClick={() => deletingData(item)}
                            >
                              <MdDelete
                                color={COLORS.background}
                                size={"2.5rem"}
                              />
                            </div>
                          )}
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

      {showCU &&
        (loadingOtherPayment ? (
          <Loader />
        ) : (
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
                  Create Other Payment
                </label>
              </div>
            </div>
            {/** TOP NAVIGATION CONTATINER */}

            <div className="allLocationMainContainer">
              {/** FIRST INPUT */}
              {otherPaymentData?.inputNames?.firstInputName && (
                <>
                  <label className="alCLLabel">
                    {otherPaymentData?.inputNames?.firstInputName}
                  </label>
                  <div className="alSearchContainer">
                    <div className="searchIconContainer">
                      <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                    </div>

                    <input
                      className="al-search-input"
                      placeholder={`Enter ${
                        otherPaymentData?.inputNames?.firstInputName || "value"
                      }`}
                      value={firstInput}
                      onChange={(e) => setFirstInput(e.target.value)}
                    />
                  </div>
                </>
              )}

              {otherPaymentData?.inputNames?.secondInputName && (
                <>
                  <label className="alCLLabel">
                    {otherPaymentData?.inputNames?.secondInputName}
                  </label>
                  <div className="alSearchContainer">
                    <div className="searchIconContainer">
                      <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                    </div>

                    <input
                      className="al-search-input"
                      placeholder={`Enter ${
                        otherPaymentData?.inputNames?.secondInputName || "value"
                      }`}
                      value={secondInput}
                      onChange={(e) => setSecondInput(e.target.value)}
                    />
                  </div>
                </>
              )}

              {otherPaymentData?.inputNames?.thirdInputName && (
                <>
                  <label className="alCLLabel">
                    {otherPaymentData?.inputNames?.thirdInputName}
                  </label>
                  <div className="alSearchContainer">
                    <div className="searchIconContainer">
                      <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                    </div>

                    <input
                      className="al-search-input"
                      placeholder={`Enter ${
                        otherPaymentData?.inputNames?.thirdInputName || "value"
                      }`}
                      value={thirdInput}
                      onChange={(e) => setThirdInput(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/** TITLE */}
              {otherPaymentData?.inputNames?.fourthInputName && (
                <>
                  <label className="alCLLabel">
                    {otherPaymentData?.inputNames?.fourthInputName}
                  </label>
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
                      />
                    </div>
                  </div>
                </>
              )}

              {/** PAYMENT NOTE */}
              <label className="alCLLabel">Note</label>
              <div className="alSearchContainer">
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter note"
                  value={paymentnote}
                  onChange={(e) => setpaymentnote(e.target.value)}
                />
              </div>
            </div>

            {isLoading ? (
              <LoadingComponent />
            ) : (
              <div className="alBottomContainer" onClick={submitCreateRequest}>
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}
          </>
        ))}
    </div>
  );
};

export default PartnerOther;
