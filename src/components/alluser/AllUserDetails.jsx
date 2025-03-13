import React, { useEffect, useState } from "react";
import "./AllUserDetails.css";
import { CiSearch } from "react-icons/ci";
import COLORS from "../../assets/constants/colors";
import { IoArrowBackCircleOutline, IoSnow } from "react-icons/io5";
import images from "../../assets/constants/images";
import { FaWallet } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { GrUserNew } from "react-icons/gr";
import { AiFillNotification } from "react-icons/ai";
import { PiSubtitles } from "react-icons/pi";
import { IoDocumentText } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { loadAllUsers, loadSingleUser } from "../../redux/actions/userAction";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import { serverName } from "../../redux/store";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import UrlHelper from "../../helper/UrlHelper";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { FaHistory } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Historyc from "../history/Historyc";
import Playhistory from "../playhistory/Playhistory";
import FONT from "../../assets/constants/fonts";
import { FaPlusMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const AllUserDetails = ({ userdata, backhandlerDeposit }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [amount, setAmount] = useState("");
  const [titleValue, setTitle] = useState("");
  const [discriptionValue, setDescription] = useState("");
  const [paymentUpdateNote, setpaymentUpdateNote] = useState("");
  const [showSA, setShowSA] = useState(true);
  const [selectItem, setSelectItem] = useState("");
  const [showEditSA, setShowEditSA] = useState(false);
  const [showEditWO, setShowEditWO] = useState(false);
  const [showEditWT, setShowEditWT] = useState(false);
  const [showEditUI, setShowEditUI] = useState(false);
  const [showEditN, setShowEditN] = useState(false);
  const [showhistory, setShowHistory] = useState(false);
  const [showPlayhistory, setShowPlayHistory] = useState(false);
  const dispatch = useDispatch();
  const { accesstoken, singleuser, loadingSingleUser, user } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (userdata) {
      console.log("userdata :: " + JSON.stringify(userdata));
      dispatch(loadSingleUser(accesstoken, userdata.userId));
      setShowSA(false);
      setShowEditSA(true);
      setSelectItem(userdata);
    }
  }, [userdata]);

  const settingEditSA = (item) => {
    setShowSA(false);
    setShowEditSA(true);
    setSelectItem(item);

    dispatch(loadSingleUser(accesstoken, item._id));
  };

  const backHanndler = () => {
    setShowSA(true);
    setShowEditSA(false);
    setSelectItem("");
  };

  const settingForWalletOne = () => {
    setShowSA(false);
    setShowEditSA(false);
    setShowEditWO(true);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(false);
    setShowHistory(false);
    setShowPlayHistory(false);
  };

  const settingForWalletTwo = () => {
    setShowSA(false);
    setShowEditSA(false);
    setShowEditWO(false);
    setShowEditWT(true);
    setShowEditUI(false);
    setShowEditN(false);
    setShowHistory(false);
    setShowPlayHistory(false);
  };

  const settingForUserId = () => {
    setShowSA(false);
    setShowEditSA(false);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(true);
    setShowEditN(false);
    setShowHistory(false);
    setShowPlayHistory(false);
  };

  const settingForHistory = () => {
    setShowSA(false);
    setShowEditSA(false);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(false);
    setShowHistory(true);
    setShowPlayHistory(false);
  };

  const backHanndlerForHistory = () => {
    setShowSA(false);
    setShowEditSA(true);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(false);
    setShowHistory(false);
    setShowPlayHistory(false);
  };

  const settingForPlayHistory = () => {
    setShowSA(false);
    setShowEditSA(false);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(false);
    setShowHistory(false);
    setShowPlayHistory(true);
  };

  const backHanndlerForPlayHistory = () => {
    setShowSA(false);
    setShowEditSA(true);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(false);
    setShowHistory(false);
    setShowPlayHistory(false);
  };

  const settingForNotication = () => {
    setShowSA(false);
    setShowEditSA(false);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(true);
    setShowHistory(false);
    setShowPlayHistory(false);
  };

  const backHanndlerWalletOne = () => {
    setShowSA(false);
    setShowEditSA(true);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(false);
    setShowHistory(false);
    setShowPlayHistory(false);
  };

  const backHanndlerUserId = () => {
    setShowSA(false);
    setShowEditSA(true);
    setShowEditWO(false);
    setShowEditWT(false);
    setShowEditUI(false);
    setShowEditN(false);
    setShowHistory(false);
    setShowPlayHistory(false);
  };

  const [walletVisibiltyO, setWalletVisibilityO] = useState(true);
  const toggleVisibilityO = () => {
    setWalletVisibilityO(!walletVisibiltyO);
  };

  const [walletVisibiltyT, setWalletVisibilityT] = useState(true);
  const toggleVisibilityT = () => {
    setWalletVisibilityT(!walletVisibiltyT);
  };

  // FOR ALL USERS

  const { loadingAll, allusers } = useSelector((state) => state.user);

  const handleSearch = (e) => {
    const text = e.target.value;
    const filtered = allusers.filter(
      (item) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.userId?.toString() === text
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    dispatch(loadAllUsers(accesstoken));
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(allusers); // Update filteredData whenever locations change
  }, [allusers]);

  console.log(singleuser);

  useEffect(() => {
    if (singleuser && !loadingSingleUser) {
      if (singleuser.walletOne) {
        setWalletVisibilityO(singleuser.walletOne.visibility);
      }
      if (singleuser.walletTwo) {
        setWalletVisibilityT(singleuser.walletTwo.visibility);
      }
    }
  }, [singleuser, loadingSingleUser]);

  const [showProgressBar, setProgressBar] = useState(false);

  const submitHandlerForWalletUpdateOne = async () => {
    const url = `${UrlHelper.USER_WALLET_ONE_MODIFICATION_API}/${singleuser.walletOne._id}`;

    if (!amount) {
      showErrorToast("Please Enter Amount");
    }
    if (isNaN(amount)) {
      showErrorToast("Please Enter Valid Amount");
    } else {
      setProgressBar(true);

      try {
        const walletBalance = singleuser.walletOne.balance;
        const newWalletBalance = plusOperation
          ? parseFloat(walletBalance) + parseFloat(amount)
          : parseFloat(walletBalance) - parseFloat(amount);

        const { data } = await axios.put(
          url,
          {
            balance: newWalletBalance,
            visibility: walletVisibiltyO,
            paymentUpdateNote: paymentUpdateNote,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("datat :: " + data);

        showSuccessToast("User Wallet Updated Successfully");

        // dispatch(loadSingleUser(accesstoken, selectItem._id));
        dispatch(
          loadSingleUser(
            accesstoken,
            userdata ? selectItem.userId : selectItem._id
          )
        );
        setProgressBar(false);
        // backHanndlerWalletOne();
        setAmount("");
        setpaymentUpdateNote("");
        // dispatch(loadSingleUser(accesstoken, selectItem._id));
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };
  const submitHandlerForWalletUpdateTwo = async () => {
    const url = `${UrlHelper.USER_WALLET_TWO_MODIFICATION_API}/${singleuser.walletTwo._id}`;

    if (!amount) {
      showErrorToast("Please Enter Amount");
    }
    if (isNaN(amount)) {
      showErrorToast("Please Enter Valid Amount");
    } else {
      setProgressBar(true);

      const walletBalance = singleuser.walletTwo.balance;
      const newWalletBalance = plusOperation
        ? parseFloat(walletBalance) + parseFloat(amount)
        : parseFloat(walletBalance) - parseFloat(amount);

      try {
        const { data } = await axios.put(
          url,
          {
            balance: newWalletBalance,
            visibility: walletVisibiltyT,
            paymentUpdateNote: paymentUpdateNote,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("datat :: " + data);

        showSuccessToast("User Wallet Updated Successfully");
        // dispatch(loadSingleUser(accesstoken, selectItem._id));
        dispatch(
          loadSingleUser(
            accesstoken,
            userdata ? selectItem.userId : selectItem._id
          )
        );
        setProgressBar(false);
        // backHanndlerWalletOne();

        setAmount("");
        setpaymentUpdateNote("");
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  // FOR UPDATING USERID

  const [loadingUpdateUserId, setLoadingUpdateUserId] = useState(false);
  const submitHandlerForUpdateUserId = () => {
    if (!amount) {
      showErrorToast("Please enter new user id ");
    } else {
      updateUserId();
    }
  };

  const updateUserId = async () => {
    try {
      setLoadingUpdateUserId(true);
      const url = `${UrlHelper.UPDATE_USER_ID_API}/${selectItem.userId}`;

      console.log("URL :: " + url);

      const { data } = await axios.put(
        url,
        {
          newUserId: amount,
        },
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data :: " + data.message);

      showSuccessToast(data.message);

      // backHanndlerUserId();
      dispatch(loadSingleUser(accesstoken, amount));
      setAmount("");
      setLoadingUpdateUserId(false);
    } catch (error) {
      setLoadingUpdateUserId(false);
      console.log(" Err :: " + error);
      console.log(" Err :: " + error.response.data.message);

      if (error.response.data.message) {
        showErrorToast(error.response.data.message);
      } else {
        showErrorToast("Something went Wrong");
      }
    }
  };

  // FOR SINGLE NOTIFICAITON

  const [loadingSendNotification, setLoadingSendNotification] = useState(false);

  const sendNotificationToSingleUser = async () => {
    if (!titleValue) {
      showErrorToast("Enter Title");
    } else if (!discriptionValue) {
      showErrorToast("Enter Discription");
    } else {
      setLoadingSendNotification(true);

      try {
        const url = `${UrlHelper.SEND_NOTIFICATION_SINGLE_USER}`;
        const { data } = await axios.post(
          url,
          {
            title: titleValue,
            description: discriptionValue,
            devicetoken: singleuser?.devicetoken,
            userId: singleuser._id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("datat :: " + data);

        showSuccessToast(data.message);

        backHanndlerUserId();
        setLoadingSendNotification(false);
      } catch (error) {
        setLoadingSendNotification(false);
        console.log(error.response.data.message);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

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

  const [operationType, setOperationType] = useState("plus");
  const [plusOperation, setPlusOperation] = useState(true);

  const settingOperationWork = () => {
    setPlusOperation((prevState) => !prevState);
  };

  return (
    <div className="asdcontainer">
      {/** TOP NAVIGATION CONTATINER */}
      {showSA &&
        (loadingAll ? (
          <LoadingComponent />
        ) : (
          <>
            <div className="alCreatLocationTopContainer">
              <div className="alCreatLocationTopContaineCL">
                <label className="alCreatLocationTopContainerlabel">
                  All User
                </label>
              </div>
            </div>

            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <CiSearch color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Search"
                label="Search"
                onChange={handleSearch}
              />
            </div>

            {filteredData.length === 0 ? (
              <NodataFound title={"No data found"} />
            ) : (
              <div className="asdMainContainer">
                {filteredData.map((item, index) => (
                  <div
                    key={index}
                    className="allContentContainer-al"
                    onClick={() => settingEditSA(item)}
                  >
                    <label className="allContentContainerLimitL">
                      User ID : {item.userId}
                    </label>
                    <label
                      className="allContentContainerLocationL"
                      style={{ width: "20%" }}
                    >
                      {item.name}
                    </label>
                    <label
                      className="allContentContainerLocationL"
                      style={{ width: "20%" }}
                    >
                      {item?.country?.countryname}
                    </label>

                    <div className="userimage">
                      {item.avatar?.url ? (
                        <img
                          src={`${serverName}/uploads/${item.avatar.url}`}
                          alt="Profile Picture"
                          className="userimg"
                        />
                      ) : (
                        <img
                          src={images.user}
                          alt="Profile Picture"
                          className="userimg"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ))}

      {showEditSA && (
        <div className="pnMainContainer">
          {userdata ? (
            <div className="alCreatLocationTopContainer">
              <div className="searchIconContainer" onClick={backhandlerDeposit}>
                <IoArrowBackCircleOutline
                  color={COLORS.white_s}
                  size={"2.5rem"}
                />
              </div>
              <div className="alCreatLocationTopContaineCL">
                <label className="alCreatLocationTopContainerlabel">
                  {selectItem.username}
                </label>
              </div>
              <label
                className="alCreatLocationTopContainerlabel"
                style={{
                  paddingRight: "1rem",
                }}
              >
                {selectItem.country?.countryname}
              </label>
            </div>
          ) : (
            <div className="alCreatLocationTopContainer">
              <div className="searchIconContainer" onClick={backHanndler}>
                <IoArrowBackCircleOutline
                  color={COLORS.white_s}
                  size={"2.5rem"}
                />
              </div>
              <div className="alCreatLocationTopContaineCL">
                <label className="alCreatLocationTopContainerlabel">
                  {selectItem.name}
                </label>
              </div>
              <label
                className="alCreatLocationTopContainerlabel"
                style={{
                  paddingRight: "4rem",
                }}
              >
                {selectItem.country?.countryname}
              </label>
            </div>
          )}
          {loadingSingleUser ? (
            <LoadingComponent />
          ) : (
            singleuser?.userId && (
              <div
                className="hdAllContainer"
                style={{ background: "transparent" }}
              >
                {/** WALLET TWO */}
                {/* {user && user.role === "admin" ? (
                  <div
                    className="hdAllContainerContent"
                    onClick={settingForWalletTwo}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {singleuser.walletTwo?.walletName}
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {roundToInteger(singleuser.walletTwo?.balance)}{" "}
                        <span style={{ fontSize: "1rem" }}>
                          {singleuser?.country?.countrycurrencysymbol}
                        </span>
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Update {singleuser.walletTwo?.walletName} balance
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                ) : user &&
                  user.role === "subadmin" &&
                  user.subadminfeature.gamewalletbalnceedit ? (
                  <div
                    className="hdAllContainerContent"
                    onClick={settingForWalletTwo}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {singleuser.walletTwo?.walletName}
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {roundToInteger(singleuser.walletTwo?.balance)}{" "}
                        <span style={{ fontSize: "1rem" }}>
                          {singleuser?.country?.countrycurrencysymbol}
                        </span>
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Update {singleuser.walletTwo?.walletName} balance
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="hdAllContainerContent">
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {singleuser.walletTwo?.walletName}
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {roundToInteger(singleuser.walletTwo?.balance)}{" "}
                        <span style={{ fontSize: "1rem" }}>
                          {singleuser?.country?.countrycurrencysymbol}
                        </span>
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Update {singleuser.walletTwo?.walletName} balance
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                )} */}

                {/** WALLET ONE  */}

                {/* {user && user.role === "admin" ? (
                  <div
                    className="hdAllContainerContent"
                    onClick={settingForWalletOne}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {singleuser.walletOne?.walletName}
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {roundToInteger(singleuser.walletOne?.balance)}{" "}
                        <span style={{ fontSize: "1rem" }}>
                          {singleuser?.country?.countrycurrencysymbol}
                        </span>
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Update {singleuser.walletOne?.walletName} balance
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                ) : user &&
                  user.role === "subadmin" &&
                  user.subadminfeature.withdrawalletbalanceedit ? (
                  <div
                    className="hdAllContainerContent"
                    onClick={settingForWalletOne}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {singleuser.walletOne?.walletName}
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {roundToInteger(singleuser.walletOne?.balance)}{" "}
                        <span style={{ fontSize: "1rem" }}>
                          {singleuser?.country?.countrycurrencysymbol}
                        </span>
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Update {singleuser.walletOne?.walletName} balance
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="hdAllContainerContent">
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {singleuser.walletOne?.walletName}
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {roundToInteger(singleuser.walletOne?.balance)}{" "}
                        <span style={{ fontSize: "1rem" }}>
                          {singleuser?.country?.countrycurrencysymbol}
                        </span>
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Update {singleuser.walletOne?.walletName} balance
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaWallet color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                )} */}

                {/** USER ID  */}

                {/* {user && user.role === "admin" ? (
                  <div
                    className="hdAllContainerContent"
                    onClick={settingForUserId}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        User ID
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {singleuser?.userId}
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Update user ID
                      </label>
                      <div className="hdContenContainerIcon">
                        <GrUserNew color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                ) : user &&
                  user.role === "subadmin" &&
                  user.subadminfeature.useridedit ? (
                  <div
                    className="hdAllContainerContent"
                    onClick={settingForUserId}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        User ID
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {singleuser?.userId}
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Update user ID
                      </label>
                      <div className="hdContenContainerIcon">
                        <GrUserNew color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="hdAllContainerContent">
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        User ID
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        {singleuser?.userId}
                      </label>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Update user ID
                      </label>
                      <div className="hdContenContainerIcon">
                        <GrUserNew color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                  </div>
                )} */}

                {/** NOTIFICATIONL */}

                {user && user.role === "admin" ? (
                  <div
                    className="hdAllContainerContent"
                    onClick={settingForNotication}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        Notification
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        create a push notification
                      </label>
                      <div className="hdContenContainerIcon">
                        <AiFillNotification
                          color={COLORS.background}
                          size={"2.5rem"}
                        />
                      </div>
                    </div>
                  </div>
                ) : user &&
                  user.role === "subadmin" &&
                  user.subadminfeature.notificationsend ? (
                  <div
                    className="hdAllContainerContent"
                    onClick={settingForNotication}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        Notification
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        create a push notification
                      </label>
                      <div className="hdContenContainerIcon">
                        <AiFillNotification
                          color={COLORS.background}
                          size={"2.5rem"}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                {/** PLAY HISTORY  */}
                <div
                  className="hdAllContainerContent"
                  onClick={settingForPlayHistory}
                >
                  <div className="hdAllContainerContentTop">
                    <label className="hdAllContainerContentTopBoldLabel">
                      Play History
                    </label>
                    <div className="hdContenContainerIcon">
                      <FaUserCircle color={COLORS.background} size={"2.5rem"} />
                    </div>
                  </div>
                  <div className="hdAllContainerContentBottom">
                    <label className="hdAllContainerContentTopRegularLabel">
                      User's play history
                    </label>
                    <div className="hdContenContainerIcon">
                      <FaHistory color={COLORS.background} size={"2.5rem"} />
                    </div>
                  </div>
                </div>

                {/** HISTORY  */}
                <div
                  className="hdAllContainerContent"
                  onClick={settingForHistory}
                >
                  <div className="hdAllContainerContentTop">
                    <label className="hdAllContainerContentTopBoldLabel">
                      Transaction History
                    </label>
                    <div className="hdContenContainerIcon">
                      <FaUserCircle color={COLORS.background} size={"2.5rem"} />
                    </div>
                  </div>
                  <div className="hdAllContainerContentBottom">
                    <label className="hdAllContainerContentTopRegularLabel">
                      User's transaction history
                    </label>
                    <div className="hdContenContainerIcon">
                      <FaHistory color={COLORS.background} size={"2.5rem"} />
                    </div>
                  </div>
                </div>

                {/** END */}
              </div>
            )
          )}
        </div>
      )}

      {/** FOR WALLET ONE */}
      {/* {showEditWO &&
        (loadingSingleUser ? (
          <LoadingComponent />
        ) : (
          <div className="asdcontainer">
            <div className="alCreatLocationTopContainer">
              <div
                className="searchIconContainer"
                onClick={backHanndlerWalletOne}
              >
                <IoArrowBackCircleOutline
                  color={COLORS.white_s}
                  size={"2.5rem"}
                />
              </div>
              <div
                className="alCreatLocationTopContaineCL"
                style={{ justifyContent: "space-between", marginRight: "3rem" }}
              >
                <label className="alCreatLocationTopContainerlabel">
                  {singleuser.name}
                </label>
                <label className="alCreatLocationTopContainerlabel">
                  Update {singleuser.walletOne?.walletName}
                </label>
                <label className="alCreatLocationTopContainerlabel">
                  {selectItem.country?.countryname}
                </label>
              </div>
            </div>
           
            <div className="auMContainer">
              <label className="pdB">{singleuser.walletOne?.walletName}</label>
              <label className="pdR">Current Balance</label>
              <label className="pdB">
                {singleuser?.walletOne?.balance}{" "}
                {singleuser?.country?.countrycurrencysymbol}
              </label>

   
              <label
                className="alCLLabel"
                style={{ marginLeft: "-2rem", marginTop: "1rem" }}
              >
                Amount
              </label>
              <div
                className="alSearchContainer"
                style={{ marginLeft: "-0.5rem" }}
              >
                <div
                  className="searchIconContainer"
                  onClick={settingOperationWork}
                  style={{
                    cursor: "pointer",
                    border: `2px solid ${COLORS.background}`,
                    backgroundColor: COLORS.grayHalfBg,
                    borderRadius: "1rem",
                  }}
                >
                  {plusOperation ? (
                    <FaPlus color={COLORS.background} size={"2.5rem"} />
                  ) : (
                    <FaMinus color={COLORS.background} size={"2.5rem"} />
                  )}
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter amount"
                  value={amount}
                  inputMode="numeric"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

          
              <label
                className="alCLLabel"
                style={{ marginLeft: "-2rem", marginTop: "1rem" }}
              >
                Note
              </label>
              <div
                className="alSearchContainer"
                style={{ marginLeft: "-0.5rem" }}
              >
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter Note"
                  value={paymentUpdateNote}
                  onChange={(e) => setpaymentUpdateNote(e.target.value)}
                />
              </div>

              <label className="pdSB">Wallet Visibility</label>
              <div className="wvisibilityC">
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.white} size={"2.5rem"} />
                </div>
                <div className="wcl">
                  <label className="pdR">Current Balance</label>
                </div>

                <div className="switchContainer">
                  <label className="allContentContainerLimitL">Hide</label>
                  <label className="allContentContainerLimitL">
                    <Switch
                      checked={walletVisibiltyO}
                      onChange={toggleVisibilityO}
                      onColor="#86d3ff"
                      onHandleColor="#2693e6"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                      className="react-switch"
                    />
                  </label>
                  <label className="allContentContainerLimitL">Visible</label>
                </div>
              </div>
            </div>

            {showProgressBar ? (
              <LoadingComponent />
            ) : (
              <div
                className="alBottomContainer"
                onClick={submitHandlerForWalletUpdateOne}
              >
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}
          </div>
        ))} */}
      {/** FOR WALLET ONE */}

      {/** FOR WALLET TWO */}
      {/* {showEditWT &&
        (loadingSingleUser ? (
          <LoadingComponent />
        ) : (
          <div className="asdcontainer">
            <div className="alCreatLocationTopContainer">
              <div
                className="searchIconContainer"
                onClick={backHanndlerWalletOne}
              >
                <IoArrowBackCircleOutline
                  color={COLORS.white_s}
                  size={"2.5rem"}
                />
              </div>
              <div
                className="alCreatLocationTopContaineCL"
                style={{ justifyContent: "space-between", marginRight: "3rem" }}
              >
                <label className="alCreatLocationTopContainerlabel">
                  {singleuser.name}
                </label>
                <label className="alCreatLocationTopContainerlabel">
                  Update {singleuser.walletTwo?.walletName}
                </label>
                <label className="alCreatLocationTopContainerlabel">
                  {selectItem.country?.countryname}
                </label>
              </div>
            </div>
           
            <div className="auMContainer">
              <label className="pdB">{singleuser.walletTwo?.walletName}</label>
              <label className="pdR">Current Balance</label>
              <label className="pdB">
                {singleuser?.walletTwo?.balance}{" "}
                {singleuser?.country?.countrycurrencysymbol}
              </label>

       
              <label
                className="alCLLabel"
                style={{ marginLeft: "-2rem", marginTop: "1rem" }}
              >
                Amount
              </label>
              <div
                className="alSearchContainer"
                style={{ marginLeft: "-0.5rem" }}
              >
                <div
                  className="searchIconContainer"
                  onClick={settingOperationWork}
                  style={{
                    cursor: "pointer",
                    border: `2px solid ${COLORS.background}`,
                    backgroundColor: COLORS.grayHalfBg,
                    borderRadius: "1rem",
                  }}
                >
                  {plusOperation ? (
                    <FaPlus color={COLORS.background} size={"2.5rem"} />
                  ) : (
                    <FaMinus color={COLORS.background} size={"2.5rem"} />
                  )}
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

           
              <label
                className="alCLLabel"
                style={{ marginLeft: "-2rem", marginTop: "1rem" }}
              >
                Note
              </label>
              <div
                className="alSearchContainer"
                style={{ marginLeft: "-0.5rem" }}
              >
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter Note"
                  value={paymentUpdateNote}
                  onChange={(e) => setpaymentUpdateNote(e.target.value)}
                />
              </div>

              <label className="pdSB">Wallet Visibility</label>
              <div className="wvisibilityC">
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.white} size={"2.5rem"} />
                </div>
                <div className="wcl">
                  <label className="pdR">Current Balance</label>
                </div>

                <div className="switchContainer">
                  <label className="allContentContainerLimitL">Hide</label>
                  <label className="allContentContainerLimitL">
                    <Switch
                      checked={walletVisibiltyT}
                      onChange={toggleVisibilityT}
                      onColor="#86d3ff"
                      onHandleColor="#2693e6"
                      handleDiameter={30}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={48}
                      className="react-switch"
                    />
                  </label>
                  <label className="allContentContainerLimitL">Visible</label>
                </div>
              </div>
            </div>

            {showProgressBar ? (
              <LoadingComponent />
            ) : (
              <div
                className="alBottomContainer"
                onClick={submitHandlerForWalletUpdateTwo}
              >
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}
          </div>
        ))} */}
      {/** FOR WALLET TWO */}

      {/** FOR USER ID */}
      {/* {showEditUI &&
        (loadingSingleUser ? (
          <LoadingComponent />
        ) : (
          <div className="asdcontainer">
            <div className="alCreatLocationTopContainer">
              <div
                className="searchIconContainer"
                onClick={backHanndlerWalletOne}
              >
                <IoArrowBackCircleOutline
                  color={COLORS.white_s}
                  size={"2.5rem"}
                />
              </div>

              <div
                className="alCreatLocationTopContaineCL"
                style={{ justifyContent: "space-between", marginRight: "3rem" }}
              >
                <label className="alCreatLocationTopContainerlabel">
                  {singleuser.name}
                </label>
                <label className="alCreatLocationTopContainerlabel">
                  Update User ID
                </label>
                <label className="alCreatLocationTopContainerlabel">
                  {selectItem.country?.countryname}
                </label>
              </div>
            </div>
           
            <div className="auMContainer">
              <label className="pdR">Current User ID</label>
              <label className="pdB"> {singleuser.userId}</label>


              <label
                className="alCLLabel"
                style={{ marginLeft: "-2rem", marginTop: "1rem" }}
              >
                User ID
              </label>
              <div
                className="alSearchContainer"
                style={{ marginLeft: "-0.5rem" }}
              >
                <div className="searchIconContainer">
                  <PiSubtitles color={COLORS.background} size={"2.5rem"} />
                </div>

                <input
                  className="al-search-input"
                  placeholder="Enter user ID"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <label className="pdR">Contact Details</label>
              <label className="pdB"> {singleuser.email}</label>
              <label className="pdB">
                {" "}
                {singleuser.contact != singleuser.userId
                  ? singleuser.contact
                  : null}
              </label>
            </div>

            {loadingUpdateUserId ? (
              <LoadingComponent />
            ) : (
              <div
                className="alBottomContainer"
                onClick={submitHandlerForUpdateUserId}
              >
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}
          </div>
        ))} */}
      {/** FOR USER ID */}

      {/** FOR NOTIFICATION */}
      {showEditN &&
        (loadingSingleUser ? (
          <LoadingComponent />
        ) : (
          <div className="pnMainContainer">
            {/** TOP NAVIGATION CONTATINER */}
            <div className="alCreatLocationTopContainer">
              <div
                className="searchIconContainer"
                onClick={backHanndlerWalletOne}
              >
                <IoArrowBackCircleOutline
                  color={COLORS.white_s}
                  size={"2.5rem"}
                />
              </div>

              <div
                className="alCreatLocationTopContaineCL"
                style={{ justifyContent: "space-between", marginRight: "3rem" }}
              >
                <label className="alCreatLocationTopContainerlabel">
                  {singleuser.name}
                </label>
                <label className="alCreatLocationTopContainerlabel">
                  Push Notification for Single User
                </label>
                <label className="alCreatLocationTopContainerlabel">
                  {selectItem.country?.countryname}
                </label>
              </div>
            </div>

            {/** TITLE */}
            <label className="alCLLabel">Title</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <PiSubtitles color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter title"
                value={titleValue}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/** DESCRIPTION */}
            <label className="alCLLabel">Description</label>
            <div className="alSearchContainer">
              <div className="searchIconContainer">
                <IoDocumentText color={COLORS.background} size={"2.5rem"} />
              </div>

              <input
                className="al-search-input"
                placeholder="Enter description"
                value={discriptionValue}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {loadingSendNotification ? (
              <LoadingComponent />
            ) : (
              <div
                className="alBottomContainer"
                onClick={sendNotificationToSingleUser}
              >
                <label className="alBottomContainerlabel">Submit</label>
              </div>
            )}
          </div>
        ))}
      {/** FOR NOTIFICATION */}

      {/** HISTORY */}
      {showhistory && (
        <Historyc
          userdata={singleuser}
          backHanndlerForHistory={backHanndlerForHistory}
        />
      )}

      {/** PLAY HISTORY */}
      {showPlayhistory && (
        <Playhistory
          userdata={singleuser}
          backHanndlerForPlayHistory={backHanndlerForPlayHistory}
        />
      )}
    </div>
  );
};

export default AllUserDetails;
