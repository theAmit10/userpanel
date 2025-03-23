import React, { useEffect, useState } from "react";
import "./PowerballHome.css";
import { GiDiamondTrophy } from "react-icons/gi";
import COLORS from "../../assets/constants/colors";
import images from "../../assets/constants/images";
import BluePowerBall from "../molecule/BluePowerBall";
import { useSelector } from "react-redux";
import {
  useGetPowerballQuery,
  useLatestPowerballResultQuery,
} from "../../redux/api";
import Loader from "../molecule/Loader";
import { getTimeAccordingToTimezone } from "../alllocation/AllLocation";
import { getDateTimeAccordingToUserTimezone } from "../play/Play";
import SmallBall from "../molecule/SmallBall";

const PowerballHome = ({ setSelectedCategory }) => {
  const { user, accesstoken } = useSelector((state) => state.user);

  const [powerball, setPowerball] = useState(null);
  // Network call
  const { data, error, isLoading } = useGetPowerballQuery({ accesstoken });

  useEffect(() => {
    if (!isLoading && data) {
      setPowerball(data.games[0]);
      console.log(data?.games[0]);
    }

    if (error) {
      console.error("Error fetching powerball data:", error);
    }
  }, [data, isLoading, error]); // Correct dependencies

  const {
    isLoading: latestResultIsLoading,
    data: latestResultData,
    refetch: latesetResultRefetch,
  } = useLatestPowerballResultQuery({ accesstoken });

  return (
    <div className="partner-main-container">
      {/** HEADER  */}
      <div className="partner-header">
        <label className="partner-header-label">
          {powerball ? powerball?.name : ""} Dashboard
        </label>
      </div>
      {/* CONTENT CONTAINER */}
      {isLoading || latestResultIsLoading ? (
        <Loader />
      ) : (
        <div className="partner-container">
          {/** BUY TICKETS */}
          <div className="buy-ticket-con">
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
                <label className="bctt-prize">
                  {latestResultData?.data?.prize?.firstprize?.amount}
                </label>
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
            <div className="btc-first">
              <div className="btcf-first">
                <label className="btcf-first-label-bold">LOTTERY JACKPOT</label>
                <label className="btcf-first-label-regular">
                  PLAY FOR JUST {user?.country?.ticketprice}{" "}
                  {user?.country?.countrycurrencysymbol}
                </label>
              </div>
              <div
                className="btcf-second"
                onClick={() => setSelectedCategory("PowerTime")}
              >
                <label className="btcf-first-botton">BUY TICKETS</label>
                <GiDiamondTrophy color={COLORS.white_s} size={"3rem"} />
              </div>
            </div>
          </div>
          {/** JACKPOT WINNERS */}
          <div className="jackpot-winner-con">
            <div className="jw-first">
              <label className="btcf-first-label-bold">
                {getTimeAccordingToTimezone(
                  latestResultData?.data?.powertime?.powertime,
                  user?.country?.timezone
                )}
              </label>
              <label className="btcf-first-label-regular">
                {getDateTimeAccordingToUserTimezone(
                  latestResultData?.data?.powertime?.powertime,
                  latestResultData?.data?.powerdate?.powerdate,
                  user?.country?.timezone
                )}
              </label>
            </div>
            <div className="jw-second">
              <div className="jws-first">
                {latestResultData?.data?.jackpotnumber?.map((item, index) => (
                  <BluePowerBall number={item} />
                ))}
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
            <div className="pdc-fourth">
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
            </div>

            <div className="pdc-second">
              <label className="btcf-first-label-bold">
                {latestResultData?.data?.prize?.firstprize?.totaluser}
              </label>
              <label
                className="btcf-first-label-bold"
                style={{
                  color: COLORS.yellow,
                  fontSize: "1.5rem",
                  textAlign: "bottom",
                }}
              >
                Winner
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
                  {latestResultData?.data?.prize?.firstprize?.amount}
                </label>
              </div>
            </div>
          </div>

          <div className="prize-distribution-con">
            <div className="pdc-first">
              <label
                className="btcf-first-label-bold"
                style={{ color: COLORS.yellow }}
              >
                2nd Prize
              </label>
              <label className="btcf-first-label-regular">
                Match all 5 balls to win the 2nd Prize
              </label>
            </div>
            <div className="pdc-fourth">
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u274C"} />
            </div>
            <div className="pdc-second">
              <label className="btcf-first-label-bold">
                {latestResultData?.data?.prize?.secondprize?.totaluser}
              </label>
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
                  {latestResultData?.data?.prize?.secondprize?.amount}
                </label>
              </div>
            </div>
          </div>

          <div className="prize-distribution-con">
            <div className="pdc-first">
              <label
                className="btcf-first-label-bold"
                style={{ color: COLORS.yellow }}
              >
                3rd Prize
              </label>
              <label className="btcf-first-label-regular">
                Match all 4 balls to win the 3rd Prize
              </label>
            </div>
            <div className="pdc-fourth">
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />

              <SmallBall number={"\u274C"} />
              <SmallBall number={"\u274C"} />
            </div>
            <div className="pdc-second">
              <label className="btcf-first-label-bold">
                {latestResultData?.data?.prize?.thirdprize?.totaluser}
              </label>
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
                  {latestResultData?.data?.prize?.thirdprize?.amount}
                </label>
              </div>
            </div>
          </div>

          <div className="prize-distribution-con">
            <div className="pdc-first">
              <label
                className="btcf-first-label-bold"
                style={{ color: COLORS.yellow }}
              >
                4th Prize
              </label>
              <label className="btcf-first-label-regular">
                Match all 3 balls to win the 4th Prize
              </label>
            </div>
            <div className="pdc-fourth">
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />

              <SmallBall number={"\u274C"} />
              <SmallBall number={"\u274C"} />
              <SmallBall number={"\u274C"} />
            </div>
            <div className="pdc-second">
              <label className="btcf-first-label-bold">
                {latestResultData?.data?.prize?.fourthprize?.totaluser}
              </label>
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
                  {latestResultData?.data?.prize?.fourthprize?.totaluser}
                </label>
              </div>
            </div>
          </div>

          <div className="prize-distribution-con">
            <div className="pdc-first">
              <label
                className="btcf-first-label-bold"
                style={{ color: COLORS.yellow }}
              >
                5th Prize
              </label>
              <label className="btcf-first-label-regular">
                Match all 2 balls to win the 5th Prize
              </label>
            </div>
            <div className="pdc-fourth">
              <SmallBall number={"\u2714"} />
              <SmallBall number={"\u2714"} />

              <SmallBall number={"\u274C"} />
              <SmallBall number={"\u274C"} />
              <SmallBall number={"\u274C"} />
              <SmallBall number={"\u274C"} />
            </div>
            <div className="pdc-second">
              <label className="btcf-first-label-bold">
                {latestResultData?.data?.prize?.fifthprize?.totaluser}
              </label>
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
                  {latestResultData?.data?.prize?.fifthprize?.amount + " X"}
                </label>
              </div>
            </div>
          </div>

          <div className="prize-distribution-con">
            <div className="pdc-first">
              <label
                className="btcf-first-label-bold"
                style={{ color: COLORS.yellow }}
              >
                6th Prize
              </label>
              <label className="btcf-first-label-regular">
                Match all 1 ball to win the 6th Prize
              </label>
            </div>
            <div className="pdc-fourth">
              <SmallBall number={"\u2714"} />

              <SmallBall number={"\u274C"} />
              <SmallBall number={"\u274C"} />
              <SmallBall number={"\u274C"} />
              <SmallBall number={"\u274C"} />
              <SmallBall number={"\u274C"} />
            </div>
            <div className="pdc-second">
              <label className="btcf-first-label-bold">
                {latestResultData?.data?.prize?.sixthprize?.totaluser}
              </label>
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
                  {latestResultData?.data?.prize?.sixthprize?.amount + " X"}
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PowerballHome;
