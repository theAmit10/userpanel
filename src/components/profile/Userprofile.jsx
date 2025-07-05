import React, { useCallback, useEffect, useState } from "react";
import "./Userprofile.css";
import { PiHandDepositBold } from "react-icons/pi";
import { PiHandWithdrawFill } from "react-icons/pi";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegPlayCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetPlayHistoryQuery } from "../../helper/Networkcall";
import CircularProgressBar from "../helper/CircularProgressBar";
import { useTransferWalletBalanceMutation } from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { loadProfile } from "../../redux/actions/userAction";
import { FaWallet } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import images from "../../assets/constants/images";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { CiCircleChevDown } from "react-icons/ci";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import { serverName } from "../../redux/store";
import { GrCurrency } from "react-icons/gr";
import { TbWorld } from "react-icons/tb";

function Userprofile() {
  const dispatch = useDispatch();

  const { accesstoken, user } = useSelector((state) => state.user);

  return (
    <div className="history-main-container">
      {/** TITLE CONTAINER */}
      <label className="h-title-label">About you</label>
      {/** CONTENT CONTAINER */}
      <div className="h-content-container-bt">
        {/** CONTENT */}

        {/** LEFT CONTAINER */}
        <div className="left-container-bt">
          {/** COUNTRY */}

          <div className="content-container-up">
            <div className="walletcontainer-up">
              <TbWorld color={COLORS.background} size={"25px"} />
            </div>
            <label className="content-label-up" style={{ flex: 1 }}>
              <label
                className="content-label-up"
                style={{ fontFamily: FONT.Montserrat_SemiBold }}
              >
                Country :{" "}
              </label>{" "}
              {user.country.countryname}
            </label>
          </div>

          {/** CURRENCY */}
          <div className="content-container-up">
            <div className="walletcontainer-up">
              <GrCurrency color={COLORS.background} size={"25px"} />
            </div>
            <label className="content-label-up" style={{ flex: 1 }}>
              <label
                className="content-label-up"
                style={{ fontFamily: FONT.Montserrat_SemiBold }}
              >
                Currency :{" "}
              </label>
              {user.country.countrycurrencysymbol}
            </label>
          </div>
        </div>

        {/** RIGHT CONTAINER */}
        <div className="right-container-up">
          <div className="right-container-one-up">
            <div className="imagecontainer-up">
              {user?.avatar?.url ? (
                <img
                  src={`${serverName}/uploads/${user?.avatar.url}`}
                  alt="Profile Picture"
                  className="user-imaged"
                />
              ) : (
                <img
                  src={images.user}
                  alt="Profile Picture"
                  className="user-imaged"
                />
              )}
            </div>

            <div className="profile-content-container">
              <label className="h-title-label">{user ? user.name : ""}</label>
              <label className="h-title-label-medium">
                {user ? user.email : ""}
              </label>

              {user && user.contact != user.userId ? (
                <label className="h-title-label-medium">
                  {user ? user.contact : ""}
                </label>
              ) : null}

              <label className="h-title-label-medium">
                {" "}
                User ID - {user ? user.userId : ""}
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Userprofile;
