import React, { useEffect, useState } from "react";
import "./UpiWithdraw.css";
import COLORS from "../../assets/constants/colors";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateWithdrawMutation } from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import CircularProgressBar from "../helper/CircularProgressBar";
import { IoDocumentText } from "react-icons/io5";
import { PiSubtitles } from "react-icons/pi";

function OtherWithdraw({ selectingPaymentType }) {
  const goToPreviousPage = () => {
    selectingPaymentType(""); // Resetting selectedPayment in the parent
    console.log("GOING PREVIOUS PAGE");
  };

  const navigation = useNavigate();
  const { accesstoken, user } = useSelector((state) => state.user);

  const [amountval, setAmountval] = useState("");
  const [upiHolderName, setUpiHolderName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [remarkval, setRemarkval] = useState("");
  const [showProgressBar, setProgressBar] = useState(false);
  const [paymentName, setPaymentName] = useState("");
  const [firstInputName, setFirstInputName] = useState("");
  const [firstInput, setFirstInput] = useState("");

  const [secondInputName, setSecondInputName] = useState("");
  const [secondInput, setSecondInput] = useState("");

  const [thirdInputName, setThirdInputName] = useState("");
  const [thirdInput, setThirdInput] = useState("");
  const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const [createWithdraw, { isLoading, error }] = useCreateWithdrawMutation();

  const settingDefaultValue = () => {
    setAmountval("");
    setRemarkval("");
    setFirstInput("");
    setSecondInput("");
    setThirdInput("");

    setImageSource(null);
    setFirstInputName("");
    setSecondInputName("");
    setThirdInputName("");

    setImageSource(null);
  };

  const MIN_WITHDRAW_AMOUNT = 100;

  const submitHandler = async () => {
    if (!amountval) {
      showErrorToast("Enter Amount");
    } else if (isNaN(amountval)) {
      showErrorToast("Enter Valid Amount");
      return;
    } else if (parseFloat(amountval) < MIN_WITHDRAW_AMOUNT) {
      showErrorToast(`Minimum Amount to withdraw is ${MIN_WITHDRAW_AMOUNT}`);
      return; // Stop further execution if the amount is too low
    } else if (parseFloat(user?.walletOne?.balance) < parseFloat(amountval)) {
      showErrorToast(
        `You have insufficent balance in ${user?.walletOne?.walletName} wallet`
      );
      return; // Stop further execution if the amount is too low
    } else if (!paymentName) {
      showErrorToast("Please enter payment name");
      return;
    } else if (firstInputName && !firstInput) {
      showErrorToast(`Enter ${"first value"}`);
      return;
    } else {
      try {
        // const body = {
        //   amount: amountval,
        //   remark: remarkval,
        //   paymenttype: "Upi",
        //   username: user.name,
        //   userid: user.userId,
        //   paymentstatus: "Pending",
        //   transactionType: "Withdraw",
        //   upiHolderName,
        //   upiId,
        // };

        const formData = new FormData();
        formData.append("amount", amountval);
        formData.append("remark", remarkval);
        formData.append("paymenttype", "Other");
        formData.append("username", user.name);
        formData.append("userid", user.userId);
        formData.append("paymentstatus", "Pending");
        formData.append("transactionType", "Withdraw");

        // ✅ Append fields dynamically only if they have data
        if (paymentName) formData.append("paymentName", paymentName);
        if (firstInput) formData.append("firstInput", firstInput);
        if (firstInputName) formData.append("firstInputName", firstInputName);
        if (secondInput) formData.append("secondInput", secondInput);
        if (secondInputName)
          formData.append("secondInputName", secondInputName);
        if (thirdInput) formData.append("thirdInput", thirdInput);
        if (thirdInputName) formData.append("thirdInputName", thirdInputName);

        if (imageSource) formData.append("qrcode", imageSource);

        console.log("Request body :: " + JSON.stringify(body));

        const res = await createWithdraw({
          accessToken: accesstoken,
          body: formData,
        }).unwrap();

        console.log("Withdraw res :: " + JSON.stringify(res));

        showSuccessToast(res.message);
        settingDefaultValue();
        // showSuccessToast("Success");
        // // goToPreviousPage();
      } catch (error) {
        console.log("Error during withdraw:", error);
        showErrorToast("Something went wrong");
      }
    }
  };

  return (
    <div className="cp-container">
      {/** TOP NAVIGATION CONTATINER */}
      <div className="alCreatLocationTopContainer">
        <div className="searchIconContainer" onClick={goToPreviousPage}>
          <IoArrowBackCircleOutline color={COLORS.white_s} size={"2.5rem"} />
        </div>

        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Other Withdraw
          </label>
        </div>
      </div>
      <div className="allLocationMainContainer">
        {/** AMOUNT */}

        <label className="alCLLabel">Amount</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <IoDocumentText color={COLORS.background} size={"2.5rem"} />
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

        {/** PAYMENT METHOD NAME */}

        <label className="alCLLabel">Payment Method Name</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <PiSubtitles color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder={`Payment Header name: Exm - Paypal, Skill, etc.`}
            value={paymentName}
            onChange={(e) => setPaymentName(e.target.value)}
          />
        </div>

        {/** FIRST INPUT Name */}

        <label className="alCLLabel">First Input Name</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <PiSubtitles color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder={`1st Head line name: Exm - [ Paypal ID ]`}
            value={firstInputName}
            onChange={(e) => setFirstInputName(e.target.value)}
          />
        </div>
        {/** FIRST INPUT */}
        <label className="alCLLabel">First Input Value</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <PiSubtitles color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder={`Payment Receiving ID: Exm- Paypal@gmail.com`}
            value={firstInput}
            onChange={(e) => setFirstInput(e.target.value)}
          />
        </div>

        {/** SECOND  INPUT NAME */}

        <label className="alCLLabel">Second Input Name</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <PiSubtitles color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder={
              "2nd Head line name: Exm - [ Paypal ID ] Other field to add ( Optional )"
            }
            value={secondInputName}
            onChange={(e) => setSecondInputName(e.target.value)}
          />
        </div>
        {/** SECOND  INPUT  */}
        <label className="alCLLabel">Second Input Value</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <PiSubtitles color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder={
              "2nd input value if your payment option have update in this field ( Optional )"
            }
            value={secondInput}
            onChange={(e) => setSecondInput(e.target.value)}
          />
        </div>

        {/** THIRD  INPUT NAME */}
        <label className="alCLLabel">Third Input Name</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <PiSubtitles color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder={
              "3rd Head line name: Exm - [ Paypal ID ] Other field to add ( Optional )"
            }
            value={thirdInputName}
            onChange={(e) => setThirdInputName(e.target.value)}
          />
        </div>
        {/** THIRD  INPUT */}
        <label className="alCLLabel">Third Input Value</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <PiSubtitles color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder={
              "3rd input value if your payment option have update in this field ( Optional )"
            }
            value={thirdInput}
            onChange={(e) => setThirdInput(e.target.value)}
          />
        </div>

        {/** FOURTH INPUT  */}
        <label className="alCLLabel">QR Code</label>
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

        {/** REMARK    */}
        <label className="alCLLabel">Remark</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <IoDocumentText color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            type="text"
            style={{
              minHeight: "2rem",
            }}
            name="remark"
            placeholder="Enter remark"
            value={remarkval}
            onChange={(e) => setRemarkval(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="NC">
          <CircularProgressBar />
        </div>
      ) : (
        <div className="alBottomContainer" onClick={submitHandler}>
          <label className="alBottomContainerlabel">Withdraw</label>
        </div>
      )}
    </div>
  );
}

export default OtherWithdraw;
