import React, { useEffect, useState } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import "./Partner.css";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { useSelector } from "react-redux";
import { useGetHistoryQuery } from "../../redux/api";
import Loader from "../molecule/Loader";
import moment from "moment/moment";
import { serverName } from "../../redux/store";
import COLORS from "../../assets/constants/colors";
import { PiHandDepositBold, PiHandWithdrawBold } from "react-icons/pi";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { ImageAlertModal } from "../helper/ImageAlertModal";
import { NodataFound } from "../helper/NodataFound";

const UserTransactionHistory = ({ setSelectedCategory, selectedPartner }) => {
  const { accesstoken, user } = useSelector((state) => state.user);
  const [expandedItems, setExpandedItems] = useState({});
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const {
    data: paginatedData,
    isFetching: fetchingPaginated,
    isLoading: loadingPaginated,
    refetch,
  } = useGetHistoryQuery(
    { accesstoken, userId: selectedPartner.userId, page, limit },
    { refetchOnMountOrArgChange: true } // Disable caching
  );

  useEffect(() => {
    refetch();
    console.log("Relaoding again");
    setExpandedItems({});
  }, [refetch]);

  // Update Partners Data
  useEffect(() => {
    if (paginatedData?.transactions) {
      console.log(
        "Paginated data received for page",
        page,
        ":",
        paginatedData.transactions
      ); // Debug log
      setPartners((prev) => {
        // Filter out duplicates
        const newData = paginatedData.transactions.filter(
          (newItem) => !prev.some((prevItem) => prevItem._id === newItem._id)
        );
        return page === 1 ? paginatedData.transactions : [...prev, ...newData];
      });

      // Update hasMore correctly
      if (paginatedData.transactions.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [paginatedData, page]);

  // Load More Data
  const loadMore = () => {
    console.log("Loading more data..."); // Debug log
    if (!loading && hasMore) {
      setLoading(true);
      setPage((prev) => {
        console.log("Updating page to:", prev + 1); // Debug log
        return prev + 1;
      });
    }
  };

  // Handle Scroll for Pagination
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const threshold = 100; // Adjust this value as needed
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < threshold;
    console.log("Checking near bottom", isNearBottom); // Debug log
    if (isNearBottom && !loading && hasMore) {
      loadMore();
    }
  };
  // Reset loading state after data is fetched
  useEffect(() => {
    if (!fetchingPaginated) {
      setLoading(false);
    }
  }, [fetchingPaginated]);

  // Combined Loading State
  const isLoading = fetchingPaginated || loading;

  // Toggle item details
  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Reload component function
  const handleItemClick = (id) => {
    if (expandedItems[id]) {
      // If the same item is clicked, force reload by updating the reloadKey
      // setReloadKey((prevKey) => prevKey + 1);
    }
    toggleItem(id);
  };

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format("MMMM DD, YYYY");
  };

  const [selectedReceiptUrl, setSelectedReceiptUrl] = useState(null);

  //  FOR SHOWING RECEIPT

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // const handleOpenAlert = () => setIsAlertOpen(true);

  const handleOpenAlert = (item) => {
    setIsAlertOpen(true);
    if (item.paymentupdatereceipt) {
      setSelectedReceiptUrl(
        `${serverName}/uploads/deposit/${item.paymentupdatereceipt}`
      );
    } else {
      showErrorToast("No image available");
      setIsAlertOpen(false);
    }
  };
  const handleCloseAlert = () => setIsAlertOpen(false);

  function formatNumber(value) {
    if (typeof value === "string") {
      value = parseFloat(value); // Convert string to float if necessary
    }

    // Check if the number has decimals
    if (value % 1 === 0) {
      return value; // Return as is if it's a whole number
    } else {
      return parseFloat(value.toFixed(1)); // Return with one decimal point if it has decimals
    }
  }

  return (
    <div className="partner-main-container">
      <HeaderComp
        title={"Transaction History"}
        setSelectedCategory={setSelectedCategory}
        left={selectedPartner?.userId}
        right={selectedPartner?.name}
      />

      <div className="container-scrollable" onScroll={handleScroll}>
        {!loadingPaginated && partners.length === 0 ? (
          <NodataFound title={"No data Found"} />
        ) : (
          partners.map((item) => (
            <div
              key={(item) => item._id.toString()}
              onClick={() => toggleItem(item._id)}
              style={{
                minHeight: expandedItems[item._id] ? "20rem" : "8rem",
                backgroundColor: COLORS.background,
                borderRadius: "2rem",
              }}
            >
              <div className="h-content-org">
                {/** FIRST CONTAINER */}
                <div className="h-content-first-history">
                  <div className="iconcontainertop">
                    {item.transactionType === "Deposit" ? (
                      <PiHandDepositBold
                        color={
                          item.transactionType === "Deposit"
                            ? COLORS.result_lightblue
                            : item.transactionType === "Withdraw"
                            ? COLORS.orange
                            : COLORS.green
                        }
                        size={"3rem"}
                      />
                    ) : (
                      <PiHandWithdrawBold
                        color={
                          item.transactionType === "Deposit"
                            ? COLORS.result_lightblue
                            : item.transactionType === "Withdraw"
                            ? COLORS.orange
                            : COLORS.green
                        }
                        size={"3rem"}
                      />
                    )}
                  </div>
                </div>

                {/** SECOND CONTAINER */}
                <div className="h-content-second">
                  <div className="h-content-second-content-container-top">
                    <label className="h-content-second-content-container-top-amount">
                      {`Amount : \u00A0`}
                    </label>
                    <label className="h-content-second-content-container-top-amount-val">
                      {" "}
                      {formatNumber(item.amount)}{" "}
                      {user.country.countrycurrencysymbol}
                    </label>
                  </div>
                  <div className="h-content-second-content-container-bottom">
                    <label className="h-content-second-content-container-top-date">
                      {formatDateTime(item.createdAt)}
                    </label>
                  </div>
                </div>
                {/** THIRD CONTAINER */}
                <div className="h-content-third">
                  <div className="h-content-third-content-container-top">
                    <label className="h-content-third-content-container-top-payment">
                      Payment{" "}
                      {item.transactionType === "AdminUpdate"
                        ? "Type"
                        : "Method"}
                    </label>
                  </div>
                  <div className="h-content-third-content-container-bottom">
                    <label className="h-content-third-content-container-top-payment-val">
                      {item.transactionType === "AdminUpdate"
                        ? `${item?.walletName} W. ${item.paymentType}`
                        : item.paymentType}
                    </label>
                  </div>
                </div>
                {/** FOURTH CONTAINER */}
                <div className="h-content-fourth">
                  <div className="h-content-third-content-container-top">
                    <label className="h-content-third-content-container-top-payment">
                      {item.transactionType === "Deposit"
                        ? "Transaction ID"
                        : "Transaction type"}
                    </label>
                  </div>
                  <div className="h-content-third-content-container-bottom">
                    <label className="h-content-third-content-container-top-payment-val">
                      {item.transactionId
                        ? item.transactionId
                        : item.transactionType === "Transfer"
                        ? "Game to Withdraw W."
                        : item.transactionType}
                    </label>
                  </div>
                </div>
                {/** FIFTH CONTAINER */}
                <div className="h-content-fourth">
                  <div className="h-content-third-content-container-top">
                    {item.paymentStatus === "Completed" && (
                      <FaRegCheckCircle color={COLORS.green} size={"1.3rem"} />
                    )}
                    {item.paymentStatus === "Pending" && (
                      <MdPendingActions color={COLORS.yellow} size={"1.3rem"} />
                    )}
                    {item.paymentStatus === "Cancelled" && (
                      <FcCancel color={COLORS.red} size={"1.3rem"} />
                    )}
                  </div>
                  <div className="h-content-third-content-container-bottom">
                    <label
                      className="h-content-third-content-container-bottom-status"
                      style={{
                        color:
                          item.paymentStatus === "Completed"
                            ? COLORS.green
                            : item.paymentStatus === "Cancelled"
                            ? COLORS.red
                            : COLORS.yellow,
                      }}
                    >
                      {item.paymentStatus}
                    </label>
                  </div>
                </div>
              </div>

              <ImageAlertModal
                isOpen={isAlertOpen}
                onClose={handleCloseAlert}
                imageUrl={selectedReceiptUrl} // Use the state holding the selected receipt URL
              />

              {expandedItems[item._id] && (
                <>
                  <div
                    className="h-content-org"
                    style={{
                      borderTop: `1px solid ${COLORS.result_lightblue}`,
                    }}
                  >
                    {/** THIRD CONTAINER */}
                    <div className="h-content-third" style={{ flex: 1 }}>
                      <div className="h-content-third-content-container-top">
                        <label className="h-content-third-content-container-top-payment">
                          Receipt
                        </label>
                      </div>
                      <div
                        className="h-content-third-content-container-bottom"
                        onClick={() => handleOpenAlert(item)}
                      >
                        <label className="h-content-third-content-container-top-payment-val">
                          {item.paymentupdatereceipt ? "Show Receipt" : "NA"}
                        </label>
                      </div>
                    </div>

                    {/** FOURTH CONTAINER */}
                    <div className="h-content-fourth" style={{ flex: 4 }}>
                      <div className="h-content-third-content-container-top">
                        <label className="h-content-third-content-container-top-payment">
                          Note
                        </label>
                      </div>
                      <div className="h-content-third-content-container-bottom">
                        <label className="h-content-third-content-container-top-payment-val">
                          {item.paymentUpdateNote
                            ? item.paymentUpdateNote
                            : "NA"}
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}

        {/* Show Loader only when fetching new data */}
        {isLoading && hasMore && <Loader />}

        {/* Show "No more data" message if there's no more data to load */}
        {/* {!hasMore && !isLoading && (
              <div style={{ textAlign: "center", padding: "10px" }}>
                No more data to load.
              </div>
            )} */}
      </div>
    </div>
  );
};

export default UserTransactionHistory;
