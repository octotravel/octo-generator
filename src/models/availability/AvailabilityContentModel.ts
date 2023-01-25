export default class AvailabilityContentModel {
  public readonly meetingPoint: Nullable<string>;

  public readonly meetingPointCoordinates: Nullable<[number]>;

  public readonly meetingPointLatitude: Nullable<number>;

  public readonly meetingPointLongitude: Nullable<number>;

  public readonly meetingLocalDateTime: Nullable<string>;

  constructor({
    meetingPoint,
    meetingPointCoordinates,
    meetingPointLatitude,
    meetingPointLongitude,
    meetingLocalDateTime,
  }: {
    meetingPoint: Nullable<string>;
    meetingPointCoordinates: Nullable<[number]>;
    meetingPointLatitude: Nullable<number>;
    meetingPointLongitude: Nullable<number>;
    meetingLocalDateTime: Nullable<string>;
  }) {
    this.meetingPoint = meetingPoint;
    this.meetingPointCoordinates = meetingPointCoordinates;
    this.meetingPointLatitude = meetingPointLatitude;
    this.meetingPointLongitude = meetingPointLongitude;
    this.meetingLocalDateTime = meetingLocalDateTime;
  }
}
