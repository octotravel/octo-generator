import { Pricing, PricingUnit } from "@octocloud/types";

export class AvailabilityPricingModel {
  public readonly unitPricing?: PricingUnit[];

  public readonly pricing?: Pricing;

  constructor({ unitPricing, pricing }: { unitPricing?: PricingUnit[]; pricing?: Pricing }) {
    this.unitPricing = unitPricing;
    this.pricing = pricing;
  }
}
