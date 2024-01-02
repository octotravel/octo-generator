import { Pricing, Currency, PricingOffer } from "@octocloud/types";
import { PricingModel } from "../../../models/pricing/PricingModel";
import { PricingOfferModel } from "../../../models/pricing/PricingOfferModel";

export class PricingTestDataProvider {
  public static pricing: Pricing = {
    original: 1000,
    retail: 1000,
    net: 1000,
    includedTaxes: [],
    currency: Currency.EUR,
    currencyPrecision: 2,
  };

  static pricingOffer: Required<PricingOffer> = {
    offerDiscount: {
      original: 500,
      retail: 500,
      includedTaxes: [],
    },
  };

  static pricingPOJO: Pricing = { ...this.pricing, ...this.pricingOffer };

  static pricingModel = new PricingModel({
    original: this.pricing.original,
    retail: this.pricing.retail,
    net: this.pricing.net,
    includedTaxes: this.pricing.includedTaxes,
    currency: this.pricing.currency,
    currencyPrecision: this.pricing.currencyPrecision,
    pricingOfferModel: new PricingOfferModel({
      offerDiscount: this.pricingOffer.offerDiscount,
    }),
  });
}
