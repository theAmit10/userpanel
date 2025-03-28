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
import UserHistory from "../history/UserHistory";
import UserPlayHistory from "../playhistory/UserPlayHistory";
import {
  useCreateNotificationMutation,
  useGetAboutPartnerQuery,
} from "../../redux/api";

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

  const userid = user.userId;

  const {
    isLoading: loadingpartner,
    error,
    data,
  } = useGetAboutPartnerQuery({
    accesstoken,
    userid,
  });
  const [partner, setpartner] = useState(null);

  useEffect(() => {
    if (!loadingpartner && data) {
      console.log("Partner data :: " + JSON.stringify(data));
      setpartner(data.partner);
    }
    if (error) {
      console.log(error);
    }
  }, [data, loadingpartner, error]);

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

  // FOR UPDATING USERID

  // FOR SINGLE NOTIFICAITON

  const [loadingSendNotification, setLoadingSendNotification] = useState(false);
  const [createNotification, { isLoading }] = useCreateNotificationMutation();

  const sendNotificationToSingleUser = async () => {
    if (!titleValue) {
      showErrorToast("Enter Title");
    } else if (!discriptionValue) {
      showErrorToast("Enter Discription");
    } else {
      setLoadingSendNotification(true);

      try {
        // const url = `${UrlHelper.SEND_NOTIFICATION_SINGLE_USER}`;
        // const { data } = await axios.post(
        //   url,
        //   {
        //     title: titleValue,
        //     description: discriptionValue,
        //     devicetoken: singleuser?.devicetoken,
        //     userId: singleuser._id,
        //   },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${accesstoken}`,
        //     },
        //   }
        // );

        // console.log("datat :: " + data);

        const body = {
          title: titleValue,
          description: discriptionValue,
          userId: singleuser.userId,
        };
        const res = await createNotification({
          accesstoken,
          body,
        });
        console.log(JSON.stringify(res));
        setTitle("");
        setDescription("");
        showSuccessToast(res.data.message);

        // showSuccessToast(data.message);

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
          {loadingSingleUser || loadingpartner ? (
            <LoadingComponent />
          ) : (
            singleuser?.userId && (
              <div
                className="hdAllContainer"
                style={{ background: "transparent" }}
              >
                {/** NOTIFICATIONL */}
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

                {/** PLAY HISTORY  */}
                {partner?.playHistoryPermission && (
                  <div
                    className="hdAllContainerContent"
                    onClick={settingForPlayHistory}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        Play History
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaUserCircle
                          color={COLORS.background}
                          size={"2.5rem"}
                        />
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
                )}

                {/** HISTORY  */}

                {partner?.transactionHistoryPermission && (
                  <div
                    className="hdAllContainerContent"
                    onClick={settingForHistory}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        Transaction History
                      </label>
                      <div className="hdContenContainerIcon">
                        <FaUserCircle
                          color={COLORS.background}
                          size={"2.5rem"}
                        />
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
                )}

                {/** END */}
              </div>
            )
          )}
        </div>
      )}

      {/** FOR NOTIFICATION */}
      {showEditN &&
        (loadingSingleUser || loadingpartner ? (
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
        <UserHistory
          userdata={singleuser}
          backHanndlerForHistory={backHanndlerForHistory}
        />
      )}

      {/** PLAY HISTORY */}
      {showPlayhistory && (
        <UserPlayHistory
          userdata={singleuser}
          backHanndlerForPlayHistory={backHanndlerForPlayHistory}
        />
      )}
    </div>
  );
};

export default AllUserDetails;
