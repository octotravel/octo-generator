import { Pricing, PricingUnit } from "@octocloud/types";

export class AvailabilityCalendarPricingModel {
  public readonly unitPricingFrom?: PricingUnit[];
  public readonly pricingFrom?: Pricing;

  constructor({ unitPricingFrom, pricingFrom }: { unitPricingFrom?: PricingUnit[]; pricingFrom?: Pricing }) {
    this.unitPricingFrom = unitPricingFrom;
    this.pricingFrom = pricingFrom;
  }
}
