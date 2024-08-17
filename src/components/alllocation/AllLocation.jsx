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
    setSelectedDate(datedate);
    dispatch(
      getResultAccordingToLocationTimeDate(
        accesstoken,
        datedate._id,
        datedate.lottime._id,
        datedate.lottime.lotlocation
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
  const { accesstoken } = useSelector((state) => state.user);
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
  console.log("dates :: ", JSON.stringify(results));

  return (
    <div className="main-content-container-all-location">
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
                  selectedFilter === item._id
                  ? COLORS.green
                  : "transparent", // Use transparent for no border
              borderWidth: "2px",
              borderStyle:
              selectedFilter === item._id ? "solid" : "none", // Apply border style conditionally
                }}
              >
                <label className="filtercontentalLabel">
                  {item.maximumReturn}
                </label>
              </div>
            ))}
          </div>

          {/** Location container */}

       

          <div className="allocationcontainer-all">
            {isLoading ? (
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgressBar />
              </div>
            ) : (
              filteredData?.map((item, index) => (
                <div className="location-item" key={index}>
                  <div className="location-details">
                    <div
                      className="location-header"
                      style={{
                        background:
                          index % 2 === 0
                            ? "linear-gradient(90deg, #1993FF, #0F5899)"
                            : "linear-gradient(90deg, #7EC630, #3D6017)",
                      }}
                    >
                      <span className="location-header-label">{item.name}</span>
                      <span className="location-header-max-label">
                        Max {item.limit}
                      </span>
                    </div>
                  </div>

                  <div className="time-items-container">
                    {item.times.map((timedata, timeindex) => (
                      <div
                        onClick={() => handleSelecteditemClick(item, timedata)}
                        className="time-item"
                        key={timeindex}
                      >
                        <span className="time-items-container-time-label">
                          {timedata.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
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
              }}
            >
              <div
                className="back-container"
                onClick={() => removeSelecteditemClick()}
              >
                <IoIosArrowRoundBack color={COLORS.background} size={"30px"} />
              </div>

              <span
                style={{
                  color: COLORS.white_s,
                  fontFamily: FONT.Montserrat_Bold,
                  fontSize: "3vh",
                  marginRight: "2vh",
                  marginLeft: "2vh",
                }}
              >
                {selectedLocation.name}
              </span>

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
              <span
                style={{
                  color: COLORS.white_s,
                  fontFamily: FONT.Montserrat_Bold,
                  fontSize: "3vh",
                }}
              >
                {selectedTime.time}
              </span>
            </div>
          </div>

          {/** select date */}
          <span
            style={{
              color: COLORS.white_s,
              fontFamily: FONT.Montserrat_Bold,
              fontSize: "4vh",
              paddingLeft: "3vh",
            }}
          >
            Select Date
          </span>

          {/** date container */}
          <>
            {loadingdate ? (
              <div
                style={{
                  flex: "1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgressBar />
              </div>
            ) : (
              <div className="dateconatainer">
                {dates?.map((item, index) => (
                  <div
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
                <IoIosArrowRoundBack color={COLORS.background} size={"30px"} />
              </div>

              {/** selected date */}
              <span
                style={{
                  color: COLORS.white_s,
                  fontFamily: FONT.Montserrat_Bold,
                  fontSize: "4vh",
                  paddingLeft: "3vh",
                }}
              >
                Result
              </span>
            </div>
          </div>

          {/** result container */}

          {loadingResult ? (
            <div
              style={{
                flex: "1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgressBar />
            </div>
          ) : results.length === 0 ? (
            <div className="dateconatainer">
              {/** Result contatiner */}
              <div className="resultcontaineral">
                <div className="resultleftcontaineral">
                  <div className="rltopcontaineral">
                   
                   
                  </div>
                  <div className="rlmiddlecontaineral">
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <label className="rltopcontaineralNumberLabel" style={{fontSize: '4vw', textAlign: 'end'}}>
                        Comming soon...
                      </label>
                    </div>
                    <div
                      style={{
                        width: "40%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    ></div>
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
              </div>
            </div>
          ) : (
            <div className="dateconatainer">
              {/** Result contatiner */}
              <div className="resultcontaineral">
                <div className="resultleftcontaineral">
                  <div className="rltopcontaineral">
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
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
                      }}
                    ></div>
                  </div>
                  <div className="rlbottomcontaineral">
                    <div className="rlbottomcontentcontaineral">
                      <div className="rlbottomcontentcontainerCalContainer">
                        <SlCalender size={"20px"} color={COLORS.background} />
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
              </div>
            </div>
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default AllLocation;



// .allocationcontainer 
// display: flex;
// flex-wrap: wrap;
// gap: 2%;
// max-height: 80vh; /* Set maximum height to viewport height */
// background: linear-gradient(180deg, #0162AF, #011833);
// margin: 2vh;
// border-radius: 2vh;
// overflow-y: scroll; /* Enable vertical scrolling */
