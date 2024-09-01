import React from "react";

export const NodataFound = ({title}) => {
  return (
    <div className="NC">
      <label className="hdLocationContainerLeftContentNameLabel">
        {title}
      </label>
    </div>
  );
};
