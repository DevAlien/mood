const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const timeToDate = (time) => {
  const date = new Date(time * 1000);

  const dayName = days[date.getDay()];

  const day = date.getDate();

  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];

  const year = date.getFullYear();

  return `${dayName}, ${monthName} ${day}, ${year}`;
};

export const timeToDateToday = () => {
  const date = new Date();

  const day = date.getDate();

  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];

  const year = date.getFullYear();

  return `Today, ${monthName} ${day}, ${year}`;
};

export const getYYYYMMDD = (time) => {
  const date = new Date(time * 1000);
  return date.toISOString().split("T")[0];
};
