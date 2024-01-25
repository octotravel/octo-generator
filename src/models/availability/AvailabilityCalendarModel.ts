import { AvailabilityCalendarPricingModel } from './AvailabilityCalendarPricingModel';
import { AvailabilityStatus, OpeningHours } from '@octocloud/types';

export class AvailabilityCalendarModel {
  public readonly localDate: string;

  public readonly available: boolean;

  public readonly status: AvailabilityStatus;

  public readonly vacancies: Nullable<number>;

  public readonly capacity: Nullable<number>;

  public readonly paxCount: Nullable<number>;

  public readonly utcCutoffAt: string;

  public readonly availabilityLocalStartTimes: string[];

  public readonly openingHours: OpeningHours[];

  public readonly availabilityCalendarPricingModel?: AvailabilityCalendarPricingModel;

  public constructor({
    localDate,
    available,
    status,
    vacancies,
    capacity,
    paxCount,
    openingHours,
    utcCutoffAt,
    availabilityLocalStartTimes,
    availabilityCalendarPricingModel,
  }: {
    localDate: string;
    available: boolean;
    status: AvailabilityStatus;
    vacancies: Nullable<number>;
    capacity: Nullable<number>;
    paxCount: Nullable<number>;
    utcCutoffAt: string;
    availabilityLocalStartTimes: string[];
    openingHours: OpeningHours[];
    availabilityCalendarPricingModel?: AvailabilityCalendarPricingModel;
  }) {
    this.localDate = localDate;
    this.available = available;
    this.status = status;
    this.vacancies = vacancies;
    this.capacity = capacity;
    this.paxCount = paxCount;
    this.utcCutoffAt = utcCutoffAt;
    this.openingHours = openingHours;
    this.availabilityLocalStartTimes = availabilityLocalStartTimes;
    this.availabilityCalendarPricingModel = availabilityCalendarPricingModel;
  }
}
