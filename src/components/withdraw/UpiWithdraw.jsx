import React, { useEffect, useState } from "react";
import "./UpiWithdraw.css";
import FONT from "../../assets/constants/fonts";
import { FaRegPlayCircle } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { flushSync } from "react-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCreateDepositMutation,
  useCreateWithdrawMutation,
} from "../../redux/api";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../helper/showErrorToast";
import CircularProgressBar from "../helper/CircularProgressBar";
import { ToastContainer } from "react-toastify";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoDocumentText } from "react-icons/io5";

const upiapidata = [
  { name: "Wasu", upiid: "9876543210@ybl", id: "1" },
  { name: "Aman", upiid: "8876543210@ybl", id: "2" },
  { name: "Zasu", upiid: "7876543210@ybl", id: "3" },
  { name: "Masu", upiid: "1876543210@ybl", id: "4" },
  { name: "Kasu", upiid: "2876543210@ybl", id: "5" },
];

function UpiWithdraw({ selectingPaymentType }) {
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
  const [createWithdraw, { isLoading, error }] = useCreateWithdrawMutation();
  console.log("MOINEE:: " + isLoading);

  const MIN_WITHDRAW_AMOUNT = 100;

  const submitHandler = async () => {
    if (!amountval) {
      showErrorToast("Enter Amount");
    }
    else if (isNaN(amountval)) {
      showErrorToast("Enter Valid Amount");
      return;
    } 
    else if (parseFloat(amountval) < MIN_WITHDRAW_AMOUNT) {
      showErrorToast(`Minimum Amount to withdraw is ${MIN_WITHDRAW_AMOUNT}`);
      return; // Stop further execution if the amount is too low
    }
    else if (parseFloat(user?.walletOne?.balance) < parseFloat(amountval)) {
      showErrorToast(`You have insufficent balance in ${user?.walletOne?.walletName} wallet`);
      return; // Stop further execution if the amount is too low
    }
    else if (!upiHolderName) {
      showErrorToast("Enter UPI Holder Name");
    } else if (!upiId) {
      showErrorToast("Enter UPI ID");
    } else {
      try {
        const body = {
          amount: amountval,
          remark: remarkval,
          paymenttype: "Upi",
          username: user.name,
          userid: user.userId,
          paymentstatus: "Pending",
          transactionType: "Withdraw",
          upiHolderName,
          upiId,
        };

        console.log("Request body :: " + JSON.stringify(body));

        const res = await createWithdraw({
          accessToken: accesstoken,
          body,
        }).unwrap();

        console.log("Withdraw res :: " + JSON.stringify(res));

        await showSuccessToast(res.message);
        goToPreviousPage();
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
            UPI Withdraw
          </label>
        </div>
      </div>
      <div className="cp-container-main">

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

        {/** UPI HOLDER NAME */}
        <label className="alCLLabel">UPI Holder Name</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <IoDocumentText color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            type="text"
            name="upiHolderName"
            placeholder="Enter upi holder name"
            value={upiHolderName}
            onChange={(e) => setUpiHolderName(e.target.value)}
          />
        </div>
      

        {/** upi id */}
        <label className="alCLLabel">UPI ID</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <IoDocumentText color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            type="text"
            name="upiId"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
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

      <ToastContainer />
    </div>
  );
}

export default UpiWithdraw;

// import React, { useEffect, useState } from "react";
// import "./UpiWithdraw.css";
// import FONT from "../../assets/constants/fonts";
// import { FaRegPlayCircle } from "react-icons/fa";
// import COLORS from "../../assets/constants/colors";
// import images from "../../assets/constants/images";
// import { flushSync } from "react-dom";
// import { IoArrowBackCircleOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   useCreateDepositMutation,
//   useCreateWithdrawMutation,
// } from "../../redux/api";
// import axios from "axios";
// import UrlHelper from "../../helper/UrlHelper";
// import {
//   showErrorToast,
//   showSuccessToast,
//   showWarningToast,
// } from "../helper/showErrorToast";
// import CircularProgressBar from "../helper/CircularProgressBar";
// import { ToastContainer } from "react-toastify";
// import { RiLockPasswordLine } from "react-icons/ri";

// const upiapidata = [
//   { name: "Wasu", upiid: "9876543210@ybl", id: "1" },
//   { name: "Aman", upiid: "8876543210@ybl", id: "2" },
//   { name: "Zasu", upiid: "7876543210@ybl", id: "3" },
//   { name: "Masu", upiid: "1876543210@ybl", id: "4" },
//   { name: "Kasu", upiid: "2876543210@ybl", id: "5" },
// ];

// function UpiWithdraw({ selectingPaymentType }) {
//   const goToPreviousPage = () => {
//     selectingPaymentType(""); // Resetting selectedPayment in the parent
//     console.log("GOING PREVIOUS PAGE");
//   };

//   const navigation = useNavigate();
//   const { accesstoken, user } = useSelector((state) => state.user);

//   const [amountval, setAmountval] = useState("");
//   const [upiHolderName, setUpiHolderName] = useState("");
//   const [upiId, setUpiId] = useState("");
//   const [remarkval, setRemarkval] = useState("");
//   const [showProgressBar, setProgressBar] = useState(false);
//   const [createWithdraw, { isLoading, error }] = useCreateWithdrawMutation();
//   console.log("MOINEE:: " + isLoading);

//   const submitHandler = async () => {
//     if (!amountval) {
//       showErrorToast("Enter Amount");
//     } else if (!upiHolderName) {
//       showErrorToast("Enter UPI Holder Name");
//     } else if (!upiId) {
//       showErrorToast("Enter UPI ID");
//     } else {
//       try {
//         const body = {
//           amount: amountval,
//           remark: remarkval,
//           paymenttype: "Upi",
//           username: user.name,
//           userid: user.userId,
//           paymentstatus: "Pending",
//           transactionType: "Withdraw",
//           upiHolderName,
//           upiId,
//         };

//         console.log("Request body :: " + JSON.stringify(body));

//         const res = await createWithdraw({
//           accessToken: accesstoken,
//           body,
//         }).unwrap();

//         console.log("Withdraw res :: " + JSON.stringify(res));

//         await showSuccessToast(res.message);
//         goToPreviousPage();
//       } catch (error) {
//         console.log("Error during withdraw:", error);
//         showErrorToast("Something went wrong");
//       }
//     }
//   };

//   return (
//     <div className="deposit-main-container">
//       {/** TOP CONTAINER */}
//       <div
//         style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
//       >
//         <IoArrowBackCircleOutline
//           onClick={goToPreviousPage}
//           color={COLORS.white_s}
//           size={"2.5em"}
//         />

//         {/** TITLE CONTAINER */}
//         <div
//           style={{
//             flex: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <label className="h-title-label">UPI Withdraw</label>
//         </div>
//       </div>

//       {/** TITLE CONTAINER */}
//       <div
//         style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
//       ></div>

//       {/** Main Conatiner */}

//       <div className="deposit-container">
//         <div className="deposit-content-container-main-upi">
//           {/** LEFT LIST OF DEPOSIT */}

//           {/** DEPOSIT FORM */}

//           <div className="deposit-content-container-left-upi-left">
//             <div className="upiDepositFormContainer">
//               {/** AMOUNT */}

//               <label className="alCLLabel">Amount</label>
//               <div className="alSearchContainer">
//                 <div className="searchIconContainer">
//                   <RiLockPasswordLine
//                     color={COLORS.background}
//                     size={"2.5rem"}
//                   />
//                 </div>

//                 <input
//                   className="al-search-input"
//                   type="number"
//                   name="amount"
//                   placeholder="Enter amount"
//                   value={amountval}
//                   onChange={(e) => setAmountval(e.target.value)}
//                 />
//               </div>
//               {/** UPI HOLDER NAME */}
//               <div className="formUpiDepositFormContainerContent">
//                 <label className="formUpiDepositFormContainerContentLabel">
//                   UPI Holder Name
//                 </label>
//                 <input
//                   className="formUpiDepositFormContainerContentInput"
//                   type="text"
//                   name="upiHolderName"
//                   placeholder="Enter upi holder name"
//                   value={upiHolderName}
//                   onChange={(e) => setUpiHolderName(e.target.value)}
//                 />
//               </div>

//               {/** upi id */}
//               <div className="formUpiDepositFormContainerContent">
//                 <label className="formUpiDepositFormContainerContentLabel">
//                   UPI ID
//                 </label>
//                 <input
//                   className="formUpiDepositFormContainerContentInput"
//                   type="text"
//                   name="upiId"
//                   placeholder="Enter UPI ID"
//                   value={upiId}
//                   onChange={(e) => setUpiId(e.target.value)}
//                 />
//               </div>

//               {/** REMARK    */}
//               <div className="formUpiDepositFormContainerContent">
//                 <label className="formUpiDepositFormContainerContentLabel">
//                   Remark
//                 </label>
//                 <input
//                   className="formUpiDepositFormContainerContentInput"
//                   style={{
//                     minHeight: "2vw",
//                   }}
//                   type="text"
//                   name="remark"
//                   placeholder="Enter remark"
//                   value={remarkval}
//                   onChange={(e) => setRemarkval(e.target.value)}
//                 />
//               </div>

//               {/** DEPOSIT BUTTON */}
//               <div
//                 style={{
//                   marginTop: "2vw",
//                 }}
//               >
//                 {isLoading ? (
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       padding: "2vw",
//                     }}
//                   >
//                     <CircularProgressBar />
//                   </div>
//                 ) : (
//                   <button
//                     className="submit-btn-login-deposit"
//                     onClick={submitHandler}
//                   >
//                     Withdraw
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default UpiWithdraw;
