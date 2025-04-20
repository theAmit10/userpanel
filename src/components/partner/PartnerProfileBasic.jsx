import React, { useEffect, useState } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import "./Partner.css";
import TextCon from "../molecule/TextCon";
import { FaCopy } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import { showSuccessToast } from "../helper/showErrorToast";
import { useDispatch, useSelector } from "react-redux";
import { useGetAboutPartnerQuery } from "../../redux/api";
import Loader from "../molecule/Loader";
import { loadSingleUser } from "../../redux/actions/userAction";

const PartnerProfileBasic = ({ setSelectedCategory, selectedPartner }) => {
  const handleCopyClick = (e, stringToCopy) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(stringToCopy)
      .then(() => {
        showSuccessToast("Text Copied");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const { accesstoken, singleuser, loadingSingleUser, user } = useSelector(
    (state) => state.user
  );

  const userid = selectedPartner.userId;

  // const { isLoading, error, data } = useGetAboutPartnerQuery({
  //   accesstoken,
  //   userid,
  // });

  const { isLoading, error, data } = useGetAboutPartnerQuery({
    accesstoken,
    userid,
  });
  // const { isLoading, data, refetch, error } = useGetSinglePartnerQuery({
  //   accesstoken,
  //   userId: selectedPartner?.userId,
  // });
  const [partner, setpartner] = useState(null);

  useEffect(() => {
    if (!isLoading && data) {
      setpartner(data.partner);
    }
    if (error) {
      console.log(error);
    }
  }, [data, isLoading, error]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedPartner) {
      dispatch(loadSingleUser(accesstoken, selectedPartner.userId));
    }
  }, [selectedPartner]);

  return (
    <div className="partner-main-container">
      <HeaderComp
        title={"Partner Profile"}
        setSelectedCategory={setSelectedCategory}
        left={selectedPartner?.userId}
        right={selectedPartner?.name}
      />
      {isLoading || !partner || loadingSingleUser || !singleuser ? (
        <Loader />
      ) : (
        <div className="container-scrollable">
          <div className="textConContainer">
            <label className="textConLabel">Partner ID</label>
            <div className="textContainer">
              <label className="textConLabel">{partner.userId}</label>
              <div
                onClick={(e) => handleCopyClick(e, partner.userId.toString())}
                className="copyCon"
              >
                <FaCopy color={COLORS.background} size={"2rem"} />
              </div>
            </div>
          </div>
          <TextCon title={"Name"} value={partner.name} />
          {/* <TextCon title={"Country"} value={partner.userList.length} />
          <TextCon title={"Currency"} value={partner.userList.length} /> */}

          <TextCon
            title={"Profit Percentage"}
            value={partner.profitPercentage}
          />
          {/* {partner.rechargeModule !== undefined && (
            <TextCon
              title={"Recharge Percentage"}
              value={partner.rechargePercentage}
            />
          )} */}

          <TextCon
            title={"Total no. of user's"}
            value={partner.userList.length}
          />
          <TextCon title={"Country"} value={singleuser?.country?.countryname} />
          <TextCon
            title={"Currency"}
            value={singleuser?.country?.countrycurrencysymbol}
          />
        </div>
      )}
    </div>
  );
};

export default PartnerProfileBasic;

// const PartnerProfileBasic = ({ setSelectedCategory, selectedPartner }) => {
//   const handleCopyClick = (e, stringToCopy) => {
//     e.stopPropagation();
//     navigator.clipboard
//       .writeText(stringToCopy)
//       .then(() => {
//         showSuccessToast("Text Copied");
//       })
//       .catch((err) => {
//         console.error("Failed to copy text: ", err);
//       });
//   };

//   const { accesstoken, user } = useSelector((state) => state.user);

//   const userid = selectedPartner.userId;

//   const { isLoading, error, data } = useGetAboutPartnerQuery({
//     accesstoken,
//     userid,
//   });
//   const [partner, setpartner] = useState(null);

//   useEffect(() => {
//     if (!isLoading && data) {
//       setpartner(data.partner);
//       console.log("Hey data");
//       console.log("Hey data", data.partner.rechargeModule);
//     }
//     if (error) {
//       console.log(error);
//     }
//   }, [data, isLoading, error]);

//   return (
//     <div className="partner-main-container">
//       <HeaderComp
//         title={"Partner Profile"}
//         setSelectedCategory={setSelectedCategory}
//         left={selectedPartner?.userId}
//         right={selectedPartner?.name}
//       />
//       {isLoading || !partner ? (
//         <Loader />
//       ) : (
//         <div className="container-scrollable">
//           <div className="textConContainer">
//             <label className="textConLabel">Partner ID</label>
//             <div className="textContainer">
//               <label className="textConLabel">{partner.userId}</label>
//               <div
//                 onClick={(e) => handleCopyClick(e, partner.userId.toString())}
//                 className="copyCon"
//               >
//                 <FaCopy color={COLORS.background} size={"2rem"} />
//               </div>
//             </div>
//           </div>
//           <TextCon title={"Name"} value={partner.name} />
//           {/* <TextCon title={"Country"} value={partner.userList.length} />
//           <TextCon title={"Currency"} value={partner.userList.length} /> */}
//           <TextCon
//             title={"Profit Percentage"}
//             value={partner.profitPercentage}
//           />
//           {partner.rechargeModule !== undefined && (
//             <TextCon
//               title={"Recharge Percentage"}
//               value={partner.rechargePercentage}
//             />
//           )}

//           <TextCon
//             title={"Total no. of user's"}
//             value={partner.userList.length}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default PartnerProfileBasic;
