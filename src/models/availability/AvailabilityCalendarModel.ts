import { AvailabilityStatus, OpeningHours } from "@octocloud/types";
import { AvailabilityCalendarPricingModel } from "./AvailabilityCalendarPricingModel";

export class AvailabilityCalendarModel {
  public readonly localDate: string;

  public readonly available: boolean;

  public readonly status: AvailabilityStatus;

  public readonly vacancies: Nullable<number>;

  public readonly capacity: Nullable<number>;

  public readonly openingHours: OpeningHours[];

  public readonly availabilityCalendarPricingModel?: AvailabilityCalendarPricingModel;

  constructor({
    localDate,
    available,
    status,
    vacancies,
    capacity,
    openingHours,
    availabilityCalendarPricingModel,
  }: {
    localDate: string;
    available: boolean;
    status: AvailabilityStatus;
    vacancies: Nullable<number>;
    capacity: Nullable<number>;
    openingHours: OpeningHours[];
    availabilityCalendarPricingModel?: AvailabilityCalendarPricingModel;
  }) {
    this.localDate = localDate;
    this.available = available;
    this.status = status;
    this.vacancies = vacancies;
    this.capacity = capacity;
    this.openingHours = openingHours;
    this.availabilityCalendarPricingModel = availabilityCalendarPricingModel;
  }
}
