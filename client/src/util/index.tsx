import "moment-timezone";
import moment from "moment";

export const formatDatetimeJA = (dateStr: string | undefined): string => {
  if (!dateStr) return "";
  var timezone = "Asia/Tokyo";
  var localDate = moment(dateStr).tz(timezone);
  return (
    localDate.year() +
    "年" +
    ("0" + (localDate.month() + 1)).slice(-2) +
    "月" +
    ("0" + localDate.date()).slice(-2) +
    "日" +
    ("0" + localDate.hour()).slice(-2) +
    ":" +
    ("0" + localDate.minute()).slice(-2)
  );
};

export const formatDateJA = (dateStr: string | undefined): string => {
  if (!dateStr) return "";
  var timezone = "Asia/Tokyo";
  var localDate = moment(dateStr).tz(timezone);
  return (
    localDate.year() +
    "年" +
    ("0" + (localDate.month() + 1)).slice(-2) +
    "月" +
    ("0" + localDate.date()).slice(-2) +
    "日"
  );
};
