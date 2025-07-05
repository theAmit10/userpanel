import React, { useEffect, useState } from "react";
import "./ChangePassword.css";
import FONT from "../../assets/constants/fonts";
import { FaRegPlayCircle } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import { flushSync } from "react-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateDepositMutation,
  useCreateWithdrawMutation,
} from "../../redux/api";
import axios from "axios";
import UrlHelper from "../../helper/UrlHelper";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../helper/showErrorToast";
import CircularProgressBar from "../helper/CircularProgressBar";
import { ToastContainer } from "react-toastify";
import { loadProfile } from "../../redux/actions/userAction";
import { RiOilFill } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";

const upiapidata = [
  { name: "Wasu", upiid: "9876543210@ybl", id: "1" },
  { name: "Aman", upiid: "8876543210@ybl", id: "2" },
  { name: "Zasu", upiid: "7876543210@ybl", id: "3" },
  { name: "Masu", upiid: "1876543210@ybl", id: "4" },
  { name: "Kasu", upiid: "2876543210@ybl", id: "5" },
];

function ChangePassword({ reloadKey }) {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { accesstoken } = useSelector((state) => state.user);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  // For Password Visibility

  const togglePasswordVisibilityForOLDPASSWORD = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const togglePasswordVisibilityforNEWPASSWORD = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const togglePasswordVisibilityCONFIRMPASSWORD = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const [showProgressbar, setProgressBar] = useState(false);

  const changePasswordHandler = async () => {
    if (!oldPassword) {
      showErrorToast("Please enter your old password");
    } else if (!newPassword) {
      showErrorToast("Please enter your new password");
    } else if (!confirmPassword) {
      showErrorToast("Please enter your confirm password");
    } else if (newPassword != confirmPassword) {
      showErrorToast("New password and confirm password not matched");
    } else {
      setProgressBar(true);

      try {
        const { data } = await axios.put(
          UrlHelper.CHANGE_PASSWORD_API,
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accesstoken}`,
            },
          }
        );

        console.log("datat :: " + data);

        dispatch(loadProfile(accesstoken));

        showSuccessToast(data.message);
        setProgressBar(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        setProgressBar(false);
        showErrorToast("Something went wrong");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log("reloadKey :: " + reloadKey);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setOldPasswordVisible(false);
    setNewPasswordVisible(false);
    setConfirmPasswordVisible(false);
  }, [reloadKey]);

  return (
    <div className="cp-container">
      {/** TOP NAVIGATION CONTATINER */}
      <div className="alCreatLocationTopContainer">
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">
            Change Password
          </label>
        </div>
      </div>
      <div className="cp-container-main">
        {/** OLD PASSWORD */}
        <label className="alCLLabel">Old password</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <RiLockPasswordLine color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder="Enter Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        {/** NEW PASSWORD */}
        <label className="alCLLabel">New password</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <RiLockPasswordLine color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/** CONFIRM NEW PASSWORD */}
        <label className="alCLLabel">Confim password</label>
        <div className="alSearchContainer">
          <div className="searchIconContainer">
            <RiLockPasswordLine color={COLORS.background} size={"2.5rem"} />
          </div>

          <input
            className="al-search-input"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {showProgressbar ? (
        <div className="NC">
          <CircularProgressBar />
        </div>
      ) : (
        <div className="alBottomContainer" onClick={changePasswordHandler}>
          <label className="alBottomContainerlabel">Change password</label>
        </div>
      )}

      {/* <ToastContainer /> */}
    </div>
  );
}

export default ChangePassword;
