import React, { useEffect, useState } from "react";
import "./Upideposit.css";
import FONT from "../../assets/constants/fonts";
import { FaRegPlayCircle } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import {
  useCreateDepositMutation,
  useCreatePaypalAccountMutation,
  useDeletePaypalAccountMutation,
} from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { LoadingComponent } from "../helper/LoadingComponent";
import { FaCopy } from "react-icons/fa";
import { NodataFound } from "../helper/NodataFound";
import { PiSubtitles } from "react-icons/pi";
import TextLabel from "../atom/TextLabel";
import SubmitButton from "../atom/SubmitButton";
import { MdDelete } from "react-icons/md";
import Loader from "../molecule/Loader";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FcApproval, FcCancel } from "react-icons/fc";
import { GiSandsOfTime } from "react-icons/gi";
import { CiClock2 } from "react-icons/ci";
function PartnerPaypal({ selectingPaymentType }) {
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

  const selecetingItemForDeposit = () => {
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
      formData.append("paymenttype", "Paypal");
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
  const [seletedItem, setSelectedItem] = useState("");

  useEffect(() => {
    allTheDepositData();
  }, []);

  const allTheDepositData = async () => {
    try {
      setLoadingAllData(true);
      const url = `${UrlHelper.PARTNER_PAYPAL_API}/${partner.rechargeModule}`;
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + JSON.stringify(data));
      setAllDepositData(data.paypalList);
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

  const [
    deletePaypalAccount,
    { isLoading: deleteIsLoading, isError: deleteIsError },
  ] = useDeletePaypalAccountMutation();

  // FOR DELETING DATA

  const deletingData = async (item) => {
    console.log("Deleting Data");
    setSelectedItem(item._id);

    const res = await deletePaypalAccount({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    allTheDepositData();

    showSuccessToast(res.message);
  };

  // CREATING PAYPAL ACCOUNT

  const [emailaddress, setemailaddress] = useState("");
  const [paymentnote, setpaymentnote] = useState("");
  const [createSkrillAccount, { isLoading: createIsLoading }] =
    useCreatePaypalAccountMutation();

  const submitCreateRequest = async () => {
    if (!emailaddress) {
      showErrorToast("Enter email address");
      return;
    }
    if (!paymentnote) {
      showErrorToast("Add payment note");
      return;
    } else {
      try {
        const body = {
          emailaddress,
          paymentnote,
          userId: user.userId,
        };

        console.log("JSON BODY :: ", JSON.stringify(body));

        const res = await createSkrillAccount({
          accesstoken: accesstoken,
          body: body,
        }).unwrap();

        showSuccessToast(res.message);
        allTheDepositData();
        backHandlerShowCreateUpi();
        setemailaddress("");
        setpaymentnote("");
      } catch (error) {
        console.log("Error during deposit:", error);
        showErrorToast("Something went wrong");

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
                Paypal Deposit
              </label>
            </div>
            <label className="alCreatLocationTopContainerlabel">
              Add new Paypal ID
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
                              src={images.paypal}
                              color={COLORS.background}
                              size={"2.5rem"}
                              className="paymenticon"
                            />
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <label className="pdB">Paypal</label>
                            {item.paymentStatus === "Pending" ? (
                              <CiClock2 size={"2rem"} color={COLORS.orange} />
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
                            <label className="pdSB">Email address</label>
                          </div>
                          <div className="uCCTopSC">
                            <label className="pdR"> {item.emailaddress}</label>
                          </div>
                          <div className="thirdChildD">
                            <div
                              onClick={(e) =>
                                handleCopyClick(e, item.emailaddress)
                              }
                              className="copyCon"
                            >
                              <FaCopy color={COLORS.background} size={"2rem"} />
                            </div>
                          </div>
                        </div>

                        {/** TOP */}
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
                Create Paypal Payment
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          <div className="allLocationMainContainer">
            {/** UPI HOLDER NAME */}
            <label className="alCLLabel">Email address</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter email address"
                value={emailaddress}
                onChange={(e) => setemailaddress(e.target.value)}
              />
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

          {createIsLoading ? (
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

export default PartnerPaypal;
