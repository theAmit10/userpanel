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
import { showSuccessToast, showWarningToast } from "../../components/helper/showErrorToast";
import { serverName } from "../../redux/store";
import { FaInfoCircle } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import moment from "moment-timezone";
import { MdNotificationsActive } from "react-icons/md";
import { LoadingComponent } from "../../components/helper/LoadingComponent";
import {
  useGetAllLocationWithTimeQuery,
  useGetAppLinkQuery,
} from "../../redux/api";
import { CiSearch } from "react-icons/ci";
import { TbHistoryToggle } from "react-icons/tb";
import Playhistory from "../../components/playhistory/Playhistory";

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

  const [selectedLocation, setSelectedLocation] = useState(null);
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

  // const handleComponentClick = (comp) => {
  //   if (selectedComponent === comp) {
  //     // If the same component is selected, force a re-render
  //     console.log("Reloading the selected component...");
  //     setReloadTrigger((prev) => !prev); // Toggle the state to force re-render
  //   } else {
  //     console.log("Clicked a new component");
  //     setSelectedComponent(comp);
  //   }
  // };

  const [reloadKey, setReloadKey] = useState(0); // Key to force re-render

  const handleComponentClick = (comp) => {
    if (selectedComponent === comp) {
      // If the same component is clicked, increment the reloadKey to force a reload
      setReloadKey((prevKey) => prevKey + 1);
      showWarningToast("processing :: "+reloadKey)
    } else {
      // Otherwise, set the selected component and reset the key
      showWarningToast("processing :: "+reloadKey)
      setSelectedComponent(comp);
      setReloadKey(0);
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

  const {
    data: appLinkData,
    error: appLinkError,
    isLoading: appLinkLoading,
  } = useGetAppLinkQuery(accesstoken);

  const androidAppLink = () => {
    const link = appLinkData?.appLink?.androidLink;
    if (link) {
      window.open(link, "_blank"); // Opens the link in a new tab
      showSuccessToast(link);
    } else {
      showSuccessToast("No valid link found.");
    }
  };

  const iosAppLink = () => {
    const link = appLinkData?.appLink?.iosLink;
    if (link) {
      window.open(link, "_blank"); // Opens the link in a new tab
      showSuccessToast(link);
    } else {
      showSuccessToast("No valid link found.");
    }
  };

  const [filteredData, setFilteredData] = useState([]);

  // const handleSearch = (e) => {
  //   const text = e.target.value;
  //   const filtered = locations.filter((item) =>
  //     item.lotlocation.toLowerCase().includes(text.toLowerCase())
  //   );
  //   setFilteredData(filtered);
  //   // const text = e.target.value;
  //   // const filtered = allLocationData?.locationData.filter((item) =>
  //   //   item.name.toLowerCase().includes(text.toLowerCase())
  //   // );
  //   // setFilteredDataL(filtered);
  // };

  const [filteredDataAllLocation, setFilteredDataAllLocation] = useState([]);
  const [alldatafilterAllLocation, setalldatafilterAllLocation] = useState([]);
  const [selectedFilterAllLocation, setSelectedFilterAllLocation] = useState(null);
  
  const { data: dataAllLocation, isLoading: isLoadingAllLocation } =
    useGetAllLocationWithTimeQuery(accesstoken);

  // Update filtered data when locations change
  useEffect(() => {
    if (dataAllLocation) {
      setFilteredDataAllLocation(dataAllLocation?.locationData);
    }
  }, [dataAllLocation]);

   // For filter type data
   useEffect(() => {
    if (!isLoadingAllLocation && dataAllLocation) {
      const uniqueItems = new Set();
      const filtertype = [{ _id: "123", maximumReturn: "All" }]; // Default element

      dataAllLocation.locationData.forEach((item) => {
        const key = item.maximumReturn;
        if (!uniqueItems.has(key)) {
          uniqueItems.add(key);
          filtertype.push({ _id: item._id, maximumReturn: item.maximumReturn });
        }
      });

      // Sorting the filtertype array
      filtertype.sort((a, b) => {
        if (a.maximumReturn === "All") return -1;
        if (b.maximumReturn === "All") return 1;
        const aReturn = parseFloat(a.maximumReturn.replace("x", ""));
        const bReturn = parseFloat(b.maximumReturn.replace("x", ""));
        return aReturn - bReturn;
      });

      setalldatafilterAllLocation(filtertype);
      setSelectedFilterAllLocation(filtertype[0]._id);
      setSelectedLocation(dataAllLocation.locationData[0]);
    }
  }, [isLoadingAllLocation, dataAllLocation]);

    // Handle search input changes
    const handleSearch = (e) => {
      const text = e.target.value;
      const filtered = dataAllLocation?.locationData.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredDataAllLocation(filtered);
    };

      // Handle filter selection
  const settingFilterData = (itemf) => {
    setSelectedFilterAllLocation(itemf._id);
    if (itemf.maximumReturn.toLowerCase() === "all") {
      setFilteredDataAllLocation(dataAllLocation?.locationData);
    } else {
      const filtered = dataAllLocation?.locationData.filter((item) =>
        item.maximumReturn
          .toLowerCase()
          .includes(itemf.maximumReturn.toLowerCase())
      );
      setFilteredDataAllLocation(filtered);
    }
  };
  

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
            {/** SEARCH */}

            <div
              className="aboutus-search-container"
              style={{
                flex: 1,
                gap: "1rem",
                backgroundColor: COLORS.iconcol,
              }}
            >
              <div className="aboutus-search-icon">
                <CiSearch size={"2rem"} color={COLORS.white_s} />
              </div>
              <style>
                {`
          .aboutus-search-input::placeholder {
            color: ${COLORS.white_s}; /* Placeholder color */
            opacity: 1; /* Optional: Set opacity to ensure full color */
          }
        `}
              </style>
              <input
                className="aboutus-search-input"
                placeholder="Search for location"
                label="Search"
                onChange={handleSearch}
                style={{
                  color: COLORS.white_s,
                }}
              />
            </div>
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
              onClick={() => handleComponentClick("wallet")}
              style={{
                gap: "0.5rem",
                paddingLeft: "0.5rem",
                backgroundColor: COLORS.iconcol,
              }}
            >
              <FaWallet color={COLORS.white_s} size={"2rem"} />
              <label className="depositContainerLabel">{user ? `${user?.walletTwo?.balance} ${user?.country?.countrycurrencysymbol}` : 'Loading'}</label>
            </div>

            <div
              onClick={() => handleComponentClick("withdraw")}
              className="iconcontainertop"
              style={{
                backgroundColor: COLORS.iconcol,
              }}
            >
              <PiHandWithdrawFill color={COLORS.background} size={"3rem"} />
            </div>

            <div
              onClick={() => handleComponentClick("notification")}
              className="iconcontainertop"
              style={{
                backgroundColor: COLORS.iconcol,
              }}
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

            <div
              onClick={gotoNavigation}
              style={{
                backgroundColor: COLORS.iconcol,
              }}
              className="iconcontainertop"
            >
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
              <img
                src={images.play}
                style={{
                  height: "5rem",
                  width: "5rem",
                }}
              />
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
            <label className="adLContenContainerLabel">
              Transacation History
            </label>
          </div>

          <div
            className="adLContenContainer"
            key={"playhistory"}
            onClick={() => handleComponentClick("playhistory")}
            style={{
              background:
                selectedComponent === "playhistory"
                  ? "linear-gradient(180deg, #7EC630, #3D6017)"
                  : "linear-gradient(180deg, #011833, #011833)",
            }}
          >
            <div className="adLContenContainerIcon">
              <TbHistoryToggle color={COLORS.white_s} size={"2.5rem"} />
            </div>
            <label className="adLContenContainerLabel">Play History</label>
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
            <div onClick={iosAppLink} className="iconcontainertop">
              <FaApple color={COLORS.background} size={"3rem"} />
            </div>

            <label className="shereAppContainerLabel">Get Apps</label>

            <div onClick={androidAppLink} className="iconcontainertop">
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
              filteredDataAllLocation={filteredDataAllLocation}
              alldatafilterAllLocation={alldatafilterAllLocation}
              settingFilterData={settingFilterData}
              selectedFilterAllLocation={selectedFilterAllLocation}
              isLoadingAllLocation={isLoadingAllLocation}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          )}
          {selectedComponent === "alllocation" && (
            <AllLocation key={reloadTrigger ? 1 : 0} />
          )}
          {selectedComponent === "play" && <Play />}
          {selectedComponent === "history" && (
            <Historyc reloadKey={reloadKey} />
          )}
          {selectedComponent === "gamedescription" && <Gamedescriptionc />}
          {selectedComponent === "wallet" && (
            <Wallet key={reloadTrigger ? 1 : 0} />
          )}
          {selectedComponent === "notification" && <Notification />}
          {selectedComponent === "deposit" && <Paymentdeposit />}
          {selectedComponent === "withdraw" && <Withdrawpayment />}
          {selectedComponent === "userprofile" && <Userprofile />}
          {selectedComponent === "result" && <AllResult reloadKey={reloadKey} />}
          {selectedComponent === "aboutus" && <Aboutus />}
          {selectedComponent === "playhistory" && <Playhistory reloadKey={reloadKey} />}
        </div>
      </div>

      {/** MAIN CONTENT CONTAINER END */}
    </div>
  );
};

export default Dashboard;

