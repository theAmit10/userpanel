import React, { useState, useEffect } from "react";
import "./AlertModalDeposit.css";
import COLORS from "../../assets/constants/colors";

const AlertModalDeposit = ({
  isOpen,
  onClose,
  onConfirm,
  defaultAmount,
  usercountry,
  paymentType,
}) => {
  const [paymentUpdateNote, setPaymentUpdateNote] = useState("");
  const [imageSource, setImageSource] = useState(null);
  const [amount, setAmount] = useState(defaultAmount);

  // Function to handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSource(file);
    }
  };

  const handleConfirm = () => {
    // Call the onConfirm callback with the paymentUpdateNote, imageSource, and amount
    onConfirm({ paymentUpdateNote, imageSource, amount });
  };

  const handleReject = () => {
    onClose();
  };

  // Set default amount whenever the modal opens or defaultAmount changes
  useEffect(() => {
    // setAmount(defaultAmount);
    const defaultAt =
      Number.parseInt(defaultAmount) *
      Number.parseInt(usercountry.countrycurrencyvaluecomparedtoinr);
    setAmount(defaultAt);
  }, [defaultAmount]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* <p className="textp">Country : {usercountry.countryname}</p> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <p className="textp">Country :</p>
          <p className="textp">{usercountry.countryname}</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <p className="textp">Currency name : </p>
          <p className="textp">{usercountry.countrycurrencysymbol}</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <p className="textp">Currency value : </p>
          <p className="textp">
            {usercountry.countrycurrencyvaluecomparedtoinr}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <p className="textp">Payment Type : </p>
          <p className="textp">{paymentType}</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <p className="textp">Amount : </p>
          <p className="textp">{defaultAmount}</p>
        </div>

        {/* <div className="imgconM">
          <div className="catimagecontainer">
            <img src={images.cat} alt="cat" className="catandtrophyimg" />
          </div>
        </div> */}
        <p
          className="textp"
          style={{
            border: `2px solid ${COLORS.green}`,
            borderRadius: "0.5rem",
            padding: "0.5rem",
          }}
        >
          ARE YOU SURE
        </p>

        {/* New Text Input for Amount */}
        <label className="alCLLabel">Amount</label>
        <div className="alSearchContainer">
          <input
            className="al-search-input"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Text Input for Payment Update Note */}
        <label className="alCLLabel">Note</label>
        <div className="alSearchContainer">
          <input
            className="al-search-input"
            placeholder="Enter Note"
            value={paymentUpdateNote}
            onChange={(e) => setPaymentUpdateNote(e.target.value)}
          />
        </div>

        {/* File Input for Image Source */}
        <label className="alCLLabel">QR code</label>
        <div className="alSearchContainer">
          <div className="imageContainerAC">
            <input
              className="al-search-input"
              placeholder="Receipt"
              type="file"
              name="file"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>

        <div className="button-container">
          <button className="ios-button" onClick={handleConfirm}>
            Yes
          </button>
          <button className="ios-button" onClick={handleReject}>
            No
          </button>
        </div>

        <div
          style={{
            height: "5rem",
          }}
        ></div>
      </div>
    </div>
  );
};

export default AlertModalDeposit;
