import React, { useState } from "react";
import "./PowerballHome.css";
import HeaderComp from "../helpercomp/HeaderComp";
import SubmitButton from "../atom/SubmitButton";
import TextCon from "../molecule/TextCon";
import TextLabel from "../atom/TextLabel";
import { IoIosAddCircleOutline } from "react-icons/io";
import COLORS from "../../assets/constants/colors";
import { CiCircleMinus } from "react-icons/ci";
import AddTicketCon from "./AddTicketCon";
import BluePowerBall from "../molecule/BluePowerBall";
import SmallBall from "../molecule/SmallBall";
import GreenBall from "../molecule/GreenBall";
import YellowBall from "../molecule/YellowBall";

const PowerballGame = ({ setSelectedCategory }) => {
  const [showAddTicket, setShowAddTicket] = useState(true);
  const [showMyTicket, setShowMyTicket] = useState(false);

  const showMyTicketHandler = () => {
    setShowAddTicket(false);
    setShowMyTicket(true);
  };

  const backHandlerShowMyTicket = () => {
    setShowAddTicket(true);
    setShowMyTicket(false);
  };

  return (
    <div className="powerball-main-container">
      {/** HEADER  */}
      <HeaderComp
        title={"Powerball"}
        setSelectedCategory={setSelectedCategory}
        selectedCategory="PowerTime"
      />

      {showAddTicket && (
        <>
          <AddTicketCon />
          <div className="powergame-container">
            <div className="ticket-main-con">
              <div className="tmc-first">
                <label className="regular">Buy Multiplier</label>
                <div className="multiplier-main-con">
                  <YellowBall number={"3X"} />
                  <YellowBall number={"3X"} />
                  <YellowBall number={"3X"} />
                  <YellowBall number={"3X"} />
                  <YellowBall number={"3X"} />
                </div>
                <label className="regular">Ticket 1</label>
                <div className="multiplier-main-con">
                  <GreenBall number={"3X"} />
                  <GreenBall number={"3X"} />
                  <GreenBall number={"3X"} />
                  <GreenBall number={"3X"} />
                  <GreenBall number={"3X"} />
                  <GreenBall number={"3X"} />
                </div>
              </div>
              <div className="tmc-second">
                <label className="regular">Choose 6 Unique Numbers</label>
                <div className="game-ball-con">
                  <SmallBall number={1} />
                </div>
              </div>
            </div>
          </div>

          <SubmitButton label={"Next"} onClickHandler={showMyTicketHandler} />
        </>
      )}

      {showMyTicket && (
        <>
          <div className="total-ticket-amount-con">
            <div className="tta-first">
              <TextLabel label={"Total Number of Ticket Amount"} />
              <TextLabel label={"Total Amount"} />
            </div>

            <div className="total-ticket-amount">
              <TextLabel label={"2"} />
              <TextLabel label={"2000"} />
            </div>
          </div>

          <div className="myticket-dashboard">
            {/** TITLING */}
            <div className="mtd-title-con">
              <div className="sn-con">
                <TextLabel label={"S No."} />
              </div>
              <div className="snt-con">
                <TextLabel label={"Tickets"} />
              </div>
              <div className="snm-con">
                <TextLabel label={"Multiplier"} />
              </div>
              <div className="sna-con">
                <TextLabel label={"Amount"} />
              </div>
            </div>
            {/** CONTENT */}
            <div className="mtd-title-con">
              <div className="sn-con">
                <TextLabel label={"1"} />
              </div>
              <div className="snt-con">
                <GreenBall number={"20"} />
                <GreenBall number={"10"} />
                <GreenBall number={"24"} />
                <GreenBall number={"30"} />
                <GreenBall number={"50"} />
                <GreenBall number={"60"} />
              </div>
              <div className="snm-con">
                <YellowBall number={"2X"} />
              </div>
              <div className="sna-con">
                <TextLabel label={"1000"} />
              </div>
            </div>
          </div>
          <SubmitButton label={"Submit"} />
        </>
      )}
    </div>
  );
};

export default PowerballGame;
