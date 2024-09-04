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

function Notification() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { accesstoken, user, notifications, loadingNotification } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(loadAllNotification(accesstoken, user._id));
  }, [dispatch]);

  useEffect(() => {
    if (!loadingNotification && notifications) {
      submitHandler();
    }
  }, [loadingNotification, notifications]);

  const [checkNotificationSeen, { isLoading, error }] =
    useCheckNotificationSeenMutation();

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

  return (
    <div className="history-main-container">
      {/** TITLE CONTAINER */}
      <label className="h-title-label">Notification</label>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container">
        {/** CONTENT */}

        {loadingNotification ? (
          <div
            style={{
              flex: "1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgressBar />
          </div>
        ) : (
          notifications?.map((item, index) => (
            <div className="h-content-n" key={index}>
              {/** SECOND CONTAINER */}
              <div className="h-content-second">
                <div className="h-content-second-content-container-top-n">
                  <label className="h-content-second-content-container-top-amount-n">
                    {item.title}
                  </label>
                </div>
                <div className="h-content-second-content-container-bottom">
                  <label className="h-content-second-content-container-top-amount-n-b">
                    {item.description}
                  </label>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;
