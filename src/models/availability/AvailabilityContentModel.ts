import { Notice, TourGroup } from '@octocloud/types';

export class AvailabilityContentModel {
	public readonly meetingPoint: Nullable<string>;

	public readonly meetingPointCoordinates: Nullable<[number]>;

	public readonly meetingPointLatitude: Nullable<number>;

	public readonly meetingPointLongitude: Nullable<number>;

	public readonly meetingLocalDateTime: Nullable<string>;

	public readonly tourGroup: Nullable<TourGroup>;

	public readonly notices: Notice[];

	public constructor({
		meetingPoint,
		meetingPointCoordinates,
		meetingPointLatitude,
		meetingPointLongitude,
		meetingLocalDateTime,
		tourGroup,
		notices,
	}: {
		meetingPoint: Nullable<string>;
		meetingPointCoordinates: Nullable<[number]>;
		meetingPointLatitude: Nullable<number>;
		meetingPointLongitude: Nullable<number>;
		meetingLocalDateTime: Nullable<string>;
		tourGroup: Nullable<TourGroup>;
		notices: Notice[];
	}) {
		this.meetingPoint = meetingPoint;
		this.meetingPointCoordinates = meetingPointCoordinates;
		this.meetingPointLatitude = meetingPointLatitude;
		this.meetingPointLongitude = meetingPointLongitude;
		this.meetingLocalDateTime = meetingLocalDateTime;
		this.tourGroup = tourGroup;
		this.notices = notices;
	}
}
