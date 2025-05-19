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
import {
  useCreateCryptoAccountMutation,
  useCreateDepositMutation,
  useDeleteCryptoAccountMutation,
} from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import CircularProgressBar from "../helper/CircularProgressBar";
import { FaCopy } from "react-icons/fa";
import { NodataFound } from "../helper/NodataFound";
import { serverName } from "../../redux/store";
import { PiSubtitles } from "react-icons/pi";
import { LoadingComponent } from "../helper/LoadingComponent";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete, MdPendingActions } from "react-icons/md";
import Loader from "../molecule/Loader";
import { CiClock2 } from "react-icons/ci";
import { FcApproval, FcCancel } from "react-icons/fc";

function PartnerCrypto({ selectingPaymentType }) {
  const [amountval, setAmountval] = useState("");
  const [transactionval, setTransactionval] = useState("");
  const [remarkval, setRemarkval] = useState("");
  const { accesstoken, user, partner } = useSelector((state) => state.user);

  const goToPreviousPage = () => {
    selectingPaymentType(""); // Resetting selectedPayment in the parent
    console.log("GOING PREVIOUS PAGE");
  };

  const [selectedItem, setSelecetedItem] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const selecetingItemForDeposit = (item) => {
    setSelecetedItem(item);
    setShowCU(true);
    setShowAllUpi(false);
  };

  const showingPaymentForm = () => {
    setShowPaymentForm(true);
  };

  const hideAllform = () => {
    setShowPaymentForm(false);
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

      const url = `${UrlHelper.PARTNER_CRYPTO_API}/${partner.rechargeModule}`;
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + JSON.stringify(data));
      setAllDepositData(data.cryptoList);
      setLoadingAllData(false);
    } catch (error) {
      setLoadingAllData(false);
      showErrorToast("Something went wrong");
      console.log(error);
    }
  };

  const [showAllUpi, setShowAllUpi] = useState(true);

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
  // FOR DELETING DATA

  const [
    deleteCryptoAccount,
    { isLoading: deleteIsLoading, isError: deleteIsError },
  ] = useDeleteCryptoAccountMutation();

  const deletingData = async (item) => {
    console.log("Deleting Data");
    setSelectedItem(item._id);

    const res = await deleteCryptoAccount({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    allTheDepositData();

    showSuccessToast(res.message);
  };

  // CREATING CRYPTO
  const [walletaddress, setwalletaddress] = useState("");
  const [networktype, setnetworktype] = useState("");
  const [paymentnote, setpaymentnote] = useState("");

  const [createCryptoAccount, { isLoading, error }] =
    useCreateCryptoAccountMutation();

  const submitCreateRequest = async () => {
    if (!walletaddress) {
      showErrorToast("Enter wallet address");
      return;
    }
    if (!networktype) {
      showErrorToast("Enter network type");
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
        formData.append("walletaddress", walletaddress);
        formData.append("networktype", networktype);
        formData.append("qrcode", imageSource);
        formData.append("paymentnote", paymentnote);
        formData.append("userId", user.userId);

        console.log("FORM DATA :: " + JSON.stringify(formData));

        const res = await createCryptoAccount({
          accesstoken: accesstoken,
          body: formData,
        }).unwrap();

        showSuccessToast(res.message);
        allTheDepositData();
        backHandlerShowCreateUpi();
        setwalletaddress("");
        setnetworktype("");
        setpaymentnote("");
        setImageSource(null);
      } catch (error) {
        showErrorToast("Something went wrong");
        console.log("Error during deposit:", error);
        // if (error.response) {
        //   Toast.show({type: 'error', text1: error.response.data});
        // } else if (error.request) {
        //   Toast.show({
        //     type: 'error',
        //     text1: 'Request was made, but no response was received',
        //   });
        // } else {
        //   Toast.show({type: 'error', text1: error.message});
        // }
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
                Crypto Deposit
              </label>
            </div>
            <label className="alCreatLocationTopContainerlabel">
              Add new Crypto ID
            </label>
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
                              src={images.crypto}
                              color={COLORS.background}
                              size={"2.5rem"}
                              className="paymenticon"
                            />
                          </div>

                          {/* <label className="pdB">Crypto {item.paymentId}</label> */}
                          {/* <label className="pdB">Crypto</label> */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <label className="pdB">Crypto</label>
                            {item.paymentStatus === "Pending" ? (
                              <MdPendingActions
                                size={"2rem"}
                                color={COLORS.orange}
                              />
                            ) : item.paymentStatus === "Cancelled" ? (
                              <FcCancel size={"2.5rem"} color={COLORS.red} />
                            ) : (
                              <FcApproval size={"2.5rem"} />
                            )}
                          </div>
                          {/* <label
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
                          </label> */}
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
                            <label className="pdSB">Wallet address</label>
                          </div>
                          <div className="uCCTopSC">
                            <label className="pdR">{item.walletaddress}</label>
                          </div>

                          <div className="thirdChildD">
                            <div
                              onClick={(e) =>
                                handleCopyClick(e, item.walletaddress)
                              }
                              className="copyCon"
                            >
                              <FaCopy color={COLORS.background} size={"2rem"} />
                            </div>
                          </div>
                        </div>
                        {/** TOP */}

                        {/** TOP */}
                        <div className="uCCMidC">
                          <div className="uCCTopFC">
                            <label className="pdSB">Network type</label>
                          </div>
                          <div className="uCCTopSC">
                            <label className="pdR"> {item.networktype}</label>
                          </div>
                          <div className="thirdChildD">
                            <div
                              onClick={(e) =>
                                handleCopyClick(e, item.networktype)
                              }
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
                              src={`${serverName}/uploads/cryptoqrcode/${item.qrcode}`}
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
                Create Crypto Payment
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          <div className="allLocationMainContainer">
            {/** UPI HOLDER NAME */}
            <label className="alCLLabel">Wallet address</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter wallet address"
                value={walletaddress}
                onChange={(e) => setwalletaddress(e.target.value)}
              />
            </div>

            {/** UPI ID */}
            <label className="alCLLabel">Network type</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter network type"
                value={networktype}
                onChange={(e) => setnetworktype(e.target.value)}
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
}

export default PartnerCrypto;
