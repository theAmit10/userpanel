import React, { useState, useEffect } from "react";
import "./ImageAlertModelRemark.css";
import COLORS from "../../assets/constants/colors";

const ImageAlertModelRemark = ({ isOpen, onClose, imageUrl, remark }) => {
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [hasError, setHasError] = useState(false); // State to handle errors

  useEffect(() => {
    // Reset loading and error state when modal opens
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleImageLoad = () => {
    setIsLoading(false); // Image has loaded, stop showing loader
  };

  const handleImageError = () => {
    setIsLoading(false); // Stop showing loader
    setHasError(true); // Show error state
  };

  return (
    <div className="modal-overlay-rep">
      <div className="modal-content-rep">
        <button className="close-button-rep" onClick={onClose}>
          &times;
        </button>
        <div className="img-container-rep">
          {isLoading && <div className="loader-rep"></div>}{" "}
          {/* Show loader while loading */}
          {!hasError && (
            <img
              src={imageUrl}
              alt="Loaded Content"
              className={`loaded-image-rep ${isLoading ? "hidden-rep" : ""}`} // Hide image while loading
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          {hasError && (
            <p className="error-message-rep">Failed to load image</p>
          )}
        </div>
        {remark && (
          <p
            className="textp"
            style={{
              border: `2px solid ${COLORS.green}`,
              borderRadius: "0.5rem",
              padding: "0.5rem",
              fontSize: "1.2rem",
            }}
          >
            Note : {remark}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageAlertModelRemark;
