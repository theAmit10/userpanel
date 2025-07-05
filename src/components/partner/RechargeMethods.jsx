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
  useGetRechargeModuleQuery,
} from "../../redux/api";
import Loader from "../molecule/Loader";
import { ToastContainer } from "react-toastify";
import Cryptodeposit from "../deposit/Cryptodeposit";
import Paypaldeposit from "../deposit/Paypaldeposit";
import Skrilldeposit from "../deposit/Skrilldeposit";
import PartnerBank from "../deposit/PartnerBank";
import PartnerUpi from "../deposit/PartnerUpi";
import PartnerPaypal from "../deposit/PartnerPaypal";
import PartnerCrypto from "../deposit/PartnerCrypto";
import PartnerSkrill from "../deposit/PartnerSkrill";
import Bankdeposit from "../deposit/Bankdeposit";
import { UD } from "../deposit/UD";
import images from "../../assets/constants/images";
import { CiEdit } from "react-icons/ci";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Partner from "./Partner";

import { PiContactlessPaymentFill } from "react-icons/pi";
import PartnerOther from "../deposit/PartnerOther";

const RechargeMethods = ({ setSelectedCategory, reloadKey, setReloadKey }) => {
  const [selectedPayment, setSelectedPayment] = useState("");

  const selectingPaymentType = (item) => {
    setSelectedPayment(item);
  };
  useEffect(() => {
    if (reloadKey > 0) {
      setSelectedCategory("");
      setReloadKey(0);
    }
  }, [reloadKey]);

  const { accesstoken, partner, user } = useSelector((state) => state.user);

  const { isLoading, error, data } = useGetRechargeModuleQuery({
    accesstoken,
    id: partner.rechargeModule,
  });

  console.log("From recharge payment");
  console.log(data);

  return (
    <div className="partner-main-container">
      <div className="pdContainer">
        {selectedPayment === "" && (
          <div className="alCreatLocationTopContainer">
            <div className="searchIconContainer">
              <IoChevronBackCircleOutline
                onClick={() => setSelectedCategory("")}
                size={"2.5rem"}
                color="var(--white_s)"
              />
            </div>
            <div className="alCreatLocationTopContaineCL">
              <label className="alCreatLocationTopContainerlabel">
                Recharge Methods
              </label>
            </div>
          </div>
        )}

        {/** SHOWING ALL WALLET */}
        {selectedPayment === "" && (
          <div className="pnMainContainer">
            {isLoading ? (
              <Loader />
            ) : (
              <div
                className="hdAllContainer"
                style={{ background: "transparent" }}
              >
                {/** CRYPTO  */}
                {data && data.rechargeModule.cryptoPermission && (
                  <div
                    className="hdAllContainerContent"
                    onClick={() => selectingPaymentType("crypto")}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        Crypto
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Create Crypto Payment Deposit
                      </label>
                      <div className="hdContenContainerIcon">
                        <img
                          src={images.crypto}
                          color={COLORS.background}
                          size={"2.5rem"}
                          className="paymenticon"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/** PAYPAL  */}
                {data && data.rechargeModule.paypalPermission && (
                  <div
                    className="hdAllContainerContent"
                    onClick={() => selectingPaymentType("paypal")}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        Paypal
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Create Paypal Payment Deposit
                      </label>
                      <div className="hdContenContainerIcon">
                        <img
                          src={images.paypal}
                          color={COLORS.background}
                          size={"2.5rem"}
                          className="paymenticon"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/** SKRILL */}
                {data && data.rechargeModule.skrillPermission && (
                  <div
                    className="hdAllContainerContent"
                    onClick={() => selectingPaymentType("skrill")}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        Skrill
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Create Skrill Payment Deposit
                      </label>
                      <div className="hdContenContainerIcon">
                        <img
                          src={images.skrill}
                          color={COLORS.background}
                          size={"2.5rem"}
                          className="paymenticon"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/** Bank */}
                {data && data.rechargeModule.bankPermission && (
                  <div
                    className="hdAllContainerContent"
                    onClick={() => selectingPaymentType("bank")}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        Bank
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Create Bank Payment Deposit
                      </label>
                      <div className="hdContenContainerIcon">
                        <img
                          src={images.bank}
                          color={COLORS.background}
                          className="pdicon"
                          size={"2.5rem"}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/** UPI  */}
                {data && data.rechargeModule.upiPermission && (
                  <div
                    className="hdAllContainerContent"
                    onClick={() => selectingPaymentType("upi")}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        UPI
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Create UPI Payment Deposit
                      </label>
                      <div className="hdContenContainerIcon">
                        <img
                          src={images.upi}
                          color={COLORS.background}
                          size={"1rem"}
                          className="paymenticon"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {data && data.rechargeModule.otherPaymentPermission && (
                  <div
                    className="hdAllContainerContent"
                    onClick={() => selectingPaymentType("other")}
                  >
                    <div className="hdAllContainerContentTop">
                      <label className="hdAllContainerContentTopBoldLabel">
                        Other Payment
                      </label>
                      <div className="hdContenContainerIcon">
                        <CiEdit color={COLORS.background} size={"2.5rem"} />
                      </div>
                    </div>
                    <div className="hdAllContainerContentBottom">
                      <label className="hdAllContainerContentTopRegularLabel">
                        Create Other Payment Deposit
                      </label>
                      <div className="hdContenContainerIcon">
                        <PiContactlessPaymentFill
                          color={COLORS.background}
                          size={"2.5rem"}
                          className="paymenticon"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {selectedPayment === "upi" && (
          <PartnerUpi selectingPaymentType={selectingPaymentType} />
        )}
        {selectedPayment === "bank" && (
          <PartnerBank selectingPaymentType={selectingPaymentType} />
        )}
        {selectedPayment === "skrill" && (
          <PartnerSkrill selectingPaymentType={selectingPaymentType} />
        )}
        {selectedPayment === "paypal" && (
          <PartnerPaypal selectingPaymentType={selectingPaymentType} />
        )}
        {selectedPayment === "crypto" && (
          <PartnerCrypto selectingPaymentType={selectingPaymentType} />
        )}
        {selectedPayment === "other" && (
          <PartnerOther selectingPaymentType={selectingPaymentType} />
        )}
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
};

export default RechargeMethods;
