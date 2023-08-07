import dayjs from "dayjs";

export const formatAsWeekDayString = (date: string | Date | number): string => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};
