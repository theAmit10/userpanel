import React from "react";
import "./TextCon.css";
import TextLabel from "../atom/TextLabel";
import COLORS from "../../assets/constants/colors";
import { roundToInteger } from "../balancetransfer/Balancetransfer";

const AllPartnerHeader = ({
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
  return (
    <div
      className="allpartnerheader-con"
      onClick={handlePress}
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
      <div className="child-small">
        <TextLabel label={profit} />
      </div>
      {/* <div className="child-small">
        <TextLabel label={recharge} />
      </div> */}
      <div className="child-small">
        <TextLabel label={totaluser} />
      </div>

      {clickpress ? (
        <div className="child-large">
          <TextLabel label={balance} />
        </div>
      ) : (
        <div className="child-large">
          <TextLabel label={balance} />
        </div>
      )}
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

export default AllPartnerHeader;
