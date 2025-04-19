import React, { useState, useEffect } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import SearchCon from "../molecule/SearchCon";
import COLORS from "../../assets/constants/colors";
import { useSelector } from "react-redux";
import {
  useCreateSubPartnerMutation,
  useGetAllRechargeQuery,
  useGetPartnerUserListQuery,
  useSearchPartnerUserListQuery,
  useUpdateDepositPaymentStatusMutation,
} from "../../redux/api";
import Loader from "../molecule/Loader";
import PartnerDetails from "./PartnerDetails";
import AllUserComp from "../molecule/AllUserComp";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import AllRechargeCom from "../molecule/AllRechargeCom";
import moment from "moment/moment";
import { serverName } from "../../redux/store";
import { CiCircleCheck, CiSearch } from "react-icons/ci";
import { LoadingComponent } from "../helper/LoadingComponent";
import { NodataFound } from "../helper/NodataFound";
import ImageAlertModalRemark from "../helper/ImageAlertModelRemark";
import AlertModalDeposit from "../helper/AlertModalDeposit";
import { MdOutlineCancel } from "react-icons/md";
import "./AllRecharge.css";

const AllRecharge = ({ setSelectedCategory, reloadKey, setReloadKey }) => {
  const { accesstoken, user } = useSelector((state) => state.user);

  // States
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    if (reloadKey > 0) {
      setSelectedCategory("");
      setReloadKey(0);
    }
  }, [reloadKey]);

  // Debounce Effect for Search (waits 500ms before updating)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Reset page, partners, and hasMore when search query changes
  useEffect(() => {
    setPage(1);
    setPartners([]); // Reset partners on search
    setHasMore(true);
  }, [debouncedSearch]);

  // Fetch Paginated Data
  // const {
  //   isLoading: allRechargeLoading,
  //   data: allRechargeData,
  //   error: allRechargeError,
  //   refetch,
  // } = useGetAllRechargeQuery({
  //   accesstoken,
  //   userId: user.userId,
  // });

  const {
    data: paginatedData,
    isFetching: fetchingPaginated,
    isLoading: loadingPaginated,
    refetch,
  } = useGetAllRechargeQuery(
    { accesstoken, userId: user.userId, page, limit },
    { skip: debouncedSearch.length > 0, refetchOnMountOrArgChange: true } // Disable caching
  );

  console.log("Fetching paginated data for page:", page); // Debug log
  console.log("All Recgarge Data:", paginatedData); // Debug log

  // Fetch Search Data
  const { data: searchData, isFetching: fetchingSearch } =
    useSearchPartnerUserListQuery(
      debouncedSearch.length > 0
        ? { accesstoken, userId: user.userId, query: debouncedSearch }
        : { skip: true }
    );

  // Update Partners Data
  useEffect(() => {
    if (debouncedSearch.length > 0 && searchData?.recharges) {
      // Search Mode: Replace entire list
      setPartners(searchData.recharges);
      setHasMore(false); // No pagination during search
    } else if (paginatedData?.recharges) {
      console.log(
        "Paginated data received for page",
        page,
        ":",
        paginatedData.recharges
      ); // Debug log
      setPartners((prev) => {
        // Filter out duplicates
        const newData = paginatedData.recharges.filter(
          (newItem) => !prev.some((prevItem) => prevItem._id === newItem._id)
        );
        return page === 1 ? paginatedData.recharges : [...prev, ...newData];
      });

      // Update hasMore correctly
      if (paginatedData.recharges.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [searchData, paginatedData, debouncedSearch, page]);

  // Load More Data
  const loadMore = () => {
    console.log("Loading more data..."); // Debug log
    if (!loading && hasMore && debouncedSearch.length === 0) {
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
    if (!fetchingPaginated && !fetchingSearch) {
      setLoading(false);
    }
  }, [fetchingPaginated, fetchingSearch]);

  // Combined Loading State
  const isLoading = fetchingPaginated || fetchingSearch || loading;

  // [FOR PARTNER DETAILS]
  const [showAllPartner, setShowAllPartner] = useState(true);
  const [showPartnerDetails, setShowPartnerDetails] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const openPartnerDetails = (partner) => {
    setSelectedPartner(partner);
    setShowAllPartner(false);
    setShowPartnerDetails(true);
  };

  const closePartnerDetails = () => {
    setSelectedPartner(null);
    setShowAllPartner(true);
    setShowPartnerDetails(false);
  };

  const [createSubPartner, { isLoading: subIsLoading, error: subError }] =
    useCreateSubPartnerMutation();

  const makePartner = async (item) => {
    console.log(item);
    setSelectedItem(item);

    try {
      const res = await createSubPartner({
        accesstoken,
        body: {
          userId: item.userId,
          parentId: user.userId,
        },
      }).unwrap();
      console.log("res :: " + JSON.stringify(res));
      showSuccessToast(
        res.message || res.data.message || "Partner added successfully"
      );

      await refetch();
    } catch (e) {
      console.log(e);
      showErrorToast("Something went wrong");
    }
  };

  const [expandedItems, setExpandedItems] = useState({});
  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const item = {
    _id: "8398393839",
    userId: "1009",
    name: "Aryan khan",
  };

  // ALL DEPOSSIT

  const [updateKey, setUpdateKey] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  // const [paymentUpdateNote,setpaymentUpdateNote] = useState("")
  // const [imageSource, setImageSource] = useState(null);

  const selectDoc = (e) => {
    try {
      console.log(e.target.files);
      setImageSource(e.target.files[0]);
    } catch (err) {
      console.log(err);
    }
  };

  // FOR UPDATING PAYMENT STATUS
  const [
    updateDepositPaymentStatus,
    { isLoading: updateStatusIsLoading, error: updateStatusError },
  ] = useUpdateDepositPaymentStatusMutation();

  useEffect(() => {
    if (updateStatusError) {
      showErrorToast(updateStatusError?.data?.message);
    }
  }, [updateStatusError]);

  const formatDateTime = (dateTimeString) => {
    return moment(dateTimeString).format("MMMM DD, YYYY hh:mm A");
  };

  // FOR ACCEPTING

  const acceptingData = async (
    item,
    paymentUpdateNote,
    imageSource,
    amount
  ) => {
    console.log("Accepting Data");

    setSelectedItem(item._id);
    if (isNaN(amount)) {
      showErrorToast("Enter valid amount");
    } else if (paymentUpdateNote && imageSource) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Completed");
      formData.append("paymentUpdateNote", paymentUpdateNote);
      formData.append("amount", amount);
      formData.append("paymentupdatereceipt", imageSource);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();
      setUpdateKey((prevKey) => prevKey + 1);

      showSuccessToast(res.message);
    } else if (paymentUpdateNote) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Completed");
      formData.append("amount", amount);
      formData.append("paymentUpdateNote", paymentUpdateNote);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();
      setUpdateKey((prevKey) => prevKey + 1);

      showSuccessToast(res.message);
    } else if (imageSource) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Completed");
      formData.append("amount", amount);
      formData.append("paymentupdatereceipt", imageSource);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();
      setUpdateKey((prevKey) => prevKey + 1);

      showSuccessToast(res.message);
    } else {
      // const body = {
      //   transactionId: item._id,
      //   paymentStatus: "Completed",
      // };

      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("amount", amount);
      formData.append("paymentStatus", "Completed");

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();
      setUpdateKey((prevKey) => prevKey + 1);

      showSuccessToast(res.message);
    }
  };

  // FOR CANCELLING

  const cancellingData = async (
    item,
    paymentUpdateNote,
    imageSource,
    amount
  ) => {
    console.log("Cancelling Data");
    setSelectedItem(item._id);
    if (isNaN(amount)) {
      showErrorToast("Enter valid amount");
    } else if (paymentUpdateNote && imageSource) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Cancelled");
      formData.append("paymentUpdateNote", paymentUpdateNote);
      formData.append("amount", amount);
      formData.append("paymentupdatereceipt", imageSource);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();
      setUpdateKey((prevKey) => prevKey + 1);

      showSuccessToast(res.message);
    } else if (paymentUpdateNote) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Cancelled");
      formData.append("amount", amount);
      formData.append("paymentUpdateNote", paymentUpdateNote);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();
      setUpdateKey((prevKey) => prevKey + 1);

      showSuccessToast(res.message);
    } else if (imageSource) {
      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("paymentStatus", "Cancelled");
      formData.append("amount", amount);
      formData.append("paymentupdatereceipt", imageSource);

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();
      setUpdateKey((prevKey) => prevKey + 1);

      showSuccessToast(res.message);
    } else {
      // const body = {
      //   transactionId: item._id,
      //   paymentStatus: "Completed",
      // };

      const formData = new FormData();
      formData.append("transactionId", item._id);
      formData.append("amount", amount);
      formData.append("paymentStatus", "Cancelled");

      console.log("FORM DATA :: " + JSON.stringify(formData));

      const res = await updateDepositPaymentStatus({
        accesstoken: accesstoken,
        body: formData,
      }).unwrap();

      await refetch();
      setUpdateKey((prevKey) => prevKey + 1);

      showSuccessToast(res.message);
    }
  };

  // FOR SHOWING RECEIPT

  const [alertVisibleAccepted, setAlertVisibleAccepted] = useState(false);
  const [alertVisibleRejected, setAlertVisibleRejected] = useState(false);

  const showAlertAccepted = (item) => {
    setAlertVisibleAccepted(true);
    setSelectedItemId(item._id);
    setSelectedItem(item);
  };

  const closeAlertAccepted = () => {
    setAlertVisibleAccepted(false);
  };

  const handleYesAccepted = ({ paymentUpdateNote, imageSource, amount }) => {
    // Handle the returned values here
    console.log("Payment Update Note:", paymentUpdateNote);
    console.log("Selected Image:", imageSource);

    setAlertVisibleAccepted(false);
    acceptingData(selectedItem, paymentUpdateNote, imageSource, amount);
    console.log("Yes pressed");
    // Do something with the note and image file
    // e.g., send it to the server or update the state
  };

  const showAlertRejected = (item) => {
    setAlertVisibleRejected(true);
    setSelectedItemId(item._id);
    setSelectedItem(item);
  };

  const closeAlertRejected = () => {
    setAlertVisibleRejected(false);
  };

  const handleYesRejected = ({ paymentUpdateNote, imageSource, amount }) => {
    // Handle the Yes action here
    setAlertVisibleRejected(false);
    cancellingData(selectedItem, paymentUpdateNote, imageSource, amount);
    console.log("Yes pressed");
  };

  //  FOR SHOWING RECEIPT

  const [alertVisibleReceipt, setAlertVisibleReceipt] = useState(false);

  const showAlertReceipt = (item) => {
    setSelectedImageId(item._id);
    setAlertVisibleReceipt(true);
  };

  const closeAlertReceipt = () => {
    setAlertVisibleReceipt(false);
  };

  const handleYesReceipt = () => {
    // Handle the Yes action here
    setAlertVisibleReceipt(false);
    console.log("Yes pressed");
  };

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedReceiptUrl, setSelectedReceiptUrl] = useState(null);

  // const handleOpenAlert = () => setIsAlertOpen(true);

  const [seletedImageId, setSelectedImageId] = useState("");
  const handleOpenAlert = (item) => {
    setSelectedImageId(item._id);
    setIsAlertOpen(true);
    setSelectedReceiptUrl(`${serverName}/uploads/deposit/${item.receipt}`);
  };
  const handleCloseAlert = () => setIsAlertOpen(false);

  // FOR USER DETIALS

  const [showUserDetail, setShowUserDetails] = useState(false);
  const [showDeposit, setShowDeposit] = useState(true);
  const [userdata, setUserData] = useState(null);

  const settingDeposit = (item) => {
    setShowDeposit(false);
    setUserData(item);
    setShowUserDetails(true);
  };

  const backhandlerDeposit = () => {
    setShowUserDetails(false);
    setShowDeposit(true);
  };

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
    <>
      {showDeposit && (
        <div className="allDepositContainer">
          <div className="head-con-ad">
            <HeaderComp
              title={"All Recharge"}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/** SEARCH CONTATINER */}
          {/* {!loadingPaginated && (
            <>
              <div
                className="head-con-ad"
                style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
              >
                <SearchCon
                  searchvalue={searchQuery}
                  setSearchValue={setSearchQuery}
                  placeholder={"Search for userid"}
                  iconname={"CiSearch"}
                />
              </div>
            </>
          )} */}

          {isLoading && page === 1 ? (
            <LoadingComponent />
          ) : partners.length === 0 ? (
            <NodataFound title={"No data found"} />
          ) : (
            <>
              <div className="dHeaderContainer">
                <div className="dHeaderContainerLabelContainerUIDAD">
                  <label className="dHeaderContainerLabelAD">UserID</label>
                </div>
                <div className="dHeaderContainerLabelContainerTIDAD">
                  <label className="dHeaderContainerLabelAD">
                    Transaction ID
                  </label>
                </div>
                <div className="dHeaderContainerLabelContainerPAAD">
                  <label className="dHeaderContainerLabelAD">
                    Payment method
                  </label>
                </div>
                <div className="dHeaderContainerLabelContainerRAD">
                  <label className="dHeaderContainerLabelAD">Receipt</label>
                </div>
                <div className="dHeaderContainerLabelContainerAAD">
                  <label className="dHeaderContainerLabelAD">Amount</label>
                </div>
                <div
                  className="dHeaderContainerLabelContainerACAD"
                  style={{
                    justifyContent: "center",
                    gap: "1rem",
                  }}
                >
                  <label className="dHeaderContainerLabelAD">Action</label>
                </div>
              </div>

              <div className="allLocationMainContainer" onScroll={handleScroll}>
                {partners.map((item, index) => {
                  // const calculatedAmount = item.convertedAmount
                  //   ? item.convertedAmount
                  //   : multiplyStringNumbers(
                  //       item.amount,
                  //       item.currency !== undefined
                  //         ? item.currency.countrycurrencyvaluecomparedtoinr
                  //         : 1
                  //     );

                  const calculatedAmount = item.amount;
                  const usercountry = item.currency;
                  const paymentType = item.paymentType;
                  const remark = item.remark;

                  return (
                    <div key={index} className="dContentContainer">
                      <div className="dHeaderContainerLabelContainerUIDAD">
                        <label className="dHeaderContainerLabelAD">
                          {item.userId}
                        </label>
                      </div>
                      <div
                        className="dHeaderContainerLabelContainerTIDAD"
                        // style={{ flex: 1.5 }}
                      >
                        <label className="dHeaderContainerLabelAD">
                          {item.transactionId}
                        </label>
                      </div>
                      <div className="dHeaderContainerLabelContainerPAAD">
                        <label className="dHeaderContainerLabelAD">
                          {" "}
                          {item.paymentType}
                        </label>
                      </div>
                      <div
                        className="dHeaderContainerLabelContainerRAD"
                        onClick={() => handleOpenAlert(item)}
                      >
                        <label
                          className="dHeaderContainerLabelAD"
                          style={{ cursor: "pointer" }}
                        >
                          Show Receipt
                        </label>
                      </div>
                      {seletedImageId === item._id && (
                        <ImageAlertModalRemark
                          isOpen={isAlertOpen}
                          onClose={handleCloseAlert}
                          imageUrl={selectedReceiptUrl} // Use the state holding the selected receipt URL
                          remark={remark} // Use the state holding the selected receipt URL
                        />
                      )}

                      <div className="dHeaderContainerLabelContainerAAD">
                        <label className="dHeaderContainerLabelAD">
                          {formatNumber(calculatedAmount)}
                        </label>
                      </div>
                      <div
                        className="dHeaderContainerLabelContainerACAD"
                        style={{
                          justifyContent: "center",
                          gap: "1rem",
                        }}
                      >
                        {updateStatusIsLoading &&
                        item._id === selectedItemId ? (
                          <LoadingComponent />
                        ) : (
                          <>
                            {selectedItemId === item._id && (
                              <>
                                {/** FOR ACCEPTING */}
                                <AlertModalDeposit
                                  isOpen={alertVisibleAccepted}
                                  onClose={closeAlertAccepted}
                                  onConfirm={handleYesAccepted}
                                  defaultAmount={calculatedAmount} // Pass the calculated amount
                                  usercountry={usercountry}
                                  paymentType={paymentType}
                                />
                                {/** FOR REJECTING */}
                                <AlertModalDeposit
                                  isOpen={alertVisibleRejected}
                                  onClose={closeAlertRejected}
                                  onConfirm={handleYesRejected}
                                  defaultAmount={calculatedAmount} // Pass the calculated amount
                                  usercountry={usercountry}
                                  paymentType={paymentType}
                                />
                              </>
                            )}

                            {item.paymentStatus === "Pending" && (
                              <div
                                className="allContentContainerIconContainer"
                                onClick={() => showAlertAccepted(item)}
                              >
                                <CiCircleCheck
                                  color={COLORS.background}
                                  size={"2.5rem"}
                                />
                              </div>
                            )}

                            {item.paymentStatus === "Pending" ? (
                              <label
                                className="dHeaderContainerLabelAD"
                                style={{ color: COLORS.orange }}
                              >
                                {item.paymentStatus}
                              </label>
                            ) : item.paymentStatus === "Completed" ? (
                              <label
                                className="dHeaderContainerLabelAD"
                                style={{ color: COLORS.green }}
                              >
                                {item.paymentStatus}
                              </label>
                            ) : (
                              <label
                                className="dHeaderContainerLabelAD"
                                style={{ color: COLORS.red }}
                              >
                                {item.paymentStatus}
                              </label>
                            )}

                            {item.paymentStatus === "Pending" && (
                              <div
                                className="allContentContainerIconContainer"
                                onClick={() => showAlertRejected(item)}
                              >
                                <MdOutlineCancel
                                  color={COLORS.background}
                                  size={"2.5rem"}
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isLoading && hasMore && <Loader />}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AllRecharge;

// import React, { useState, useEffect } from "react";
// import HeaderComp from "../helpercomp/HeaderComp";
// import SearchCon from "../molecule/SearchCon";
// import COLORS from "../../assets/constants/colors";
// import { useSelector } from "react-redux";
// import {
//   useCreateSubPartnerMutation,
//   useGetAllRechargeQuery,
//   useGetPartnerUserListQuery,
//   useSearchPartnerUserListQuery,
//   useUpdateDepositPaymentStatusMutation,
// } from "../../redux/api";
// import Loader from "../molecule/Loader";
// import PartnerDetails from "./PartnerDetails";
// import AllUserComp from "../molecule/AllUserComp";
// import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
// import AllRechargeCom from "../molecule/AllRechargeCom";
// import moment from "moment/moment";
// import { serverName } from "../../redux/store";

// const AllRecharge = ({ setSelectedCategory }) => {
//   const { accesstoken, user } = useSelector((state) => state.user);

//   // States
//   const [partners, setPartners] = useState([]);
//   const [page, setPage] = useState(1);
//   const limit = 10;
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedSearch, setDebouncedSearch] = useState("");

//   // Debounce Effect for Search (waits 500ms before updating)
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedSearch(searchQuery);
//     }, 500);
//     return () => clearTimeout(handler);
//   }, [searchQuery]);

//   // Reset page, partners, and hasMore when search query changes
//   useEffect(() => {
//     setPage(1);
//     setPartners([]); // Reset partners on search
//     setHasMore(true);
//   }, [debouncedSearch]);

//   // Fetch Paginated Data
//   // const {
//   //   isLoading: allRechargeLoading,
//   //   data: allRechargeData,
//   //   error: allRechargeError,
//   //   refetch,
//   // } = useGetAllRechargeQuery({
//   //   accesstoken,
//   //   userId: user.userId,
//   // });

//   const {
//     data: paginatedData,
//     isFetching: fetchingPaginated,
//     isLoading: loadingPaginated,
//     refetch,
//   } = useGetAllRechargeQuery(
//     { accesstoken, userId: user.userId, page, limit },
//     { skip: debouncedSearch.length > 0, refetchOnMountOrArgChange: true } // Disable caching
//   );

//   console.log("Fetching paginated data for page:", page); // Debug log
//   console.log("All Recgarge Data:", paginatedData); // Debug log

//   // Fetch Search Data
//   const { data: searchData, isFetching: fetchingSearch } =
//     useSearchPartnerUserListQuery(
//       debouncedSearch.length > 0
//         ? { accesstoken, userId: user.userId, query: debouncedSearch }
//         : { skip: true }
//     );

//   // Update Partners Data
//   useEffect(() => {
//     if (debouncedSearch.length > 0 && searchData?.recharges) {
//       // Search Mode: Replace entire list
//       setPartners(searchData.recharges);
//       setHasMore(false); // No pagination during search
//     } else if (paginatedData?.recharges) {
//       console.log(
//         "Paginated data received for page",
//         page,
//         ":",
//         paginatedData.recharges
//       ); // Debug log
//       setPartners((prev) => {
//         // Filter out duplicates
//         const newData = paginatedData.recharges.filter(
//           (newItem) => !prev.some((prevItem) => prevItem._id === newItem._id)
//         );
//         return page === 1 ? paginatedData.recharges : [...prev, ...newData];
//       });

//       // Update hasMore correctly
//       if (paginatedData.recharges.length < limit) {
//         setHasMore(false);
//       } else {
//         setHasMore(true);
//       }
//     }
//   }, [searchData, paginatedData, debouncedSearch, page]);

//   // Load More Data
//   const loadMore = () => {
//     console.log("Loading more data..."); // Debug log
//     if (!loading && hasMore && debouncedSearch.length === 0) {
//       setLoading(true);
//       setPage((prev) => {
//         console.log("Updating page to:", prev + 1); // Debug log
//         return prev + 1;
//       });
//     }
//   };

//   // Handle Scroll for Pagination
//   const handleScroll = (e) => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;
//     const threshold = 100; // Adjust this value as needed
//     const isNearBottom = scrollHeight - (scrollTop + clientHeight) < threshold;
//     console.log("Checking near bottom", isNearBottom); // Debug log
//     if (isNearBottom && !loading && hasMore) {
//       loadMore();
//     }
//   };

//   // Reset loading state after data is fetched
//   useEffect(() => {
//     if (!fetchingPaginated && !fetchingSearch) {
//       setLoading(false);
//     }
//   }, [fetchingPaginated, fetchingSearch]);

//   // Combined Loading State
//   const isLoading = fetchingPaginated || fetchingSearch || loading;

//   // [FOR PARTNER DETAILS]
//   const [showAllPartner, setShowAllPartner] = useState(true);
//   const [showPartnerDetails, setShowPartnerDetails] = useState(false);
//   const [selectedPartner, setSelectedPartner] = useState(null);

//   const openPartnerDetails = (partner) => {
//     setSelectedPartner(partner);
//     setShowAllPartner(false);
//     setShowPartnerDetails(true);
//   };

//   const closePartnerDetails = () => {
//     setSelectedPartner(null);
//     setShowAllPartner(true);
//     setShowPartnerDetails(false);
//   };

//   const [createSubPartner, { isLoading: subIsLoading, error: subError }] =
//     useCreateSubPartnerMutation();

//   const makePartner = async (item) => {
//     console.log(item);
//     setSelectedItem(item);

//     try {
//       const res = await createSubPartner({
//         accesstoken,
//         body: {
//           userId: item.userId,
//           parentId: user.userId,
//         },
//       }).unwrap();
//       console.log("res :: " + JSON.stringify(res));
//       showSuccessToast(
//         res.message || res.data.message || "Partner added successfully"
//       );

//       await refetch();
//     } catch (e) {
//       console.log(e);
//       showErrorToast("Something went wrong");
//     }
//   };

//   const [expandedItems, setExpandedItems] = useState({});
//   const toggleItem = (id) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const item = {
//     _id: "8398393839",
//     userId: "1009",
//     name: "Aryan khan",
//   };

//   // ALL DEPOSSIT

//   const [updateKey, setUpdateKey] = useState(0);
//   const [selectedItemId, setSelectedItemId] = useState("");
//   const [selectedItem, setSelectedItem] = useState(null);
//   // const [paymentUpdateNote,setpaymentUpdateNote] = useState("")
//   // const [imageSource, setImageSource] = useState(null);

//   const selectDoc = (e) => {
//     try {
//       console.log(e.target.files);
//       setImageSource(e.target.files[0]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // FOR UPDATING PAYMENT STATUS
//   const [
//     updateDepositPaymentStatus,
//     { isLoading: updateStatusIsLoading, error: updateStatusError },
//   ] = useUpdateDepositPaymentStatusMutation();

//   const formatDateTime = (dateTimeString) => {
//     return moment(dateTimeString).format("MMMM DD, YYYY hh:mm A");
//   };

//   // FOR ACCEPTING

//   const acceptingData = async (
//     item,
//     paymentUpdateNote,
//     imageSource,
//     amount
//   ) => {
//     console.log("Accepting Data");

//     setSelectedItem(item._id);
//     if (isNaN(amount)) {
//       showErrorToast("Enter valid amount");
//     } else if (paymentUpdateNote && imageSource) {
//       const formData = new FormData();
//       formData.append("transactionId", item._id);
//       formData.append("paymentStatus", "Completed");
//       formData.append("paymentUpdateNote", paymentUpdateNote);
//       formData.append("amount", amount);
//       formData.append("paymentupdatereceipt", imageSource);

//       console.log("FORM DATA :: " + JSON.stringify(formData));

//       const res = await updateDepositPaymentStatus({
//         accesstoken: accesstoken,
//         body: formData,
//       }).unwrap();

//       await refetch();
//       setUpdateKey((prevKey) => prevKey + 1);

//       showSuccessToast(res.message);
//     } else if (paymentUpdateNote) {
//       const formData = new FormData();
//       formData.append("transactionId", item._id);
//       formData.append("paymentStatus", "Completed");
//       formData.append("amount", amount);
//       formData.append("paymentUpdateNote", paymentUpdateNote);

//       console.log("FORM DATA :: " + JSON.stringify(formData));

//       const res = await updateDepositPaymentStatus({
//         accesstoken: accesstoken,
//         body: formData,
//       }).unwrap();

//       await refetch();
//       setUpdateKey((prevKey) => prevKey + 1);

//       showSuccessToast(res.message);
//     } else if (imageSource) {
//       const formData = new FormData();
//       formData.append("transactionId", item._id);
//       formData.append("paymentStatus", "Completed");
//       formData.append("amount", amount);
//       formData.append("paymentupdatereceipt", imageSource);

//       console.log("FORM DATA :: " + JSON.stringify(formData));

//       const res = await updateDepositPaymentStatus({
//         accesstoken: accesstoken,
//         body: formData,
//       }).unwrap();

//       await refetch();
//       setUpdateKey((prevKey) => prevKey + 1);

//       showSuccessToast(res.message);
//     } else {
//       // const body = {
//       //   transactionId: item._id,
//       //   paymentStatus: "Completed",
//       // };

//       const formData = new FormData();
//       formData.append("transactionId", item._id);
//       formData.append("amount", amount);
//       formData.append("paymentStatus", "Completed");

//       console.log("FORM DATA :: " + JSON.stringify(formData));

//       const res = await updateDepositPaymentStatus({
//         accesstoken: accesstoken,
//         body: formData,
//       }).unwrap();

//       await refetch();
//       setUpdateKey((prevKey) => prevKey + 1);

//       showSuccessToast(res.message);
//     }
//   };

//   // FOR CANCELLING

//   const cancellingData = async (
//     item,
//     paymentUpdateNote,
//     imageSource,
//     amount
//   ) => {
//     console.log("Cancelling Data");
//     setSelectedItem(item._id);
//     if (isNaN(amount)) {
//       showErrorToast("Enter valid amount");
//     } else if (paymentUpdateNote && imageSource) {
//       const formData = new FormData();
//       formData.append("transactionId", item._id);
//       formData.append("paymentStatus", "Cancelled");
//       formData.append("paymentUpdateNote", paymentUpdateNote);
//       formData.append("amount", amount);
//       formData.append("paymentupdatereceipt", imageSource);

//       console.log("FORM DATA :: " + JSON.stringify(formData));

//       const res = await updateDepositPaymentStatus({
//         accesstoken: accesstoken,
//         body: formData,
//       }).unwrap();

//       await refetch();
//       setUpdateKey((prevKey) => prevKey + 1);

//       showSuccessToast(res.message);
//     } else if (paymentUpdateNote) {
//       const formData = new FormData();
//       formData.append("transactionId", item._id);
//       formData.append("paymentStatus", "Cancelled");
//       formData.append("amount", amount);
//       formData.append("paymentUpdateNote", paymentUpdateNote);

//       console.log("FORM DATA :: " + JSON.stringify(formData));

//       const res = await updateDepositPaymentStatus({
//         accesstoken: accesstoken,
//         body: formData,
//       }).unwrap();

//       await refetch();
//       setUpdateKey((prevKey) => prevKey + 1);

//       showSuccessToast(res.message);
//     } else if (imageSource) {
//       const formData = new FormData();
//       formData.append("transactionId", item._id);
//       formData.append("paymentStatus", "Cancelled");
//       formData.append("amount", amount);
//       formData.append("paymentupdatereceipt", imageSource);

//       console.log("FORM DATA :: " + JSON.stringify(formData));

//       const res = await updateDepositPaymentStatus({
//         accesstoken: accesstoken,
//         body: formData,
//       }).unwrap();

//       await refetch();
//       setUpdateKey((prevKey) => prevKey + 1);

//       showSuccessToast(res.message);
//     } else {
//       // const body = {
//       //   transactionId: item._id,
//       //   paymentStatus: "Completed",
//       // };

//       const formData = new FormData();
//       formData.append("transactionId", item._id);
//       formData.append("amount", amount);
//       formData.append("paymentStatus", "Cancelled");

//       console.log("FORM DATA :: " + JSON.stringify(formData));

//       const res = await updateDepositPaymentStatus({
//         accesstoken: accesstoken,
//         body: formData,
//       }).unwrap();

//       await refetch();
//       setUpdateKey((prevKey) => prevKey + 1);

//       showSuccessToast(res.message);
//     }
//   };

//   // FOR SHOWING RECEIPT

//   const [alertVisibleAccepted, setAlertVisibleAccepted] = useState(false);
//   const [alertVisibleRejected, setAlertVisibleRejected] = useState(false);

//   const showAlertAccepted = (item) => {
//     setAlertVisibleAccepted(true);
//     setSelectedItemId(item._id);
//     setSelectedItem(item);
//   };

//   const closeAlertAccepted = () => {
//     setAlertVisibleAccepted(false);
//   };

//   const handleYesAccepted = ({ paymentUpdateNote, imageSource, amount }) => {
//     // Handle the returned values here
//     console.log("Payment Update Note:", paymentUpdateNote);
//     console.log("Selected Image:", imageSource);

//     setAlertVisibleAccepted(false);
//     acceptingData(selectedItem, paymentUpdateNote, imageSource, amount);
//     console.log("Yes pressed");
//     // Do something with the note and image file
//     // e.g., send it to the server or update the state
//   };

//   const showAlertRejected = (item) => {
//     setAlertVisibleRejected(true);
//     setSelectedItemId(item._id);
//     setSelectedItem(item);
//   };

//   const closeAlertRejected = () => {
//     setAlertVisibleRejected(false);
//   };

//   const handleYesRejected = ({ paymentUpdateNote, imageSource, amount }) => {
//     // Handle the Yes action here
//     setAlertVisibleRejected(false);
//     cancellingData(selectedItem, paymentUpdateNote, imageSource, amount);
//     console.log("Yes pressed");
//   };

//   //  FOR SHOWING RECEIPT

//   const [alertVisibleReceipt, setAlertVisibleReceipt] = useState(false);

//   const showAlertReceipt = (item) => {
//     setSelectedImageId(item._id);
//     setAlertVisibleReceipt(true);
//   };

//   const closeAlertReceipt = () => {
//     setAlertVisibleReceipt(false);
//   };

//   const handleYesReceipt = () => {
//     // Handle the Yes action here
//     setAlertVisibleReceipt(false);
//     console.log("Yes pressed");
//   };

//   const [isAlertOpen, setIsAlertOpen] = useState(false);
//   const [selectedReceiptUrl, setSelectedReceiptUrl] = useState(null);

//   // const handleOpenAlert = () => setIsAlertOpen(true);

//   const [seletedImageId, setSelectedImageId] = useState("");
//   const handleOpenAlert = (item) => {
//     setSelectedImageId(item._id);
//     setIsAlertOpen(true);
//     setSelectedReceiptUrl(`${serverName}/uploads/deposit/${item.receipt}`);
//   };
//   const handleCloseAlert = () => setIsAlertOpen(false);

//   // FOR USER DETIALS

//   const [showUserDetail, setShowUserDetails] = useState(false);
//   const [showDeposit, setShowDeposit] = useState(true);
//   const [userdata, setUserData] = useState(null);

//   const settingDeposit = (item) => {
//     setShowDeposit(false);
//     setUserData(item);
//     setShowUserDetails(true);
//   };

//   const backhandlerDeposit = () => {
//     setShowUserDetails(false);
//     setShowDeposit(true);
//   };

//   function formatNumber(value) {
//     if (typeof value === "string") {
//       value = parseFloat(value); // Convert string to float if necessary
//     }

//     // Check if the number has decimals
//     if (value % 1 === 0) {
//       return value; // Return as is if it's a whole number
//     } else {
//       return parseFloat(value.toFixed(1)); // Return with one decimal point if it has decimals
//     }
//   }

//   return (
//     <>
//       {showAllPartner && (
//         <div className="partner-main-container">
//           <HeaderComp
//             title={"All Recharge"}
//             setSelectedCategory={setSelectedCategory}
//           />

//           {!loadingPaginated && (
//             <>
//               <SearchCon
//                 searchvalue={searchQuery}
//                 setSearchValue={setSearchQuery}
//                 placeholder={"Search for partner"}
//                 iconname={"CiSearch"}
//               />
//               <AllRechargeCom
//                 userId={"UserId"}
//                 amount={"Amount"}
//                 name={"Name"}
//                 paymentMethod={"Payment Method"}
//                 transactionId={"Transaction Id"}
//                 receipt={"Receipt"}
//                 status={"Status"}
//                 remarks={"Remark"}
//                 backgroundcolor={COLORS.green}
//                 clickpress={false}
//               />
//             </>
//           )}

//           <div className="container-scrollable" onScroll={handleScroll}>
//             {partners.map((item, index) => (
//               <AllRechargeCom
//                 key={index}
//                 userId={item.userId}
//                 amount={item.convertedAmount}
//                 name={item.username}
//                 paymentMethod={item.paymentType}
//                 transactionId={item.transactionId}
//                 receipt={"Show Receipt"}
//                 status={item.paymentStatus}
//                 remarks={"Remark"}
//                 item={item}
//                 updateStatusIsLoading={false}
//                 seletectedItem={selectedItem}
//                 selectedItemId={selectedItemId}
//                 alertVisibleAccepted={alertVisibleAccepted}
//                 closeAlertAccepted={closeAlertAccepted}
//                 handleYesAccepted={handleYesAccepted}
//                 alertVisibleRejected={alertVisibleRejected}
//                 closeAlertRejected={closeAlertRejected}
//                 handleYesRejected={handleYesRejected}
//                 showAlertAccepted={showAlertAccepted}
//                 showAlertRejected={showAlertRejected}
//                 handleOpenAlert={handleOpenAlert}
//                 calculatedAmount={item.amount}
//                 usercountry={item.currency}
//                 paymentType={item.paymentType}
//                 clickpress={true}
//                 expandedItems={expandedItems}
//                 toggleItem={toggleItem}
//                 setExpandedItems={setExpandedItems}
//                 showAlertReceipt={showAlertReceipt}
//                 remark={item.remark}
//                 isAlertOpen={isAlertOpen}
//                 handleCloseAlert={handleCloseAlert}
//                 selectedReceiptUrl={selectedReceiptUrl}
//                 seletedImageId={seletedImageId}
//               />
//             ))}

//             {/* Show Loader only when fetching new data */}
//             {isLoading && hasMore && <Loader />}
//           </div>
//         </div>
//       )}

//       {showPartnerDetails && (
//         <PartnerDetails
//           closePartnerDetails={closePartnerDetails}
//           selectedPartner={selectedPartner}
//         />
//       )}
//     </>
//   );
// };

// export default AllRecharge;
