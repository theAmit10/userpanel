import React, { useState, useEffect } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import SearchCon from "../molecule/SearchCon";
import COLORS from "../../assets/constants/colors";
import { useSelector } from "react-redux";
import {
  useCreateSubPartnerMutation,
  useGetPartnerUserListQuery,
  useSearchPartnerUserListQuery,
} from "../../redux/api";
import Loader from "../molecule/Loader";
import PartnerDetails from "./PartnerDetails";
import AllUserComp from "../molecule/AllUserComp";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import AllUserDetails from "../alluser/AllUserDetails";
import AllUserDetailCom from "../molecule/AllUserDetailCom";

const AllUser = ({ setSelectedCategory, reloadKey, setReloadKey }) => {
  const { accesstoken, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (reloadKey > 0) {
      setSelectedCategory("");
      setReloadKey(0);
    }
  }, [reloadKey]);

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
    refetch,
  } = useGetPartnerUserListQuery(
    { accesstoken, userId: user.userId, page, limit },
    { skip: debouncedSearch.length > 0, refetchOnMountOrArgChange: true } // Disable caching
  );

  console.log("Fetching paginated data for page:", page); // Debug log

  // Fetch Search Data
  const { data: searchData, isFetching: fetchingSearch } =
    useSearchPartnerUserListQuery(
      debouncedSearch.length > 0
        ? { accesstoken, userId: user.userId, query: debouncedSearch }
        : { skip: true }
    );

  // Update Partners Data
  useEffect(() => {
    if (debouncedSearch.length > 0 && searchData?.userList) {
      // Search Mode: Replace entire list
      setPartners(searchData.userList);
      setHasMore(false); // No pagination during search
    } else if (paginatedData?.userList) {
      console.log(
        "Paginated data received for page",
        page,
        ":",
        paginatedData.userList
      ); // Debug log
      setPartners((prev) => {
        // Filter out duplicates
        const newData = paginatedData.userList.filter(
          (newItem) => !prev.some((prevItem) => prevItem._id === newItem._id)
        );
        return page === 1 ? paginatedData.userList : [...prev, ...newData];
      });

      // Update hasMore correctly
      if (paginatedData.userList.length < limit) {
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
  const [seletectedItem, setSelectedItem] = useState("");

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

  const removePartner = async (item) => {
    console.log(item);
    setSelectedItem(item);
    showErrorToast("Already Partner");
  };

  return (
    <>
      {showAllPartner && (
        <div className="partner-main-container">
          <HeaderComp
            title={"All Users"}
            setSelectedCategory={setSelectedCategory}
          />

          {!loadingPaginated && (
            <>
              <SearchCon
                searchvalue={searchQuery}
                setSearchValue={setSearchQuery}
                placeholder={"Search for user"}
                iconname={"CiSearch"}
              />
              <AllUserDetailCom
                userId={"UserId"}
                name={"Name"}
                country={"Country"}
                currency={"Currency"}
                backgroundcolor={COLORS.green}
              />
            </>
          )}

          <div className="container-scrollable" onScroll={handleScroll}>
            {partners.map((item, index) => (
              <AllUserDetailCom
                key={index}
                userId={item.userId}
                name={item.name}
                showActive={
                  user.parentPartnerId !== 1000 &&
                  user.parentParentPartnerId !== 1000
                    ? false
                    : true
                }
                status={
                  item.partnerType === "user" ? "Make Partner" : "Partnered"
                }
                item={item}
                country={item?.country?.countryname}
                currency={item?.country?.countrycurrencysymbol}
                loading={subIsLoading}
                makePartner={makePartner}
                seletectedItem={seletectedItem}
                setSelectedItem={setSelectedItem}
                clickpress={true}
                openPartnerDetails={openPartnerDetails}
              />
            ))}

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
        <AllUserDetails
          userdata={selectedPartner}
          backhandlerDeposit={closePartnerDetails}
        />
      )}
    </>
  );
};

export default AllUser;
