import format from "date-fns-tz/format";

export class DateFormatter {
  public static formatAsAvailabilityId = (date: Date, timeZone: string): string => {
    return format(date, "yyyy-MM-dd'T'HH:mm:ssxxx", {
      timeZone,
    });
  };

  public static formatForAvailability = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
  };

  public static formatToUtcDate = (date: Date): string => {
    return date.toISOString().split(".")[0] + "Z";
  };
}
