import { Pricing } from "@octocloud/types";

export default class UnitItemPricingModel {
  public readonly pricing?: Pricing;

  constructor({ pricing }: { pricing?: Pricing }) {
    this.pricing = pricing;
  }
}
