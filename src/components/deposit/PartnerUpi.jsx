import React, { useEffect, useState } from "react";
import "./UD.css";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import {
  useCreateDepositMutation,
  useCreateUPIAccountMutation,
  useDeleteUpiAccountMutation,
} from "../../redux/api";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { LoadingComponent } from "../helper/LoadingComponent";
import { FaCopy } from "react-icons/fa";
import { NodataFound } from "../helper/NodataFound";
import { serverName } from "../../redux/store";
import { PiSubtitles } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Loader from "../molecule/Loader";

const PartnerUpi = ({ selectingPaymentType }) => {
  const [showAllUpi, setShowAllUpi] = useState(true);

  const goToPreviousPage = () => {
    selectingPaymentType(""); // Resetting selectedPayment in the parent
    console.log("GOING PREVIOUS PAGE");
  };

  const [amountval, setAmountval] = useState("");
  const [transactionval, setTransactionval] = useState("");
  const [remarkval, setRemarkval] = useState("");
  const { accesstoken, user, partner } = useSelector((state) => state.user);
  const [selectedItem, setSelecetedItem] = useState("");

  const selecetingItemForDeposit = (item) => {
    setSelecetedItem(item);
    setShowCU(true);
    setShowAllUpi(false);
  };

  const hideAllform = () => {
    setSelecetedItem("");
  };

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

  const [loadingAllData, setLoadingAllData] = useState(false);
  const [allDepositdata, setAllDepositData] = useState([]);

  useEffect(() => {
    allTheDepositData();
  }, []);

  const allTheDepositData = async () => {
    try {
      setLoadingAllData(true);
      const url = `${UrlHelper.PARTNER_UPI_API}/${partner.rechargeModule}`;
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + JSON.stringify(data));
      setAllDepositData(data.upiList);
      setLoadingAllData(false);
    } catch (error) {
      setLoadingAllData(false);
      showErrorToast("Something went wrong");
      console.log(error);
    }
  };

  const handleCopyClick = (e, stringToCopy) => {
    e.stopPropagation();
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
    setShowAllUpi(true);
  };
  const [seletedItem, setSelectedItem] = useState("");
  const [upiholdername, setupiholdername] = useState("");
  const [upiid, setupiid] = useState("");
  const [paymentnote, setpaymentnote] = useState("");
  const [
    deleteUpiAccount,
    { isLoading: deleteIsLoading, isError: deleteIsError },
  ] = useDeleteUpiAccountMutation();

  // FOR DELETING DATA

  const deletingData = async (item) => {
    console.log("Deleting Data");
    setSelectedItem(item._id);

    const res = await deleteUpiAccount({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    allTheDepositData();

    showSuccessToast(res.message);
  };

  //  FOR CREATING UPI

  const [createUPIAccount, { isLoading, error }] =
    useCreateUPIAccountMutation();

  const submitCreateRequest = async () => {
    if (!upiholdername) {
      showErrorToast("Enter UPI holder name");
      return;
    }
    if (!upiid) {
      showErrorToast("Enter UPI ID");
      return;
    }
    if (!paymentnote) {
      showErrorToast("Add payment note");
      return;
    }
    if (!imageSource) {
      showErrorToast("Add QR code");
      return;
    } else {
      console.log("Create UPI Running");
      try {
        const formData = new FormData();
        formData.append("upiholdername", upiholdername);
        formData.append("upiid", upiid);
        formData.append("qrcode", imageSource);
        formData.append("paymentnote", paymentnote);
        formData.append("userId", user.userId);

        const res = await createUPIAccount({
          accesstoken: accesstoken,
          body: formData,
        }).unwrap();

        showSuccessToast(res.message);
        allTheDepositData();
        backHandlerShowCreateUpi();
        setupiholdername("");
        setupiid("");
        setpaymentnote("");
        setImageSource(null);
      } catch (error) {
        showErrorToast("Something went wrong");
        console.log("Error during create upi:", error);
        if (error.response) {
          // Toast.show({type: 'error', text1: error.response.data});
        } else if (error.request) {
          // Toast.show({
          //   type: 'error',
          //   text1: 'Request was made, but no response was received',
          // });
        } else {
          // Toast.show({type: 'error', text1: error.message});
        }
      }
    }
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
                UPI Payment
              </label>
            </div>
            <div
              className="searchIconContainer"
              onClick={selecetingItemForDeposit}
              style={{
                cursor: "pointer",
              }}
            >
              <IoIosAddCircleOutline color={COLORS.white_s} size={"2.5rem"} />
            </div>
          </div>

          {loadingAllData ? (
            <LoadingComponent />
          ) : (
            <>
              {allDepositdata.length === 0 ? (
                <NodataFound
                  title={"This Payment option updating shortly. Thank You"}
                />
              ) : (
                <>
                  <div className="upipdMainContainer">
                    {allDepositdata.map((item, index) => (
                      <div key={item._id} className="upipdContentContainer">
                        {/** TOP */}
                        <div className="uCCTopC">
                          <div className="hdContenContainerIcon">
                            <img
                              src={images.upi}
                              color={COLORS.background}
                              size={"2.5rem"}
                              className="paymenticon"
                            />
                          </div>

                          {/* <label className="pdB">UPI</label> */}
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

                        {/** TOP */}
                        <div className="uCCMidC">
                          <div className="uCCTopFC">
                            <label className="pdSB">Holder name</label>
                          </div>
                          <div className="uCCTopSC">
                            <label className="pdR">{item.upiholdername}</label>
                          </div>
                          <div className="thirdChildD">
                            <div
                              onClick={(e) =>
                                handleCopyClick(e, item.upiholdername)
                              }
                              className="copyCon"
                            >
                              <FaCopy color={COLORS.background} size={"2rem"} />
                            </div>
                          </div>
                        </div>

                        {/** TESTING */}
                        {/* <div className="parentContetDeposit">
                          <div className="firstChildD">
                          <label className="pdSB">Holder name</label>
                          </div>
                          <div className="secondChildD"><label className="pdR">{item.upiholdername} Chumu hai jo koi bh i pana tanat jakdnkafkjn koi bh i pana tanat jakdnkafkjn koi bh i pana tanat jakdnkafkjn  koi bh i pana tanat jakdnkafkjn koi bh i pana tanat jakdnkafkjn adkadjk</label></div>
                          <div className="thirdChildD">
                          <div
                            onClick={() => handleCopyClick(item.upiholdername)}
                            className="copyCon"
                          >
                            <FaCopy color={COLORS.background} size={"2rem"} />
                          </div>
                          </div>
                        </div> */}
                        {/** TOP */}

                        {/** TOP */}
                        <div className="uCCMidC">
                          <div className="uCCTopFC">
                            <label className="pdSB">UPI ID</label>
                          </div>
                          <div className="uCCTopSC">
                            <label className="pdR">{item.upiid}</label>
                          </div>
                          <div className="thirdChildD">
                            <div
                              onClick={(e) => handleCopyClick(e, item.upiid)}
                              className="copyCon"
                            >
                              <FaCopy color={COLORS.background} size={"2rem"} />
                            </div>
                          </div>
                        </div>

                        {/** TOP */}

                        <div className="qrcontiner">
                          <div className="qrcontinerMain">
                            <img
                              src={`${serverName}/uploads/upiqrcode/${item.qrcode}`}
                              className="qrimg"
                            />
                          </div>
                        </div>

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
                Create UPI Payment
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          <div className="allLocationMainContainer">
            {/** UPI HOLDER NAME */}
            <label className="alCLLabel">UPI holder name</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter upi holder name"
                value={upiholdername}
                onChange={(e) => setupiholdername(e.target.value)}
              />
            </div>

            {/** UPI ID */}
            <label className="alCLLabel">UPI ID</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter upi id"
                value={upiid}
                onChange={(e) => setupiid(e.target.value)}
              />
            </div>
            {/** RECEIPT */}

            {/** TITLE */}
            <label className="alCLLabel">QR code</label>
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
      )}
    </div>
  );
};

export default PartnerUpi;
