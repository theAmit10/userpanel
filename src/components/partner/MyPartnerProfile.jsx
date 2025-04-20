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

const MyPartnerProfile = ({ setSelectedCategory, reloadKey, setReloadKey }) => {
  useEffect(() => {
    if (reloadKey > 0) {
      setSelectedCategory("");
      setReloadKey(0);
    }
  }, [reloadKey]);

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

  const { accesstoken, user, loadingSingleUser, singleuser } = useSelector(
    (state) => state.user
  );

  const userid = user.userId;

  const { isLoading, error, data } = useGetAboutPartnerQuery({
    accesstoken,
    userid,
  });
  const [partner, setpartner] = useState(null);

  useEffect(() => {
    if (!isLoading && data) {
      setpartner(data.partner);
      console.log("Hey data");
      console.log("Hey data", data.partner.rechargeModule);
    }
    if (error) {
      console.log(error);
    }
  }, [data, isLoading, error]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(loadSingleUser(accesstoken, user.userId));
    }
  }, [user]);

  return (
    <div className="partner-main-container">
      <HeaderComp title={"Profile"} setSelectedCategory={setSelectedCategory} />
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

          <TextCon
            title={"Profit Percentage"}
            value={partner.profitPercentage}
          />
          {partner.rechargeModule !== undefined && (
            <TextCon
              title={"Recharge Percentage"}
              value={partner.rechargePercentage}
            />
          )}

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

export default MyPartnerProfile;
