// CountdownTimer.js
import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

// Function to parse the time string and create a Date object
const parseTimeString = (timeString) => {
  const now = new Date();
  const [time, modifier] = timeString.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  let hours24 = hours % 12;
  if (modifier === 'PM') hours24 += 12;

  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours24, minutes, 0, 0);
};

// Function to get the countdown target date
const getCountdownDate = (timeString) => {
  const now = new Date();
  const targetDate = parseTimeString(timeString);

  if (targetDate < now) {
    // If the target time is already passed today, set it for the next day
    targetDate.setDate(targetDate.getDate() + 1);
  }

  return targetDate;
};

const CountdownTimer = ({ timeString }) => {
  const [targetDate, setTargetDate] = useState(getCountdownDate(timeString));

  // Update target date if the timeString changes
  useEffect(() => {
    setTargetDate(getCountdownDate(timeString));
  }, [timeString]);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Time's up!</span>;
    } else {
      const formatTime = (num) => num.toString().padStart(2, '0');
      return (
        <div>
          {formatTime(hours)} : {formatTime(minutes)} : {formatTime(seconds)}
        </div>
      );
    }
  };

  return (
    <div>
      <Countdown date={targetDate} renderer={renderer} />
    </div>
  );
};

export default CountdownTimer;



// // import React, { useState } from 'react';
// // import CountdownTimer from './CountdownTimer'; // Adjust the path if necessary

// // const YourComponent = () => {
// //     const [targetDate, setTargetDate] = useState(null);
    
// //     const afterTimerCompleted = () => {
// //         // Define what happens after the timer completes
// //         console.log('Timer Completed');
// //     };

// //     return (
// //         <label className="rltopcontainerTimerLabel">
// //             {targetDate ? (
// //                 <CountdownTimer
// //                     targetDate={targetDate}
// //                     afterTimerCompleted={afterTimerCompleted}
// //                 />
// //             ) : (
// //                 "00:00:00"
// //             )}
// //         </label>
// //     );
// // };

// // export default YourComponent;


// import React from 'react';
// import Countdown from 'react-countdown';
// import './CountdownTimer.css'; // Create this CSS file for styling

// const CountdownTimer = ({ targetDate, afterTimerCompleted }) => {
//   return (
//     <Countdown
//       date={targetDate}
//       onComplete={afterTimerCompleted}
//       renderer={({ hours, minutes, seconds, completed }) => {
//         if (completed) {
//           return <span className="countdown-complete">Time's up!</span>;
//         }
//         return (
//           <div className="countdown">
//             <span className="countdown-time">{String(hours).padStart(2, '0')}:</span>
//             <span className="countdown-time">{String(minutes).padStart(2, '0')}:</span>
//             <span className="countdown-time">{String(seconds).padStart(2, '0')}</span>
//           </div>
//         );
//       }}
//     />
//   );
// };

// export default CountdownTimer;



// // // import React from 'react';
// // // import Countdown from 'react-countdown';
// // // import './CountdownTimer.css'; // Create this CSS file for styling

// // // const CountdownTimer = ({ targetDate, afterTimerCompleted }) => {
// // //   return (
// // //     <Countdown
// // //       date={targetDate}
// // //       onComplete={afterTimerCompleted}
// // //       renderer={({ hours, minutes, seconds, completed }) => {
// // //         if (completed) {
// // //           return <span>Time's up!</span>;
// // //         }
// // //         return (
// // //           <div className="countdown">
// // //             <span className="countdown-time">{hours}:</span>
// // //             <span className="countdown-time">{minutes}:</span>
// // //             <span className="countdown-time">{seconds}</span>
// // //           </div>
// // //         );
// // //       }}
// // //     />
// // //   );
// // // };

// // // export default CountdownTimer;
