import React, { useEffect, useState } from "react";
import "./AllResult.css";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllLocationWithTimeQuery,
  useGetResultLocMonYearQuery,
} from "../../helper/Networkcall";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import COLORS from "../../assets/constants/colors";
import FONT from "../../assets/constants/fonts";
import { showErrorToast, showWarningToast } from "../helper/showErrorToast";
import SelectYear from "../helper/SelectYear";
import SelectMonth from "../helper/SelectMonth";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import * as XLSX from "xlsx";
import { CiSearch } from "react-icons/ci";
import { FaDownload } from "react-icons/fa6";
import { MdArrowDropDownCircle } from "react-icons/md";
import { getTimeAccordingToTimezone } from "../alllocation/AllLocation";

function AllResult({ reloadKey }) {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth(); // 0-based index (0 = January, 11 = December)
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showSelectYear, setShowSelectYear] = useState(false);
  const [showSelectMonth, setShowSelectMonth] = useState(false);

  const { accesstoken, user } = useSelector((state) => state.user);

  // GETTING ALL THE LOCATION
  const {
    data: alllocation,
    error: alllocationError,
    isLoading: allocationIsLoading,
    refetch: allocationRefetch,
  } = useGetAllLocationWithTimeQuery(accesstoken);

  const {
    data: allresult,
    error: allresultError,
    isLoading: allresultIsLoading,
  } = useGetResultLocMonYearQuery({
    accessToken: accesstoken,
    locationid: selectedItem?._id,
    year: selectedYear,
    month: selectedMonth.toLowerCase(),
  });

  useEffect(() => {
    if (!allocationIsLoading && alllocation) {
      setSelectedItem(alllocation?.locationData[0]);
      console.log("Calling allresult");
    }
  }, [allocationIsLoading, alllocation]);

  useEffect(() => {
    if (alllocation) {
      console.log("Calling allresult only:: " + allresultIsLoading);
    }
  }, [allresult, selectedItem, allocationIsLoading]);

  const getAllResultForOtherLocation = (item) => {
    setSelectedItem(item);
  };

  const [showSearch, setShowSearch] = useState(false);
  const [showResult, setShowResult] = useState(true);

  const settingShowResult = () => {
    setShowResult(true);
    setShowSearch(false);
  };

  const backHandlerShowResult = () => {
    setShowResult(false);
    setShowSearch(true);
  };

  const searchResultForMonth = async () => {
    if (!selectedItem) {
      showErrorToast("Please select a location");
    } else if (!selectedMonth) {
      showErrorToast("Please select a month");
    } else if (!selectedYear) {
      showErrorToast("Please select a year");
    } else {
      settingShowResult();
      showWarningToast("Processing");
    }
  };

  const transformData = (data) => {
    if (!data || !data.length) return [];

    // Headers
    const headers = [
      "Lot Date",
      ...data.map((item) =>
        getTimeAccordingToTimezone(
          item.lottime.lottime,
          user?.country?.timezone
        )
      ),
    ];

    // Create rows
    const rows = data[0].dates.map((dateItem) => {
      const row = [dateItem.lotdate.lotdate];
      data.forEach((item) => {
        const dateData = item.dates.find(
          (d) => d.lotdate.lotdate === dateItem.lotdate.lotdate
        );
        row.push(dateData ? dateData.results[0]?.resultNumber || "N/A" : "N/A");
      });
      return row;
    });

    // Combine headers and rows
    return [headers, ...rows];
  };

  const exportToExcel = (data) => {
    // Transform data
    const transformedData = transformData(data);

    // Log transformed data
    console.log("Transformed data:", transformedData);

    if (transformedData.length === 0) {
      console.error("No data to export");
      return;
    }

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(transformedData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    // Generate and download the file
    XLSX.writeFile(workbook, "results.xlsx");
  };

  useEffect(() => {
    console.log("reloadKey :: " + reloadKey);
    allocationRefetch();
    if (!allocationIsLoading && alllocation) {
      setSelectedItem(alllocation?.locationData[0]);
      console.log("Calling allresult");
      
    }
  }, [reloadKey]);

  return (
    <>
      {false && (
        <div className="alContainer">
          {/* TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Result
              </label>
            </div>
          </div>

          {allocationIsLoading ? (
            <LoadingComponent />
          ) : (
            <div className="PLContainerMain">
              <div className="ARLCC">
                {alllocation?.locationData?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => getAllResultForOtherLocation(item)}
                    className="ARLocConCC"
                  >
                    <div
                      className="PLLLocContainer"
                      style={{
                        background:
                          index % 2 === 0
                            ? "linear-gradient(90deg, #1993FF, #0F5899)"
                            : "linear-gradient(90deg, #7EC630, #3D6017)",
                        borderColor:
                          selectedItem?._id === item._id
                            ? COLORS.orange
                            : "transparent",
                        borderWidth: "2px",
                        borderStyle:
                          selectedItem?._id === item._id ? "solid" : "none",
                      }}
                    >
                      <label className="locLabel">{item.name}</label>
                      <label className="limitLabel">Max {item.limit}</label>
                    </div>
                  </div>
                ))}
              </div>

              {/* ALL RESULT MAIN */}
              <div className="SRMC">
                <label
                  className="stitle"
                  style={{ marginTop: "2rem", cursor: "pointer" }}
                  onClick={() => setShowSelectYear(true)}
                >
                  Select Year
                </label>
                {showSelectYear && (
                  <SelectYear
                    onClose={() => setShowSelectYear(false)}
                    setSelectedYear={setSelectedYear}
                  />
                )}
                <label className="yeartitle">{selectedYear}</label>
                <label
                  className="stitle"
                  style={{ marginTop: "2rem", cursor: "pointer" }}
                  onClick={() => setShowSelectMonth(true)}
                >
                  Select Month
                </label>
                {showSelectMonth && (
                  <SelectMonth
                    onClose={() => setShowSelectMonth(false)}
                    setSelectedMonth={setSelectedMonth}
                  />
                )}

                <label className="yeartitle">{selectedMonth}</label>
                <label
                  className="submitTitleCon"
                  onClick={searchResultForMonth}
                >
                  Search
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {showResult && (
        <div className="alContainer">
          {/* TOP NAVIGATION CONTATINER */}
          <div className="alCreatLocationTopContainer">
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                All Result
              </label>
            </div>
          </div>

          {allocationIsLoading ? (
            <LoadingComponent />
          ) : (
            <div className="PLContainerMain">
              <div className="ARLC">
                {alllocation?.locationData?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => getAllResultForOtherLocation(item)}
                    className="ARLocConC"
                  >
                    <div
                      className="PLLLocContainer"
                      style={{
                        background:
                          index % 2 === 0
                            ? "linear-gradient(90deg, #1993FF, #0F5899)"
                            : "linear-gradient(90deg, #7EC630, #3D6017)",
                        borderColor:
                          selectedItem?._id === item._id
                            ? "orange"
                            : "transparent",
                        borderWidth: "2px",
                        borderStyle:
                          selectedItem?._id === item._id ? "solid" : "none",
                      }}
                    >
                      <label className="locLabel">{item.name}</label>
                      <label className="limitLabel">Max {item.limit}</label>
                    </div>
                  </div>
                ))}
              </div>

              {/* ALL RESULT MAIN */}
              <div className="ARMC">
                {allresultIsLoading ? (
                  <LoadingComponent />
                ) : allresult?.results?.length === 0 ? (
                  <NodataFound title={"No data available"} />
                ) : (
                  <table className="resultTable">
                    <thead>
                      <tr>
                        <th
                          className="lotdate-column"
                          style={{
                            fontFamily: FONT.Montserrat_SemiBold,
                            fontSize: "1rem",
                            color: COLORS.white_s,
                          }}
                        >
                          Lot Date
                        </th>
                        {allresult?.results?.map((item, index) => (
                          <th className="time-column" key={index}>
                            {getTimeAccordingToTimezone(
                              item.lottime.lottime,
                              user?.country?.timezone
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {allresult?.results?.[0]?.dates?.map(
                        (dateItem, dateIndex) => (
                          <tr key={dateIndex}>
                            <td className="tddatelabel lotdate-column">
                              {dateItem.lotdate.lotdate}
                            </td>
                            {allresult?.results?.map((item, resultIndex) => (
                              <td
                                key={resultIndex}
                                className="result-column tdlabel"
                              >
                                {item.dates[dateIndex]?.results[0]
                                  ?.resultNumber || "N/A"}
                              </td>
                            ))}
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              {showSelectYear && (
                <SelectYear
                  onClose={() => setShowSelectYear(false)}
                  setSelectedYear={setSelectedYear}
                />
              )}

              {showSelectMonth && (
                <SelectMonth
                  onClose={() => setShowSelectMonth(false)}
                  setSelectedMonth={setSelectedMonth}
                />
              )}

              <div className="bottomSearcConAllResult">
                <div
                  className="bottomSearcConAllResultM"
                  onClick={() => setShowSelectYear(true)}
                >
                  <label className="msbLabel">{selectedYear}</label>
                  <MdArrowDropDownCircle
                    color={COLORS.white_s}
                    size={"2.5rem"}
                  />
                </div>
                <div
                  className="bottomSearcConAllResultY"
                  onClick={() => setShowSelectMonth(true)}
                >
                  <label className="msbLabel">{selectedMonth}</label>
                  <MdArrowDropDownCircle
                    color={COLORS.white_s}
                    size={"2.5rem"}
                  />
                </div>
                <div
                  className="bottomSearcConAllResultS"
                  onClick={searchResultForMonth}
                >
                  <CiSearch color={COLORS.white_s} size={"2rem"} />
                  <label className="msbLabel">SEARCH</label>
                </div>
                <div
                  className="bottomSearcConAllResultD"
                  onClick={() => exportToExcel(allresult.results)}
                >
                  <FaDownload color={COLORS.white_s} size={"2rem"} />
                  <label className="msbLabel">DOWNLOAD</label>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AllResult;
