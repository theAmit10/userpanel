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
import { LoadingComponent } from "../helper/LoadingComponent";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { NodataFound } from "../helper/NodataFound";
import { serverName } from "../../redux/store";
import { PiSubtitles } from "react-icons/pi";

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
      formData.append("paymenttype", "Bank");
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
      const url = `${UrlHelper.PARTNER_USER_BANK_API}/${user.rechargePaymentId}`;
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
                      <div
                        key={item._id}
                        className="upipdContentContainer"
                        onClick={() => selecetingItemForDeposit(item)}
                      >
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

                          <label className="pdB">Bank</label>
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
                Create Bank Deposit
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
                  accept="image/*"
                  onChange={selectDoc}
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
                placeholder="Enter amount, currency & method with remarks (e.g. 100 USD BANK)"
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

export default Bankdeposit;
