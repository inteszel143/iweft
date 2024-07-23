export const convertDay = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000).getDate();
  return date;
};
export const covertMonth = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000);
  const month = date.toLocaleString("default", { month: "long" });
  return month;
};

export const formatDate = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options as any);
};
export const formatTime = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true }; // Change hour12 to true for 12-hour format
  return date.toLocaleTimeString("en-US", options as any);
};
