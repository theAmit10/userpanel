import React, { useState } from "react";
import "./TextCon.css";
import TextLabel from "../atom/TextLabel";
import COLORS from "../../assets/constants/colors";
import { roundToInteger } from "../balancetransfer/Balancetransfer";
import { FaSort } from "react-icons/fa";
import { showWarningToast } from "../helper/showErrorToast";

const AllPartnerComp = ({
  userId,
  name,
  profit,
  recharge,
  totaluser,
  balance,
  backgroundcolor,
  showActive,
  item,
  status,
  clickpress,
  navigate,
  openPartnerDetails,
  openUserDetails,
  userIdClickPress,
  setSortBy,
  setSortOrder,
}) => {
  const handlePress = () => {
    if (clickpress) {
      console.log(item);
      openPartnerDetails(item);
    }
  };

  const handlerUserIdPressed = (e) => {
    console.log("userIdClickPress", userIdClickPress);
    e.stopPropagation(); // Prevent parent click event
    if (userIdClickPress) {
      console.log(item);
      openUserDetails(item);
    }
  };

  const [currentOrder, setCurrentOrder] = useState("asc");
  const handlerPressedProfit = () => {
    showWarningToast("Processing");
    if (currentOrder === "asc") {
      setSortBy("profit");
      setSortOrder("desc");
      setCurrentOrder("desc");
    } else {
      setSortBy("profit");
      setSortOrder("asc");
      setCurrentOrder("asc");
    }
  };

  const handlerPressedRecharge = () => {
    showWarningToast("Processing");
    if (currentOrder === "asc") {
      setSortBy("recharge");
      setSortOrder("desc");
      setCurrentOrder("desc");
    } else {
      setSortBy("recharge");
      setSortOrder("asc");
      setCurrentOrder("asc");
    }
  };

  const handlerPressedUsers = () => {
    showWarningToast("Processing");
    if (currentOrder === "asc") {
      setSortBy("userCount");
      setSortOrder("desc");
      setCurrentOrder("desc");
    } else {
      setSortBy("userCount");
      setSortOrder("asc");
      setCurrentOrder("asc");
    }
  };

  const handlerPressedwalletBalance = () => {
    showWarningToast("Processing");
    if (currentOrder === "asc") {
      setSortBy("walletBalance");
      setSortOrder("desc");
      setCurrentOrder("desc");
    } else {
      setSortBy("walletBalance");
      setSortOrder("asc");
      setCurrentOrder("asc");
    }
  };
  return (
    <div
      className="allpartnerheader-con"
      style={{
        backgroundColor: backgroundcolor,
        cursor: clickpress ? "pointer" : "default",
      }}
    >
      <div className="child-small" onClick={(e) => handlerUserIdPressed(e)}>
        <TextLabel label={userId} />
      </div>
      <div className="child-large">
        <TextLabel label={name} />
      </div>
      <div
        className="child-small"
        style={{
          cursor: "pointer",
        }}
        onClick={handlerPressedProfit}
      >
        <TextLabel label={profit} />
        <FaSort size={"1.5rem"} color={COLORS.white_s} />
      </div>
      {/* <div className="child-small">
        <TextLabel label={recharge} />
      </div> */}
      <div
        className="child-small"
        style={{
          cursor: "pointer",
        }}
        onClick={handlerPressedUsers}
      >
        <TextLabel label={totaluser} />
        <FaSort size={"1.5rem"} color={COLORS.white_s} />
      </div>

      <div
        className="child-large"
        style={{
          cursor: "pointer",
        }}
        onClick={handlerPressedwalletBalance}
      >
        <TextLabel label={balance} />
        <FaSort size={"1.5rem"} color={COLORS.white_s} />
      </div>

      {showActive && (
        <div className="child-small">
          <TextLabel
            label={status}
            style={{
              color:
                status === "Active"
                  ? COLORS.green
                  : status === "Inactive"
                  ? "red"
                  : COLORS.white_s,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AllPartnerComp;
