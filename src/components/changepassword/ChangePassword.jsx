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

const upiapidata = [
  { name: "Wasu", upiid: "9876543210@ybl", id: "1" },
  { name: "Aman", upiid: "8876543210@ybl", id: "2" },
  { name: "Zasu", upiid: "7876543210@ybl", id: "3" },
  { name: "Masu", upiid: "1876543210@ybl", id: "4" },
  { name: "Kasu", upiid: "2876543210@ybl", id: "5" },
];

function ChangePassword() {
 

    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const {accesstoken} = useSelector(state => state.user);
  
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

  const [showProgressbar , setProgressBar] = useState(false);


  const changePasswordHandler = async () => {
    if (!oldPassword) {
     showErrorToast('Please enter your old password',)
   } else if (!newPassword) {
    showErrorToast('Please enter your new password')
  } else if (!confirmPassword) {
    showErrorToast('Please enter your confirm password')
  } else if (newPassword != confirmPassword) {
    showErrorToast('New password and confirm password not matched')   
  } 
    else {
     setProgressBar(true);

     try {
  
       const {data} = await axios.put(
        UrlHelper.CHANGE_PASSWORD_API,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );

      console.log("datat :: "+data)

      dispatch(loadProfile(accesstoken))
      
       
       showSuccessToast(data.message)
       setProgressBar(false);
       setOldPassword("")
       setNewPassword("");
       setConfirmPassword("")
       
     } catch (error) {
      setProgressBar(false);
       showErrorToast('Something went wrong')
       console.log(error);

     }
   }
 };

  

  return (
    <div className="deposit-main-container">
      {/** TOP CONTAINER */}
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        
        {/** TITLE CONTAINER */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label className="h-title-label-h">Change Password</label>
        </div>
      </div>

      {/** TITLE CONTAINER */}
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      ></div>

      {/** Main Conatiner */}

      <div className="deposit-container">
        <div className="deposit-content-container-main-upi">
          {/** LEFT LIST OF DEPOSIT */}

          {/** DEPOSIT FORM */}

          <div className="deposit-content-container-left-upi-left">
            <div className="upiDepositFormContainer">
              {/** Old Password */}
              <div className="formUpiDepositFormContainerContent">
                <label className="formUpiDepositFormContainerContentLabel">
                Old Password
                </label>
                <input
                  className="formUpiDepositFormContainerContentInputcp"
                  type="text"
                  name="oldPassword"
                  placeholder="Enter Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              
              {/** New Password */}
              <div className="formUpiDepositFormContainerContent">
                <label className="formUpiDepositFormContainerContentLabel">
                New Password
                </label>
                <input
                  className="formUpiDepositFormContainerContentInputcp"
                  type="text"
                  name="NewPassword"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              {/** Confirm Password */}
              <div className="formUpiDepositFormContainerContent">
                <label className="formUpiDepositFormContainerContentLabel">
                Confirm Password
                </label>
                <input
                  className="formUpiDepositFormContainerContentInputcp"
                  type="text"
                  name="ConfirmPassword"
                  placeholder="Enter Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>


              {/** DEPOSIT BUTTON */}
              <div
                style={{
                  marginTop: "2vw",
                }}
              >
                {showProgressbar ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2vw",
                    }}
                  >
                    <CircularProgressBar />
                  </div>
                ) : (
                  <button
                    className="submit-btn-login-deposit"
                    onClick={changePasswordHandler}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ChangePassword;
