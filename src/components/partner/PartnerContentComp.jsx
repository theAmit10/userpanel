import React from "react";
import "./Partner.css";
import { CiEdit } from "react-icons/ci";
import { TiGroup } from "react-icons/ti";
import COLORS from "../../assets/constants/colors";
import { RiAccountCircleFill } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { HiMiniWallet } from "react-icons/hi2";
import { BsWalletFill } from "react-icons/bs";

const PartnerContentComp = ({
  title,
  description,
  iconfrom,
  setSelectedCategory,
  componenetname,
}) => {
  return (
    <div
      className="partner-content-container"
      onClick={() => setSelectedCategory(componenetname)}
    >
      <div className="pcc-top">
        <div className="pcc-top-right">
          <label className="label-mbold">{title}</label>
        </div>
        <div className="pcc-top-left">
          <div className="icon-container">
            {iconfrom === "TiGroup" && (
              <TiGroup color={COLORS.background} size={"2.5rem"} />
            )}
            {iconfrom === "RiAccountCircleFill" && (
              <RiAccountCircleFill color={COLORS.background} size={"2.5rem"} />
            )}
            {iconfrom === "BsFillPeopleFill" && (
              <BsFillPeopleFill color={COLORS.background} size={"2.5rem"} />
            )}
            {iconfrom === "IoIosPeople" && (
              <IoIosPeople color={COLORS.background} size={"2.5rem"} />
            )}
            {iconfrom === "HiMiniWallet" && (
              <HiMiniWallet color={COLORS.background} size={"2.5rem"} />
            )}
            {iconfrom === "BsWalletFill" && (
              <BsWalletFill color={COLORS.background} size={"2.5rem"} />
            )}
          </div>
        </div>
      </div>
      <div className="pcc-bottom">
        <label className="label-regular">List of all Partner data</label>
      </div>
    </div>
  );
};

export default PartnerContentComp;
