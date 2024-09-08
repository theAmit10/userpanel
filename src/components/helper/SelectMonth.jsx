import React from 'react';
import './SelectMonth.css'; // Add your styles here

const SelectMonth = ({ onClose, setSelectedMonth }) => {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="mcontainer">
      <h3 className="mtitle">Select Month</h3>
      {months.map((month, index) => (
        <button
          key={index}
          className="mbtn"
          onClick={() => {
            setSelectedMonth(month);
            onClose();
          }}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

export default SelectMonth;
