import { Pricing } from "@octocloud/types";

export class BookingPricingModel {
  public readonly pricing: Pricing;

  constructor({ pricing }: { pricing: Pricing }) {
    this.pricing = pricing;
  }
}
