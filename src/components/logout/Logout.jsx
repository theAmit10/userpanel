import React from "react";
import "./Logout.css";
import FONT from "../../assets/constants/fonts";
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useGetLogoutQuery } from "../../redux/api";
import { showSuccessToast } from "../helper/showErrorToast";


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
    }
  };

  return (
    <div className="history-main-container">
      {/** TITLE CONTAINER */}
      <label className="h-title-label">Logout</label>
      <label className="h-title-label">Are you sure?</label>

      {/** CONTENT CONTAINER */}
      <div className="h-content-container-bt">
        {/** CONTENT */}

        {/** LEFT CONTAINER */}
        <div className="left-container-bt">
          {/** COUNTRY */}

          <div
            className="content-container-up"
            style={{
              maxWidth: "25%",
            }}
            onClick={yesHandler}
          >
            <label className="content-label-up" style={{ flex: 1 }}>
              <label
                className="content-label-up"
                style={{ fontFamily: FONT.Montserrat_SemiBold }}
              >
                Yes
              </label>
            </label>
          </div>

          {/** CURRENCY */}
          <div
            className="content-container-up"
            style={{
              maxWidth: "25%",
            }}
            onClick={noHandler}
          >
            <label className="content-label-up" style={{ flex: 1 }}>
              <label
                className="content-label-up"
                style={{ fontFamily: FONT.Montserrat_SemiBold }}
              >
                No
              </label>
            </label>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Logout;
