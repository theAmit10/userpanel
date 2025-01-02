import React, { useEffect, useState } from "react";
import "./Splashscreen.css";
import images from "../../assets/constants/images";
import { useNavigate } from "react-router-dom";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { ToastContainer } from "react-toastify";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/helper/showErrorToast";
import Loader from "../../components/helper/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/userAction";
import CircularProgressBar from "../../components/helper/CircularProgressBar";


function Splashscreen() {
    const dispatch = useDispatch();

    const navigation = useNavigate();

    const handleSignUpClick = () => {
      navigation("/register");
    };

    const getUserAccessToken = async () => {
      try {
        const val = await localStorage.getItem('accesstoken');
        console.log('From SS Access Token :: ' + val);
        // dispatch(getUserAccessToken(val));
        dispatch({
          type: 'getaccesstoken',
          payload: val,
        });

        const timer = setTimeout(() => {
          if (val) {
            navigation('/dashboard', { replace: true })
          } else {
            navigation('/login', { replace: true })
          }
        }, 3000);
      } catch (error) {
        console.log('error' + error);
      }
    };

    useEffect(() => {
      getUserAccessToken();

    }, []);

  return (
    <div className="splash-page">
    <div className="logo-container">
      <img src={images.logo} alt="Profile Picture" className="logo-imaged" />
    </div>

    <ToastContainer />
  </div>
  );
}

export default Splashscreen;
