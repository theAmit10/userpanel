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
import { TbFileDescription } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import HomeDashboard from "../../components/dashboard/HomeDashboard";
import AllLocation from "../../components/alllocation/AllLocation";
import Play from "../../components/play/Play";
import Historyc from "../../components/history/Historyc";
import Gamedescriptionc from "../../components/gamedescription/Gamedescriptionc";
import { useBlocker, useLocation, useNavigate } from "react-router-dom";
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
import {
  showSuccessToast,
  showWarningToast,
} from "../../components/helper/showErrorToast";
import { serverName } from "../../redux/store";
import { GiDiamondTrophy, GiTrophy } from "react-icons/gi";
import moment from "moment-timezone";
import { MdNotificationsActive } from "react-icons/md";
import { LoadingComponent } from "../../components/helper/LoadingComponent";
import {
  useGetAllLocationWithTimeQuery,
  useGetAppLinkQuery,
  useGetPowerballQuery,
} from "../../redux/api";
import { CiSearch } from "react-icons/ci";
import { TbHistoryToggle } from "react-icons/tb";
import Playhistory from "../../components/playhistory/Playhistory";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";
import FONT from "../../assets/constants/fonts";
import LiveResult from "../../components/play/LiveResult";
import PowerballDashboard from "../../components/powerball/PowerballDashboard";
import { TiGroup } from "react-icons/ti";
import Partner from "../../components/partner/Partner";
import PowerResult from "../../components/result/PowerResult";

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

  const [filteredDataAllLocation, setFilteredDataAllLocation] = useState([]);
  const [alldatafilterAllLocation, setalldatafilterAllLocation] = useState([]);
  const [selectedFilterAllLocation, setSelectedFilterAllLocation] =
    useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState("dashboard");
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [reloadKey, setReloadKey] = useState(0); // Key to force re-render

  const [newNotification, setNewNotification] = useState(true);

  const { user, accesstoken, loading, error } = useSelector(
    (state) => state.user
  );
  const { notifications, loadingNotification } = useSelector(
    (state) => state.user
  );
  const { loadingPromotion, promotions } = useSelector(
    (state) => state.promotion
  );
  const {
    data: appLinkData,
    error: appLinkError,
    isLoading: appLinkLoading,
  } = useGetAppLinkQuery();

  const { data: dataAllLocation, isLoading: isLoadingAllLocation } =
    useGetAllLocationWithTimeQuery(accesstoken);

  const sliderData = promotions?.map(
    (promotion) => `${serverName}/uploads/promotion/${promotion.url}`
  );

  const getUserAccessToken = async () => {
    try {
      const val = await localStorage.getItem("accesstoken");
      console.log("From SS Access Token :: " + val);
      if (!val) {
        navigate("/login");
      }
      // dispatch(getUserAccessToken(val));
      dispatch({
        type: "getaccesstoken",
        payload: val,
      });

      dispatch(loadProfile(val));

      console.log("Checking for user");

      try {
        dispatch({
          type: "loadUserRequest",
        });

        await axios.get(UrlHelper.USER_PROFILE_API, {
          headers: {
            Authorization: `Bearer ${val}`,
          },
        });
      } catch (error) {
        console.log(error?.response?.data?.message);
        if (
          error?.response?.data?.message === "Token Expired, please login Again"
        ) {
          localStorage.clear();
          navigate("/login");
        }
      }
    } catch (error) {
      console.log("found error for user ");
      console.log("error" + error);
    }
  };

  useEffect(() => {
    getUserAccessToken();
  }, []);

  useEffect(() => {
    console.log("location changed");
  }, [selectedLocation, selectedComponent]);

  useEffect(() => {
    if (accesstoken) {
      dispatch(loadProfile(accesstoken));
    }
  }, [accesstoken]);

  useEffect(() => {
    if (accesstoken) {
      dispatch(loadAllNotification(accesstoken, user?._id));
      dispatch(loadAllPromotion(accesstoken));
    }
  }, [dispatch, accesstoken]);

  useEffect(() => {
    if (accesstoken) {
      if ((!loadingNotification && notifications, user)) {
        checkingForNewNotification();
      }
    }
  }, [loadingNotification, notifications, user, accesstoken]);

  // Update filtered data when locations change
  useEffect(() => {
    if (dataAllLocation) {
      setFilteredDataAllLocation(dataAllLocation?.locationData);
    }
  }, [dataAllLocation, accesstoken]);

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
  }, [isLoadingAllLocation, dataAllLocation, accesstoken]);

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

  const gotoNavigation = () => {
    navigate("/setting");
  };

  const handleComponentClick = (comp) => {
    if (selectedComponent === comp) {
      // If the same component is clicked, increment the reloadKey to force a reload
      setReloadKey((prevKey) => prevKey + 1);
      // showWarningToast("processing :: "+reloadKey)
    } else {
      // Otherwise, set the selected component and reset the key
      // showWarningToast("processing :: "+reloadKey)
      setSelectedComponent(comp);
      setReloadKey(0);
    }
  };

  // const roundToTwoDecimalPlaces = (input) => {
  //   // Convert input to a float
  //   const floatValue = parseFloat(input);

  //   // Check if it's a valid number
  //   if (isNaN(floatValue)) {
  //     return "Invalid number"; // Handle invalid input
  //   }

  //   // Round to two decimal places and return
  //   return Math.round(floatValue * 100) / 100;
  // };

  const roundToInteger = (input) => {
    // Convert input to a float
    const floatValue = parseFloat(input);

    // Check if it's a valid number
    if (isNaN(floatValue)) {
      return "Invalid number"; // Handle invalid input
    }

    // Check if the number is already an integer
    if (Number.isInteger(floatValue)) {
      return floatValue; // Return the number as it is
    }

    // Return the integer part (without rounding)
    return Math.floor(floatValue);
  };

  const [gameName, setGameName] = useState("Loading...");
  // Network call
  const { data, isLoading } = useGetPowerballQuery(
    { accesstoken },
    { skip: !accesstoken }
  );

  useEffect(() => {
    if (!isLoading && data) {
      setGameName(data.games[0].name);
      console.log(data?.games[0].name);
    }
  }, [data, isLoading]); // Correct dependencies

  useEffect(() => {
    // 1. Replace current history entry to remove the previous page
    window.history.replaceState(null, "", window.location.pathname);

    // 2. Block back button/gesture
    const handleBack = (event) => {
      event.preventDefault();
      window.history.pushState(null, "", window.location.pathname);
      console.log("Back navigation disabled!");
    };

    window.addEventListener("popstate", handleBack);

    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  return (
    <>
      {accesstoken ? (
        <div className="adminDashboardContainer">
          {/** TOP CONTAINER */}
          <div className="top-admin-d">
            {/** TOP LEFT */}
            <div className="top-left-d">
              <div className="top-left-left-d">
                <label className="hellolabel">Hello,</label>
                <label className="usernamelabel">
                  {user ? user?.name : ""}
                </label>
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
                        ? `${serverName}/uploads/${user?.avatar?.url}`
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
                  <label
                    className="depositContainerLabel"
                    style={{ fontFamily: FONT.Montserrat_SemiBold }}
                  >
                    DEPOSIT
                  </label>
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

                  <label className="depositContainerLabel">
                    {user ? (
                      <>
                        {`${roundToInteger(user?.walletTwo?.balance)} `}
                        <span style={{ fontFamily: FONT.Montserrat_SemiBold }}>
                          {user?.country?.countrycurrencysymbol}
                        </span>
                      </>
                    ) : (
                      "Loading"
                    )}
                  </label>
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
                    <IoIosNotifications
                      color={COLORS.background}
                      size={"3rem"}
                    />
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

              {user && user?.partnerStatus && (
                <div
                  className="adLContenContainer"
                  key={"partner"}
                  onClick={() => handleComponentClick("partner")}
                  style={{
                    background:
                      selectedComponent === "partner"
                        ? "linear-gradient(180deg, #7EC630, #3D6017)"
                        : "linear-gradient(180deg, #011833, #011833)",
                  }}
                >
                  <div className="adLContenContainerIcon">
                    <TiGroup color={COLORS.white_s} size={"2.5rem"} />
                  </div>
                  <label className="adLContenContainerLabel">Partner</label>
                </div>
              )}

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
                <label className="adLContenContainerLabel">Play Arena</label>
              </div>

              <div
                className="adLContenContainer"
                key={"powerball"}
                onClick={() => handleComponentClick("powerball")}
                style={{
                  background:
                    selectedComponent === "powerball"
                      ? "linear-gradient(180deg, #7EC630, #3D6017)"
                      : "linear-gradient(180deg, #011833, #011833)",
                }}
              >
                <div className="adLContenContainerIcon">
                  <GiDiamondTrophy color={COLORS.white_s} size={"2.5rem"} />
                </div>
                <label className="adLContenContainerLabel">{gameName}</label>
              </div>

              <div
                className="adLContenContainer"
                key={"liveresult"}
                onClick={() => handleComponentClick("liveresult")}
                style={{
                  background:
                    selectedComponent === "liveresult"
                      ? "linear-gradient(180deg, #7EC630, #3D6017)"
                      : "linear-gradient(180deg, #011833, #011833)",
                }}
              >
                <div className="adLContenContainerIcon">
                  <GiTrophy color={COLORS.white_s} size={"2.5rem"} />
                </div>
                <label className="adLContenContainerLabel">Live Result</label>
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
                  Transaction History
                </label>
              </div>

              <div
                className="adLContenContainer"
                key={"gamedescription"}
                onClick={() => handleComponentClick("gamedescription")}
                style={{
                  background:
                    selectedComponent === "gamedescription"
                      ? "linear-gradient(180deg, #7EC630, #3D6017)"
                      : "linear-gradient(180deg, #011833, #011833)",
                }}
              >
                <div className="adLContenContainerIcon">
                  <TbFileDescription color={COLORS.white_s} size={"2.5rem"} />
                </div>
                <label className="adLContenContainerLabel">
                  Game Description
                </label>
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
                  setSelectedComponent={setSelectedComponent}
                  handleComponentClick={handleComponentClick}
                  filteredDataAllLocation={filteredDataAllLocation}
                  alldatafilterAllLocation={alldatafilterAllLocation}
                  settingFilterData={settingFilterData}
                  selectedFilterAllLocation={selectedFilterAllLocation}
                  isLoadingAllLocation={isLoadingAllLocation}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  reloadKey={reloadKey}
                  gameName={gameName}
                />
              )}
              {selectedComponent === "alllocation" && (
                <AllLocation reloadKey={reloadKey} />
              )}
              {selectedComponent === "partner" && (
                <Partner reloadKey={reloadKey} setReloadKey={setReloadKey} />
              )}
              {selectedComponent === "play" && <Play reloadKey={reloadKey} />}
              {selectedComponent === "history" && (
                <Historyc reloadKey={reloadKey} />
              )}
              {selectedComponent === "gamedescription" && (
                <Gamedescriptionc reloadKey={reloadKey} />
              )}
              {selectedComponent === "wallet" && (
                <Wallet reloadKey={reloadKey} />
              )}
              {selectedComponent === "notification" && (
                <Notification reloadKey={reloadKey} />
              )}
              {selectedComponent === "deposit" && (
                <Paymentdeposit reloadKey={reloadKey} />
              )}
              {selectedComponent === "withdraw" && (
                <Withdrawpayment reloadKey={reloadKey} />
              )}
              {selectedComponent === "userprofile" && (
                <Userprofile reloadKey={reloadKey} />
              )}
              {selectedComponent === "liveresult" && (
                <LiveResult reloadKey={reloadKey} />
              )}
              {selectedComponent === "playarenaresult" && (
                <AllResult
                  setSelectedCategory={setSelectedComponent}
                  reloadKey={reloadKey}
                />
              )}
              {selectedComponent === "powerballresult" && (
                <PowerResult
                  setSelectedCategory={setSelectedComponent}
                  reloadKey={reloadKey}
                />
              )}
              {selectedComponent === "aboutus" && (
                <Aboutus reloadKey={reloadKey} />
              )}
              {selectedComponent === "playhistory" && (
                <Playhistory
                  reloadKey={reloadKey}
                  setReloadKey={setReloadKey}
                />
              )}
              {selectedComponent === "powerball" && (
                <PowerballDashboard
                  reloadKey={reloadKey}
                  setReloadKey={setReloadKey}
                />
              )}
            </div>
          </div>

          {/** MAIN CONTENT CONTAINER END */}
        </div>
      ) : (
        <div className="splash-page">
          <div className="logo-container">
            <img
              src={images.logo}
              alt="Profile Picture"
              className="logo-imaged"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
