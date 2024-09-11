import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import images from "../../assets/constants/images";
import COLORS from "../../assets/constants/colors";
import { FaWallet } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { AiFillAndroid } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import HomeDashboard from "../../components/dashboard/HomeDashboard";
import AllLocation from "../../components/alllocation/AllLocation";
import Play from "../../components/play/Play";
import Historyc from "../../components/history/Historyc";
import Gamedescriptionc from "../../components/gamedescription/Gamedescriptionc";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllNotification,
  loadAllPromotion,
  loadProfile,
} from "../../redux/actions/userAction";
import { PiHandWithdrawFill } from "react-icons/pi";
import { PiHandDepositFill } from "react-icons/pi";
import Wallet from "../../components/wallet/Walllet";
import Notification from "../../components/notification/Notification";
import Paymentdeposit from "../../components/deposit/Paymentdeposit";
import Withdrawpayment from "../../components/withdraw/Withdrawpayment";
import Userprofile from "../../components/profile/Userprofile";
import AllResult from "../../components/result/AllResult";
import Aboutus from "../../components/about/Aboutus";
import ImageSlider from "../../components/helper/ImageSlider";
import { showSuccessToast } from "../../components/helper/showErrorToast";
import { serverName } from "../../redux/store";
import { FaInfoCircle } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import moment from "moment-timezone";
import { MdNotificationsActive } from "react-icons/md";
import { LoadingComponent } from "../../components/helper/LoadingComponent";
import { useGetAppLinkQuery } from "../../redux/api";

