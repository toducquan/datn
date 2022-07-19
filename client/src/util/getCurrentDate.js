import moment from "moment";

export const getCurrentDate = () => {
  const isoDate = new Date().toISOString();
  return moment(isoDate).format("YYYY年MM月DD日");
};

export const getNow = () => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed).toISOString();
  return moment(today).format("YYYY年MM月DD日 HH:MM");
};
