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

  return (
    <>
      {selectedCategory === "" && (
        <PowerballHome setSelectedCategory={setSelectedCategory} />
      )}

      {selectedCategory === "PowerTime" && (
        <PowerTime setSelectedCategory={setSelectedCategory} />
      )}

      {selectedCategory === "PowerballGame" && (
        <PowerballGame setSelectedCategory={setSelectedCategory} />
      )}

      {/* 
  
      {selectedCategory === "AllProfitDecrease" && (
        <AllProfitDecrease setSelectedCategory={setSelectedCategory} />
      )}
      {selectedCategory === "AllPartner" && (
        <AllPartner setSelectedCategory={setSelectedCategory} />
      )}
      {selectedCategory === "CreateNotificationAdmin" && (
        <CreateNotification
          setSelectedCategory={setSelectedCategory}
          selectedPartner={userdata}
        />
      )}
      {selectedCategory === "CreateNotificationPartner" && (
        <CreateNotification
          setSelectedCategory={setSelectedCategory}
          selectedPartner={partnerData}
        />
      )}
      {selectedCategory === "AllUser" && (
        <AllUser setSelectedCategory={setSelectedCategory} />
      )}
      {selectedCategory === "AllRecharge" && (
        <AllRecharge setSelectedCategory={setSelectedCategory} />
      )}
      {selectedCategory === "RechargeMethods" && (
        <RechargeMethods setSelectedCategory={setSelectedCategory} />
      )} */}
    </>
  );
};

export default PowerballDashboard;
