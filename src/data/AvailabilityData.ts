import { AvailabilityStatus, OpeningHours, PickupPoint, Pricing, PricingUnit } from "@octocloud/types";

export interface AvailabilityData {
  id?: string;
  localDateTimeStart?: string;
  localDateTimeEnd?: string;
  allDay?: boolean;
  available?: boolean;
  status?: AvailabilityStatus;
  vacancies?: Nullable<number>;
  capacity?: Nullable<number>;
  maxUnits?: Nullable<number>;
  utcCutoffAt?: string;
  openingHours?: OpeningHours[];
  meetingPoint?: Nullable<string>;
  meetingPointCoordinates?: Nullable<[number]>;
  meetingPointLatitude?: Nullable<number>;
  meetingPointLongitude?: Nullable<number>;
  meetingLocalDateTime?: Nullable<string>;
  unitPricing?: PricingUnit[];
  pricing?: Pricing;
  pickupAvailable?: boolean;
  pickupRequired?: boolean;
  pickupPoints?: PickupPoint[];
}
