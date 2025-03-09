import React from "react";
import "./PowerballHome.css";
import SubmitButton from "../atom/SubmitButton";
import TextLabel from "../atom/TextLabel";
import { IoIosAddCircleOutline } from "react-icons/io";
import COLORS from "../../assets/constants/colors";
import { CiCircleMinus } from "react-icons/ci";

const AddTicketCon = ({
  generateUniqueRandomNumbers,
  removeTicket,
  tickets,
  addMultipleTickets,
  addTicket,
  calculateTotalCost,
}) => {
  return (
    <div className="add-ticket-con">
      <div className="atc-first">
        <TextLabel label={`Total Cost : ${calculateTotalCost()}`} />
        <div className="atc-input-con">
          <CiCircleMinus
            onClick={removeTicket}
            color={COLORS.white_s}
            size={"3rem"}
          />
          <input
            className="ticket-input"
            type="number"
            placeholder="Add Ticket"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addMultipleTickets(e.target.value);
                e.target.value = ""; // Clear input after submission
              }
            }}
          />
          <IoIosAddCircleOutline
            onClick={addTicket}
            color={COLORS.white_s}
            size={"3rem"}
          />
        </div>
      </div>
      <div className="atc-second">
        <label
          onClick={generateUniqueRandomNumbers}
          className="atc-second-label"
        >
          Auto Generate
        </label>
      </div>
    </div>
  );
};

export default AddTicketCon;
