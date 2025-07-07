import React from "react";
import "./TextCon.css";
import TextLabel from "../atom/TextLabel";
import IconButton from "../atom/IconButton";
import Loader from "../molecule/Loader";
import COLORS from "../../assets/constants/colors";
import { showErrorToast } from "../helper/showErrorToast";

const AllUserDetailCom = ({
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
  openPartnerDetails,
  showActivePartnerButton,
  country,
  currency,
}) => {
  // const handlePress = () => {
  //   console.log("handlePress triggered!", { clickpress });

  //   if (!clickpress) {
  //     console.log("clickpress is false, function is not executing further.");
  //     return;
  //   }

  //   console.log("Item:", item);
  //   setSelectedItem(item);

  //   if (item.partnerType === "user") {
  //     console.log("Calling activatingPartner...");
  //     activatingPartner();
  //   } else {
  //     console.log("Calling alredyPartner...");
  //     alredyPartner();
  //   }
  // };

  const handlePress = (e) => {
    e.stopPropagation(); // Prevents the parent div's click event from triggering
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

  const handleMainPress = () => {
    if (clickpress) {
      console.log(item);
      openPartnerDetails(item);
    }
  };

  return (
    <div
      onClick={handleMainPress}
      className="allpartnerheader-con"
      style={{
        backgroundColor: backgroundcolor,
        cursor: clickpress ? "pointer" : "default",
      }}
    >
      <div className="child-small">
        <TextLabel label={userId} />
      </div>

      <div className="child-small">
        <TextLabel label={country} />
      </div>
      <div className="child-small">
        <TextLabel label={currency} />
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
                  onClickHandler={(e) => handlePress(e)}
                />
              )
            ) : (
              <IconButton
                label={status}
                style={{ backgroundColor: COLORS.blue }}
                onClickHandler={(e) => handlePress(e)}
              />
            )
          ) : (
            <IconButton
              label={status}
              style={{ backgroundColor: COLORS.green }}
              onClickHandler={(e) => handlePress(e)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AllUserDetailCom;
