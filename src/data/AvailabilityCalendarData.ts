import { AvailabilityStatus, OpeningHours, Pricing, PricingUnit } from "@octocloud/types";

export interface AvailabilityCalendarData {
  localDate?: string;
  available?: boolean;
  status?: AvailabilityStatus;
  vacancies?: Nullable<number>;
  capacity?: Nullable<number>;
  openingHours?: OpeningHours[];
  unitPricingFrom?: PricingUnit[];
  pricingFrom?: Pricing;
}
