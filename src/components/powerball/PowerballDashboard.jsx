import React, { useEffect, useState } from "react";
import "./PowerballDashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { loadPartnerProfile } from "../../redux/actions/userAction";
import PartnerContentComp from "../partner/PartnerContentComp";
import PowerballHome from "./PowerballHome";
import PowerTime from "./PowerTime";
import PowerballGame from "./PowerballGame";

const PowerballDashboard = () => {
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
        <PowerballHome setSelectedCategory={setSelectedCategory} />
      )}

      {selectedCategory === "PowerTime" && (
        <PowerTime
          setSelectedCategory={setSelectedCategory}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      )}

      {selectedCategory === "PowerballGame" && (
        <PowerballGame
          setSelectedCategory={setSelectedCategory}
          selectedTime={selectedTime}
        />
      )}
    </>
  );
};

export default PowerballDashboard;
