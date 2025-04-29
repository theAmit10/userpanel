import React, { useEffect, useState } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import "./Partner.css";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../helper/showErrorToast";
import { useSelector } from "react-redux";
import {
  useGetAboutPartnerQuery,
  useUpdateProfitPercentageMutation,
} from "../../redux/api";
import Loader from "../molecule/Loader";
import TextInputCon from "../molecule/TextInputCon";
import SubmitButton from "../atom/SubmitButton";

const checkValidPercentageCriteria = (profit, recharge) => {
  const numProfit = Number(profit);
  const numRecharge = Number(recharge);

  if (isNaN(numProfit) || isNaN(numRecharge)) {
    console.error("Invalid input: Both values must be numbers");
    return false;
  }

  return numProfit + numRecharge <= 100;
};

const IncreasePercetage = ({ setSelectedCategory, selectedPartner }) => {
  const { accesstoken, user } = useSelector((state) => state.user);
  const [parentUserId, setParentUserId] = useState("");
  const [parentProfitPercentage, setParentProfitPercentage] = useState(0);

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
      if (
        !checkProfitMustLessThenParentProfit(
          profitPercentage,
          parentProfitPercentage
        )
      ) {
        showErrorToast(
          `New percentage must be lower than the ${parentProfitPercentage}`
        );
        return;
      }

      if (
        !checkValidPercentageCriteria(
          profitPercentage,
          selectedPartner.rechargePercentage
        )
      ) {
        showErrorToast("Percentage is too high");
        return;
      }

      showWarningToast("Gooing good");

      // const res = await updateProfitPercentage({
      //   accesstoken,
      //   body: {
      //     partnerId: selectedPartner.userId,
      //     profitPercentage: Number.parseInt(profitPercentage),
      //   },
      // });
      // console.log(JSON.stringify(res));
      // setProfitPercentage("");
      // showSuccessToast(res.data.message);
    } catch (e) {
      console.log(e);
      showErrorToast("Something went wrong");
    }
  };

  const { isLoading: singlePartnerIsloading, data: singlePartnerData } =
    useGetAboutPartnerQuery(
      {
        accesstoken,
        userid: parentUserId,
      },
      { skip: !parentUserId }
    );

  // CHECKING FOR THE PARENT USER ID
  useEffect(() => {
    if (selectedPartner && selectedPartner.parentPartnerId === 1000) {
      setParentUserId(selectedPartner.userId);
    } else {
      setParentUserId(selectedPartner.parentPartnerId);
    }
  }, []);

  useEffect(() => {
    if (!singlePartnerIsloading && singlePartnerData) {
      setParentProfitPercentage(singlePartnerData.partner.profitPercentage);
    }
  }, [singlePartnerIsloading, singlePartnerData, parentUserId]);

  console.log(parentUserId);
  console.log(singlePartnerData);
  console.log(parentProfitPercentage);

  const checkProfitMustLessThenParentProfit = (profit, parentProfit) => {
    const numProfit = Number(profit);
    const numParentProfit = Number(parentProfit);
    return numProfit < numParentProfit;
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
