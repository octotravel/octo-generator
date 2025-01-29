import { Availability, AvailabilityStatus } from '@octocloud/types';

export class AvailabilityDataProvider {
	public static availability: Availability = {
		id: '2023-01-03T09:15:00+01:00',
		localDateTimeStart: '2023-01-03T09:15:00+01:00',
		localDateTimeEnd: '2023-01-03T09:39:00+01:00',
		allDay: false,
		available: true,
		status: AvailabilityStatus.AVAILABLE,
		vacancies: null,
		capacity: null,
		maxUnits: null,
		utcCutoffAt: '18:00',
		openingHours: [],
		hasResources: false,
	};
}
