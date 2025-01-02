import React, { useState } from 'react';
import './SelectYear.css'; // Import the CSS file for styling

const SelectYear = ({ onClose, setSelectedYear }) => {
  const years = Array.from({ length: 101 }, (_, i) => 2021 + i);

  return (
    <div className="container">
      <h3 className="stitle">Select Year</h3>
      <div className="yearList">
        {years.map((year, index) => (
          <button
            key={index}
            className="btn"
            onClick={() => {
              setSelectedYear(year);
              onClose();
            }}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectYear;
