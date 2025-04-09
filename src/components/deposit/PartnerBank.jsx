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
import {
  useCreateBankAccountMutation,
  useCreateDepositMutation,
  useDeleteBankAccountMutation,
} from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import CircularProgressBar from "../helper/CircularProgressBar";
import { LoadingComponent } from "../helper/LoadingComponent";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { NodataFound } from "../helper/NodataFound";
import { serverName } from "../../redux/store";
import { PiSubtitles } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";
import Loader from "../molecule/Loader";

function PartnerBank({ selectingPaymentType }) {
  const navigate = useNavigate();

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

  const [showAllUpi, setShowAllUpi] = useState(true);
  const [showCU, setShowCU] = useState(false);

  const backHandlerShowCreateUpi = () => {
    setShowCU(false);
    setShowAllUpi(true);
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
      const url = `${UrlHelper.PARTNER_BANK_API}/${partner.rechargeModule}`;
      const { data } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesstoken}`,
        },
      });

      console.log("datat :: " + JSON.stringify(data));
      setAllDepositData(data.bankList);
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

  const [bankname, setbankname] = useState("");
  const [accountholdername, setaccountholdername] = useState("");
  const [ifsccode, setifsccode] = useState("");
  const [accountnumber, setaccountnumber] = useState("");
  const [swiftcode, setswiftcode] = useState("");
  const [paymentnote, setpaymentnote] = useState("");
  const [seletedItem, setSelectedItem] = useState("");

  const [
    deleteBankAccount,
    { isLoading: deleteIsLoading, isError: deleteIsError },
  ] = useDeleteBankAccountMutation();

  // FOR DELETING DATA

  const deletingData = async (item) => {
    console.log("Deleting Data");
    setSelectedItem(item._id);

    const res = await deleteBankAccount({
      accesstoken: accesstoken,
      id: item._id,
    }).unwrap();

    allTheDepositData();

    showSuccessToast(res.message);
  };

  // FOR CREATING BANK ACCOUNT

  // TO GET ALL THE ADMIN BANK

  const [createBankAccount, { isLoading, error }] =
    useCreateBankAccountMutation();

  const submitCreateRequest = async () => {
    if (!bankname) {
      showErrorToast("Enter bank name");
      return;
    }
    if (!accountholdername) {
      showErrorToast("Enter account holder name");
      return;
    }
    if (!ifsccode) {
      showErrorToast("Add ifsc code / routing no.");
      return;
    }
    if (!accountnumber) {
      showErrorToast("Add account number");
      return;
    }
    if (!paymentnote) {
      showErrorToast("Add payment note");
      return;
    } else {
      try {
        if (swiftcode) {
          const body = {
            bankname,
            accountholdername,
            ifsccode,
            accountnumber,
            swiftcode,
            paymentnote,
            userId: user.userId,
          };

          console.log("JSON BODY :: ", JSON.stringify(body));

          const res = await createBankAccount({
            accesstoken: accesstoken,
            body: body,
          }).unwrap();

          showSuccessToast(res.message);
          allTheDepositData();
          backHandlerShowCreateUpi();
          setbankname("");
          setifsccode("");
          setaccountholdername("");
          setaccountnumber("");
          setpaymentnote("");
        } else {
          const body = {
            bankname,
            accountholdername,
            ifsccode,
            accountnumber,
            paymentnote,
            userId: user.userId,
          };

          console.log("JSON BODY :: ", JSON.stringify(body));

          const res = await createBankAccount({
            accesstoken: accesstoken,
            body: body,
          }).unwrap();

          showSuccessToast(res.message);
          allTheDepositData();
          backHandlerShowCreateUpi();
          setbankname("");
          setifsccode("");
          setaccountholdername("");
          setaccountnumber("");
          setpaymentnote("");
        }
      } catch (error) {
        showErrorToast("Something went wrong");
        console.log("Error during deposit:", error);
        if (error.response) {
          // Toast.show({ type: 'error', text1: error.response.data });
        } else if (error.request) {
          // Toast.show({
          //   type: 'error',
          //   text1: 'Request was made, but no response was received',
          // });
        } else {
          // Toast.show({ type: 'error', text1: error.message });
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
                Bank Payment
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
                              src={images.bank}
                              color={COLORS.background}
                              size={"2.5rem"}
                              className="paymenticon"
                            />
                          </div>

                          {/* <label className="pdB">Bank</label> */}
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
                            <label className="pdSB">Bank name</label>
                          </div>
                          <div className="uCCTopSC">
                            <label className="pdR">{item.bankname}</label>
                          </div>
                          <div className="thirdChildD">
                            <div
                              onClick={(e) => handleCopyClick(e, item.bankname)}
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
                            <label className="pdSB">Acc. Holder Name</label>
                          </div>
                          <div className="uCCTopSC">
                            <label className="pdR">
                              {item.accountholdername}
                            </label>
                          </div>
                          <div className="thirdChildD">
                            <div
                              onClick={(e) =>
                                handleCopyClick(e, item.accountholdername)
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
                            <label className="pdSB">Acc. No.</label>
                          </div>
                          <div className="uCCTopSC">
                            <label className="pdR">{item.accountnumber}</label>
                          </div>
                          <div className="thirdChildD">
                            <div
                              onClick={(e) =>
                                handleCopyClick(e, item.accountnumber)
                              }
                              className="copyCon"
                            >
                              <FaCopy color={COLORS.background} size={"2rem"} />
                            </div>
                          </div>
                        </div>
                        {/** TOP */}

                        {/** TOP */}
                        {/** TOP */}

                        {item.swiftcode ? (
                          <div className="uCCMidC">
                            <div className="uCCTopFC">
                              <label className="pdSB">Swift code</label>
                            </div>
                            <div className="uCCTopSC">
                              <label className="pdR">{item.swiftcode}</label>
                            </div>
                            <div className="thirdChildD">
                              <div
                                onClick={(e) =>
                                  handleCopyClick(e, item.swiftcode)
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
                        ) : null}

                        {/** TOP */}
                        <div className="uCCMidC">
                          <div className="uCCTopFC">
                            <label className="pdSB">
                              Routing No. / IFSC code
                            </label>
                          </div>
                          <div className="uCCTopSC">
                            <label className="pdR">{item.ifsccode}</label>
                          </div>
                          <div className="thirdChildD">
                            <div
                              onClick={(e) => handleCopyClick(e, item.ifsccode)}
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
                Create Bank Payment
              </label>
            </div>
          </div>
          {/** TOP NAVIGATION CONTATINER */}

          <div className="allLocationMainContainer">
            {/** UPI HOLDER NAME */}
            <label className="alCLLabel">Bank name</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter bank name"
                value={bankname}
                onChange={(e) => setbankname(e.target.value)}
              />
            </div>

            {/** UPI ID */}
            <label className="alCLLabel">Account holder name</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter account holder name"
                value={accountholdername}
                onChange={(e) => setaccountholdername(e.target.value)}
              />
            </div>

            {/** UPI ID */}
            <label className="alCLLabel">Account number</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter account number"
                value={accountnumber}
                onChange={(e) => setaccountnumber(e.target.value)}
              />
            </div>

            {/** UPI ID */}
            <label className="alCLLabel">IFSC code / Routing no.</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter IFSC code / Routing no."
                value={ifsccode}
                onChange={(e) => setifsccode(e.target.value)}
              />
            </div>

            {/** SWIFT CODE */}
            <label className="alCLLabel">Swift code (Optional)</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter swift code"
                value={swiftcode}
                onChange={(e) => setswiftcode(e.target.value)}
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

export default PartnerBank;
