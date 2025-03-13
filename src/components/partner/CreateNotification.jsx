import React, { useEffect, useState } from "react";
import HeaderComp from "../helpercomp/HeaderComp";
import "./Partner.css";
import TextCon from "../molecule/TextCon";
import { FaCopy } from "react-icons/fa";
import COLORS from "../../assets/constants/colors";
import { showErrorToast, showSuccessToast } from "../helper/showErrorToast";
import { useSelector } from "react-redux";
import {
  useCreateNotificationMutation,
  useGetAboutPartnerQuery,
} from "../../redux/api";
import Loader from "../molecule/Loader";
import SearchCon from "../molecule/SearchCon";
import TextInputCon from "../molecule/TextInputCon";
import SubmitButton from "../atom/SubmitButton";

const CreateNotification = ({ setSelectedCategory, selectedPartner }) => {
  const { accesstoken, user } = useSelector((state) => state.user);

  const userid = selectedPartner.userId;

  const [titleValue, setTitle] = useState("");
  const [discriptionValue, setDescription] = useState("");

  const [createNotification, { isLoading }] = useCreateNotificationMutation();

  const submitHandler = async () => {
    console.log("submitHandler");
    try {
      if (!titleValue) {
        showErrorToast("Enter Title");
        return;
      }
      if (!discriptionValue) {
        showErrorToast("Enter Decription");
        return;
      }

      const body = {
        title: titleValue,
        description: discriptionValue,
        userId: selectedPartner.userId,
      };
      const res = await createNotification({
        accesstoken,
        body,
      });
      console.log(JSON.stringify(res));
      setTitle("");
      setDescription("");
      showSuccessToast(res.data.message);
    } catch (e) {
      console.log(e);
      showErrorToast("Something went wrong");
    }
  };

  return (
    <div className="partner-main-container">
      <HeaderComp
        title={"Send Notification"}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="container-scrollable">
        <TextInputCon
          placeholder={"Enter title"}
          iconname={"LuFileText"}
          title={"Title"}
          searchvalue={titleValue}
          setSearchValue={setTitle}
        />

        <TextInputCon
          placeholder={"Enter Description"}
          iconname={"LuFileText"}
          title={"Description"}
          searchvalue={discriptionValue}
          setSearchValue={setDescription}
        />

        {isLoading ? (
          <Loader />
        ) : (
          <SubmitButton
            label={"Send Notification"}
            onClickHandler={submitHandler}
          />
        )}
      </div>
    </div>
  );
};

export default CreateNotification;
