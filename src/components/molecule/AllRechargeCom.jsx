import React from "react";
import "./TextCon.css";
import TextLabel from "../atom/TextLabel";
import Loader from "./Loader";
import { CiCircleCheck } from "react-icons/ci";
import COLORS from "../../assets/constants/colors";
import AlertModalDeposit from "../helper/AlertModalDeposit";
import { MdOutlineCancel } from "react-icons/md";

const AllRechargeCom = ({
  userId,
  name,
  reason,
  reasonValue,
  totaluser,
  balance,
  backgroundcolor,
  showActive,
  item,
  status,
  clickpress,
  navigate,
  openPartnerDetails,
  toggleItem,
  expandedItems,
  setExpandedItems,
  index,
  paymentMethod,
  transactionId,
  receipt,
  remarks,
  amount,
  seletectedItem,
  selectedItemId,
  updateStatusIsLoading,
  alertVisibleAccepted,
  closeAlertAccepted,
  handleYesAccepted,
  alertVisibleRejected,
  closeAlertRejected,
  handleYesRejected,
  showAlertAccepted,
  showAlertRejected,
  handleOpenAlert,
}) => {
  const handlePress = () => {
    if (clickpress) {
      toggleItem(item._id); // Pass only the item's _id, not the whole object
    }
  };
  return (
    <div className="allprofitdecrease-con">
      <div
        className="allpartnerheader-con"
        onClick={handlePress}
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
        <div className="child-small">
          <TextLabel label={paymentMethod} />
        </div>
        <div className="child-small">
          <TextLabel label={transactionId} />
        </div>
        <div className="child-small">
          <TextLabel label={receipt} />
        </div>
        <div className="child-small">
          <TextLabel label={receipt} />
        </div>
        <div className="child-large">
          {updateStatusIsLoading && item._id === seletectedItem?._id ? (
            <Loader />
          ) : (
            <>
              {selectedItemId === item._id && (
                <>
                  {/** FOR ACCEPTING */}
                  <AlertModalDeposit
                    isOpen={alertVisibleAccepted}
                    onClose={closeAlertAccepted}
                    onConfirm={handleYesAccepted}
                    defaultAmount={calculatedAmount} // Pass the calculated amount
                    usercountry={usercountry}
                    paymentType={paymentType}
                  />
                  {/** FOR REJECTING */}
                  <AlertModalDeposit
                    isOpen={alertVisibleRejected}
                    onClose={closeAlertRejected}
                    onConfirm={handleYesRejected}
                    defaultAmount={calculatedAmount} // Pass the calculated amount
                    usercountry={usercountry}
                    paymentType={paymentType}
                  />
                </>
              )}

              {item.paymentStatus === "Pending" && (
                <div
                  className="allContentContainerIconContainer"
                  onClick={() => showAlertAccepted(item)}
                >
                  <CiCircleCheck color={COLORS.background} size={"2.5rem"} />
                </div>
              )}

              {item.paymentStatus === "Pending" ? (
                <label
                  className="dHeaderContainerLabelAD"
                  style={{ color: COLORS.orange }}
                >
                  {item.paymentStatus}
                </label>
              ) : item.paymentStatus === "Completed" ? (
                <label
                  className="dHeaderContainerLabelAD"
                  style={{ color: COLORS.green }}
                >
                  {item.paymentStatus}
                </label>
              ) : (
                <label
                  className="dHeaderContainerLabelAD"
                  style={{ color: COLORS.red }}
                >
                  {item.paymentStatus}
                </label>
              )}

              {item.paymentStatus === "Pending" && (
                <div
                  className="allContentContainerIconContainer"
                  onClick={() => showAlertRejected(item)}
                >
                  <MdOutlineCancel color={COLORS.background} size={"2.5rem"} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {clickpress && expandedItems[item._id] && (
        <div
          className="allprofitdecresefooter-con"
          onClick={handlePress}
          style={{
            cursor: clickpress ? "pointer" : "default",
          }}
        >
          <TextLabel label={remarks} />
          <div className="allprofitdecrese-reason-con">
            <TextLabel label={reasonValue} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRechargeCom;
