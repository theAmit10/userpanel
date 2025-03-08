import React from "react";
import "./PowerballHome.css";
import SubmitButton from "../atom/SubmitButton";
import TextLabel from "../atom/TextLabel";
import { IoIosAddCircleOutline } from "react-icons/io";
import COLORS from "../../assets/constants/colors";
import { CiCircleMinus } from "react-icons/ci";

const AddTicketCon = () => {
  return (
    <div className="add-ticket-con">
      <div className="atc-first">
        <TextLabel label={"Add Ticket"} />
        <div className="atc-input-con">
          <CiCircleMinus color={COLORS.white_s} size={"3rem"} />
          <input className="ticket-input" />
          <IoIosAddCircleOutline color={COLORS.white_s} size={"3rem"} />
        </div>
      </div>
      <div className="atc-second">
        <label className="atc-second-label">Auto Generate</label>
      </div>
    </div>
  );
};

export default AddTicketCon;
