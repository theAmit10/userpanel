// import React from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import FONT from "../../assets/constants/fonts";

// export const showErrorToast = (message) => {
//   toast.error(message, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     style: {
//       fontFamily: FONT.Montserrat_Regular,
//       fontSize: "1.5rem",
//     },
//   });
// };

// // Success Toast
// export const showSuccessToast = (message) => {
//   toast.success(message, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     style: {
//       fontFamily: FONT.Montserrat_Regular,
//       fontSize: "1.5rem",
//     },
//   });
// };

// // Warning Toast
// export const showWarningToast = (message) => {
//   toast.warn(message, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     style: {
//       fontFamily: FONT.Montserrat_Regular,
//       fontSize: "1.5rem",
//     },
//   });
// };

// const CustomErrorToastContainer = () => {
//   return <ToastContainer />;
// };

// export default CustomErrorToastContainer;

import React, { useState, useEffect } from "react";
import FONT from "../../assets/constants/fonts";

// Toast context for internal management
const ToastContext = React.createContext();

// Toast provider component
// export const ToastProvider = ({ children }) => {
//   const [toasts, setToasts] = useState([]);

//   const showToast = (message, type) => {
//     const id = Date.now();
//     setToasts((prev) => [...prev, { id, message, type }]);

//     setTimeout(() => {
//       setToasts((prev) => prev.filter((toast) => toast.id !== id));
//     }, 3000);
//   };

//   return (
//     <ToastContext.Provider value={{ showToast }}>
//       {children}
//       <div
//         style={{
//           position: "fixed",
//           top: "2rem",
//           right: "1rem",
//           zIndex: 9999,
//           display: "flex",
//           flexDirection: "column",
//           gap: "0.5rem",
//           minHeight: "7rem",
//           minWidth: "30rem",
//         }}
//       >
//         {toasts.map((toast) => (
//           <Toast key={toast.id} message={toast.message} type={toast.type} />
//         ))}
//       </div>
//     </ToastContext.Provider>
//   );
// };

// Toast provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: "fixed",
          top: "8rem",
          right: "2rem", // More spacing from edge
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "1rem", // Increased gap between toasts
          minWidth: "35rem", // Slightly wider
        }}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
// Individual toast component
// const Toast = ({ message, type }) => {
//   const [isExiting, setIsExiting] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsExiting(true), 2700);
//     return () => clearTimeout(timer);
//   }, []);

//   const getBackgroundColor = () => {
//     switch (type) {
//       case "success":
//         return "#4BB543";
//       case "error":
//         return "#ff3333";
//       case "warning":
//         return "#ffcc00";
//       default:
//         return "#333";
//     }
//   };

//   return (
//     <div
//       style={{
//         position: "relative",
//         padding: "1rem 1.5rem",
//         borderRadius: "4px",
//         color: "white",
//         backgroundColor: getBackgroundColor(),
//         boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//         fontFamily: FONT.Montserrat_Regular,
//         fontSize: "1.5rem",
//         transition: "all 0.3s ease",
//         opacity: isExiting ? 0 : 1,
//         transform: isExiting ? "translateX(100%)" : "translateX(0)",
//       }}
//     >
//       {message}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           height: "4px",
//           backgroundColor: "rgba(255, 255, 255, 0.4)",
//           width: "100%",
//         }}
//       >
//         <div
//           style={{
//             height: "100%",
//             backgroundColor: "white",
//             width: isExiting ? "0%" : "100%",
//             transition: "width 3s linear",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// Individual toast component
const Toast = ({ message, type }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsExiting(true), 2700);
    return () => clearTimeout(timer);
  }, []);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "#4BB543";
      case "error":
        return "#ff3333";
      case "warning":
        return "#ffcc00";
      default:
        return "#333";
    }
  };

  return (
    <div
      style={{
        position: "relative",
        padding: "2rem 2rem", // Increased padding
        borderRadius: "8px", // Slightly larger border radius
        color: "white",
        backgroundColor: getBackgroundColor(),
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Enhanced shadow
        fontFamily: FONT.Montserrat_Regular,
        fontSize: "1.6rem", // Slightly larger font
        transition: "all 0.3s ease",
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "translateX(100%)" : "translateX(0)",
        minHeight: "6rem", // Minimum height for each toast
        display: "flex",
        alignItems: "center", // Center content vertically
        justifyContent: "center", // Center content horizontally
        lineHeight: "1.5", // Better text spacing
      }}
    >
      {message}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "6px", // Thicker progress bar
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "white",
            width: isExiting ? "0%" : "100%",
            transition: "width 3s linear",
          }}
        />
      </div>
    </div>
  );
};

// Toast functions that match your existing imports
let toastFunctions;

export const showErrorToast = (message) => {
  if (!toastFunctions) {
    console.error(
      "ToastProvider not initialized. Wrap your app with ToastProvider."
    );
    return;
  }
  toastFunctions.showToast(message, "error");
};

export const showSuccessToast = (message) => {
  if (!toastFunctions) {
    console.error(
      "ToastProvider not initialized. Wrap your app with ToastProvider."
    );
    return;
  }
  toastFunctions.showToast(message, "success");
};

export const showWarningToast = (message) => {
  if (!toastFunctions) {
    console.error(
      "ToastProvider not initialized. Wrap your app with ToastProvider."
    );
    return;
  }
  toastFunctions.showToast(message, "warning");
};

// Initialize the toast functions when provider mounts
export const CustomErrorToastContainer = () => {
  const { showToast } = React.useContext(ToastContext);

  React.useEffect(() => {
    toastFunctions = { showToast };
  }, [showToast]);

  return null;
};
