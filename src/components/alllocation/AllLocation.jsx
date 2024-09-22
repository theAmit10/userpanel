import React, { useEffect, useState } from "react";
import FONT from "../../assets/constants/fonts";
import "./Alllocation.css";
import COLORS from "../../assets/constants/colors";
import { FaWallet } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import images from "../../assets/constants/images";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadProfile } from "../../redux/actions/userAction";
import { useGetAllLocationWithTimeQuery } from "../../redux/api";
import CircularProgressBar from "../helper/CircularProgressBar";
import { getDateAccordingToLocationAndTime } from "../../redux/actions/dateAction";
import { ToastContainer } from "react-toastify";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { getResultAccordingToLocationTimeDate } from "../../redux/actions/resultAction";
import moment from "moment-timezone";
import { LoadingComponent } from "../helper/LoadingComponent";

const filterdata = [
  { val: "All" },
  { val: "2X" },
  { val: "5X" },
  { val: "10X" },
  { val: "50X" },
  { val: "100X" },
  { val: "200X" },
];

const locationdata = [
  {
    id: "1",
    name: "Canada",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
      { id: "18", time: "09:00 AM" },
      { id: "19", time: "10:00 AM" },
      { id: "20", time: "11:00 AM" },
      { id: "21", time: "12:00 PM" },
      { id: "22", time: "01:00 PM" },
      { id: "23", time: "02:00 PM" },
    ],
  },
  {
    id: "2",
    name: "Japan",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
    ],
  },
  {
    id: "3",
    name: "Punjab",
    limit: "200 - 200X",
    times: [
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "4",
    name: "Pune",
    limit: "200 - 200X",
    times: [
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "5",
    name: "China",
    limit: "100 - 100X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "6",
    name: "India",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
  {
    id: "7",
    name: "USA",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
    ],
  },
  {
    id: "8",
    name: "Korea",
    limit: "200 - 200X",
    times: [
      { id: "11", time: "09:00 AM" },
      { id: "12", time: "10:00 AM" },
      { id: "13", time: "11:00 AM" },
      { id: "14", time: "12:00 PM" },
      { id: "15", time: "01:00 PM" },
      { id: "16", time: "02:00 PM" },
      { id: "17", time: "03:00 PM" },
    ],
  },
];

const datedata = [
  {
    date: "29-04-2024",
    id: "1",
  },
  {
    date: "28-04-2024",
    id: "2",
  },

  {
    date: "27-04-2024",
    id: "3",
  },
  {
    date: "26-04-2024",
    id: "4",
  },
  {
    date: "25-04-2024",
    id: "5",
  },
  {
    date: "24-04-2024",
    id: "6",
  },
  {
    date: "23-04-2024",
    id: "7",
  },
];

function AllLocation() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedItem, setSelectedItem] = useState(true);

  const { loadingResult, results } = useSelector((state) => state.result);
  const { user, accesstoken } = useSelector((state) => state.user);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const handleSelecteditemClick = (item, timedata) => {
    setSelectedItem(false);
    setSelectedLocation(item);
    setSelectedTime(timedata);

    dispatch(
      getDateAccordingToLocationAndTime(accesstoken, timedata._id, item._id)
    );
  };

  const handleSelectedDateClick = (datedate) => {
    console.log("Starting Result work");
    console.log("date data : " + JSON.stringify(datedate));
    setSelectedDate(datedate);
    dispatch(
      getResultAccordingToLocationTimeDate(
        accesstoken,
        datedate._id,
        datedate.lottime._id,
        datedate.lottime.lotlocation._id
      )
    );
  };

  const removeSelecteditemClick = () => {
    setSelectedItem(true);
    setSelectedLocation(null);
    setSelectedTime(null);
    setSelectedDate(null);
  };

  useEffect(() => {
    console.log(
      "Selected item location :: " + JSON.stringify(selectedLocation)
    );
    console.log("Selected item time :: " + JSON.stringify(selectedLocation));
    console.log("Selected item date :: " + JSON.stringify(selectedDate));
  }, [selectedItem, selectedLocation, selectedDate]);

  const navigation = useNavigate();

  const [alldatafiler, setalldatafilter] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProfile(accesstoken));
  }, []);

  const { data, error, isLoading } =
    useGetAllLocationWithTimeQuery(accesstoken);

  // FOR ALL FILTER TYPE DATA
  useEffect(() => {
    console.log("STARTING FOUND DATA :: ");
    if (!isLoading && data) {
      console.log("found data", data);
      const uniqueItems = new Set();
      const filtertype = [{ _id: "123", maximumReturn: "All" }]; // Default element

      data.locationData.forEach((item) => {
        const key = item.maximumReturn;
        if (!uniqueItems.has(key)) {
          uniqueItems.add(key);
          filtertype.push({ _id: item._id, maximumReturn: item.maximumReturn });
        }
      });

      // Sorting the filtertype array
      filtertype.sort((a, b) => {
        if (a.maximumReturn === "All") return -1;
        if (b.maximumReturn === "All") return 1;
        const aReturn = parseFloat(a.maximumReturn.replace("x", ""));
        const bReturn = parseFloat(b.maximumReturn.replace("x", ""));
        return aReturn - bReturn;
      });

      setalldatafilter(filtertype);
      setSelectedFilter(filtertype[0]._id);

      console.log(filtertype);
    }
  }, [isLoading, data]);

  const settingFilterData = (itemf) => {
    setSelectedFilter(itemf._id);
    if (itemf.maximumReturn.toLowerCase() === "all") {
      setFilteredData(data?.locationData);
    } else {
      const filtered = data?.locationData.filter((item) =>
        item.maximumReturn
          .toLowerCase()
          .includes(itemf.maximumReturn.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const [filteredData, setFilteredData] = useState([]);

  const getNextTimeForHighlights = (times) => {
    if (times.length === 1) {
      return times[0];
    }

    const currentISTTime = moment().tz("Asia/Kolkata").format("hh:mm A");
    const sortedTimes = [...times].sort((a, b) =>
      moment(a.time, "hh:mm A").diff(moment(b.time, "hh:mm A"))
    );

    for (let i = 0; i < sortedTimes.length; i++) {
      if (
        moment(currentISTTime, "hh:mm A").isBefore(
          moment(sortedTimes[i].time, "hh:mm A")
        )
      ) {
        return sortedTimes[i];
      }
    }

    return sortedTimes[0];
  };

  const handleSearch = (text) => {
    const filtered = data?.locationData.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(data?.locationData); // Update filteredData whenever locations change
  }, [data]);

  const { loading: loadingdate, dates } = useSelector((state) => state.date);

  console.log("FIleter data :: " + filteredData?.length);
  console.log("results :: ", JSON.stringify(results));

  return (
    <div className="allocationcontainer">
      {/** Location and time */}

      {selectedItem && (
        <>
          {/** Filter container */}
          <div className="filtercontaineral">
            {alldatafiler.map((item, index) => (
              <div
                onClick={() => settingFilterData(item)}
                className="filtercontental"
                key={item._id}
                style={{
                  borderColor:
                    selectedFilter === item._id ? COLORS.green : "transparent", // Use transparent for no border
                  borderWidth: "2px",
                  borderStyle: selectedFilter === item._id ? "solid" : "none", // Apply border style conditionally
                }}
              >
                <label className="filtercontentalLabel">
                  {item.maximumReturn}
                </label>
              </div>
            ))}
          </div>

          {/** Location container */}

          <div className="allocationcontainer">
            {isLoading ? (
              <LoadingComponent />
            ) : (
              filteredData?.map((item, index) => {
                const nextTime = getNextTimeForHighlights(item?.times);

                return (
                  <div className="location-item-all" key={index}>
                    <div className="location-details-all">
                      <div
                        className="location-header"
                        style={{
                          background:
                            index % 2 === 0
                              ? "linear-gradient(90deg, #1993FF, #0F5899)"
                              : "linear-gradient(90deg, #7EC630, #3D6017)",
                        }}
                      >
                        <span className="location-header-label">
                          {item.name}
                        </span>
                        <span className="location-header-max-label">
                          Max {item.limit}
                        </span>
                      </div>
                    </div>

                    <div className="time-items-container">
                      {item.times.map((timedata, timeindex) => (
                        <div
                          onClick={() =>
                            handleSelecteditemClick(item, timedata)
                          }
                          className={`time-item ${
                            timedata.time === nextTime.time ? "highlighted" : ""
                          }`}
                          key={timeindex}
                        >
                          <span className="time-items-container-time-label">
                            {getTimeAccordingToTimezone(
                              timedata.time,
                              user?.country?.timezone
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/** date */}

      {selectedLocation && selectedTime && !selectedDate && !selectedItem && (
        <div className="alllocationdatecontainer">
          {/** Top Container */}
          <div className="date-title-container">
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                className="back-container"
                onClick={() => removeSelecteditemClick()}
              >
                <IoIosArrowRoundBack color={COLORS.background} size={"2rem"} />
              </div>

              <span className="alLocationNameL">{selectedLocation.name}</span>

              <span className="date-title-container-limit-label">
                {selectedLocation.limit}
              </span>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <span className="alLocationNameL">
                {getTimeAccordingToTimezone(
                  selectedTime.time,
                  user?.country?.timezone
                )}
              </span>
            </div>
          </div>

          {/** select date */}
          <span className="alLocationSDL">Select Date</span>

          {/** date container */}
          <>
            {loadingdate ? (
              <LoadingComponent />
            ) : (
              <div className="dateconatainer">
                {dates?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectedDateClick(item)}
                    className="datecontainer-content"
                  >
                    <span className="datecontainer-content-label">
                      {item.lotdate}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      )}

      {/** result */}
      {selectedLocation && selectedTime && selectedDate && !selectedItem && (
        <div className="alllocationdatecontainer">
          {/** Top Container */}
          <div className="date-title-container">
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div
                className="back-container"
                onClick={() => removeSelecteditemClick()}
              >
                <IoIosArrowRoundBack color={COLORS.background} size={"2rem"} />
              </div>

              {/** selected date */}
              <span className="alLocationTitle">Result</span>
            </div>
          </div>

          {/** result container */}

          {loadingResult ? (
            <LoadingComponent />
          ) : results.length === 0 ? (
            <div className="dateconatainer">
              {/** Result contatiner */}
              <div className="resultcontaineral">
                <div className="resultleftcontaineral">
                  <div className="rlmiddlecontaineral">
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <label
                        className="rltopcontaineralNumberLabel"
                        style={{ fontSize: "2rem", textAlign: "center" }}
                      >
                        No Result found
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="dateconatainer">
              {/** Result contatiner */}
              <div className="hdLeftCTop">
                <div className="hdlTL">
                  <div className="hdlTLT">
                    <div className="hdlTLTL">
                      <label className="hdlTLTLCountry">
                        {results[0]?.lotlocation?.lotlocation}
                      </label>
                    </div>
                    <div className="hdlTLTR">
                      <label className="hdlTLTLNextResult">Next Result</label>
                      <label className="hdlTLTLNR">
                        {getTimeAccordingToTimezone(
                          results[0]?.nextresulttime,
                          user?.country?.timezone
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="hdlTLM">
                    <div className="hdlTLML">
                      <label className="hdlMNumber">
                        {results[0].resultNumber}
                      </label>
                    </div>
                    <div className="hdlTLMR">
                      <label className="hdlTLTLNRtimer"></label>
                    </div>
                  </div>
                  <div className="hdlTLB">
                    <label className="hdlTLTLNRB">
                      {results[0].lotdate.lotdate}
                    </label>
                    <label className="hdlTLTLNRB">
                      {getTimeAccordingToTimezone(
                        results[0].lottime.lottime,
                        user?.country?.timezone
                      )}
                    </label>
                    <label className="hdlTLTLNRB">
                      {results[0].resultNumber}
                    </label>
                  </div>
                </div>
                <div className="hdlTR">
                  <div className="hdlTRLeft">
                    <div className="hdlTRLeftT">
                      <img
                        src={images.gamecontroller}
                        className="hdtrophyimage"
                      />
                    </div>
                    <div className="hdlTRLeftB">
                      <img src={images.cups} className="hdtrophyimage" />
                    </div>
                  </div>
                  <div className="hdlTRRight">
                    <img src={images.cat} className="hdcatimage" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

{
  /* <div className="resultcontaineral">
<div className="resultleftcontaineral">
  <div className="rltopcontaineral">
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'cyan'
      }}
    >
      <label className="rltopcontaineralNameLabel">
        {results[0]?.lotlocation?.lotlocation}
      </label>
    </div>
    <div
      style={{
        width: "40%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: 'green'
      }}
    >
      <label className="rltopcontaineralTimeLabel">
        {results[0].lottime.lottime}
      </label>
    </div>
  </div>
  <div className="rlmiddlecontaineral">
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'pink'
      }}
    >
      <label className="rltopcontaineralNumberLabel">
        {results[0].resultNumber}
      </label>
    </div>
    <div
      style={{
        width: "40%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'red'
      }}
    ></div>
  </div>
  <div className="rlbottomcontaineral">
    <div className="rlbottomcontentcontaineral">
      <div className="rlbottomcontentcontainerCalContainer">
        <SlCalender size={"2rem"} color={COLORS.white_s} />
      </div>
      <label className="rlbottomcontentcontainerCalDateLabel">
        {results[0].lotdate.lotdate}
      </label>
      <label className="rlbottomcontentcontainerCalDateLabel">
        {results[0].lottime.lottime}
      </label>
      <label className="rlbottomcontentcontainerCalDateLabel">
        {results[0].resultNumber}
      </label>
    </div>
  </div>
</div>
<div className="resultrightcontaineral">
  <div className="imageContainerGame">
    <img
      src={images.gamecontroller}
      alt="game controller Image"
      className="gamecontrolleral"
    />
    <img
      src={images.cups}
      alt="game controller Image"
      className="cupontrolleral"
    />
  </div>
  <div className="catImageContainer">
    <img
      src={images.cat}
      alt="game controller Image"
      className="catcontrolleral"
    />
  </div>
</div>
</div> */
}

export default AllLocation;

export function getTimeAccordingToTimezone(time, targetTimeZone) {
  // Get the current date in "DD-MM-YYYY" format
  const todayDate = moment().format("DD-MM-YYYY");

  // Combine the current date and time into a full datetime string
  const dateTimeIST = `${todayDate} ${time}`;

  // Convert the combined date and time to a moment object in the IST timezone
  const istTime = moment.tz(dateTimeIST, "DD-MM-YYYY hh:mm A", "Asia/Kolkata");

  // Convert the IST time to the target timezone
  const targetTime = istTime.clone().tz(targetTimeZone);

  // Return only the time in the target timezone
  return targetTime.format("hh:mm A");
}

// .allocationcontainer
// display: flex;
// flex-wrap: wrap;
// gap: 2%;
// max-height: 80vh; /* Set maximum height to viewport height */
// background: linear-gradient(180deg, #0162AF, #011833);
// margin: 2vh;
// border-radius: 2vh;
// overflow-y: scroll; /* Enable vertical scrolling */
