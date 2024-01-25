import { AvailabilityStatus, OpeningHours } from '@octocloud/types';
import { AvailabilityContentModel } from './AvailabilityContentModel';
import { AvailabilityPickupsModel } from './AvailabilityPickupsModel';
import { AvailabilityPricingModel } from './AvailabilityPricingModel';
import { AvailabilityOffersModel } from './AvailabilityOffersModel';
import { AvailabilityResourcesModel } from './AvailabilityResourcesModel';

export class AvailabilityModel {
  public readonly id: string;

  public readonly localDateTimeStart: string;

  public readonly localDateTimeEnd: string;

  public readonly allDay: boolean;

  public readonly available: boolean;

  public readonly status: AvailabilityStatus;

  public readonly vacancies: Nullable<number>;

  public readonly capacity: Nullable<number>;

  public readonly maxUnits: Nullable<number>;

  public readonly utcCutoffAt: string;

  public readonly openingHours: OpeningHours[];

  public readonly availabilityContentModel?: AvailabilityContentModel;

  public readonly availabilityPickupsModel?: AvailabilityPickupsModel;

  public readonly availabilityOffersModel?: AvailabilityOffersModel;

  public readonly availabilityPricingModel?: AvailabilityPricingModel;

  public readonly availabilityResourcesModel?: AvailabilityResourcesModel;

  public constructor({
    id,
    localDateTimeStart,
    localDateTimeEnd,
    allDay,
    available,
    status,
    vacancies,
    capacity,
    maxUnits,
    utcCutoffAt,
    openingHours,
    availabilityContentModel,
    availabilityPickupsModel,
    availabilityOffersModel,
    availabilityPricingModel,
    availabilityResourcesModel,
  }: {
    id: string;
    localDateTimeStart: string;
    localDateTimeEnd: string;
    allDay: boolean;
    available: boolean;
    status: AvailabilityStatus;
    vacancies: Nullable<number>;
    capacity: Nullable<number>;
    maxUnits: Nullable<number>;
    utcCutoffAt: string;
    openingHours: OpeningHours[];
    availabilityContentModel?: AvailabilityContentModel;
    availabilityPickupsModel?: AvailabilityPickupsModel;
    availabilityOffersModel?: AvailabilityOffersModel;
    availabilityPricingModel?: AvailabilityPricingModel;
    availabilityResourcesModel?: AvailabilityResourcesModel;
  }) {
    this.id = id;
    this.localDateTimeStart = localDateTimeStart;
    this.localDateTimeEnd = localDateTimeEnd;
    this.allDay = allDay;
    this.available = available;
    this.status = status;
    this.vacancies = vacancies;
    this.capacity = capacity;
    this.maxUnits = maxUnits;
    this.utcCutoffAt = utcCutoffAt;
    this.openingHours = openingHours;
    this.availabilityContentModel = availabilityContentModel;
    this.availabilityPickupsModel = availabilityPickupsModel;
    this.availabilityOffersModel = availabilityOffersModel;
    this.availabilityPricingModel = availabilityPricingModel;
    this.availabilityResourcesModel = availabilityResourcesModel;
  }
}
