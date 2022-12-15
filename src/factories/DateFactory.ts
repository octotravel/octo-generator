import format from "date-fns-tz/format";

export abstract class DateFactory {
  public static createForAvailabilityIdFormat = (date: Date, timeZone: string): string => {
    return format(date, "yyyy-MM-dd'T'HH:mm:ssxxx", {
      timeZone,
    });
  };

  public static createForAvailabilityFormat = (date: Date): string => {
    return format(date, "yyyy-MM-dd");
  };
}
