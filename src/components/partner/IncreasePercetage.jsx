import React, { useState } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import "./Partner.css";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { useSelector } from "react-redux";
import { useUpdateProfitPercentageMutation } from "../../redux/api";
import Loader from "../molecule/Loader";
import TextInputCon from "../molecule/TextInputCon";
import SubmitButton from "../atom/SubmitButton";

const IncreasePercetage = ({ setSelectedCategory, selectedPartner }) => {
  const { accesstoken, user } = useSelector((state) => state.user);

  const [profitPercentage, setProfitPercentage] = useState("");
  const [updateProfitPercentage, { isLoading, error }] =
    useUpdateProfitPercentageMutation();

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
      if (
        Number.parseInt(selectedPartner.profitPercentage) >=
        Number.parseInt(profitPercentage)
      ) {
        showErrorToast("New percentage must be higher than the current one");
        return;
      }

      const res = await updateProfitPercentage({
        accesstoken,
        body: {
          partnerId: selectedPartner.userId,
          profitPercentage: Number.parseInt(profitPercentage),
        },
      });
      console.log(JSON.stringify(res));
      setProfitPercentage("");
      showSuccessToast(res.data.message);
    } catch (e) {
      console.log(e);
      showErrorToast("Something went wrong");
    }
  };

  return (
    <div className="partner-main-container">
      <HeaderComp
        title={"Increase Percentage"}
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
            placeholder={"New Profit Percentage"}
            iconname={"LuFileText"}
            title={"Enter new profit percentage"}
            searchvalue={profitPercentage}
            setSearchValue={setProfitPercentage}
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

export default IncreasePercetage;
