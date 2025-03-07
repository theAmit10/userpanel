import React from "react";
import "./PowerballHome.css";
import { GiDiamondTrophy } from "react-icons/gi";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import BluePowerBall from "../molecule/BluePowerBall";

const PowerballHome = ({ setSelectedCategory }) => {
  return (
    <div className="partner-main-container">
      {/** HEADER  */}
      <div className="partner-header">
        <label className="partner-header-label">Powerball Dashboard</label>
      </div>
      {/* CONTENT CONTAINER */}
      <div className="partner-container">
        {/** BUY TICKETS */}
        <div className="buy-ticket-con">
          <div className="btc-first">
            <div className="btcf-first">
              <label className="btcf-first-label-bold">LOTTERY JACKPOT</label>
              <label className="btcf-first-label-regular">
                PLAY FOR JUST 100 INR
              </label>
            </div>
            <div className="btcf-second">
              <label className="btcf-first-botton">BUY TICKETS</label>
              <GiDiamondTrophy color={COLORS.white_s} size={"3rem"} />
            </div>
          </div>
          <div className="btc-second">
            <div className="btc-cat-con">
              <img
                src={images.cat}
                alt="cat"
                color={COLORS.background}
                size={"2.5rem"}
              />
            </div>
          </div>
          <div className="btc-third">
            <div className="btct-first">
              <div className="btc-cat-con">
                <img
                  src={images.cups}
                  alt="cat"
                  color={COLORS.background}
                  size={"2.5rem"}
                />
              </div>
            </div>
            <div className="btct-second">
              <label className="winning-label">WIN MEGA JACKPOT</label>
              <label className="bctt-prize">100000 INR</label>
            </div>
          </div>
        </div>
        {/** JACKPOT WINNERS */}
        <div className="jackpot-winner-con">
          <div className="jw-first">
            <label className="btcf-first-label-bold">09:00 PM</label>
            <label className="btcf-first-label-regular">10-12-2023</label>
          </div>
          <div className="jw-second">
            <div className="jws-first">
              <BluePowerBall number={11} />
              <BluePowerBall number={22} />
              <BluePowerBall number={56} />
              <BluePowerBall number={14} />
              <BluePowerBall number={19} />
              <BluePowerBall number={49} />
            </div>
            <label
              className="btcf-first-label-bold"
              style={{ color: COLORS.yellow, padding: "0.5rem" }}
            >
              LOTTERY JACKPOT
            </label>
          </div>
          <div className="jw-third">
            <div className="btc-cat-con">
              <img
                src={images.cups}
                alt="cat"
                color={COLORS.background}
                size={"2.5rem"}
              />
            </div>
          </div>
        </div>
        {/** PRIZE DISTRIBUTION */}
        <div className="prize-distribution-con">
          <div className="pdc-first">
            <label
              className="btcf-first-label-bold"
              style={{ color: COLORS.yellow }}
            >
              1st Prize
            </label>
            <label className="btcf-first-label-regular">
              Match all 6 balls to win the 1st Prize (Jackpot)
            </label>
          </div>
          <div className="pdc-second">
            <label className="btcf-first-label-bold">1</label>
            <label
              className="btcf-first-label-bold"
              style={{
                color: COLORS.yellow,
                fontSize: "1.5rem",
                textAlign: "bottom",
              }}
            >
              Winners
            </label>
          </div>
          <div className="pdc-third">
            <div className="pdct-lcon">
              <div className="btc-cat-con">
                <img
                  src={images.cups}
                  alt="cat"
                  color={COLORS.background}
                  size={"2.5rem"}
                />
              </div>
              <label
                className="btcf-first-label-bold"
                style={{ color: COLORS.yellow }}
              >
                1000000000
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerballHome;
