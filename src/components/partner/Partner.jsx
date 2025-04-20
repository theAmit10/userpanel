import React, { useEffect, useState } from "react";
import "./Partner.css";
import PartnerContentComp from "./PartnerContentComp";
import MyPartnerProfile from "./MyPartnerProfile";
import AllProfitDecrease from "./AllProfitDecrease";
import AllUser from "./AllUser";
import RechargeMethods from "./RechargeMethods";
import AllPartner from "./AllPartner";
import CreateNotification from "./CreateNotification";
import { useDispatch, useSelector } from "react-redux";
import { loadPartnerProfile } from "../../redux/actions/userAction";
import AllRecharge from "./AllRecharge";
import { ToastContainer } from "react-toastify";

const Partner = ({ reloadKey, setReloadKey }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [reloadKey, setReloadKey] = useState(0);

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

  useEffect(() => {
    if (reloadKey > 0) {
      setSelectedCategory("");
    }
  }, [reloadKey]);

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
            {/** ALL RECHARGE */}
            {user && partner && partner.rechargeModule && (
              <PartnerContentComp
                title={"All Recharge"}
                description={"List of Recharge Partner data"}
                iconfrom={"HiMiniWallet"}
                setSelectedCategory={setSelectedCategory}
                componenetname={"AllRecharge"}
              />
            )}

            {/** ALL PARTNER */}
            {user.parentParentPartnerId === 1000 && (
              <PartnerContentComp
                title={"All Partner"}
                description={"List of all Partner data"}
                iconfrom={"TiGroup"}
                setSelectedCategory={setSelectedCategory}
                componenetname={"AllPartner"}
                count={partner?.partnerList?.length}
              />
            )}

            {/** ALL USERS */}
            <PartnerContentComp
              title={"All Users"}
              description={"List of all users"}
              iconfrom={"IoIosPeople"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"AllUser"}
              count={partner?.userList?.length}
            />

            {/** MY PROFILE */}
            <PartnerContentComp
              title={"My Profile"}
              description={"My profile details"}
              iconfrom={"RiAccountCircleFill"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"MyPartnerProfile"}
            />

            {/** RECHARGE METHODS */}
            {user && partner && partner.rechargeModule && (
              <PartnerContentComp
                title={"Recharge Method"}
                description={"Recharge Payment Methods"}
                iconfrom={"BsWalletFill"}
                setSelectedCategory={setSelectedCategory}
                componenetname={"RechargeMethods"}
              />
            )}

            {/** ALL PROFIT DECREASE */}
            {user.parentParentPartnerId === 1000 && (
              <PartnerContentComp
                title={"All Profit Decrease"}
                description={"List of Decrease Request "}
                iconfrom={"BsFillPeopleFill"}
                setSelectedCategory={setSelectedCategory}
                componenetname={"AllProfitDecrease"}
              />
            )}

            {/**  Notify Partner */}
            {user?.parentPartnerId !== 1000 && (
              <PartnerContentComp
                title={"Notify Partner"}
                description={"Send Notification to Top Partner"}
                iconfrom={"BsFillPeopleFill"}
                setSelectedCategory={setSelectedCategory}
                componenetname={"CreateNotificationPartner"}
              />
            )}

            {/** NOTIFY ADMIN */}
            <PartnerContentComp
              title={"Notify Admin"}
              description={"Send Notification to Admin"}
              iconfrom={"BsFillPeopleFill"}
              setSelectedCategory={setSelectedCategory}
              componenetname={"CreateNotificationAdmin"}
            />
          </div>
        </div>
      )}

      {selectedCategory === "MyPartnerProfile" && (
        <MyPartnerProfile
          setSelectedCategory={setSelectedCategory}
          reloadKey={reloadKey}
          setReloadKey={setReloadKey}
        />
      )}
      {selectedCategory === "AllProfitDecrease" && (
        <AllProfitDecrease
          setSelectedCategory={setSelectedCategory}
          reloadKey={reloadKey}
          setReloadKey={setReloadKey}
        />
      )}
      {selectedCategory === "AllPartner" && (
        <AllPartner
          setSelectedCategory={setSelectedCategory}
          reloadKey={reloadKey}
          setReloadKey={setReloadKey}
        />
      )}
      {selectedCategory === "CreateNotificationAdmin" && (
        <CreateNotification
          setSelectedCategory={setSelectedCategory}
          selectedPartner={userdata}
          reloadKey={reloadKey}
          setReloadKey={setReloadKey}
        />
      )}
      {selectedCategory === "CreateNotificationPartner" && (
        <CreateNotification
          setSelectedCategory={setSelectedCategory}
          selectedPartner={partnerData}
          reloadKey={reloadKey}
          setReloadKey={setReloadKey}
        />
      )}
      {selectedCategory === "AllUser" && (
        <AllUser
          setSelectedCategory={setSelectedCategory}
          reloadKey={reloadKey}
          setReloadKey={setReloadKey}
        />
      )}
      {selectedCategory === "AllRecharge" && (
        <AllRecharge
          setSelectedCategory={setSelectedCategory}
          reloadKey={reloadKey}
          setReloadKey={setReloadKey}
        />
      )}
      {selectedCategory === "RechargeMethods" && (
        <RechargeMethods
          setSelectedCategory={setSelectedCategory}
          reloadKey={reloadKey}
          setReloadKey={setReloadKey}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default Partner;
