import React, { useState } from "react";
import "./Partner.css";
import PartnerContentComp from "./PartnerContentComp";
import MyPartnerProfile from "./MyPartnerProfile";
import AllProfitDecrease from "./AllProfitDecrease";
import AllUser from "./AllUser";
import RechargeMethods from "./RechargeMethods";
import AllPartner from "./AllPartner";

const Partner = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      {selectedCategory === "" && (
        <div className="partner-main-container">
          {/** HEADER  */}
          <div className="partner-header">
            <label className="partner-header-label">Partner</label>
          </div>
          {/* CONTENT CONTAINER */}
          <div className="partner-container">
            {/** MY PROFILE */}
            <PartnerContentComp
              title={"My Profile"}
              description={"My profile details"}
              iconfrom={"RiAccountCircleFill"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"MyPartnerProfile"}
            />
            {/** ALL PARTNER */}
            <PartnerContentComp
              title={"All Partner"}
              description={"List of all Partner data"}
              iconfrom={"TiGroup"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"AllPartner"}
            />
            {/** ALL PROFIT DECREASE */}
            <PartnerContentComp
              title={"All Profit Decrease"}
              description={"List of Decrease Request "}
              iconfrom={"BsFillPeopleFill"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"AllProfitDecrease"}
            />
            {/** ALL USERS */}
            <PartnerContentComp
              title={"All Users"}
              description={"List of all users"}
              iconfrom={"IoIosPeople"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"AllUser"}
            />
            {/** ALL RECHARGE */}
            <PartnerContentComp
              title={"All Recharge"}
              description={"List of Recharge Partner data"}
              iconfrom={"HiMiniWallet"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"AllRecharge"}
            />

            {/** RECHARGE METHODS */}
            <PartnerContentComp
              title={"Recharge Method"}
              description={"Recharge Payment Methods"}
              iconfrom={"BsWalletFill"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"RechargeMethods"}
            />
          </div>
        </div>
      )}

      {selectedCategory === "MyPartnerProfile" && <MyPartnerProfile setSelectedCategory={setSelectedCategory} />}
      {selectedCategory === "AllProfitDecrease" && <AllProfitDecrease setSelectedCategory={setSelectedCategory} />}
      {selectedCategory === "AllPartner" && <AllPartner setSelectedCategory={setSelectedCategory} />}
      {selectedCategory === "AllUser" && <AllUser setSelectedCategory={setSelectedCategory} />}
      {selectedCategory === "RechargeMethods" && <RechargeMethods setSelectedCategory={setSelectedCategory} />}
    </>
  );
};

export default Partner;
