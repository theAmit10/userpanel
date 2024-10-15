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
  const [previousWalletData, setPreviousWalletData] = useState({
    walletOneBalance: null,
    walletTwoBalance: null,
    walletOneName: null,
    walletTwoName: null,
  });

  const [initialLoading, setInitialLoading] = useState(true); // Track initial loading state

  // Load profile on first mount and for subsequent refreshes
  useEffect(() => {
    const loadProfileData = () => {
      if (accesstoken) {
        dispatch(loadProfile(accesstoken));
      }
    };

    // Call loadProfileData initially
    loadProfileData();
    setInitialLoading(false); // Stop showing loader after first load

    // Set interval to call loadProfileData every 6 seconds
    const intervalId = setInterval(() => {
      loadProfileData();
    }, 6000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [dispatch, accesstoken]);

  // Handle wallet balance comparison and UI updates
  useEffect(() => {
    if (!loading && user) {
      const newWalletData = {
        walletOneBalance: user.walletOne?.balance,
        walletTwoBalance: user.walletTwo?.balance,
        walletOneName: user.walletOne?.walletName,
        walletTwoName: user.walletTwo?.walletName,
      };

      // Compare previous and current wallet balances
      if (
        previousWalletData.walletOneBalance !== newWalletData.walletOneBalance ||
        previousWalletData.walletTwoBalance !== newWalletData.walletTwoBalance
      ) {
        // Update the state with the new data only when balances change
        setPreviousWalletData(newWalletData);
      }
    }
  }, [user, loading, previousWalletData]);

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

          {/** Show loading spinner only for the initial load */}
          {initialLoading ? (
            <LoadingComponent />
          ) : (
            <>
              <div className="pnMainContainer">
                <div
                  className="hdAllContainer"
                  style={{ background: "transparent" }}
                >
                 

                  {/** Wallet Two */}
                  <div
                    className="hdAllContainerContent"
                    onClick={() => handleWalletSelection("walletTwo")} // Handle wallet selection
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {previousWalletData.walletTwoName}
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        {previousWalletData.walletTwoBalance}{" "}
                        {user?.country?.countrycurrencysymbol}
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={"#000"} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>

                   {/** Wallet One */}
                   <div
                    className="hdAllContainerContent"
                    onClick={() => handleWalletSelection("walletOne")} // Handle wallet selection
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {previousWalletData.walletOneName}
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        {previousWalletData.walletOneBalance}{" "}
                        {user?.country?.countrycurrencysymbol}
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={"#000"} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/** Render selected wallet */}
              <div key={reloadKey}>
                {" "}
                {/* Key forces re-render when reloadKey changes */}
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



// import React, { useEffect, useState } from "react";
// import "./Wallet.css";
// import { FaWallet } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { loadProfile } from "../../redux/actions/userAction";
// import { ToastContainer } from "react-toastify";
// import { LoadingComponent } from "../helper/LoadingComponent";

// function Wallet() {
//   const dispatch = useDispatch();

//   const { accesstoken, user, loading } = useSelector((state) => state.user);

//   const [showPN, setShowPN] = useState(true);
//   const [reloadKey, setReloadKey] = useState(0); // For reloading the component

//   const [selectedWallet, setSelectedWallet] = useState("walletOne"); // Default to walletOne
//   const [previousBalanceOne, setPreviousBalanceOne] = useState(null);
//   const [previousBalanceTwo, setPreviousBalanceTwo] = useState(null);

//   // Load user profile on component mount
//   // useEffect(() => {
//   //   dispatch(loadProfile(accesstoken));
//   // }, [dispatch, accesstoken]);

//   // Load profile when the component mounts and when it is focused
//   useEffect(() => {
//     const loadProfileData = () => {
//       if (accesstoken) {
//         dispatch(loadProfile(accesstoken));
//       }
//     };

//     // Call loadProfileData initially
//     loadProfileData();

//     // Set interval to call loadProfileData every 6 seconds
//     const intervalId = setInterval(() => {
//       loadProfileData();
//     }, 6000);

//     // Clear the interval when the component unmounts
//     return () => clearInterval(intervalId);
//   }, [dispatch, accesstoken]);

//   // Update selected wallet and check for balance changes
//   useEffect(() => {
//     if (!loading && user) {
//       const walletOne = user.walletOne;

//       const walletTwo = user.walletTwo;

//       // Check if the balance has changed
//       if (walletOne.balance !== previousBalanceOne) {
//         setPreviousBalanceOne(walletOne.balance); // Update previous balance to the new one
//         setSelectedWallet(walletOne); // Update selected wallet with new balance
//       }

//       if (walletTwo.balance !== previousBalanceTwo) {
//         setPreviousBalanceTwo(walletTwo.balance); // Update previous balance to the new one
//         // setSelectedWallet(walletOne); // Update selected wallet with new balance
//       }
//     }
//   }, [user, loading, previousBalanceOne, previousBalanceTwo]);

//   // Handle wallet selection and reload logic
//   const handleWalletSelection = (wallet) => {
//     if (selectedWallet === wallet) {
//       // If the same wallet is selected, force reload by updating the reloadKey
//       setReloadKey((prevKey) => prevKey + 1);
//     } else {
//       // Select a new wallet
//       setSelectedWallet(wallet);
//       setReloadKey(0); // Reset reload key
//     }
//   };

//   return (
//     <div className="pn-containter">
//       {/** TOP NAVIGATION CONTAINER */}
//       {showPN && (
//         <>
//           <div className="alCreatLocationTopContainer">
//             <div className="alCreatLocationTopContaineCL">
//               <label className="alCreatLocationTopContainerlabel">
//                 All Wallets
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
//                   {/** Wallet One */}
//                   <div
//                     className="hdAllContainerContent"
//                     onClick={() => handleWalletSelection("walletOne")} // Handle wallet selection
//                   >
//                     <div className="hdAllContainerContentTop">
//                       <label className="hdAllContainerContentTopBoldLabel">
//                         {user.walletOne?.walletName}
//                       </label>
//                     </div>
//                     <div className="hdAllContainerContentBottom">
//                       <label className="hdAllContainerContentTopRegularLabel">
//                         {user.walletOne?.balance}{" "}
//                         {user?.country?.countrycurrencysymbol}
//                       </label>
//                       <div className="hdContenContainerIcon">
//                         <FaWallet color={"#000"} size={"2.5rem"} />
//                       </div>
//                     </div>
//                   </div>

//                   {/** Wallet Two */}
//                   <div
//                     className="hdAllContainerContent"
//                     onClick={() => handleWalletSelection("walletTwo")} // Handle wallet selection
//                   >
//                     <div className="hdAllContainerContentTop">
//                       <label className="hdAllContainerContentTopBoldLabel">
//                         {user.walletTwo?.walletName}
//                       </label>
//                     </div>
//                     <div className="hdAllContainerContentBottom">
//                       <label className="hdAllContainerContentTopRegularLabel">
//                         {user.walletTwo?.balance}{" "}
//                         {user?.country?.countrycurrencysymbol}
//                       </label>
//                       <div className="hdContenContainerIcon">
//                         <FaWallet color={"#000"} size={"2.5rem"} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/** Render selected wallet */}
//               <div key={reloadKey}>
//                 {" "}
//                 {/* Key forces re-render when reloadKey changes */}
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



