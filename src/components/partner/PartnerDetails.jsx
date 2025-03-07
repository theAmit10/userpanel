import React, { useState } from "react";
import "./Partner.css";
import PartnerContentComp from "./PartnerContentComp";
import MyPartnerProfile from "./MyPartnerProfile";
import AllProfitDecrease from "./AllProfitDecrease";
import AllUser from "./AllUser";
import RechargeMethods from "./RechargeMethods";
import AllPartner from "./AllPartner";
import HeaderComp from "../helpercomp/HeaderComp";
import PartnerProfileBasic from "./PartnerProfileBasic";
import CreateNotification from "./CreateNotification";
import IncreasePercetage from "./IncreasePercetage";
import DecreasePercentage from "./DecreasePercentage";
import UserPlayHistory from "./UserPlayHistory";
import UserTransactionHistory from "./UserTransactionHistory";

const PartnerDetails = ({ closePartnerDetails, selectedPartner }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      {selectedCategory === "" && (
        <div className="partner-main-container">
          {/** HEADER  */}
          <HeaderComp
            title={"Partner Details"}
            closePartnerDetails={closePartnerDetails}
            left={selectedPartner?.userId}
            right={selectedPartner?.name}
          />
          {/* CONTENT CONTAINER */}
          <div className="partner-container">
            {/** MY PROFILE */}

            <PartnerContentComp
              title={"Partner Profile"}
              description={"Basic Partner Details"}
              iconfrom={"RiAccountCircleFill"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"PartnerProfileBasic"}
            />
            {/** PLAY HISTORY */}
            {selectedPartner?.playHistoryPermission && (
              <PartnerContentComp
                title={"Play History"}
                description={"User’s Play History Details"}
                iconfrom={"RiAccountCircleFill"}
                setSelectedCategory={setSelectedCategory}
                componenetname={"UserPlayHistory"}
              />
            )}

            {/** TRANSACTION HISTORY */}
            {selectedPartner?.transactionHistoryPermission && (
              <PartnerContentComp
                title={"Transaction History"}
                description={"User’s Transaction details"}
                iconfrom={"TiGroup"}
                setSelectedCategory={setSelectedCategory}
                componenetname={"UserTransactionHistory"}
              />
            )}

            {/** SEND NOTIFICATION */}
            <PartnerContentComp
              title={"Send Notification"}
              description={"Send Notification for User’s"}
              iconfrom={"BsFillPeopleFill"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"CreateNotification"}
            />
            {/** INCREASE PERCENTAGE */}
            <PartnerContentComp
              title={"Increase Percentage"}
              description={"Update Partner Percentage"}
              iconfrom={"IoIosPeople"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"IncreasePercetage"}
            />
            {/** DECREASE PERCERTAGE */}
            <PartnerContentComp
              title={"Decrease Percentage"}
              description={"Update Partner Percentage"}
              iconfrom={"HiMiniWallet"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"DecreasePercentage"}
            />
          </div>
        </div>
      )}

      {selectedCategory === "PartnerProfileBasic" && (
        <PartnerProfileBasic
          setSelectedCategory={setSelectedCategory}
          selectedPartner={selectedPartner}
        />
      )}
      {selectedCategory === "CreateNotification" && (
        <CreateNotification
          setSelectedCategory={setSelectedCategory}
          selectedPartner={selectedPartner}
        />
      )}
      {selectedCategory === "IncreasePercetage" && (
        <IncreasePercetage
          setSelectedCategory={setSelectedCategory}
          selectedPartner={selectedPartner}
        />
      )}
      {selectedCategory === "DecreasePercentage" && (
        <DecreasePercentage
          setSelectedCategory={setSelectedCategory}
          selectedPartner={selectedPartner}
        />
      )}
      {selectedCategory === "RechargeMethods" && (
        <RechargeMethods
          setSelectedCategory={setSelectedCategory}
          selectedPartner={selectedPartner}
        />
      )}
      {selectedCategory === "UserPlayHistory" && (
        <UserPlayHistory
          setSelectedCategory={setSelectedCategory}
          selectedPartner={selectedPartner}
        />
      )}
      {selectedCategory === "UserTransactionHistory" && (
        <UserTransactionHistory
          setSelectedCategory={setSelectedCategory}
          selectedPartner={selectedPartner}
        />
      )}
    </>
  );
};

export default PartnerDetails;
