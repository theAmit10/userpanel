import React from "react";
import "./Logout.css";
import FONT from "../../assets/constants/fonts";
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useGetLogoutQuery } from "../../redux/api";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import images from "../../assets/constants/images";
import { LoadingComponent } from "../helper/LoadingComponent";


function Logout() {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { accesstoken, user } = useSelector((state) => state.user);

  const yesHandler = () => {
    console.log("YES");
    loggingOff()
  };

  const noHandler = () => {
    console.log("NO");
    navigation("/dashboard");
  };

  const { data, error, isLoading } = useGetLogoutQuery(accesstoken);

  const loggingOff = () => {
    console.log("STARTING LOGGING OFF");
   
    if (isLoading) {
      console.log("Loading...");
      return;
    }

    if (data) {
      showSuccessToast("Logout Successfully");
      localStorage.clear();
      navigation("/login");
    } else if (error) {
      showErrorToast("Something went wrong");
      localStorage.clear();
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

    {isLoading ? (
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
