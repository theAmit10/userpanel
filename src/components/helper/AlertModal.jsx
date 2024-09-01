import React, { useState } from "react";
import "./AlertModal.css"; // You can style it using a separate CSS file
import images from "../../assets/constants/images";

export const AlertModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="imgconM">
        <div className="catimagecontainer">
          <img src={images.cat} alt="cat" className="catandtrophyimg" />
        </div>

        </div>
        <p className="textp">Are you sure?</p>
        <div className="button-container">
          <button className="ios-button"  onClick={onConfirm}>
            Yes
          </button>
          <button className="ios-button" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
