import React from "react";
import HeaderComp from "../helpercomp/HeaderComp";

const MyPartnerProfile = ({ setSelectedCategory }) => {
  return (
    <div className="partner-main-container">
      <HeaderComp title={"Profile"} setSelectedCategory={setSelectedCategory} />
    </div>
  );
};

export default MyPartnerProfile;
