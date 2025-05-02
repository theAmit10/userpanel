import React, { useEffect, useState } from "react";
import "./PowerballHome.css";
import HeaderComp from "../helpercomp/HeaderComp";
import SubmitButton from "../atom/SubmitButton";
import TextLabel from "../atom/TextLabel";
import COLORS from "../../assets/constants/colors";
import AddTicketCon from "./AddTicketCon";
import SmallBall from "../molecule/SmallBall";
import GreenBall from "../molecule/GreenBall";
import YellowBall from "../molecule/YellowBall";
import moment from "moment-timezone";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreatePowerballBetMutation,
  useGetPowerballQuery,
  useGetPowerDatesByTimeQuery,
} from "../../redux/api";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../helper/showErrorToast";
import Loader from "../molecule/Loader";
import { getDateTimeAccordingToUserTimezone } from "../play/Play";
import {
  addMultipleTicketsR,
  addTicketR,
  removeTicketR,
  handleNumberSelectR,
  handleMultiplierSelectR,
  generateUniqueRandomNumbersR,
  resetTickets,
  setYellowBall,
  setYellowBallClick,
} from "../../redux/ticketSlice";
import { ToastContainer } from "react-toastify";
import { loadProfile } from "../../redux/actions/userAction";
import SmallSmallBall from "../molecule/SmallSmallBall";
import { getTimeAccordingToTimezone } from "../alllocation/AllLocation";
// import {
//   addMultipleTicketsRedux,
//   removeTicketRedux,
// } from "../../redux/ticketSlice";

