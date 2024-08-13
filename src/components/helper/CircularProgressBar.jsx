// CircularProgressBar.js
import React, { useState, useEffect } from 'react';
import { Circle } from 'rc-progress';
// import 'rc-progress/assets/index.css';

const CircularProgressBar = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prevPercent) => (prevPercent >= 100 ? 0 : prevPercent + 1));
    }, 100); // Adjust the interval duration as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative', width: 30, height: 30 }}>
      <Circle
        percent={percent}
        strokeWidth="8"
        trailWidth="8"
        strokeColor="#4db8ff"
        trailColor="#d6d6d6"
        strokeLinecap="round"
      />
    </div>
  );
};

export default CircularProgressBar;
