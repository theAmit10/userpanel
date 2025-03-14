import React, { useState, useEffect } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import SearchCon from "../molecule/SearchCon";
import AllPartnerHeader from "../molecule/AllPartnerHeader";
import COLORS from "../../assets/constants/colors";
import { useSelector } from "react-redux";
import {
  useGetPartnerPartnerListQuery,
  useSearchPartnerPartnerListQuery,
} from "../../redux/api";
import Loader from "../molecule/Loader";
import PartnerDetails from "./PartnerDetails";
import { NodataFound } from "../helper/NodataFound";

const AllPartner = ({ setSelectedCategory }) => {
  const { accesstoken, user } = useSelector((state) => state.user);

  // States
  const [partners, setPartners] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

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
  const {
    data: paginatedData,
    isFetching: fetchingPaginated,
    isLoading: loadingPaginated,
  } = useGetPartnerPartnerListQuery(
    { accesstoken, userid: user.userId, page, limit },
    { skip: debouncedSearch.length > 0, refetchOnMountOrArgChange: true } // Disable caching
  );

  console.log("Fetching paginated data for page:", page); // Debug log

  // Fetch Search Data
  const { data: searchData, isFetching: fetchingSearch } =
    useSearchPartnerPartnerListQuery(
      debouncedSearch.length > 0
        ? { accesstoken, userId: user.userId, query: debouncedSearch }
        : { skip: true }
    );

  // Update Partners Data
  useEffect(() => {
    if (debouncedSearch.length > 0 && searchData?.partnerList) {
      // Search Mode: Replace entire list
      setPartners(searchData.partnerList);
      setHasMore(false); // No pagination during search
    } else if (paginatedData?.partnerList) {
      console.log(
        "Paginated data received for page",
        page,
        ":",
        paginatedData.partnerList
      ); // Debug log
      setPartners((prev) => {
        // Filter out duplicates
        const newData = paginatedData.partnerList.filter(
          (newItem) => !prev.some((prevItem) => prevItem._id === newItem._id)
        );
        return page === 1 ? paginatedData.partnerList : [...prev, ...newData];
      });

      // Update hasMore correctly
      if (paginatedData.partnerList.length < limit) {
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

  return (
    <>
      {showAllPartner && (
        <div className="partner-main-container">
          <HeaderComp
            title={"All Partner"}
            setSelectedCategory={setSelectedCategory}
          />

          {!loadingPaginated && (
            <>
              <SearchCon
                searchvalue={searchQuery}
                setSearchValue={setSearchQuery}
                placeholder={"Search for partner"}
                iconname={"CiSearch"}
              />
              <AllPartnerHeader
                userId={"User ID"}
                name={"Name"}
                profit={"Profit Percentage"}
                recharge={"Recharge Percentage"}
                totaluser={"Total no. of User's"}
                balance={"Game Balance"}
                backgroundcolor={COLORS.green}
                showActive={true}
                status={"Status"}
                clickpress={false}
              />
            </>
          )}

          <div className="container-scrollable" onScroll={handleScroll}>
            {!loadingPaginated && partners.length === 0 ? (
              <NodataFound title={"No Partner Found"} />
            ) : (
              partners.map((item) => (
                <AllPartnerHeader
                  key={item._id}
                  userId={item.userId}
                  name={item.name}
                  profit={item.profitPercentage}
                  recharge={item.rechargePercentage}
                  totaluser={item.userList.length}
                  balance={item.walletTwo?.balance}
                  backgroundcolor={COLORS.background}
                  showActive={true}
                  item={item}
                  status={item.partnerStatus ? "Active" : "Inactive"}
                  clickpress={true}
                  navigate={"PartnerDetails"}
                  openPartnerDetails={openPartnerDetails}
                />
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
      )}

      {showPartnerDetails && (
        <PartnerDetails
          closePartnerDetails={closePartnerDetails}
          selectedPartner={selectedPartner}
        />
      )}
    </>
  );
};

export default AllPartner;
