import React, { useState } from "react";
import "./Paymentdeposit.css";
import FONT from "../../assets/constants/fonts";
import { FaRegPlayCircle } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import Upideposit from "./Upideposit";
import Bankdeposit from "./Bankdeposit";
import Skrilldeposit from "./Skrilldeposit";
import Paypaldeposit from "./Paypaldeposit";
import Cryptodeposit from "./Cryptodeposit";
import { CiEdit } from "react-icons/ci";
import { UD } from "./UD";

function Paymentdeposit() {
  const [selectedPayment, setSelectedPayment] = useState("");

  const selectingPaymentType = (item) => {
    setSelectedPayment(item);
  };

  const [showPD, setShowPD] = useState(true);
  const [selectItem, setSelectItem] = useState("");
  const [showEditSA, setShowEditSA] = useState(false);

  const settingEditSA = (item) => {
    setShowSA(false);
    setShowEditSA(true);
    setSelectItem(item);
  };

  const backHanndler = () => {
    setShowSA(true);
    setShowEditSA(false);
    setSelectItem("");
  };

  return (
    <div className="pdContainer">
      {selectedPayment === "" && (
        <div className="alCreatLocationTopContainer">
          <div className="alCreatLocationTopContaineCL">
            <label className="alCreatLocationTopContainerlabel">
              Payment Deposit
            </label>
          </div>
        </div>
      )}

      {/** SHOWING ALL WALLET */}
      {selectedPayment === "" && (
        <div className="pnMainContainer">
          <div className="hdAllContainer" style={{ background: "transparent" }}>
            {/** UPI  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("upi")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">UPI</label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create UPI Payment Deposit
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.upi}
                    color={COLORS.background}
                    size={"1rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>

            {/** Bank */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("bank")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Bank
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Bank Payment Deposit
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.bank}
                    color={COLORS.background}
                    className="pdicon"
                    size={"2.5rem"}
                  />
                </div>
              </div>
            </div>

            {/** PAYPAL  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("paypal")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Paypal
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Paypal Payment Deposit
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.paypal}
                    color={COLORS.background}
                    size={"2.5rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>

            {/** SKRILL */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("skrill")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Skrill
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Skrill Payment Deposit
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.skrill}
                    color={COLORS.background}
                    size={"2.5rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>

            {/** CRYPTO  */}
            <div
              className="hdAllContainerContent"
              onClick={() => selectingPaymentType("crypto")}
            >
              <div className="hdAllContainerContentTop">
                <label className="hdAllContainerContentTopBoldLabel">
                  Crypto
                </label>
                <div className="hdContenContainerIcon">
                  <CiEdit color={COLORS.background} size={"2.5rem"} />
                </div>
              </div>
              <div className="hdAllContainerContentBottom">
                <label className="hdAllContainerContentTopRegularLabel">
                  Create Crypto Payment Deposit
                </label>
                <div className="hdContenContainerIcon">
                  <img
                    src={images.crypto}
                    color={COLORS.background}
                    size={"2.5rem"}
                    className="paymenticon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPayment === "upi" && (
        <UD selectingPaymentType={selectingPaymentType} />
      )}
      {selectedPayment === "bank" && (
        <Bankdeposit selectingPaymentType={selectingPaymentType} />
      )}
      {selectedPayment === "skrill" && (
        <Skrilldeposit selectingPaymentType={selectingPaymentType} />
      )}
      {selectedPayment === "paypal" && (
        <Paypaldeposit selectingPaymentType={selectingPaymentType} />
      )}
      {selectedPayment === "crypto" && (
        <Cryptodeposit selectingPaymentType={selectingPaymentType} />
      )}
    </div>
  );
}

export default Paymentdeposit;

// import React, { useState } from "react";
// import "./Paymentdeposit.css";
// import FONT from "../../assets/constants/fonts";
// import { FaRegPlayCircle } from "react-icons/fa";
// import COLORS from "../../assets/constants/colors";
// import images from "../../assets/constants/images";
// import Upideposit from "./Upideposit";
// import Bankdeposit from "./Bankdeposit";
// import Skrilldeposit from "./Skrilldeposit";
// import Paypaldeposit from "./Paypaldeposit";
// import Cryptodeposit from "./Cryptodeposit";

// function Paymentdeposit() {
//   const [selectedPayment, setSelectedPayment] = useState("");

//   const selectingPaymentType = (item) => {
//     setSelectedPayment(item);
//   };

//   return (
//     <div className="history-main-container">
//       {selectedPayment === "" && (
//         <>

//           {/** TITLE CONTAINER */}
//           <label className="h-title-label-h">Deposit</label>

//           {/** TITLE CONTAINER */}
//           <label className="h-title-label-h">Choose Method</label>

//           {/** Main Conatiner */}

//           <div className="deposit-container">
//             {/** UPI AND BANK */}
//             <div className="deposit-content-container-main">
//               {/** UPI */}
//               <div
//                 className="deposit-content-container"
//                 onClick={() => selectingPaymentType("UPI")}
//               >
//                 <div className="deposit-content-container-left-deposit">
//                   <div
//                     className="deposit-content-content-left-content-icon-container"
//                     style={{
//                       borderRadius: "1vh",
//                     }}
//                   >
//                     <img
//                       src={images.upi}
//                       alt="UPI"
//                       className="deposit-content-image-setting"
//                     />
//                   </div>
//                 </div>
//                 <div className="deposit-content-container-right">
//                   <label className="deposit-content-container-right-lebel-or">
//                     UPI Payment
//                   </label>
//                 </div>
//               </div>

//               {/** BANK */}
//               <div
//                 className="deposit-content-container"
//                 onClick={() => selectingPaymentType("BANK")}
//               >
//                 <div className="deposit-content-container-left-deposit">
//                   <div
//                     className="deposit-content-content-left-content-icon-container"
//                     style={{
//                       borderRadius: "1vh",
//                     }}
//                   >
//                     <img
//                       src={images.bank}
//                       alt="UPI"
//                       className="deposit-content-image-setting"
//                     />
//                   </div>
//                 </div>
//                 <div className="deposit-content-container-right">
//                   <label className="deposit-content-container-right-lebel-or">
//                     Bank Payment
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/** PAYAPAL AND SKRILL */}
//             <div className="deposit-content-container-main">
//               {/** PAYPAL */}
//               <div
//                 className="deposit-content-container"
//                 onClick={() => selectingPaymentType("PAYPAL")}
//               >
//                 <div className="deposit-content-container-left-deposit">
//                   <div
//                     className="deposit-content-content-left-content-icon-container"
//                     style={{
//                       borderRadius: "1vh",
//                     }}
//                   >
//                     <img
//                       src={images.paypal}
//                       alt="UPI"
//                       className="deposit-content-image-setting"
//                     />
//                   </div>
//                 </div>
//                 <div className="deposit-content-container-right">
//                   <label className="deposit-content-container-right-lebel-or">
//                     Paypal Payment
//                   </label>
//                 </div>
//               </div>

