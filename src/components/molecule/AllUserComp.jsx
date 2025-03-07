import React from "react";
import "./TextCon.css";
import TextLabel from "../atom/TextLabel";
import IconButton from "../atom/IconButton";
import Loader from "../molecule/Loader";
import COLORS from "../../assets/constants/colors";
import { showErrorToast } from "../helper/showErrorToast";

const AllUserComp = ({
  userId,
  name,
  seletectedItem,
  backgroundcolor,
  showActive,
  item,
  status,
  clickpress = false,
  loading,
  makePartner,
  setSelectedItem,
}) => {
  const handlePress = () => {
    console.log("handlePress triggered!", { clickpress });

    if (!clickpress) {
      console.log("clickpress is false, function is not executing further.");
      return;
    }

    console.log("Item:", item);
    setSelectedItem(item);

    if (item.partnerType === "user") {
      console.log("Calling activatingPartner...");
      activatingPartner();
    } else {
      console.log("Calling alredyPartner...");
      alredyPartner();
    }
  };

  const activatingPartner = () => {
    console.log("Activating partner");
    makePartner(item);
  };

  const alredyPartner = () => {
    console.log("Activating partner");
    showErrorToast("Already Partner");
  };

  return (
    <div
      className="allpartnerheader-con"
      style={{
        backgroundColor: backgroundcolor,
        cursor: clickpress ? "pointer" : "default",
      }}
    >
      <div className="child-small">
        <TextLabel label={userId} />
      </div>
      <div className="child-large">
        <TextLabel label={name} />
      </div>

      {showActive && (
        <div className="child-medium">
          {item.partnerType === "user" ? (
            loading ? (
              seletectedItem._id === item._id ? (
                <Loader />
              ) : (
                <IconButton
                  label={status}
                  style={{ backgroundColor: COLORS.blue }}
                  onClickHandler={handlePress}
                />
              )
            ) : (
              <IconButton
                label={status}
                style={{ backgroundColor: COLORS.blue }}
                onClickHandler={handlePress}
              />
            )
          ) : (
            <IconButton
              label={status}
              style={{ backgroundColor: COLORS.green }}
              onClickHandler={handlePress}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AllUserComp;
