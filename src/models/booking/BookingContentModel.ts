export class BookingContentModel {
  public readonly meetingPoint?: Nullable<string>;
  public readonly meetingPointCoordinates?: Nullable<[number]>;
  public readonly meetingLocalDateTime?: Nullable<string>;
  public readonly duration?: string;
  public readonly durationAmount?: string;
  public readonly durationUnit?: string;

  constructor({
    meetingPoint,
    meetingPointCoordinates,
    meetingLocalDateTime,
    duration,
    durationAmount,
    durationUnit,
  }: {
    meetingPoint?: Nullable<string>;
    meetingPointCoordinates?: Nullable<[number]>;
    meetingLocalDateTime?: Nullable<string>;
    duration?: string;
    durationAmount?: string;
    durationUnit?: string;
  }) {
    this.meetingPoint = meetingPoint;
    this.meetingPointCoordinates = meetingPointCoordinates;
    this.meetingLocalDateTime = meetingLocalDateTime;
    this.duration = duration;
    this.durationAmount = durationAmount;
    this.durationUnit = durationUnit;
  }
}
