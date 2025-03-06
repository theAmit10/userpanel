import React, { useState } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import "./Partner.css";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { useSelector } from "react-redux";
import { useDecreasePartnerProfitMutation } from "../../redux/api";
import Loader from "../molecule/Loader";
import TextInputCon from "../molecule/TextInputCon";
import SubmitButton from "../atom/SubmitButton";
import TextAreaCon from "../molecule/TextAreaCon";

const DecreasePercentage = ({ setSelectedCategory, selectedPartner }) => {
  const { accesstoken, user } = useSelector((state) => state.user);

  const [profitPercentage, setProfitPercentage] = useState("");
  const [reason, setReason] = useState("");
  const [decreasePartnerProfit, { isLoading, data, error }] =
    useDecreasePartnerProfitMutation();

  const submitHandler = async () => {
    console.log("submitHandler");
    try {
      if (!profitPercentage) {
        showErrorToast("Enter Profit Percentage");
        return;
      }
      if (isNaN(profitPercentage)) {
        showErrorToast("Please enter valid profit percentage");
        return;
      }
      if (!reason) {
        showErrorToast("Enter Reason");
        return;
      }
      if (
        Number.parseInt(selectedPartner.profitPercentage) <=
        Number.parseInt(profitPercentage)
      ) {
        showErrorToast("New percentage must be higher than the current one");
        return;
      }

      const res = await decreasePartnerProfit({
        accesstoken,
        body: {
          userId: selectedPartner.userId,
          partnerId: user.userId,
          profitPercentage: profitPercentage,
          reason: reason,
        },
      });
      console.log(JSON.stringify(res));
      setProfitPercentage("");
      setReason("");
      showSuccessToast(res.data.message);
    } catch (e) {
      console.log(e);
      showErrorToast("Something went wrong");
    }
  };

  return (
    <div className="partner-main-container">
      <HeaderComp
        title={"Decrease Percentage"}
        setSelectedCategory={setSelectedCategory}
        left={selectedPartner?.userId}
        right={selectedPartner?.name}
      />
      {false ? (
        <Loader />
      ) : (
        <div className="container-scrollable">
          <TextInputCon
            placeholder={"Old Percentage"}
            iconname={"LuFileText"}
            title={"Old Profit Percentage"}
            searchvalue={selectedPartner.profitPercentage}
            disabled={true}
          />

          <TextInputCon
            title={"New Profit Percentage"}
            iconname={"LuFileText"}
            placeholder={"Enter new profit percentage"}
            searchvalue={profitPercentage}
            setSearchValue={setProfitPercentage}
          />

          <TextAreaCon
            placeholder={"Enter profit deduction reason"}
            iconname={"LuFileText"}
            title={"Reason"}
            searchvalue={reason}
            setSearchValue={setReason}
          />

          {isLoading ? (
            <Loader />
          ) : (
            <SubmitButton label={"Submit"} onClickHandler={submitHandler} />
          )}
        </div>
      )}
    </div>
  );
};

export default DecreasePercentage;
