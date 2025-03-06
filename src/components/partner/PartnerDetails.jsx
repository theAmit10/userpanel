import React, { useState } from "react";
import "./Partner.css";
import PartnerContentComp from "./PartnerContentComp";
import MyPartnerProfile from "./MyPartnerProfile";
import AllProfitDecrease from "./AllProfitDecrease";
import AllUser from "./AllUser";
import RechargeMethods from "./RechargeMethods";
import AllPartner from "./AllPartner";
import HeaderComp from "../helpercomp/HeaderComp";

const PartnerDetails = ({ closePartnerDetails }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      {selectedCategory === "" && (
        <div className="partner-main-container">
          {/** HEADER  */}
          <HeaderComp
            title={"Partner Details"}
            closePartnerDetails={closePartnerDetails}
          />
          {/* CONTENT CONTAINER */}
          <div className="partner-container">
            {/** MY PROFILE */}

            <PartnerContentComp
              title={"Partner Profile"}
              description={"Basic Partner Details"}
              iconfrom={"RiAccountCircleFill"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"RechargeMethods"}
            />
            {/** RECHARGE METHODS */}
            <PartnerContentComp
              title={"Play History"}
              description={"User’s Play History Details"}
              iconfrom={"RiAccountCircleFill"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"MyPartnerProfile"}
            />
            {/** ALL PARTNER */}
            <PartnerContentComp
              title={"Transaction History"}
              description={"User’s Transaction details"}
              iconfrom={"TiGroup"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"AllPartner"}
            />
            {/** ALL PROFIT DECREASE */}
            <PartnerContentComp
              title={"Send Notification"}
              description={"Send Notification for User’s"}
              iconfrom={"BsFillPeopleFill"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"AllProfitDecrease"}
            />
            {/** ALL USERS */}
            <PartnerContentComp
              title={"Increase Percentage"}
              description={"Update Partner Percentage"}
              iconfrom={"IoIosPeople"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"AllUser"}
            />
            {/** ALL RECHARGE */}
            <PartnerContentComp
              title={"Decrease Percentage"}
              description={"Update Partner Percentage"}
              iconfrom={"HiMiniWallet"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"AllRecharge"}
            />
          </div>
        </div>
      )}

      {selectedCategory === "MyPartnerProfile" && (
        <MyPartnerProfile setSelectedCategory={setSelectedCategory} />
      )}
      {selectedCategory === "AllProfitDecrease" && (
        <AllProfitDecrease setSelectedCategory={setSelectedCategory} />
      )}
      {selectedCategory === "AllPartner" && (
        <AllPartner setSelectedCategory={setSelectedCategory} />
      )}
      {selectedCategory === "AllUser" && (
        <AllUser setSelectedCategory={setSelectedCategory} />
      )}
      {selectedCategory === "RechargeMethods" && (
        <RechargeMethods setSelectedCategory={setSelectedCategory} />
      )}
    </>
  );
};

export default PartnerDetails;
