import { Pricing } from "@octocloud/types";

export class UnitItemPricingModel {
  public readonly pricing: Pricing;

  constructor({ pricing }: { pricing: Pricing }) {
    this.pricing = pricing;
  }
}
