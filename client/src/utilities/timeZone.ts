export const getDateString = (date: string, time: string): string => {
  const timeZoneOffset = new Date().getTimezoneOffset();

  // Convert the timezone offset to hours and minutes
  const offsetHours = Math.floor(Math.abs(timeZoneOffset) / 60);
  const offsetMinutes = Math.abs(timeZoneOffset) % 60;
  const sign = timeZoneOffset > 0 ? "-" : "+"; // Positive means behind UTC, so we use '-'

  // Format the timezone string (e.g., "+06:00")
  const formattedTimeZone = `${sign}${String(offsetHours).padStart(2, "0")}:${String(offsetMinutes).padStart(2, "0")}`;

  // Combine the date and time strings
  return `${date}T${time}:00.000${formattedTimeZone}`;
};

export const extractDateAndTime = (
  dateTime: string,
): { date: string; time: string } => {
  const date = new Date(dateTime);
  const dateStr = date.toISOString().split("T")[0];
  const timeStr = date.toISOString().split("T")[1].split(".")[0];
  return { date: dateStr, time: timeStr };
};
