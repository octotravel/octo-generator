import { Pricing } from "@octocloud/types";

export class UnitPricingModel {
  public readonly pricingFrom?: Array<Pricing>;

  public readonly pricing?: Array<Pricing>;

  constructor({ pricingFrom, pricing }: { pricingFrom?: Array<Pricing>; pricing?: Array<Pricing> }) {
    if (pricingFrom !== undefined && pricing !== undefined) {
      throw new Error("Only one of pricingFrom and pricing should be set.");
    }

    this.pricingFrom = pricingFrom;
    this.pricing = pricing;
  }
}