//               {/** SKRILL */}
//               <div
//                 className="deposit-content-container"
//                 onClick={() => selectingPaymentType("SKRILL")}
//               >
//                 <div className="deposit-content-container-left-deposit">
//                   <div
//                     className="deposit-content-content-left-content-icon-container"
//                     style={{
//                       borderRadius: "1vh",
//                     }}
//                   >
//                     <img
//                       src={images.skrill}
//                       alt="UPI"
//                       className="deposit-content-image-setting"
//                     />
//                   </div>
//                 </div>
//                 <div className="deposit-content-container-right">
//                   <label className="deposit-content-container-right-lebel-or">
//                     Skrill Payment
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/** CRYPTO  */}
//             <div
//               className="deposit-content-container-main"
//               onClick={() => selectingPaymentType("CRYPTO")}
//             >
//               {/** CRYPTO */}
//               <div className="deposit-content-container">
//                 <div className="deposit-content-container-left-deposit">
//                   <div
//                     className="deposit-content-content-left-content-icon-container"
//                     style={{
//                       borderRadius: "1vh",
//                     }}
//                   >
//                     <img
//                       src={images.crypto}
//                       alt="UPI"
//                       className="deposit-content-image-setting"
//                     />
//                   </div>
//                 </div>
//                 <div className="deposit-content-container-right">
//                   <label className="deposit-content-container-right-lebel-or">
//                     Crypto Payment
//                   </label>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

