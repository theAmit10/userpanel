import React, { useState, useEffect } from "react";
import "./ImageAlertModal.css";

export const ImageAlertModal = ({ isOpen, onClose, imageUrl }) => {
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
          {isLoading && <div className="loader-rep"></div>} {/* Show loader while loading */}
          {!hasError && (
            <img
              src={imageUrl}
              alt="Loaded Content"
              className={`loaded-image-rep ${isLoading ? "hidden-rep" : ""}`} // Hide image while loading
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          {hasError && <p className="error-message-rep">Failed to load image</p>}
        </div>
      </div>
    </div>
  );
};





// import React, { useState } from "react";
// import "./AlertModal.css"; // You can style it using a separate CSS file
// import images from "../../assets/constants/images"; // Include a default error image

// export const ImageAlertModal = ({ isOpen, onClose, imageUrl }) => {
//   const [isLoading, setIsLoading] = useState(true); // State to handle loading
//   const [hasError, setHasError] = useState(false); // State to handle errors

//   if (!isOpen) return null;

//   const handleImageLoad = () => {
//     setIsLoading(false); // Image has loaded, stop showing loader
//   };

//   const handleImageError = () => {
//     setIsLoading(false); // Stop showing loader
//     setHasError(true); // Show error image
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <div className="imgconM">
//           {isLoading ? (
//             <div className="loader"></div> // Show loader while loading
//           ) : hasError ? (
//             <img src={images.errorImage} alt="Error" className="error-image" /> // Show error image if there's a failure
//           ) : (
//             <img
//               src={imageUrl}
//               alt="Loaded Content"
//               className="loaded-image"
//               onLoad={handleImageLoad}
//               onError={handleImageError}
//             />
//           )}
//         </div>
//         <div className="button-container">
//           <button className="ios-button" onClick={onClose}>
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
