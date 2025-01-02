import React, { useState } from "react";
import "./Logout.css";
import FONT from "../../assets/constants/fonts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useGetLogoutQuery } from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import images from "../../assets/constants/images";
import { LoadingComponent } from "../helper/LoadingComponent";

function Logout() {
  const navigation = useNavigate();

  const yesHandler = () => {
    console.log("YES");
    loggingOff();
  };

  const noHandler = () => {
    console.log("NO");
    navigation("/dashboard");
  };

  // const { data, error, isLoading } = useGetLogoutQuery(accesstoken);

  const [showProgressBar, setShowProgressBar] = useState(false);

  const loggingOff = () => {
    console.log("STARTING LOGGING OFF");

    setShowProgressBar(true);

    try {
      const timer = setTimeout(() => {
        showSuccessToast("Logout Successfully");
        localStorage.clear();
        setShowProgressBar(false);
        navigation("/login", { replace: true });
      }, 3000);
    } catch (error) {
      console.log("error" + error);
      showErrorToast("Something went wrong");
      localStorage.clear();
      setShowProgressBar(false);
      navigation("/login");
    }
  };

  return (
    <div className="cp-container">
      {/** TOP NAVIGATION CONTATINER */}
      <div className="alCreatLocationTopContainer">
        <div className="alCreatLocationTopContaineCL">
          <label className="alCreatLocationTopContainerlabel">Log out</label>
        </div>
      </div>
      <div
        className="cp-container-main"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <div className="catimagecontainer">
          <img src={images.cat} alt="cat" className="catandtrophyimg" />
        </div>
        <label className="alCLLabel">Are you sure?</label>
      </div>

      {showProgressBar ? (
        <LoadingComponent />
      ) : (
        <>
          <div
            onClick={yesHandler}
            className="alBottomContainer"
            style={{
              cursor: "pointer",
            }}
          >
            <label className="alBottomContainerlabel">Yes</label>
          </div>

          <div
            onClick={noHandler}
            className="alBottomContainer"
            style={{
              cursor: "pointer",
            }}
          >
            <label className="alBottomContainerlabel">No</label>
          </div>
        </>
      )}
    </div>
  );
}

export default Logout;