// {selectedPayment === "UPI" && <Upideposit selectingPaymentType={selectingPaymentType} />}
// {selectedPayment === "BANK" && <Bankdeposit selectingPaymentType={selectingPaymentType} />}
// {selectedPayment === "SKRILL" && <Skrilldeposit selectingPaymentType={selectingPaymentType} />}
// {selectedPayment === "PAYPAL" && <Paypaldeposit selectingPaymentType={selectingPaymentType} />}
// {selectedPayment === "CRYPTO" && <Cryptodeposit selectingPaymentType={selectingPaymentType} />}
//     </div>
//   );
// }

// export default Paymentdeposit;

// .deposit-main-container{
//   display: flex;
//   flex: 1;
//   height: 80vh;
//   background: linear-gradient(180deg, #0162AF, #011833);
//   margin: 2vh;
//   border-radius: 2vh;
//   padding: 2vh;
//   flex-direction: column;
//   gap: 2vh;
//   overflow-y: hidden;
// }

// .h-title-label{
//   color: var(--white_s);
//   font-size: 2vw;
//   font-family: 'MSB';
// }

// .deposit-container{
//   height: 70vh;
//   overflow-y: scroll; /* Enable vertical scrolling */
//   display: flex;
//   flex-direction: column;
//   gap: 1vh;
// }

// .deposit-content-container{
//   width: 45%;
//   height: 20vh;
//   background-color: var(--background);
//   border-radius: 2vh;
//   display: flex;
//   flex-direction: row;
// }

// .deposit-content-container:hover{
//   border: 2px solid var(--green); /* Change border color on hover */
//   cursor: pointer;
// }

// .deposit-content-container-left-deposit{
//   flex: 1;
//   display: flex;
//   justify-content: center;
//   align-items: center;

// }

// .deposit-content-container-right{
//   flex: 3;

//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   padding: 2vh;

// }

// .deposit-content-content-left-content-icon-container{
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
//   padding: 1vh;
//   background-color: white;
//   border-radius: '2vh';
//   margin-left: 2vw;
// }

// .deposit-content-container-right-lebel-or{
//   color: var(--white_s);
//   font-size: 1.5em;
//   font-family: 'MB';

// }

// .deposit-content-container-main{
//   display: flex;
//   flex-direction: row;
//   gap: 4vh;
// }

// .deposit-content-image-setting {
//   height: 100%;
//   width: 100%;
//   object-fit: cover;

// }

// @media (max-width: 1024px) {
//   .deposit-content-container-right-lebel{
//       color: var(--white_s);
//       font-size: 2.2vw;
//       font-family: 'MB';

//   }
//   .h-title-label{
//       color: var(--white_s);
//       font-size: 2.2vw;
//       font-family: 'MB';
//   }
// }

// @media (max-width: 768px) {
//   .deposit-content-container-right-lebel{
//       color: var(--white_s);
//       font-size: 2.4vw;
//       font-family: 'MB';

//   }
//   .h-title-label{
//       color: var(--white_s);
//       font-size: 5vw;
//       font-family: 'MB';
//   }
//   .deposit-content-container-right-lebel-or{
//       color: var(--white_s);
//       font-size: 1em;
//       font-family: 'MB';

//   }
//   .deposit-content-container-left-deposit{
//       display: none;
//   }
// }
