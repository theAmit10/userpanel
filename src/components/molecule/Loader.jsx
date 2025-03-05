import React from "react";
import CircularProgressBar from "../helper/CircularProgressBar";

const Loader = () => {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgressBar />
    </div>
  );
};

export default Loader;
