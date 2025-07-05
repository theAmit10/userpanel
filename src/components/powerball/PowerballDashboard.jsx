import React, { useEffect, useState } from "react";
import "./PowerballDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { loadPartnerProfile } from "../../redux/actions/userAction";
import PartnerContentComp from "../partner/PartnerContentComp";
import PowerballHome from "./PowerballHome";
import PowerTime from "./PowerTime";
import PowerballGame from "./PowerballGame";
import { ToastContainer } from "react-toastify";

const PowerballDashboard = ({ reloadKey, setReloadKey }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  const { accesstoken, user, partner } = useSelector((state) => state.user);

  useEffect(() => {
    if (user && accesstoken) {
      dispatch(loadPartnerProfile(accesstoken, user.userId));
    }
  }, [dispatch]);

  const userdata = {
    userId: 1000,
    name: "Admin",
  };

  const partnerData = {
    userId: user?.parentPartnerId,
    name: "Partner",
  };

  console.log("Seletedtime");
  console.log(selectedTime);

  return (
    <>
      {selectedCategory === "" && (
        <PowerballHome
          setSelectedCategory={setSelectedCategory}
          reloadKey={reloadKey}
          setReloadKey={setReloadKey}
        />
      )}

      {selectedCategory === "PowerTime" && (
        <PowerTime
          reloadKey={reloadKey}
          setSelectedCategory={setSelectedCategory}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          setReloadKey={setReloadKey}
        />
      )}

      {selectedCategory === "PowerballGame" && (
        <PowerballGame
          reloadKey={reloadKey}
          setSelectedCategory={setSelectedCategory}
          selectedTime={selectedTime}
          setReloadKey={setReloadKey}
        />
      )}

      {/* <ToastContainer /> */}
    </>
  );
};

export default PowerballDashboard;
