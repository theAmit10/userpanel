import React, { useEffect, useState } from "react";
import "./Wallet.css";
import { FaWallet } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "../../redux/actions/userAction";
import { ToastContainer } from "react-toastify";
import { LoadingComponent } from "../helper/LoadingComponent";

function Wallet() {
  const dispatch = useDispatch();

  const { accesstoken, user, loading } = useSelector((state) => state.user);

  const [showPN, setShowPN] = useState(true);
  const [reloadKey, setReloadKey] = useState(0); // For reloading the component

  const [selectedWallet, setSelectedWallet] = useState("walletOne"); // Default to walletOne

  // Load user profile on component mount
  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, [dispatch, accesstoken]);

  // Handle wallet selection and reload logic
  const handleWalletSelection = (wallet) => {
    if (selectedWallet === wallet) {
      // If the same wallet is selected, force reload by updating the reloadKey
      setReloadKey((prevKey) => prevKey + 1);
    } else {
      // Select a new wallet
      setSelectedWallet(wallet);
      setReloadKey(0); // Reset reload key
    }
  };

  return (
    <div className="pn-containter">
      {/** TOP NAVIGATION CONTAINER */}
      {showPN && (
        <>
          <div className="alCreatLocationTopContainer">
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Wallets
              </label>
            </div>
          </div>

          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <div className="pnMainContainer">
                <div className="hdAllContainer" style={{ background: "transparent" }}>
                  {/** Wallet One */}
                  <div
                    className="hdAllContainerContent"
                    onClick={() => handleWalletSelection("walletOne")} // Handle wallet selection
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {user.walletOne?.walletName}
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        {user.walletOne?.balance} {user?.country?.countrycurrencysymbol}
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={"#000"} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>

                  {/** Wallet Two */}
                  <div
                    className="hdAllContainerContent"
                    onClick={() => handleWalletSelection("walletTwo")} // Handle wallet selection
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {user.walletTwo?.walletName}
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        {user.walletTwo?.balance} {user?.country?.countrycurrencysymbol}
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={"#000"} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/** Render selected wallet */}
              <div key={reloadKey}> {/* Key forces re-render when reloadKey changes */}
               
              </div>
            </>
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
}

export default Wallet;



// import React, { useCallback, useEffect, useState } from "react";
// import "./Wallet.css";
// import { PiHandDepositBold } from "react-icons/pi";
// import { PiHandWithdrawFill } from "react-icons/pi";
// import COLORS from "../../assets/constants/colors";
// import FONT from "../../assets/constants/fonts";
// import { FaRegCheckCircle } from "react-icons/fa";
// import { FaRegPlayCircle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useGetPlayHistoryQuery } from "../../helper/Networkcall";
// import CircularProgressBar from "../helper/CircularProgressBar";
// import { useTransferWalletBalanceMutation } from "../../redux/api";
// import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
// import { loadProfile } from "../../redux/actions/userAction";
// import { FaWallet } from "react-icons/fa";
// import { ToastContainer } from "react-toastify";
// import { CiEdit } from "react-icons/ci";
// import { LoadingComponent } from "../helper/LoadingComponent";



// function Wallet() {
//   const dispatch = useDispatch();

//   const { accesstoken, user, loading } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(loadProfile(accesstoken));
//   }, []);

//   const [showPN, setShowPN] = useState(true);
//   const [showAU, setShowAU] = useState(false);

//   return (
//     <div className="pn-containter">
//       {/** TOP NAVIGATION CONTATINER */}
//       {/** SHOWING ALL WALLET */}
//       {showPN && (
//         <>
//           <div className="alCreatLocationTopContainer">
//             <div className="alCreatLocationTopContaineCL">
//               <label className="alCreatLocationTopContainerlabel">
//                 All Wallet
//               </label>
//             </div>
//           </div>

//           {loading ? (
//             <LoadingComponent />
//           ) : (
//             <>
//               <div className="pnMainContainer">
//                 <div
//                   className="hdAllContainer"
//                   style={{ background: "transparent" }}
//                 >
//                   {/** ALL USERS */}
//                   <div className="hdAllContainerContent">
//                     <div className="hdAllContainerContentTop">
//                       <label className="hdAllContainerContentTopBoldLabel">
//                         {user.walletOne?.walletName}
//                       </label>
//                       {/* <div className="hdContenContainerIcon">
//                         <CiEdit color={COLORS.background} size={"2.5rem"} />
//                       </div> */}
//                     </div>
//                     <div className="hdAllContainerContentBottom">
//                       <label className="hdAllContainerContentTopRegularLabel">
//                         {user.walletOne.balance}{" "}
//                         {user?.country?.countrycurrencysymbol}
//                       </label>
//                       <div className="hdContenContainerIcon">
//                         <FaWallet color={COLORS.background} size={"2.5rem"} />
//                       </div>
//                     </div>
//                   </div>

//                   {/** SINGLE USERS */}
//                   <div className="hdAllContainerContent">
//                     <div className="hdAllContainerContentTop">
//                       <label className="hdAllContainerContentTopBoldLabel">
//                         {user.walletTwo?.walletName}
//                       </label>
//                       {/* <div className="hdContenContainerIcon">
//                         <CiEdit color={COLORS.background} size={"2.5rem"} />
//                       </div> */}
//                     </div>
//                     <div className="hdAllContainerContentBottom">
//                       <label className="hdAllContainerContentTopRegularLabel">
//                         {user.walletTwo.balance}{" "}
//                         {user?.country?.countrycurrencysymbol}
//                       </label>
//                       <div className="hdContenContainerIcon">
//                         <FaWallet color={COLORS.background} size={"2.5rem"} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </>
//       )}

//       <ToastContainer />
//     </div>
//   );
// }

// export default Wallet;
