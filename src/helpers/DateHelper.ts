export class DateHelper {
  public static formatToUtcDate = (date: Date): string => {
    return date.toISOString().split(".")[0] + "Z";
  };
}
