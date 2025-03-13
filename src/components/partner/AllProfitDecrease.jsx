import React, { useEffect, useState } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import "./Partner.css";
import TextCon from "../molecule/TextCon";
import { FaCopy } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import { showSuccessToast } from "../helper/showErrorToast";
import { useSelector } from "react-redux";
import {
  useGetAboutPartnerQuery,
  useGetProfitDeductionListQuery,
} from "../../redux/api";
import Loader from "../molecule/Loader";
import AllPofitDecreseComp from "../molecule/AllPofitDecreseComp";
import { NodataFound } from "../helper/NodataFound";

const AllProfitDecrease = ({ setSelectedCategory }) => {
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
  } = useGetProfitDeductionListQuery(
    { accesstoken, userid: user?.userId, page, limit },
    { skip: debouncedSearch.length > 0, refetchOnMountOrArgChange: true } // Disable caching
  );

  console.log("Fetching paginated data for page:", page); // Debug log

  // Fetch Search Data
  // const { data: searchData, isFetching: fetchingSearch } =
  //   useSearchPartnerPartnerListQuery(
  //     debouncedSearch.length > 0
  //       ? { accesstoken, userId: user.userId, query: debouncedSearch }
  //       : { skip: true }
  //   );

  // Update Partners Data
  // useEffect(() => {
  //   if (debouncedSearch.length > 0 && searchData?.partnerList) {
  //     // Search Mode: Replace entire list
  //     setPartners(searchData.partnerList);
  //     setHasMore(false); // No pagination during search
  //   } else if (paginatedData?.partnerList) {
  //     console.log(
  //       "Paginated data received for page",
  //       page,
  //       ":",
  //       paginatedData.partnerList
  //     ); // Debug log
  //     setPartners((prev) => {
  //       // Filter out duplicates
  //       const newData = paginatedData.partnerList.filter(
  //         (newItem) => !prev.some((prevItem) => prevItem._id === newItem._id)
  //       );
  //       return page === 1 ? paginatedData.partnerList : [...prev, ...newData];
  //     });

  //     // Update hasMore correctly
  //     if (paginatedData.partnerList.length < limit) {
  //       setHasMore(false);
  //     } else {
  //       setHasMore(true);
  //     }
  //   }
  // }, [searchData, paginatedData, debouncedSearch, page]);

  useEffect(() => {
    if (paginatedData?.profitDeductions) {
      console.log(
        "Paginated data received for page",
        page,
        ":",
        paginatedData.profitDeductions
      ); // Debug log
      setPartners((prev) => {
        // Filter out duplicates
        const newData = paginatedData.profitDeductions.filter(
          (newItem) => !prev.some((prevItem) => prevItem._id === newItem._id)
        );
        return page === 1
          ? paginatedData.profitDeductions
          : [...prev, ...newData];
      });

      // Update hasMore correctly
      if (paginatedData.profitDeductions.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  }, [paginatedData, debouncedSearch, page]);

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
    if (!fetchingPaginated) {
      setLoading(false);
    }
  }, [fetchingPaginated]);

  // Combined Loading State
  const isLoading = fetchingPaginated || loading;
  const [expandedItems, setExpandedItems] = useState({});
  const toggleItem = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="partner-main-container">
      <HeaderComp
        title={"All Profit Decrease"}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="container-scrollable">
        {!loadingPaginated && (
          <AllPofitDecreseComp
            toggleItem={toggleItem}
            userId={"UserId"}
            name={"Name"}
            status={"Status"}
            backgroundcolor={COLORS.green}
            index={1}
          />
        )}

        {!loadingPaginated && partners.length === 0 ? (
          <NodataFound title={"No data Found"} />
        ) : (
          partners.map((item, index) => (
            <AllPofitDecreseComp
              key={index}
              toggleItem={toggleItem}
              userId={item.userId}
              name={item.name}
              status={"Pending"}
              clickpress={true}
              navigate={"PartnerDetails"}
              openPartnerDetails={toggleItem}
              expandedItems={expandedItems}
              setExpandedItems={setExpandedItems}
              reason={"Reason"}
              reasonValue={item.reason}
              index={index}
              item={item}
            />
          ))
        )}

        {isLoading && hasMore && <Loader />}
      </div>
    </div>
  );
};

export default AllProfitDecrease;
