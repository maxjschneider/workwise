export const getTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

export const getMilitaryTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
};
