import React from "react";
import "./TextCon.css";
import TextLabel from "../atom/TextLabel";

const AllPartnerHeader = ({
  userId,
  name,
  profit,
  recharge,
  totaluser,
  balance,
  backgroundcolor,
}) => {
  return (
    <div
      className="allpartnerheader-con"
      style={{
        backgroundColor: backgroundcolor,
      }}
    >
      <div className="child-small">
        <TextLabel label={userId} />
      </div>
      <div className="child-large">
        <TextLabel label={name} />
      </div>
      <div className="child-small">
        <TextLabel label={profit} />
      </div>
      <div className="child-small">
        <TextLabel label={recharge} />
      </div>
      <div className="child-small">
        <TextLabel label={totaluser} />
      </div>
      <div className="child-large">
        <TextLabel label={balance} />
      </div>
    </div>
  );
};

export default AllPartnerHeader;
