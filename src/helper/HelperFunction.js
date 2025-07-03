import moment from "moment-timezone";

export const sortedTimes = [...item.times].sort((a, b) => {
  // Convert time to 24-hour format for easy comparison
  const convertTo24Hour = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) {
      return hours * 60 + minutes + 12 * 60;
    }
    if (period === "AM" && hours === 12) {
      return minutes; // 12 AM is 00:00
    }
    return hours * 60 + minutes;
  };

  return convertTo24Hour(a.time) - convertTo24Hour(b.time);
});
