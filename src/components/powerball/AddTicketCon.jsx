import React, { useEffect, useState } from "react";
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
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(null);

  const handleSubmit = (value) => {
    if (value && parseInt(value) > 0) {
      addMultipleTickets(value);
      setInputValue(""); // Clear input
    }
  };

  // Trigger submission after 1 second of inactivity
  useEffect(() => {
    if (inputValue && parseInt(inputValue) > 0) {
      if (timer) clearTimeout(timer); // Clear previous timer
      const newTimer = setTimeout(() => {
        handleSubmit(inputValue);
      }, 1000); // 1-second delay
      setTimer(newTimer);
    }
    return () => {
      if (timer) clearTimeout(timer); // Cleanup on unmount
    };
  }, [inputValue]);
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
          {/* <input
            className="ticket-input"
            type="number"
            placeholder="Add Ticket"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addMultipleTickets(e.target.value);
                e.target.value = ""; // Clear input after submission
              }
            }}
          /> */}
          <input
            className="ticket-input"
            type="number"
            placeholder="Add Ticket"
            min="1" // Only positive numbers
            step="1" // Only integers
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Prevent form submission (if inside a form)
                handleSubmit(e.target.value);
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
