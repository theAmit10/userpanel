import React, { useCallback, useEffect, useState } from "react";
import "./Notification.css";
import { PiHandDepositBold } from "react-icons/pi";
import { PiHandWithdrawFill } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useCheckNotificationSeenMutation,
  useGetPlayHistoryQuery,
} from "../../helper/Networkcall";
import CircularProgressBar from "../helper/CircularProgressBar";
import { loadAllNotification } from "../../redux/actions/userAction";
import { useGetSingleUserNotificationQuery } from "../../redux/api";
import Loader from "../molecule/Loader";
import AllUserDetails from "../alluser/AllUserDetails";

function Notification() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotification] = useState([]);

  const { accesstoken, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadAllNotification(accesstoken, user._id));
  }, [dispatch]);

  // useEffect(() => {
  //   if (!loadingNotification && notifications) {
  //     submitHandler();
  //   }
  // }, [loadingNotification, notifications]);

  const [checkNotificationSeen, { error }] = useCheckNotificationSeenMutation();

  const submitHandler = async () => {
    try {
      const res = await checkNotificationSeen({
        accessToken: accesstoken,
        id: user._id,
      }).unwrap();

      console.log("seen status res :: " + JSON.stringify(res));
    } catch (error) {
      console.log("Error during submitHandler:", error);
    }
  };

  // Fetch Paginated Data
  const {
    data: paginatedData,
    refetch: refetchPaginated,
    isFetching: fetchingPaginated,
    isLoading: loadingPaginated,
  } = useGetSingleUserNotificationQuery(
    { accesstoken, id: user._id, page, limit },
    { refetchOnMountOrArgChange: true } // Disable caching
  );

  useEffect(() => {
    if (!loadingPaginated && paginatedData) {
      submitHandler();
    }
  }, [loadingPaginated, paginatedData]);

  // Update Partners Data
  useEffect(() => {
    if (paginatedData?.notifications) {
      console.log(
        "Paginated data received for page",
        page,
        ":",
        paginatedData.notifications
      ); // Debug log
      setNotification((prev) => {
        // Filter out duplicates
        const newData = paginatedData.notifications.filter(
          (newItem) => !prev.some((prevItem) => prevItem._id === newItem._id)
        );
        return page === 1 ? paginatedData.notifications : [...prev, ...newData];
      });

      // Update hasMore correctly
      if (paginatedData.notifications.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [paginatedData, page]);

  // Load More Data
  const loadMore = () => {
    console.log("Loading more data..."); // Debug log
    if (!loading && hasMore) {
      setLoading(true);
      setPage((prev) => {
        console.log("Updating page to:", prev + 1); // Debug log
        return prev + 1;
      });
    }
  };

  // Handle Scroll for Pagination
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const threshold = 100; // Adjust this value as needed
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < threshold;
    console.log("Checking near bottom", isNearBottom); // Debug log
    if (isNearBottom && !loading && hasMore) {
      loadMore();
    }
  };

  // Reset loading state after data is fetched
  useEffect(() => {
    if (!fetchingPaginated) {
      setLoading(false);
    }
  }, [fetchingPaginated]);

  // Combined Loading State
  const isLoading = fetchingPaginated || loading;

  const [showUserDetails, setShowUserDetaiils] = useState(false);
  const [showNotifitcation, setShowNotificaton] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const settingUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserDetaiils(true);
    setShowNotificaton(false);
  };

  const backHandlerForUserDetails = () => {
    setShowUserDetaiils(false);
    setShowNotificaton(true);
  };

  return (
    <>
      {showNotifitcation && (
        <div className="history-main-container">
          {/** TITLE CONTAINER */}
          <label className="h-title-label">Notification</label>
          {/** CONTENT CONTAINER */}
          <div className="h-content-container" onScroll={handleScroll}>
            {/** CONTENT */}

            {notifications?.map((item, index) => (
              <div className="notification-mc" key={index}>
                <div className="second-con-noti">
                  <label className="notification-label-title">
                    {item.title}
                  </label>
                  <label className="notification-label-subtitle">
                    {item.description}
                  </label>
                </div>
                {item.userId && (
                  <div
                    className="first-con-noti"
                    onClick={() => settingUserDetails(item)}
                  >
                    <label className="allContentContainerLocationL">
                      {" "}
                      {item.userId ? "User ID" : ""}
                    </label>
                    <label className="allContentContainerLimitL">
                      {item.userId}
                    </label>
                  </div>
                )}
              </div>
            ))}

            {isLoading && hasMore && <Loader />}
          </div>
        </div>
      )}

      {showUserDetails && (
        <AllUserDetails
          userdata={selectedUser}
          backhandlerDeposit={backHandlerForUserDetails}
        />
      )}
    </>
  );
}

export default Notification;
