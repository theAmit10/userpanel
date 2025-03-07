import React from "react";
import "./TextCon.css";
import TextLabel from "../atom/TextLabel";

const AllPofitDecreseComp = ({
  userId,
  name,
  reason,
  reasonValue,
  totaluser,
  balance,
  backgroundcolor,
  showActive,
  item,
  status,
  clickpress,
  navigate,
  openPartnerDetails,
  toggleItem,
  expandedItems,
  setExpandedItems,
  index,
}) => {
  const handlePress = () => {
    if (clickpress) {
      toggleItem(item._id); // Pass only the item's _id, not the whole object
    }
  };
  return (
    <div className="allprofitdecrease-con">
      <div
        className="allpartnerheader-con"
        onClick={handlePress}
        style={{
          backgroundColor: backgroundcolor,
          cursor: clickpress ? "pointer" : "default",
        }}
      >
        <div className="child-small">
          <TextLabel label={userId} />
        </div>
        <div className="child-large">
          <TextLabel label={name} />
        </div>
        <div className="child-small">
          <TextLabel label={status} />
        </div>
      </div>

      {clickpress && expandedItems[item._id] && (
        <div
          className="allprofitdecresefooter-con"
          onClick={handlePress}
          style={{
            cursor: clickpress ? "pointer" : "default",
          }}
        >
          <TextLabel label={reason} />
          <div className="allprofitdecrese-reason-con">
            <TextLabel label={reasonValue} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPofitDecreseComp;
