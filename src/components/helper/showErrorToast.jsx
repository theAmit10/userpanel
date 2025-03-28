import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FONT from "../../assets/constants/fonts";

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      fontFamily: FONT.Montserrat_Regular,
      fontSize: "1.5rem",
    },
  });
};

// Success Toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      fontFamily: FONT.Montserrat_Regular,
      fontSize: "1.5rem",
    },
  });
};

// Warning Toast
export const showWarningToast = (message) => {
  toast.warn(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      fontFamily: FONT.Montserrat_Regular,
      fontSize: "1.5rem",
    },
  });
};

const CustomErrorToastContainer = () => {
  return <ToastContainer containerId={"parent-container"} />;
};

export default CustomErrorToastContainer;
