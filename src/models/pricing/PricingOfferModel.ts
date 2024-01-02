import { OfferDiscount } from "@octocloud/types";

export class PricingOfferModel {
  public readonly offerDiscount: OfferDiscount;

  constructor({ offerDiscount }: { offerDiscount: OfferDiscount }) {
    this.offerDiscount = offerDiscount;
  }
}