const locationdata = [
  {
    id: "1",
    name: "Canada",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "2",
    name: "Japan",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "3",
    name: "Punjab",
    limit: "200 - 200X",
    times: [
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "4",
    name: "Pune",
    limit: "200 - 200X",
    times: [
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "5",
    name: "China",
    limit: "100 - 100X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "6",
    name: "India",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "7",
    name: "USA",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
    ],
  },
  {
    id: "8",
    name: "Korea",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
];

const timedata = [
  {
    val: "09:00 AM",
  },
  {
    val: "10:00 AM",
  },
  {
    val: "11:00 AM",
  },
  {
    val: "12:00 PM",
  },
  {
    val: "01:00 PM",
  },

  {
    val: "02:00 PM",
  },
  {
    val: "03:00 PM",
  },

  {
    val: "04:00 PM",
  },
  {
    val: "04:00 PM",
  },
  {
    val: "06:00 PM",
  },

  {
    val: "07:00 PM",
  },
  {
    val: "08:00 PM",
  },
];

const imagesdata = [
  "https://img.freepik.com/premium-vector/big-sale-banner-template-abstract-background_219363-47.jpg?w=1800",
  "https://img.freepik.com/free-vector/sales-banner-origami-style_23-2148399967.jpg?w=1800&t=st=1723879042~exp=1723879642~hmac=f9cfd426b3814e6e88981c431f20daf1611dd0e064bdd3ab33441ce2e3145743",
  "https://img.freepik.com/free-vector/geometric-background_23-2148101184.jpg?w=1060&t=st=1723879573~exp=1723880173~hmac=a4ca0aa35d3e224973bc3293b9eb217d00e8fc6bc23fab46077c51bb3f7d1432",
];

export function getTimeAccordingToTimezone(time, targetTimeZone) {
  // Get the current date in "DD-MM-YYYY" format
  const todayDate = moment().format("DD-MM-YYYY");

  // Combine the current date and time into a full datetime string
  const dateTimeIST = `${todayDate} ${time}`;

  // Convert the combined date and time to a moment object in the IST timezone
  const istTime = moment.tz(dateTimeIST, "DD-MM-YYYY hh:mm A", "Asia/Kolkata");

  // Convert the IST time to the target timezone
  const targetTime = istTime.clone().tz(targetTimeZone);

  // Return only the time in the target timezone
  return targetTime.format("hh:mm A");
}

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserAccessToken = async () => {
    try {
      const val = await localStorage.getItem("accesstoken");
      console.log("From SS Access Token :: " + val);
      // dispatch(getUserAccessToken(val));
      dispatch({
        type: "getaccesstoken",
        payload: val,
      });

      dispatch(loadProfile(val));
    } catch (error) {
      console.log("error" + error);
    }
  };

  useEffect(() => {
    getUserAccessToken();
  }, []);

  const gotoNavigation = () => {
    navigate("/setting");
  };

  const [selectedLocation, setSelectedLocation] = useState(locationdata[0]);
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  const handleLocationClick = (location) => {
    console.log("clicked");
    console.log(JSON.stringify(location));
    setSelectedLocation(location);
  };
  const [reloadTrigger, setReloadTrigger] = useState(false);

  // const handleComponentClick = (comp) => {
  //   console.log("clicked");
  //   setSelectedComponent(comp);
  // };

  const handleComponentClick = (comp) => {
    if (selectedComponent === comp) {
      // If the same component is selected, force a re-render
      console.log("Reloading the selected component...");
      setReloadTrigger((prev) => !prev); // Toggle the state to force re-render
    } else {
      console.log("Clicked a new component");
      setSelectedComponent(comp);
    }
  };

  useEffect(() => {
    console.log("location changed");
  }, [selectedLocation, selectedComponent]);

  const { user, accesstoken, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, []);

  console.log(loading, user);

  // FOR NOTIFICATION

  const { notifications, loadingNotification } = useSelector(
    (state) => state.user
  );

  const [newNotification, setNewNotification] = useState(true);

  useEffect(() => {
    dispatch(loadAllNotification(accesstoken, user?._id));
  }, [dispatch]);

  useEffect(() => {
    if ((!loadingNotification && notifications, user)) {
      checkingForNewNotification();
    }
  }, [loadingNotification, notifications, user]);

  const checkingForNewNotification = () => {
    console.log("CHECKING FOR NEW NOTIFCATION");
    if (notifications) {
      const noti =
        notifications?.length === 0 ? true : notifications[0]?.seennow;
      console.log("seennow noti len :: " + notifications?.length);
      console.log("seennow :: " + noti);
      setNewNotification(noti);
    }
  };

  // FOR PROMOTION

  const { loadingPromotion, promotions } = useSelector(
    (state) => state.promotion
  );

  useEffect(() => {
    dispatch(loadAllPromotion(accesstoken));
  }, [dispatch]);

  const sliderData = promotions?.map(
    (promotion) => `${serverName}/uploads/promotion/${promotion.url}`
  );

  console.log(sliderData?.length);


  const { data: appLinkData, error: appLinkError, isLoading: appLinkLoading } = useGetAppLinkQuery(accesstoken);

    const androidAppLink = () => {
      const link = appLinkData?.appLink?.androidLink;
      if (link) {
        window.open(link, '_blank'); // Opens the link in a new tab
        showSuccessToast(link);
      } else {
        showSuccessToast('No valid link found.');
      }
    }

    const iosAppLink = () => {
     
      const link = appLinkData?.appLink?.iosLink;
      if (link) {
        window.open(link, '_blank'); // Opens the link in a new tab
        showSuccessToast(link);
      } else {
        showSuccessToast('No valid link found.');
      }
    }

  return (
    <div className="adminDashboardContainer">
      {/** TOP CONTAINER */}
      <div className="top-admin-d">
        {/** TOP LEFT */}
        <div className="top-left-d">
          <div className="top-left-left-d">
            <label className="hellolabel">Hello,</label>
            <label className="usernamelabel">{user ? user.name : ""}</label>
          </div>
          <div className="top-left-right-d">
            <div className="userimagecontainer">
              {/* <img
                src={images.user}
                alt="Profile Picture"
                className="userprofileimg"
              /> */}

              <img
                src={
                  user?.avatar?.url
                    ? `${serverName}/uploads/${user?.avatar.url}`
                    : images.user
                }
                alt="Profile Picture"
                className="userprofileimg"
                onError={(e) => {
                  e.target.onerror = null; // Prevents looping
                  e.target.src = images.user; // Fallback to default image on error
                }}
              />
            </div>
          </div>
        </div>

        {/** TOP RIGHT */}
        <div className="top-right-d">
          <div className="top-right-right-d">
            {/** DEPOSIT */}
            <div
              className="depositContainer"
              onClick={() => handleComponentClick("deposit")}
            >
              <label className="depositContainerLabel">DEPOSIT</label>
              <PiHandDepositFill color={COLORS.white_s} size={"2rem"} />
            </div>

            {/**  WITHDRAW */}
            <div
              className="depositContainer"
              onClick={() => handleComponentClick("withdraw")}
            >
              <label className="depositContainerLabel">WITHDRAW</label>
              <PiHandWithdrawFill color={COLORS.white_s} size={"2rem"} />
            </div>

            <div
              onClick={() => handleComponentClick("wallet")}
              className="iconcontainertop"
            >
              <FaWallet color={COLORS.background} size={"3rem"} />
            </div>

            <div
              onClick={() => handleComponentClick("notification")}
              className="iconcontainertop"
            >
              {newNotification ? (
                <IoIosNotifications color={COLORS.background} size={"3rem"} />
              ) : (
                <MdNotificationsActive
                  color={COLORS.result_yellow}
                  size={"3rem"}
                />
              )}
            </div>

            <div onClick={gotoNavigation} className="iconcontainertop">
              <IoIosSettings color={COLORS.background} size={"3rem"} />
            </div>
          </div>
        </div>
      </div>
      {/** TOP CONTAINER END */}

      {/** MAIN CONTENT CONTAINER */}
      <div className="adminDashboardMainContainer">
        {/** LEFT  */}
        <div className="adLeftContainer">
          {/** CONTENT */}
          <div
            className="adLContenContainer"
            key={"dashboard"}
            onClick={() => handleComponentClick("dashboard")}
            style={{
              background:
                selectedComponent === "dashboard"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaHome color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Home</label>
          </div>

          <div
            className="adLContenContainer"
            key={"alllocation"}
            onClick={() => handleComponentClick("alllocation")}
            style={{
              background:
                selectedComponent === "alllocation"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <IoLocationSharp color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">All Location</label>
          </div>

          <div
            className="adLContenContainer"
            key={"play"}
            onClick={() => handleComponentClick("play")}
            style={{
              background:
                selectedComponent === "play"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
            <img src={images.play} style={{
                height: '5rem',
                width: '5rem',
              }}/>
            </div>
            <label className="adLContenContainerLabel">Play</label>
          </div>

          <div
            className="adLContenContainer"
            key={"result"}
            onClick={() => handleComponentClick("result")}
            style={{
              background:
                selectedComponent === "result"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <GiTrophy color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Result</label>
          </div>

          <div
            className="adLContenContainer"
            key={"history"}
            onClick={() => handleComponentClick("history")}
            style={{
              background:
                selectedComponent === "history"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaHistory color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">History</label>
          </div>

          <div
            className="adLContenContainer"
            key={"aboutus"}
            onClick={() => handleComponentClick("aboutus")}
            style={{
              background:
                selectedComponent === "aboutus"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <FaInfoCircle color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">About us</label>
          </div>

          {/** FOR PROMOTIONS */}

          {loadingPromotion ? (
            <LoadingComponent />
          ) : sliderData.length === 0 ? null : (
            <div className="promotionContainerD">
              <ImageSlider images={sliderData} />
            </div>
          )}

          <div className="shereAppContainer">
            <div
              onClick={iosAppLink}
              className="iconcontainertop"
            >
              <FaApple color={COLORS.background} size={"3rem"} />
            </div>

            <label className="shereAppContainerLabel">Get Apps</label>

            <div
              onClick={androidAppLink}
              className="iconcontainertop"
            >
              <AiFillAndroid color={COLORS.background} size={"3rem"} />
            </div>
          </div>

          {/** CONTENT end */}
        </div>

        {/** RIGHT CONTINER */}

        <div className="adRightContainer">
          {selectedComponent === "dashboard" && (
            <HomeDashboard
              selectedComponent={selectedComponent}
              handleComponentClick={handleComponentClick}
            />
          )}
          {selectedComponent === "alllocation" && <AllLocation key={reloadTrigger ? 1 : 0} />}
          {selectedComponent === "play" && <Play />}
          {selectedComponent === "history" && <Historyc key={reloadTrigger ? 1 : 0} />}
          {selectedComponent === "gamedescription" && <Gamedescriptionc />}
          {selectedComponent === "wallet" && <Wallet key={reloadTrigger ? 1 : 0} />}
          {selectedComponent === "notification" && <Notification />}
          {selectedComponent === "deposit" && <Paymentdeposit />}
          {selectedComponent === "withdraw" && <Withdrawpayment />}
          {selectedComponent === "userprofile" && <Userprofile />}
          {selectedComponent === "result" && <AllResult />}
          {selectedComponent === "aboutus" && <Aboutus />}
        </div>
      </div>

      {/** MAIN CONTENT CONTAINER END */}
    </div>
  );
};

export default Dashboard;

{
  /* <div className="adRightContainer">
{selectedComponent === "dashboard" && (
  <HomeDashboard
    selectedComponent={selectedComponent}
    handleComponentClick={handleComponentClick}
  />
)}
{selectedComponent === "alllocation" && <AllLocation />}
{selectedComponent === "createresult" && <AllLocation />}
{/* {selectedComponent === "gamedescription" && <GameDescription />} */
}
// {selectedComponent === "alldeposit" && <AllDeposit />}
// {selectedComponent === "withdraw" && <AllWithdraw />}
// {selectedComponent === "aboutus" && <Aboutus />}
// {/* {selectedComponent === "balancesheet" && <Balancesheet />} */}
// {selectedComponent === "changepassword" && <ChangePassword />}
// {selectedComponent === "logout" && (
//   <Logout
//     selectedComponent={selectedComponent}
//     handleComponentClick={handleComponentClick}
//   />
// )}
// {selectedComponent === "notification" && <Notification />}
// {/* {selectedComponent === "pushnotification" && <PushNotification />} */}
// {selectedComponent === "allcountry" && <AllCountry />}
// {/* {selectedComponent === "walletmod" && <AllWallet />} */}
// {selectedComponent === "promotion" && <Promotion />}
// {selectedComponent === "subadmin" && <AllSubAdmin />}
// {selectedComponent === "updateprofile" && <UpdateProfile />}
// {selectedComponent === "payment" && <PaymentDeposit />}
// {selectedComponent === "play" && <PlayLocation />}
// {selectedComponent === "alluser" && <AllUser />}
// {selectedComponent === "newuser" && <NewUser />}
// {selectedComponent === "allresults" && <AllResults />}
// </div> */}

// main content

// import React, { useEffect, useState } from "react";
// import "./Dashboard.css";
// import FONT from "../../assets/constants/fonts";
// import images from "../../assets/constants/images";
// import { CiSearch } from "react-icons/ci";
// import { BsBank2 } from "react-icons/bs";
// import COLORS from "../../assets/constants/colors";
// import { FaWallet } from "react-icons/fa";
// import { IoIosNotifications } from "react-icons/io";
// import { IoIosSettings } from "react-icons/io";
// import { AiFillAndroid } from "react-icons/ai";
// import { FaApple } from "react-icons/fa";
// import { FaHome } from "react-icons/fa";
// import { IoLocationSharp } from "react-icons/io5";
// import { FaTrophy } from "react-icons/fa6";
// import { FaPlay } from "react-icons/fa";
// import { FaHistory } from "react-icons/fa";
// import { TbFileDescription } from "react-icons/tb";
// import { IoIosInformationCircle } from "react-icons/io";
// import { SlCalender } from "react-icons/sl";
// import HomeDashboard from "../../components/dashboard/HomeDashboard";
// import AllLocation from "../../components/alllocation/AllLocation";
// import Play from "../../components/play/Play";
// import Historyc from "../../components/history/Historyc";
// import Gamedescriptionc from "../../components/gamedescription/Gamedescriptionc";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { loadProfile } from "../../redux/actions/userAction";
// import { PiHandDepositBold } from "react-icons/pi";
// import { PiHandWithdrawFill } from "react-icons/pi";
// import Wallet from "../../components/wallet/Walllet";
// import Notification from "../../components/notification/Notification";
// import Paymentdeposit from "../../components/deposit/Paymentdeposit";
// import Withdrawpayment from "../../components/withdraw/Withdrawpayment";
// import Userprofile from "../../components/profile/Userprofile";
// import AllResult from "../../components/result/AllResult";
// import Aboutus from "../../components/about/Aboutus";
// import ImageSlider from "../../components/helper/ImageSlider";
// import { showSuccessToast } from "../../components/helper/showErrorToast";
// import { serverName } from "../../redux/store";

// const timedata = [
//   {
//     val: "09:00 AM",
//   },
//   {
//     val: "10:00 AM",
//   },
//   {
//     val: "11:00 AM",
//   },
//   {
//     val: "12:00 PM",
//   },
//   {
//     val: "01:00 PM",
//   },

//   {
//     val: "02:00 PM",
//   },
//   {
//     val: "03:00 PM",
//   },

//   {
//     val: "04:00 PM",
//   },
//   {
//     val: "04:00 PM",
//   },
//   {
//     val: "06:00 PM",
//   },

//   {
//     val: "07:00 PM",
//   },
//   {
//     val: "08:00 PM",
//   },
// ];

// const imagesdata = [
//   "https://img.freepik.com/premium-vector/big-sale-banner-template-abstract-background_219363-47.jpg?w=1800",
//   "https://img.freepik.com/free-vector/sales-banner-origami-style_23-2148399967.jpg?w=1800&t=st=1723879042~exp=1723879642~hmac=f9cfd426b3814e6e88981c431f20daf1611dd0e064bdd3ab33441ce2e3145743",
//   "https://img.freepik.com/free-vector/geometric-background_23-2148101184.jpg?w=1060&t=st=1723879573~exp=1723880173~hmac=a4ca0aa35d3e224973bc3293b9eb217d00e8fc6bc23fab46077c51bb3f7d1432",
// ];

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const getUserAccessToken = async () => {
//     try {
//       const val = await localStorage.getItem("accesstoken");
//       console.log("From SS Access Token :: " + val);
//       // dispatch(getUserAccessToken(val));
//       dispatch({
//         type: "getaccesstoken",
//         payload: val,
//       });

//       dispatch(loadProfile(val));
//     } catch (error) {
//       console.log("error" + error);
//     }
//   };

//   useEffect(() => {
//     getUserAccessToken();
//   }, []);

//   const gotoNavigation = () => {
//     navigate("/setting");
//   };

//   const [selectedLocation, setSelectedLocation] = useState(locationdata[0]);
//   const [selectedComponent, setSelectedComponent] = useState("home");

//   const handleLocationClick = (location) => {
//     console.log("clicked");
//     console.log(JSON.stringify(location));
//     setSelectedLocation(location);
//   };

//   const handleComponentClick = (comp) => {
//     console.log("clicked");
//     setSelectedComponent(comp);
//   };

//   useEffect(() => {
//     console.log("location changed");
//   }, [selectedLocation, selectedComponent]);

//   const { user, accesstoken, loading } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(loadProfile(accesstoken));
//   }, []);

//   console.log(loading, user);

//   return (
//     <div className="main-parent">
//       {/** Top bar */}
//       <div className="topheaderd">
//         <div className="lefttopcontinerd">
//           <div className="ltcleftd">
//             <label className="helloLabel">Hello,</label>
//             <label className="usernameLabel">{user ? user.name : ""}</label>
//           </div>
//           <div
//             className="ltcrightd"
//             onClick={() => setSelectedComponent("userprofile")}
//           >
//             <div className="ltcrightimaged">
//                {user?.avatar?.url ? (
//                 <img
//                   src={`${serverName}/uploads/${user?.avatar.url}`}
//                   alt="Profile Picture"
//                   className="user-imaged"
//                 />
//               ) : (
//                 <img
//                   src={images.user}
//                   alt="Profile Picture"
//                   className="user-imaged"
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="righttopcontinerd">
//           {/** search */}
//           {/* <div className="searchcontainerd">
//             <div style={{ justifyContent: "center", alignItems: "center" }}>
//               <CiSearch size={"25px"} />
//             </div>

//             <label className="searchLabel">Search for location</label>
//           </div> */}
//           {/** deposit */}
//           <div
//             className="depositcontainerd"
//             style={{ cursor: "pointer" }}
//             onClick={() => setSelectedComponent("deposit")}
//           >
//             <div
//               style={{
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <PiHandDepositBold color={COLORS.white_s} size={"1.5vw"} />
//             </div>

//             <label className="depositLabel" style={{ cursor: "pointer" }}>
//               DEPOSIT
//             </label>
//           </div>

//           {/** withdraw */}
//           <div
//             className="depositcontainerd"
//             style={{ cursor: "pointer" }}
//             onClick={() => setSelectedComponent("withdraw")}
//           >
//             <div
//               style={{
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <PiHandWithdrawFill color={COLORS.white_s} size={"1.5vw"} />
//             </div>

//             <label className="depositLabel" style={{ cursor: "pointer" }}>
//               WITHDRAW
//             </label>
//           </div>
//           {/** location */}
//           <div
//             className="iconcontainerd"
//             onClick={() => handleComponentClick("wallet")}
//             style={{ cursor: "pointer" }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <FaWallet color={COLORS.background} size={"25px"} />
//             </div>
//           </div>
//           {/** notification */}
//           <div
//             className="iconcontainerd"
//             style={{ cursor: "pointer" }}
//             onClick={() => handleComponentClick("notification")}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <IoIosNotifications color={COLORS.background} size={"25px"} />
//             </div>
//           </div>
//           {/** setting */}
//           <div
//             className="iconcontainerd"
//             onClick={gotoNavigation}
//             style={{ cursor: "pointer" }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 cursor: "pointer",
//               }}
//             >
//               <IoIosSettings color={COLORS.background} size={"25px"} />
//             </div>
//           </div>
//         </div>
//       </div>
//       {/** content */}
//       <div className="contentcontainerd">
//         {/** Left Container */}
//         <div className="leftcontainerd">
//           {/** App sidebar left */}
//           <div className="leftsidebartopd">
//             {/** Home */}
//             <div
//               className="lscontentd"
//               key={"home"}
//               onClick={() => handleComponentClick("home")}
//               style={{
//                 background:
//                   selectedComponent === "home"
//                     ? "linear-gradient(180deg, #7EC630, #3D6017)"
//                     : "linear-gradient(180deg, #011833, #011833)",
//               }}
//             >
//               <div className="lscontentIconContiner">
//                 <FaHome color={COLORS.white_s} size={"20px"} />
//               </div>

//               <label className="sidebar-label">Home</label>
//             </div>
//             {/** All Location */}
//             <div
//               className="lscontentd"
//               key={"alllocation"}
//               onClick={() => handleComponentClick("alllocation")}
//               style={{
//                 background:
//                   selectedComponent === "alllocation"
//                     ? "linear-gradient(180deg, #7EC630, #3D6017)"
//                     : "linear-gradient(180deg, #011833, #011833)",
//               }}
//             >
//               <div className="lscontentIconContiner">
//                 <IoLocationSharp color={COLORS.white_s} size={"20px"} />
//               </div>

//               <label className="sidebar-label">All Location</label>
//             </div>
//             {/** Results */}
//             <div
//               className="lscontentd"
//               key={"result"}
//               onClick={() => handleComponentClick("result")}
//               style={{
//                 background:
//                   selectedComponent === "result"
//                     ? "linear-gradient(180deg, #7EC630, #3D6017)"
//                     : "linear-gradient(180deg, #011833, #011833)",
//               }}
//             >
//               <div className="lscontentIconContiner">
//                 <FaTrophy color={COLORS.white_s} size={"20px"} />
//               </div>
//               <label className="sidebar-label">Result</label>
//             </div>

//             {/** Play */}

//             <div
//               className="lscontentd"
//               key={"play"}
//               onClick={() => handleComponentClick("play")}
//               style={{
//                 background:
//                   selectedComponent === "play"
//                     ? "linear-gradient(180deg, #7EC630, #3D6017)"
//                     : "linear-gradient(180deg, #011833, #011833)",
//               }}
//             >
//               <div className="lscontentIconContiner">
//                 <FaPlay color={COLORS.white_s} size={"18px"} />
//               </div>
//               <label className="sidebar-label"> Play</label>
//             </div>

//             {/** History */}
//             <div
//               className="lscontentd"
//               key={"history"}
//               onClick={() => handleComponentClick("history")}
//               style={{
//                 background:
//                   selectedComponent === "history"
//                     ? "linear-gradient(180deg, #7EC630, #3D6017)"
//                     : "linear-gradient(180deg, #011833, #011833)",
//               }}
//             >
//               <div className="lscontentIconContiner">
//                 <FaHistory color={COLORS.white_s} size={"20px"} />
//               </div>
//               <label className="sidebar-label">History</label>
//             </div>

//             {/** Game Description */}
//             {/* <div
//               className="lscontentd"
//               key={"gamedescription"}
//               onClick={() => handleComponentClick("gamedescription")}
//               style={{
//                 background:
//                   selectedComponent === "gamedescription"
//                     ? "linear-gradient(180deg, #7EC630, #3D6017)"
//                     : "linear-gradient(180deg, #011833, #011833)",
//               }}
//             >
//               <div className="lscontentIconContiner">
//                 <TbFileDescription color={COLORS.white_s} size={"20px"} />
//               </div>
//               <label className="sidebar-label">Game Description</label>
//             </div> */}

//             {/** About Us */}
//             <div
//               className="lscontentd"
//               key={"aboutus"}
//               onClick={() => handleComponentClick("aboutus")}
//               style={{
//                 background:
//                   selectedComponent === "aboutus"
//                     ? "linear-gradient(180deg, #7EC630, #3D6017)"
//                     : "linear-gradient(180deg, #011833, #011833)",
//               }}
//             >
//               <div className="lscontentIconContiner">
//                 <IoIosInformationCircle color={COLORS.white_s} size={"20px"} />
//               </div>
//               <label className="sidebar-label">About Us</label>
//             </div>
//           </div>

//           {/** promotion */}
//           <div className="leftsidebarmiddled">
//             <label className="promotionLable">Promotions</label>
//             <div className="ImageSlider">
//               <ImageSlider images={imagesdata} />
//             </div>
//           </div>

//           {/** Apps Available on */}
//           <div className="leftsidebarbottomd">
//             <div className="appiconcontainerd"
//             onClick={() => showSuccessToast("Get Android App")}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   cursor: "pointer"
//                 }}
//               >
//                 <AiFillAndroid color={COLORS.background} size={"30px"} />
//               </div>
//             </div>

//             <label className="getTheApplabel">Get the App</label>

//             <div className="appiconcontainerd"
//                onClick={() => showSuccessToast("Get Ios App")}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   cursor: "pointer"
//                 }}
//               >
//                 <FaApple color={COLORS.background} size={"30px"} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/** Main Containt */}
//         <div className="main-center-contentd">
//           {selectedComponent === "home" && <HomeDashboard />}
//           {selectedComponent === "alllocation" && <AllLocation />}
//           {selectedComponent === "play" && <Play />}
//           {selectedComponent === "history" && <Historyc />}
//           {selectedComponent === "gamedescription" && <Gamedescriptionc />}
//           {selectedComponent === "wallet" && <Wallet />}
//           {selectedComponent === "notification" && <Notification />}
//           {selectedComponent === "deposit" && <Paymentdeposit />}
//           {selectedComponent === "withdraw" && <Withdrawpayment />}
//           {selectedComponent === "userprofile" && <Userprofile />}
//           {selectedComponent === "result" && <AllResult />}
//           {selectedComponent === "aboutus" && <Aboutus />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// .main-parent {
//   height: 100vh;
//   width: 100%;
//   background-color: var(--background);
//   display: flex;
//   flex-direction: column;
// }

// .topheaderd {
//   display: flex;
//   height: 10%;
//   width: 100%;
//   margin-right: 2%;
//   flex-direction: row;
// }

// .lefttopcontinerd {
//   width: 18%;
//   height: 100%;
//   display: flex;
// }

// .ltcleftd {
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   padding-left: 10%;
// }

// .ltcrightimaged {
//   height: 60px;
//   width: 60px;
//   background-color: white;
//   padding: 2%;
//   border-radius: 50%;
//   overflow: hidden;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

// .user-imaged {
//   height: 100%;
//   width: 100%;
//   object-fit: cover;
//   border-radius: 50%;
// }

// .ltcrightd {
//   flex: 1;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// }

// .searchcontainerd, .depositcontainerd, .iconcontainerd {
//   padding: 5px;
//   margin: 10px;
//   border-radius: 10px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

// }

// .searchcontainerd {
//   flex: 1;
//   background-color: var(--grayHalfBg);
//   flex-direction: row;
//   justify-content: flex-start;
// }

// .depositcontainerd {
//   height: 50px;
//   background: linear-gradient(180deg, #7EC630, #3D6017);
// }

// .walletcontainerd {
//   width: 10%;
//   background-color: var(--grayHalfBg);
//   padding: 10px;
//   margin: 10px;
//   border-radius: 10px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   gap: 2px;
// }

// .iconcontainerd{
//   width: 50px;
//   height: 50px;
//   background-color: var(--grayHalfBg);
// }

// .righttopcontinerd {
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: row;
//   justify-content: right;
// }

// .contentcontainerd {
//   flex: 1;
//   display: flex;
//   width: 100%;
//   flex-direction: row;
//   height: 90vh;
// }

// .leftcontainerd {
//   width: 15%;
//   height: 90vh;

// }

// .leftsidebartopd {
//   height: 55%;
//   width: calc(100% - 10%); /* Adjust width to account for margin */
//   background: linear-gradient(180deg, #0162AF, #011833);
//   margin: 5%;
//   margin-right: 5%; /* Add specific margin for the right side */
//   border-radius: 3vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   gap: 10px;
// }

// .lscontentd{
//   width: calc(100% - 10%); /* Adjust width to account for margin */
//   background-color: var(--background);
//   height: 10%;
//   padding: 2%;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   border-radius: 8px;
//   gap: 10px;

// }

// .lscontentd:hover{
//   border: 2px solid var(--green); /* Change border color on hover */
//   cursor: pointer;
// }

// .leftsidebarmiddled {
//   height: 30%;
//   width: calc(100% - 10%); /* Adjust width to account for margin */
//   background: linear-gradient(180deg, #0162AF, #011833);
//   margin: 5%;
//   margin-right: 5%; /* Add specific margin for the right side */
//   border-radius: 3vh;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
//   position: relative; /* Make this container relative */
//   overflow: hidden; /* Hide overflow */
// }

// .promotionLable {
//   color: var(--white_s);
//   font-family: "HB";
//   font-size: 1.8vw;
//   margin: 2vh;
//   z-index: 2; /* Ensure the label is above the image */
// }

// .ImageSlider {
//   height: 100%; /* Ensure the slider takes the remaining space */
//   width: 100%;
//   position: relative; /* For positioning the nav buttons */
// }

// .promotion-bannerd {
//   height: 70%; /* Fixed height for the image container */
//   width: 100%;  /* Full width for the image container */
//   object-fit: cover; /* Ensure the image covers the container while maintaining its aspect ratio */
// }

// .leftsidebarbottomd {
//   height: 10%;
//   width: calc(100% - 10%); /* Adjust width to account for margin */
//   margin: 5%;
//   margin-right: 5%; /* Add specific margin for the right side */
//   border-radius: 3vh;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// }

// .appiconcontainerd{
//   width: 20%;
//   background-color: var(--grayHalfBg);
//   border-radius: 1vh;
//   padding: 3px;
// }

// .main-center-contentd{
//   display: flex;
//   flex: 1;
// }

// /* Base styles for the label */
// .sidebar-label {
//   color: white;
//   font-family: "MR";
//   font-size: 0.8em; /* Use relative units */
//   text-align: center;
//   flex: 1;
//   text-align: left;
// }
// .topbar-label {
//   color: black;
//   font-family: "HR";
//   font-size: 0.8em; /* Use relative units */
//   text-align: center;
//   flex: 1;
//   text-align: left;
// }

// .lscontentIconContiner{
//   display: flex;
//   min-width: 3vw;
//   justify-content: right;
//   align-items: center;

// }
// .getTheApplabel{
//   color: var(--white_s);
//   font-family: "HR";
//   font-size: medium;
//   text-align: center;
//   padding-left: 10px;
//   padding-right: 10px;
// }

// .helloLabel{
//   color: var(--white_s);
//   font-family: "HR";
//   font-size: 1.4vw;
// }
// .usernameLabel{
//   color: var(--white_s);
//   font-family: "HB";
//   font-size: 1.8vw;
// }
// .searchLabel{
//   color: var(--black);
//   font-family: "MR";
//   font-size:  1.2em;
//   padding-left: 10px;
// }
// .depositLabel{
//   color: var(--white_s);
//   font-family: "HR";
//   font-size:  1vw;
//   padding-left: 5px;
// }

// /* Medium devices (tablets) */
// @media (max-width: 1024px) {
//   /* CSS rules for tablets in landscape mode */
//   .helloLabel{
//       color: var(--white_s);
//       font-family: "HR";
//       font-size: 1.8vw;
//   }
//   .usernameLabel{
//       color: var(--white_s);
//       font-family: "HB";
//       font-size: 2vw;
//   }
//   .topheaderd {
//       display: flex;
//       height: 8%;
//       width: 100%;
//       margin-right: 2%;
//       flex-direction: row;
//   }
//   .searchLabel{
//       color: var(--black);
//       font-family: "MR";
//       font-size:  1em,;
//       padding-left: 10px;
//   }
//   .ltcrightimaged {
//       height: 45px;
//       width: 45px;
//       background-color: white;
//       padding: 2%;
//       border-radius: 50%;
//       overflow: hidden;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//   }
//   .iconcontainerd{
//       width: 45px;
//       height: 45px;
//       background-color: var(--grayHalfBg);
//   }
//   .depositcontainerd {
//       height: 45px;
//       background: linear-gradient(180deg, #7EC630, #3D6017);
//   }
// }

// /* Media query to hide the label on small screens */
// @media (max-width: 768px) {
//   .sidebar-label {
//     display: none; /* Hide the label on screens smaller than 768px */
//   }

//   .lscontentd{
//       width: calc(100% - 10%); /* Adjust width to account for margin */
//       background-color: var(--background);
//       height: 10%;
//       padding: 2%;
//       display: flex;
//       flex-direction: row;
//       justify-content: center;
//       align-items: center;
//       border-radius: 8px;
//       gap: 10px;

//   }
//   .lscontentd:hover{
//       border: 2px solid var(--green); /* Change border color on hover */
//       cursor: pointer;
//   }
//   .lscontentIconContiner{
//       display: flex;
//       min-width: 3vw;
//       justify-content: center;
//       align-items: center;

//   }
//   .leftsidebarmiddled  {
//       display: none;
//   }
//   .getTheApplabel{
//       display: none;
//   }
//   .leftsidebarbottomd {
//       min-width: 60px; /* Adjust width to account for margin */
//       margin: 2%;
//       margin-right: 5%; /* Add specific margin for the right side */
//       border-radius: 1vh;
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       gap: 2vh;
//   }
//   .appiconcontainerd{
//       width: 40px;
//       background-color: var(--grayHalfBg);
//       border-radius: 1vh;
//       padding: 3px;
//   }
//   .leftcontainerd {
//       width: 15%;
//       height: 90vh;

//   }
//   .searchcontainerd {
//       width: 50px;
//       background-color: var(--grayHalfBg);
//       flex-direction: row;
//       justify-content: flex-start;
//   }
//   .searchLabel{
//       display: none;
//   }

//    .depositcontainerd, .iconcontainerd {
//       padding: 10px;
//       border-radius: 10px;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       height: 40px;
//       width: 40px;
//   }
//   .walletcontainerd,.depositcontainerd,.searchcontainerd{
//       display: none;
//   }
//   .topheaderd {
//       display: flex;
//       height: 8%;
//       width: 100%;
//       margin-right: 2%;
//       flex-direction: row;
//   }
//   .lefttopcontinerd {
//       width: 18%;
//       height: 100%;
//       display: flex;
//       justify-content: left;
//       justify-content: flex-start;
//       align-items: flex-start;
//       margin-top: 10px;
//   }
//   .ltcleftd{
//       display: none;
//   }

//   .ltcrightimaged {
//       height: 40px;
//       width: 40px;
//       background-color: white;
//       padding: 2%;
//       border-radius: 50%;
//       overflow: hidden;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//   }

//   .leftsidebartopd {
//       height: 75%;
//       width: 60px;/* Adjust width to account for margin */
//       background: linear-gradient(180deg, #0162AF, #011833);
//       margin: 5%;
//       margin-right: 5%; /* Add specific margin for the right side */
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-direction: column;
//       gap: 10px;
//       border-top-right-radius: 10px;
//       border-top-left-radius: 10px;
//   }
//   .leftcontainerd {
//       width: 65px;
//       height: 90vh;

//   }
//   .lefttopcontinerd {
//       width: 50px;
//       height: 100%;
//       display: flex;
//   }

// }