const PowerballGame = ({
  setSelectedCategory,
  selectedTime,
  reloadKey,
  setReloadKey,
}) => {
  const [showAddTicket, setShowAddTicket] = useState(true);
  const [showMyTicket, setShowMyTicket] = useState(false);

  const dispatch = useDispatch();

  const showMyTicketHandler = () => {
    setShowAddTicket(false);
    setShowMyTicket(true);
  };

  const backHandlerShowMyTicket = () => {
    setShowAddTicket(true);
    setShowMyTicket(false);
  };

  const { accesstoken, user } = useSelector((state) => state.user);
  const [todayPowerDate, setTodayPowerDate] = useState(null);
  const MAX_NUMBERS = 6; // Numbers per ticket
  const [TOTAL_BALLS, setTOTAL_BALLS] = useState(null);
  const [MULTIPLIERS, setMULTIPLIERS] = useState([]);
  const [TICKET_COST, setTICKET_COST] = useState(null);
  const [MULTIPLIER_COSTS, setMULTIPLIER_COSTS] = useState({});
  const [powerball, setPowerball] = useState(null);
  // Network call
  const { data: powerballData, isLoading: powerballIsLoading } =
    useGetPowerballQuery({ accesstoken });

  useEffect(() => {
    if (!powerballIsLoading && powerballData) {
      setPowerball(powerballData.games[0]);
      setTOTAL_BALLS(powerballData.games[0].range.endRange);
      setTICKET_COST(user?.country?.ticketprice);

      const multiplierArray = generateMultiplierObject(
        user?.country?.multiplierprice,
        powerballData?.games[0].multiplier
      );

      setMULTIPLIER_COSTS(multiplierArray);
      setMULTIPLIERS(getMultiplierValues(powerballData?.games[0].multiplier));
    }
  }, [powerballData, powerballIsLoading]);

  // [FOR GETTING POWERBALL GAME DATES]
  const { data: powerballDates, isLoading: powerballDatesIsLoading } =
    useGetPowerDatesByTimeQuery({
      accesstoken,
      id: selectedTime?._id,
      page: 1,
      limit: 10,
    });

  // [FOR GETTING TODAY POWERBALL DATE]
  useEffect(() => {
    if (!powerballDatesIsLoading && powerballDates) {
      const currentDate = getCurrentDateInTimezone(user?.country?.timezone);
      const matchingDate = getMatchingPowerDate(
        currentDate,
        powerballDates.powerDates
      );
      setTodayPowerDate(matchingDate);
      console.log(matchingDate);
    }
  }, [powerballDatesIsLoading, powerballDates]);

  useEffect(() => {
    if (reloadKey !== 0) {
      setReloadKey(0);
      setSelectedCategory("");
    }
  }, [reloadKey]);

  const [ticketValue, setTicketValue] = useState(1);
  // [FOR POWEBALL BET]

  const [createPowerballBet, { isLoading: createPowerballBetIsLoading }] =
    useCreatePowerballBetMutation();

  const processTicketData = (ticketArray, TICKET_COST) => {
    if (!Array.isArray(ticketArray) || typeof TICKET_COST !== "number") {
      console.error("Invalid input. Expected an array and a number.");
      return [];
    }

    return ticketArray.map(({ multiplier, selectedNumbers }) => {
      // Handle cases where multiplier is "NA" or null
      const multiplierValue =
        multiplier && multiplier !== "NA"
          ? parseInt(multiplier.replace("X", ""), 10)
          : 1;

      return {
        amount:
          multiplierValue === 1 ? TICKET_COST : TICKET_COST + multiplierValue, // Multiply cost with multiplier
        convertedAmount:
          (TICKET_COST + multiplierValue) *
          user?.country?.countrycurrencyvaluecomparedtoinr, // Generate a random converted amount
        multiplier: multiplierValue, // Store multiplier as a number
        usernumber: selectedNumbers, // Keep the selected numbers
      };
    });
  };

  // Function to increment the ticket value
  const increment = () => {
    setTicketValue(ticketValue + 1);
  };

  // Function to decrement the ticket value
  const decrement = () => {
    if (ticketValue > 1) {
      setTicketValue(ticketValue - 1); // Prevent going below 1
    }
  };
  const createArray = (number) => {
    return Array.from({ length: number }, (_, index) => index + 1);
  };

  const { tickets, activeTicketIndex, activeBallIndex } = useSelector(
    (state) => state.tickets
  );

  // Example usage:
  const ballnumbers = createArray(70);

  // const [tickets, setTickets] = useState([
  //   { selectedNumbers: Array(MAX_NUMBERS).fill(null), multiplier: null },
  // ]);
  // const [activeTicketIndex, setActiveTicketIndex] = useState(0);
  // const [activeBallIndex, setActiveBallIndex] = useState(0);
  const [showMultipliers, setShowMultipliers] = useState(false);
  const [showAllSeclectedBalls, setShowAllSeclectedBalls] = useState(false);

  const ballNumbers = Array.from({ length: TOTAL_BALLS }, (_, i) => i + 1);

  const addTicket = () => {
    dispatch(addTicketR());
    // setTickets([
    //   ...tickets,
    //   { selectedNumbers: Array(MAX_NUMBERS).fill(null), multiplier: null },
    // ]);
    // setActiveTicketIndex(tickets.length);
    // setActiveBallIndex(0);
  };

  const addMultipleTickets = (value) => {
    dispatch(addMultipleTicketsR(value));
    // const numTickets = parseInt(value, 10);
    // if (!isNaN(numTickets) && numTickets > 0) {
    //   const newTickets = Array.from({ length: numTickets }, () => ({
    //     selectedNumbers: Array(MAX_NUMBERS).fill(null),
    //     multiplier: null,
    //   }));
    //   setTickets([...tickets, ...newTickets]);
    // }
  };

  const removeTicket = () => {
    dispatch(removeTicketR());
    // if (tickets.length > 1) {
    //   setTickets(tickets.slice(0, -1));
    //   if (activeTicketIndex >= tickets.length - 1) {
    //     setActiveTicketIndex(tickets.length - 2);
    //   }
    // }
  };

  const handleNumberSelect = (number) => {
    dispatch(handleNumberSelectR({ number }));
    // const currentTicket = tickets[activeTicketIndex];
    // const updatedNumbers = [...currentTicket.selectedNumbers];

    // if (updatedNumbers.includes(number)) {
    //   const indexToRemove = updatedNumbers.indexOf(number);
    //   updatedNumbers[indexToRemove] = null;
    // } else {
    //   updatedNumbers[activeBallIndex] = number;
    // }

    // const updatedTickets = [...tickets];
    // updatedTickets[activeTicketIndex] = {
    //   ...currentTicket,
    //   selectedNumbers: updatedNumbers,
    // };
    // setTickets(updatedTickets);

    // const nextEmptyIndex = updatedNumbers.indexOf(null);
    // if (nextEmptyIndex !== -1) {
    //   setActiveBallIndex(nextEmptyIndex);
    // }
  };

  const handleMultiplierSelect = (multiplier) => {
    dispatch(handleMultiplierSelectR(multiplier));
    // const updatedTickets = [...tickets];
    // updatedTickets[activeTicketIndex].multiplier = multiplier;
    // setTickets(updatedTickets);
    // setShowMultipliers(false); // Hide the multiplier selection after a choice is made
  };

  const isSubmitEnabled = tickets.every((ticket) =>
    ticket.selectedNumbers.every((num) => num !== null)
  );

  const generateUniqueRandomNumbers = () => {
    dispatch(generateUniqueRandomNumbersR());
    // let usedNumbers = [];

    // // Reset selected numbers to null first before generating new ones
    // const newTickets = tickets.map((ticket) => {
    //   let ticketNumbers = Array(MAX_NUMBERS).fill(null); // Reset all numbers

    //   // Find empty slots in the current ticket (all should be empty now)
    //   const emptyIndexes = ticketNumbers
    //     .map((num, index) => (num === null ? index : -1))
    //     .filter((index) => index !== -1);

    //   emptyIndexes.forEach((index) => {
    //     let randomNum;
    //     do {
    //       // Generate a random number
    //       randomNum =
    //         ballNumbers[Math.floor(Math.random() * ballNumbers.length)];

    //       // Ensure that the number is unique across all tickets
    //     } while (
    //       usedNumbers.includes(randomNum) ||
    //       ticketNumbers.includes(randomNum)
    //     );

    //     ticketNumbers[index] = randomNum;
    //     usedNumbers.push(randomNum); // Mark this number as used
    //   });

    //   return { ...ticket, selectedNumbers: ticketNumbers };
    // });

    // setTickets(newTickets);
  };

  // Function to calculate total cost of all tickets
  const calculateTotalCost = () => {
    return tickets.reduce((total, ticket) => {
      const multiplierCost = ticket.multiplier
        ? MULTIPLIER_COSTS[ticket.multiplier]
        : 0;
      return total + TICKET_COST + multiplierCost;
    }, 0);
  };

  // Function to calculate the price of each individual ticket
  const calculateTicketPrice = (ticket) => {
    const multiplierCost = ticket.multiplier
      ? MULTIPLIER_COSTS[ticket.multiplier]
      : 0;
    return TICKET_COST + multiplierCost;
  };
  const sebmittingNext = async () => {
    console.log("submitting to next stage to confirm ticket");
    console.log("submited ticket :: ", JSON.stringify(tickets));
    setShowAllSeclectedBalls(true);
  };

  const [submitLoader, setSubmitLoader] = useState(false);

  const submitHandler = async () => {
    console.log("submitting to next stage to confirm ticket");
    console.log("submited ticket :: ", tickets);

    const now = moment.tz(user?.country?.timezone);
    console.log("Current Time: ", now.format("hh:mm A"));
    console.log("Current Date: ", now.format("DD-MM-YYYY"));

    const lotTimeMoment = moment.tz(
      getTimeAccordingToTimezone(
        selectedTime?.powertime,
        user?.country?.timezone
      ),
      "hh:mm A",
      user?.country?.timezone
    );
    console.log(`Lot Time for location : ${lotTimeMoment.format("hh:mm A")}`);

    // Subtract 15 minutes from the lotTimeMoment
    const lotTimeMinus15Minutes = lotTimeMoment.clone().subtract(30, "minutes");

    const isLotTimeClose =
      now.isSameOrAfter(lotTimeMinus15Minutes) && now.isBefore(lotTimeMoment);
    console.log(`Is it within 15 minutes of the lot time? ${isLotTimeClose}`);

    if (isLotTimeClose) {
      console.log("Navigating to PlayArena...");
      showWarningToast("Entry is close for this session");
      showWarningToast("Please choose next available time");
      return;
    }

    setTicketValue(1);

    try {
      if (!canPlaceBet(user.walletTwo.balance, calculateTotalCost())) {
        console.log("sorrry insufficent balance");
        showErrorToast("Insufficent Balance");
        return;
      }
      console.log("submitting to next stage to confirm ticket");
      console.log("Tickets cost :: " + TICKET_COST);
      console.log("Tickets :: " + JSON.stringify(tickets));
      const myticket = processTicketData(tickets, TICKET_COST);
      console.log("Mine ticket");
      console.log(JSON.stringify(myticket));
      const body = {
        powertime: selectedTime._id,
        powerdate: todayPowerDate._id,
        gameType: "powerball",
        tickets: myticket,
      };

      console.log("Request body :: " + JSON.stringify(body));

      const res = await createPowerballBet({
        accesstoken,
        body,
      }).unwrap();

      console.log(JSON.stringify(res));

      showSuccessToast(res.message);
      dispatch(resetTickets());
      // setActiveBallIndex(0);
      // setActiveTicketIndex(0);
      // setTickets([
      //   { selectedNumbers: Array(MAX_NUMBERS).fill(null), multiplier: null },
      // ]);
      dispatch(loadProfile(accesstoken));
      setSubmitLoader(false);
      setShowAllSeclectedBalls(false);
    } catch (e) {
      console.log(e);
      showErrorToast("Something went wrong");
    }
  };

  const navigationHandlerPowerball = () => {
    if (showAllSeclectedBalls) {
      setShowAllSeclectedBalls(false);
    }
  };

  const handleYellowBallClick = (ticketIndex) => {
    dispatch(setYellowBall(ticketIndex));
  };

  return (
    <div className="powerball-main-container">
      {/** HEADER  */}
      <HeaderComp
        title={powerball?.name}
        poweballbackhandler={navigationHandlerPowerball}
        setSelectedCategory={setSelectedCategory}
        selectedCategory="PowerTime"
        showAllSeclectedBalls={showAllSeclectedBalls}
        showAddTicket={showAddTicket}
        right={getDateTimeAccordingToUserTimezone(
          selectedTime?.powertime,
          todayPowerDate?.powerdate,
          user?.country?.timezone
        )}
      />

      {powerballIsLoading || powerballDatesIsLoading ? (
        <Loader />
      ) : (
        showAddTicket &&
        !showAllSeclectedBalls && (
          <>
            <AddTicketCon
              removeTicket={removeTicket}
              tickets={tickets}
              addMultipleTickets={addMultipleTickets}
              addTicket={addTicket}
              generateUniqueRandomNumbers={generateUniqueRandomNumbers}
              calculateTotalCost={calculateTotalCost}
            />
            <div className="powergame-container">
              <div className="ticket-main-con">
                <div className="tmc-first">
                  <label className="regular">Buy Multiplier</label>
                  <div
                    className="multiplier-main-con"
                    style={{ width: "100%" }}
                  >
                    {MULTIPLIERS.map((multiplier) => (
                      <div
                        key={multiplier}
                        onClick={() => handleMultiplierSelect(multiplier)}
                      >
                        <div
                          className="small-ball-con"
                          style={{
                            background: `linear-gradient(180deg, #FFD75F, #F7AD19)`,
                          }}
                        >
                          <label className="small-ball-label">
                            {multiplier}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <label className="regular">Ticket 1</label> */}
                  <div
                    className="multiplier-main-con-ticket"
                    style={{
                      marginTop: "0.5rem",
                      borderRadius: 0,
                      backgroundColor: "transparent",
                    }}
                  >
                    {tickets.map((ticket, ticketIndex) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          minWidth: "30%",
                          maxWidth: "30%",
                          overflowY: "hidden",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            minHeight: "7rem",
                            maxHeight: "7rem",
                          }}
                        >
                          <label className="regular">
                            Ticket {ticketIndex + 1}
                          </label>
                          <div
                            key={ticketIndex}
                            className="bball-con-main"
                            style={{
                              justifyContent: "flex-start",
                              alignItems: "flex-start",
                              display: "flex",
                              flexDirection: "row",
                              backgroundColor: COLORS.background,
                              padding: "0.5rem",
                              borderRadius: "0.5rem",
                              overflowX: "scroll",
                              overflowY: "hidden",
                            }}
                          >
                            <div
                              style={{
                                flex: 4,
                                display: "flex",
                                flexDirection: "row",
                                gap: "1rem",
                                borderBottomColor: COLORS.white_s,
                                borderBottomWidth: 1,
                              }}
                            >
                              {ticket.selectedNumbers.map((num, index) => (
                                <div
                                  key={index}
                                  onClick={() => {
                                    dispatch(
                                      setYellowBallClick({
                                        ticketIndex,
                                        ballIndex: index,
                                      })
                                    );
                                    if (num !== null) {
                                      // dispatch(
                                      //   handleNumberSelectR({
                                      //     number: num,
                                      //   })
                                      // );
                                      handleNumberSelect(num);
                                    }
                                  }}
                                >
                                  <div
                                    className="small-ball-con"
                                    style={{
                                      background: `linear-gradient(180deg, #7EC630, #7EC630)`,
                                      ...(activeTicketIndex === ticketIndex &&
                                        index === activeBallIndex && {
                                          boxShadow: "0px 0px 5px #fff", // Example of activeBall effect
                                        }),
                                      ...(num !== null && {
                                        borderColor: "yellow", // Example of selectedBall effect
                                      }),
                                    }}
                                  >
                                    <label className="small-ball-label">
                                      {num}
                                    </label>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div
                              style={{
                                paddingLeft: "1rem",
                              }}
                              onClick={() => {
                                handleYellowBallClick(ticketIndex);
                              }}
                            >
                              <YellowBall
                                number={ticket.multiplier}
                                key={ticket.multiplier}
                                value={ticket.multiplier || ""}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="tmc-second">
                          <label className="regular">
                            Choose 6 Unique Numbers
                          </label>
                          <div className="game-ball-con">
                            {ballNumbers.map((num) => {
                              // Check if the number is selected
                              // const isSelected = tickets.some((ticket) =>
                              //   ticket.selectedNumbers.includes(num)
                              // );
                              const isSelected =
                                ticket.selectedNumbers.includes(num);
                              return (
                                <SmallSmallBall
                                  key={num}
                                  number={num}
                                  isSelected={isSelected}
                                  item={num}
                                  onclick={handleNumberSelect}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`submit-button-main-con ${
                isSubmitEnabled ? "submit-enabled" : ""
              }`}
              onClick={isSubmitEnabled ? sebmittingNext : null} // Only call function if enabled
              style={{
                cursor: isSubmitEnabled ? "pointer" : "not-allowed",
              }} // Change cursor
            >
              <div
                className={`submit-button-con ${
                  isSubmitEnabled ? "submit-enabled" : ""
                }`}
              >
                <label className="submit-button-label">Next</label>
              </div>
            </div>
          </>
        )
      )}

      {showAllSeclectedBalls && (
        <>
          <div className="total-ticket-amount-con">
            <div className="tta-first">
              <TextLabel label={"Total Number of Ticket Amount"} />
              <TextLabel label={"Total Amount"} />
            </div>

            <div className="total-ticket-amount">
              <TextLabel label={tickets.length} />
              <TextLabel label={calculateTotalCost()} />
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
            {tickets.map((ticket, ticketIndex) => (
              <div key={ticketIndex} className="mtd-title-con">
                <div className="sn-con">
                  <TextLabel label={ticketIndex + 1} />
                </div>
                <div className="snt-con">
                  {ticket.selectedNumbers.map((num, index) => (
                    <GreenBall index={index} number={num} />
                  ))}
                </div>
                <div className="snm-con">
                  <YellowBall
                    key={ticket.multiplier}
                    number={ticket.multiplier || ""}
                  />
                </div>
                <div className="sna-con">
                  <TextLabel label={calculateTicketPrice(ticket)} />
                </div>
              </div>
            ))}
          </div>
          {createPowerballBetIsLoading ? (
            <Loader />
          ) : (
            <div
              className={`submit-button-main-con ${
                isSubmitEnabled ? "submit-enabled" : ""
              }`}
              onClick={isSubmitEnabled ? submitHandler : null} // Only call function if enabled
              style={{
                cursor: isSubmitEnabled ? "pointer" : "not-allowed",
              }} // Change cursor
            >
              <div
                className={`submit-button-con ${
                  isSubmitEnabled ? "submit-enabled" : ""
                }`}
              >
                <label className="submit-button-label">Submit</label>
              </div>
            </div>
          )}
        </>
      )}
      <ToastContainer />
    </div>
  );
};

const getCurrentDateInTimezone = (timezone) => {
  return moment().tz(timezone).format("DD-MM-YYYY");
};

const getMatchingPowerDate = (currentDate, powerDates) => {
  return powerDates.find((entry) => entry.powerdate === currentDate) || null;
};

const generateMultiplierObject = (number, multiplierArray = []) => {
  if (!Array.isArray(multiplierArray)) {
    console.error(
      "Invalid multiplier array. Expected an array but got:",
      multiplierArray
    );
    return {};
  }

  const result = {};

  multiplierArray.forEach((item) => {
    if (item.value) {
      const multiplierValue = parseInt(item.value); // Extract number from "2X", "3X", etc.
      if (!isNaN(multiplierValue)) {
        result[item.value] = number * multiplierValue;
      }
    }
  });

  // Add '7X' and 'NA' with default values
  // result["7X"] = number * 7;
  result["NA"] = 0;

  return result;
};

const getMultiplierValues = (multiplierArray = []) => {
  if (!Array.isArray(multiplierArray)) {
    console.error(
      "Invalid multiplier array. Expected an array but got:",
      multiplierArray
    );
    return [];
  }

  // Extract values from the array
  const values = multiplierArray.map((item) => item.value);

  // Append '7X' and 'NA'
  return [...values, "NA"];
};

function canPlaceBet(walletBalanceStr, bettingAmountStr) {
  const walletBalance = parseFloat(walletBalanceStr);
  const bettingAmount = parseFloat(bettingAmountStr);

  if (isNaN(walletBalance) || isNaN(bettingAmount)) {
    throw new Error("Invalid input: Both inputs must be valid numbers.");
  }

  return walletBalance >= bettingAmount;
}

export default PowerballGame;

// import React, { useEffect, useState } from "react";
// import "./PowerballHome.css";
// import HeaderComp from "../helpercomp/HeaderComp";
// import SubmitButton from "../atom/SubmitButton";
// import TextLabel from "../atom/TextLabel";
// import COLORS from "../../assets/constants/colors";
// import AddTicketCon from "./AddTicketCon";
// import SmallBall from "../molecule/SmallBall";
// import GreenBall from "../molecule/GreenBall";
// import YellowBall from "../molecule/YellowBall";
// import moment from "moment-timezone";
// import { useSelector } from "react-redux";
// import {
//   useCreatePowerballBetMutation,
//   useGetPowerballQuery,
//   useGetPowerDatesByTimeQuery,
// } from "../../redux/api";
// import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
// import Loader from "../molecule/Loader";
// import { getDateTimeAccordingToUserTimezone } from "../play/Play";
// // import {
// //   addMultipleTicketsRedux,
// //   removeTicketRedux,
// // } from "../../redux/ticketSlice";

// const PowerballGame = ({
//   setSelectedCategory,
//   selectedTime,
//   reloadKey,
//   setReloadKey,
// }) => {
//   const [showAddTicket, setShowAddTicket] = useState(true);
//   const [showMyTicket, setShowMyTicket] = useState(false);

//   const showMyTicketHandler = () => {
//     setShowAddTicket(false);
//     setShowMyTicket(true);
//   };

//   const backHandlerShowMyTicket = () => {
//     setShowAddTicket(true);
//     setShowMyTicket(false);
//   };

//   const { accesstoken, user } = useSelector((state) => state.user);
//   const [todayPowerDate, setTodayPowerDate] = useState(null);
//   const MAX_NUMBERS = 6; // Numbers per ticket
//   const [TOTAL_BALLS, setTOTAL_BALLS] = useState(null);
//   const [MULTIPLIERS, setMULTIPLIERS] = useState([]);
//   const [TICKET_COST, setTICKET_COST] = useState(null);
//   const [MULTIPLIER_COSTS, setMULTIPLIER_COSTS] = useState({});
//   const [powerball, setPowerball] = useState(null);
//   // Network call
//   const { data: powerballData, isLoading: powerballIsLoading } =
//     useGetPowerballQuery({ accesstoken });

//   useEffect(() => {
//     if (!powerballIsLoading && powerballData) {
//       setPowerball(powerballData.games[0]);
//       setTOTAL_BALLS(powerballData.games[0].range.endRange);
//       setTICKET_COST(user?.country?.ticketprice);

//       const multiplierArray = generateMultiplierObject(
//         user?.country?.multiplierprice,
//         powerballData?.games[0].multiplier
//       );

//       setMULTIPLIER_COSTS(multiplierArray);
//       setMULTIPLIERS(getMultiplierValues(powerballData?.games[0].multiplier));
//     }
//   }, [powerballData, powerballIsLoading]);

//   // [FOR GETTING POWERBALL GAME DATES]
//   const { data: powerballDates, isLoading: powerballDatesIsLoading } =
//     useGetPowerDatesByTimeQuery({
//       accesstoken,
//       id: selectedTime?._id,
//       page: 1,
//       limit: 10,
//     });

//   // [FOR GETTING TODAY POWERBALL DATE]
//   useEffect(() => {
//     if (!powerballDatesIsLoading && powerballDates) {
//       const currentDate = getCurrentDateInTimezone(user?.country?.timezone);
//       const matchingDate = getMatchingPowerDate(
//         currentDate,
//         powerballDates.powerDates
//       );
//       setTodayPowerDate(matchingDate);
//       console.log(matchingDate);
//     }
//   }, [powerballDatesIsLoading, powerballDates]);

//   useEffect(() => {
//     if (reloadKey !== 0) {
//       setReloadKey(0);
//       setSelectedCategory("");
//     }
//   }, [reloadKey]);

//   const [ticketValue, setTicketValue] = useState(1);
//   // [FOR POWEBALL BET]

//   const [createPowerballBet, { isLoading: createPowerballBetIsLoading }] =
//     useCreatePowerballBetMutation();

//   // Function to increment the ticket value
//   const increment = () => {
//     setTicketValue(ticketValue + 1);
//   };

//   // Function to decrement the ticket value
//   const decrement = () => {
//     if (ticketValue > 1) {
//       setTicketValue(ticketValue - 1); // Prevent going below 1
//     }
//   };
//   const createArray = (number) => {
//     return Array.from({ length: number }, (_, index) => index + 1);
//   };

//   const ticketsredux = useSelector((state) => state.tickets.tickets);

//   // Example usage:
//   const ballnumbers = createArray(70);

//   const [tickets, setTickets] = useState([
//     { selectedNumbers: Array(MAX_NUMBERS).fill(null), multiplier: null },
//   ]);
//   const [activeTicketIndex, setActiveTicketIndex] = useState(0);
//   const [activeBallIndex, setActiveBallIndex] = useState(0);
//   const [showMultipliers, setShowMultipliers] = useState(false);
//   const [showAllSeclectedBalls, setShowAllSeclectedBalls] = useState(false);

//   const ballNumbers = Array.from({ length: TOTAL_BALLS }, (_, i) => i + 1);

//   const addTicket = () => {
//     setTickets([
//       ...tickets,
//       { selectedNumbers: Array(MAX_NUMBERS).fill(null), multiplier: null },
//     ]);
//     setActiveTicketIndex(tickets.length);
//     setActiveBallIndex(0);
//   };

//   const addMultipleTickets = (value) => {
//     const numTickets = parseInt(value, 10);
//     if (!isNaN(numTickets) && numTickets > 0) {
//       const newTickets = Array.from({ length: numTickets }, () => ({
//         selectedNumbers: Array(MAX_NUMBERS).fill(null),
//         multiplier: null,
//       }));
//       setTickets([...tickets, ...newTickets]);
//       dispatch(addMultipleTicketsRedux(value));
//     }
//   };

//   const removeTicket = () => {
//     if (tickets.length > 1) {
//       setTickets(tickets.slice(0, -1));
//       if (activeTicketIndex >= tickets.length - 1) {
//         setActiveTicketIndex(tickets.length - 2);
//       }
//       dispatch(removeTicketRedux());
//     }
//   };

//   const handleNumberSelect = (number) => {
//     const currentTicket = tickets[activeTicketIndex];
//     const updatedNumbers = [...currentTicket.selectedNumbers];

//     if (updatedNumbers.includes(number)) {
//       const indexToRemove = updatedNumbers.indexOf(number);
//       updatedNumbers[indexToRemove] = null;
//     } else {
//       updatedNumbers[activeBallIndex] = number;
//     }

//     const updatedTickets = [...tickets];
//     updatedTickets[activeTicketIndex] = {
//       ...currentTicket,
//       selectedNumbers: updatedNumbers,
//     };
//     setTickets(updatedTickets);

//     const nextEmptyIndex = updatedNumbers.indexOf(null);
//     if (nextEmptyIndex !== -1) {
//       setActiveBallIndex(nextEmptyIndex);
//     }
//   };

// const handleMultiplierSelect = (multiplier) => {
//   const updatedTickets = [...tickets];
//   updatedTickets[activeTicketIndex].multiplier = multiplier;
//   setTickets(updatedTickets);
//   setShowMultipliers(false); // Hide the multiplier selection after a choice is made
// };

//   const isSubmitEnabled = tickets.every((ticket) =>
//     ticket.selectedNumbers.every((num) => num !== null)
//   );

//   const generateUniqueRandomNumbers = () => {
//     let usedNumbers = [];

//     // Reset selected numbers to null first before generating new ones
//     const newTickets = tickets.map((ticket) => {
//       let ticketNumbers = Array(MAX_NUMBERS).fill(null); // Reset all numbers

//       // Find empty slots in the current ticket (all should be empty now)
//       const emptyIndexes = ticketNumbers
//         .map((num, index) => (num === null ? index : -1))
//         .filter((index) => index !== -1);

//       emptyIndexes.forEach((index) => {
//         let randomNum;
//         do {
//           // Generate a random number
//           randomNum =
//             ballNumbers[Math.floor(Math.random() * ballNumbers.length)];

//           // Ensure that the number is unique across all tickets
//         } while (
//           usedNumbers.includes(randomNum) ||
//           ticketNumbers.includes(randomNum)
//         );

//         ticketNumbers[index] = randomNum;
//         usedNumbers.push(randomNum); // Mark this number as used
//       });

//       return { ...ticket, selectedNumbers: ticketNumbers };
//     });

//     setTickets(newTickets);
//   };

//   // Function to calculate total cost of all tickets
//   const calculateTotalCost = () => {
//     return tickets.reduce((total, ticket) => {
//       const multiplierCost = ticket.multiplier
//         ? MULTIPLIER_COSTS[ticket.multiplier]
//         : 0;
//       return total + TICKET_COST + multiplierCost;
//     }, 0);
//   };

//   // Function to calculate the price of each individual ticket
//   const calculateTicketPrice = (ticket) => {
//     const multiplierCost = ticket.multiplier
//       ? MULTIPLIER_COSTS[ticket.multiplier]
//       : 0;
//     return TICKET_COST + multiplierCost;
//   };
//   const sebmittingNext = async () => {
//     console.log("submitting to next stage to confirm ticket");
//     console.log("submited ticket :: ", JSON.stringify(tickets));
//     console.log("ticketsredux", JSON.stringify(ticketsredux));
//     setShowAllSeclectedBalls(true);
//   };

//   const [submitLoader, setSubmitLoader] = useState(false);
//   const submitHandler = async () => {
//     // setSubmitLoader(true);
//     console.log("submitting to next stage to confirm ticket");
//     console.log("submited ticket :: ", tickets), setTicketValue(1);

//     try {
//       if (!canPlaceBet(user.walletTwo.balance, calculateTotalCost())) {
//         showErrorToast("Insufficent Balance");
//         return;
//       }
//       const myticket = processTicketData(tickets, TICKET_COST);
//       console.log("Mine ticket");
//       console.log(myticket);
//       const body = {
//         powertime: selectedTime._id,
//         powerdate: todayPowerDate._id,
//         gameType: "powerball",
//         tickets: myticket,
//       };

//       const res = await createPowerballBet({
//         accesstoken,
//         body,
//       }).unwrap();

//       console.log(JSON.stringify(res));

//       showSuccessToast(res.message);
//       setActiveBallIndex(0);
//       setActiveTicketIndex(0);
//       setTickets([
//         { selectedNumbers: Array(MAX_NUMBERS).fill(null), multiplier: null },
//       ]);
//       setSubmitLoader(false);
//       setShowAllSeclectedBalls(false);
//     } catch (e) {
//       console.log(e);
//       showErrorToast("Something went wrong");
//     }
//   };

//   const navigationHandlerPowerball = () => {
//     if (showAllSeclectedBalls) {
//       setShowAllSeclectedBalls(false);
//     }
//   };

//   return (
//     <div className="powerball-main-container">
//       {/** HEADER  */}
//       <HeaderComp
//         title={powerball?.name}
//         poweballbackhandler={navigationHandlerPowerball}
//         setSelectedCategory={setSelectedCategory}
//         selectedCategory="PowerTime"
//         showAllSeclectedBalls={showAllSeclectedBalls}
//         showAddTicket={showAddTicket}
//         right={getDateTimeAccordingToUserTimezone(
//           selectedTime?.powertime,
//           todayPowerDate?.powerdate,
//           user?.country?.timezone
//         )}
//       />

//       {powerballIsLoading || powerballDatesIsLoading ? (
//         <Loader />
//       ) : (
//         showAddTicket &&
//         !showAllSeclectedBalls && (
//           <>
//             <AddTicketCon
//               removeTicket={removeTicket}
//               tickets={tickets}
//               addMultipleTickets={addMultipleTickets}
//               addTicket={addTicket}
//               generateUniqueRandomNumbers={generateUniqueRandomNumbers}
//               calculateTotalCost={calculateTotalCost}
//             />
//             <div className="powergame-container">
//               <div className="ticket-main-con">
//                 <div className="tmc-first">
//                   <label className="regular">Buy Multiplier</label>
//                   <div
//                     className="multiplier-main-con"
//                     style={{ width: "100%" }}
//                   >
//                     {MULTIPLIERS.map((multiplier) => (
//                       <div
//                         key={multiplier}
//                         onClick={() => handleMultiplierSelect(multiplier)}
//                       >
//                         <div
//                           className="small-ball-con"
//                           style={{
//                             background: `linear-gradient(180deg, #FFD75F, #F7AD19)`,
//                           }}
//                         >
//                           <label className="small-ball-label">
//                             {multiplier}
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   {/* <label className="regular">Ticket 1</label> */}
//                   <div
//                     className="multiplier-main-con-ticket"
//                     style={{
//                       marginTop: "0.5rem",
//                       borderRadius: 0,
//                       backgroundColor: "transparent",
//                     }}
//                   >
//                     {tickets.map((ticket, ticketIndex) => (
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           flex: 1,
//                           minWidth: "30%",
//                           maxWidth: "30%",
//                         }}
//                       >
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             minHeight: "7rem",
//                             maxHeight: "7rem",
//                           }}
//                         >
//                           <label className="regular">
//                             Ticket {ticketIndex + 1}
//                           </label>
//                           <div
//                             key={ticketIndex}
//                             style={{
//                               justifyContent: "flex-start",
//                               alignItems: "flex-start",
//                               display: "flex",
//                               flexDirection: "row",
//                               backgroundColor: COLORS.background,
//                               padding: "0.5rem",
//                               borderRadius: "0.5rem",
//                               overflowX: "scroll",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 flex: 4,
//                                 display: "flex",
//                                 flexDirection: "row",
//                                 gap: "1rem",
//                                 borderBottomColor: COLORS.white_s,
//                                 borderBottomWidth: 1,
//                               }}
//                             >
//                               {ticket.selectedNumbers.map((num, index) => (
//                                 <div
//                                   key={index}
//                                   onClick={() => {
//                                     if (num !== null) {
//                                       handleNumberSelect(num);
//                                     }
//                                     setActiveTicketIndex(ticketIndex);
//                                     setActiveBallIndex(index);
//                                   }}
//                                 >
//                                   <div
//                                     className="small-ball-con"
//                                     style={{
//                                       background: `linear-gradient(180deg, #7EC630, #7EC630)`,
//                                       ...(activeTicketIndex === ticketIndex &&
//                                         index === activeBallIndex && {
//                                           boxShadow: "0px 0px 5px #fff", // Example of activeBall effect
//                                         }),
//                                       ...(num !== null && {
//                                         borderColor: "yellow", // Example of selectedBall effect
//                                       }),
//                                     }}
//                                   >
//                                     <label className="small-ball-label">
//                                       {num}
//                                     </label>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>

//                             <div
//                               style={{
//                                 paddingLeft: "1rem",
//                               }}
//                               onClick={() => {
//                                 setActiveTicketIndex(ticketIndex);
//                                 setShowMultipliers(true);
//                               }}
//                             >
//                               <YellowBall
//                                 number={ticket.multiplier}
//                                 key={ticket.multiplier}
//                                 value={ticket.multiplier || ""}
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         <div className="tmc-second">
//                           <label className="regular">
//                             Choose 6 Unique Numbers
//                           </label>
//                           <div className="game-ball-con">
//                             {ballNumbers.map((num) => {
//                               // Check if the number is selected
//                               // const isSelected = tickets.some((ticket) =>
//                               //   ticket.selectedNumbers.includes(num)
//                               // );
//                               const isSelected =
//                                 ticket.selectedNumbers.includes(num);
//                               return (
//                                 <SmallBall
//                                   key={num}
//                                   number={num}
//                                   isSelected={isSelected}
//                                   item={num}
//                                   onclick={handleNumberSelect}
//                                 />
//                               );
//                             })}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`submit-button-main-con ${
//                 isSubmitEnabled ? "submit-enabled" : ""
//               }`}
//               onClick={isSubmitEnabled ? sebmittingNext : null} // Only call function if enabled
//               style={{
//                 cursor: isSubmitEnabled ? "pointer" : "not-allowed",
//               }} // Change cursor
//             >
//               <div
//                 className={`submit-button-con ${
//                   isSubmitEnabled ? "submit-enabled" : ""
//                 }`}
//               >
//                 <label className="submit-button-label">Next</label>
//               </div>
//             </div>
//           </>
//         )
//       )}

//       {showAllSeclectedBalls && (
//         <>
//           <div className="total-ticket-amount-con">
//             <div className="tta-first">
//               <TextLabel label={"Total Number of Ticket Amount"} />
//               <TextLabel label={"Total Amount"} />
//             </div>

//             <div className="total-ticket-amount">
//               <TextLabel label={tickets.length} />
//               <TextLabel label={calculateTotalCost()} />
//             </div>
//           </div>

//           <div className="myticket-dashboard">
//             {/** TITLING */}
//             <div className="mtd-title-con">
//               <div className="sn-con">
//                 <TextLabel label={"S No."} />
//               </div>
//               <div className="snt-con">
//                 <TextLabel label={"Tickets"} />
//               </div>
//               <div className="snm-con">
//                 <TextLabel label={"Multiplier"} />
//               </div>
//               <div className="sna-con">
//                 <TextLabel label={"Amount"} />
//               </div>
//             </div>
//             {/** CONTENT */}
//             {tickets.map((ticket, ticketIndex) => (
//               <div key={ticketIndex} className="mtd-title-con">
//                 <div className="sn-con">
//                   <TextLabel label={ticketIndex + 1} />
//                 </div>
//                 <div className="snt-con">
//                   {ticket.selectedNumbers.map((num, index) => (
//                     <GreenBall index={index} number={num} />
//                   ))}
//                 </div>
//                 <div className="snm-con">
//                   <YellowBall
//                     key={ticket.multiplier}
//                     number={ticket.multiplier || ""}
//                   />
//                 </div>
//                 <div className="sna-con">
//                   <TextLabel label={calculateTicketPrice(ticket)} />
//                 </div>
//               </div>
//             ))}
//           </div>
//           {createPowerballBetIsLoading ? (
//             <Loader />
//           ) : (
//             <div
//               className={`submit-button-main-con ${
//                 isSubmitEnabled ? "submit-enabled" : ""
//               }`}
//               onClick={isSubmitEnabled ? submitHandler : null} // Only call function if enabled
//               style={{
//                 cursor: isSubmitEnabled ? "pointer" : "not-allowed",
//               }} // Change cursor
//             >
//               <div
//                 className={`submit-button-con ${
//                   isSubmitEnabled ? "submit-enabled" : ""
//                 }`}
//               >
//                 <label className="submit-button-label">Submit</label>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// const getCurrentDateInTimezone = (timezone) => {
//   return moment().tz(timezone).format("DD-MM-YYYY");
// };

// const getMatchingPowerDate = (currentDate, powerDates) => {
//   return powerDates.find((entry) => entry.powerdate === currentDate) || null;
// };

// const generateMultiplierObject = (number, multiplierArray = []) => {
//   if (!Array.isArray(multiplierArray)) {
//     console.error(
//       "Invalid multiplier array. Expected an array but got:",
//       multiplierArray
//     );
//     return {};
//   }

//   const result = {};

//   multiplierArray.forEach((item) => {
//     if (item.value) {
//       const multiplierValue = parseInt(item.value); // Extract number from "2X", "3X", etc.
//       if (!isNaN(multiplierValue)) {
//         result[item.value] = number * multiplierValue;
//       }
//     }
//   });

//   // Add '7X' and 'NA' with default values
//   // result["7X"] = number * 7;
//   result["NA"] = 0;

//   return result;
// };

// const getMultiplierValues = (multiplierArray = []) => {
//   if (!Array.isArray(multiplierArray)) {
//     console.error(
//       "Invalid multiplier array. Expected an array but got:",
//       multiplierArray
//     );
//     return [];
//   }

//   // Extract values from the array
//   const values = multiplierArray.map((item) => item.value);

//   // Append '7X' and 'NA'
//   return [...values, "NA"];
// };

// const processTicketData = (ticketArray, TICKET_COST) => {
//   if (!Array.isArray(ticketArray) || typeof TICKET_COST !== "number") {
//     console.error("Invalid input. Expected an array and a number.");
//     return [];
//   }

//   return ticketArray.map(({ multiplier, selectedNumbers }) => {
//     // Handle cases where multiplier is "NA" or null
//     const multiplierValue =
//       multiplier && multiplier !== "NA"
//         ? parseInt(multiplier.replace("X", ""), 10)
//         : 1;

//     return {
//       amount: TICKET_COST * multiplierValue, // Multiply cost with multiplier
//       convertedAmount: TICKET_COST * multiplierValue, // Generate a random converted amount
//       multiplier: multiplierValue, // Store multiplier as a number
//       usernumber: selectedNumbers, // Keep the selected numbers
//     };
//   });
// };

// function canPlaceBet(walletBalanceStr, bettingAmountStr) {
//   const walletBalance = parseFloat(walletBalanceStr);
//   const bettingAmount = parseFloat(bettingAmountStr);

//   if (isNaN(walletBalance) || isNaN(bettingAmount)) {
//     throw new Error("Invalid input: Both inputs must be valid numbers.");
//   }

//   return walletBalance >= bettingAmount;
// }

// export default PowerballGame;
