import { Currency, PricingOffer, PricingUnit } from "@octocloud/types";
import { PricingOfferModel } from "../../../models/pricing/PricingOfferModel";
import { PricingUnitModel } from "../../../models/pricing/PricingUnitModel";

export class PricingUnitTestDataProvider {
  public static pricingUnit: PricingUnit = {
    unitId: "unitId",
    original: 1000,
    retail: 1000,
    net: 1000,
    includedTaxes: [],
    currency: Currency.EUR,
    currencyPrecision: 2,
  };

  static pricingUnitOffer: Required<PricingOffer> = {
    offerDiscount: {
      original: 500,
      retail: 500,
      includedTaxes: [],
    },
  };

  static pricingUnitPOJO: PricingUnit = { ...this.pricingUnit, ...this.pricingUnitOffer };

  static pricingUnitModel = new PricingUnitModel({
    unitId: this.pricingUnit.unitId,
    original: this.pricingUnit.original,
    retail: this.pricingUnit.retail,
    net: this.pricingUnit.net,
    includedTaxes: this.pricingUnit.includedTaxes,
    currency: this.pricingUnit.currency,
    currencyPrecision: this.pricingUnit.currencyPrecision,
    pricingOfferModel: new PricingOfferModel({
      offerDiscount: this.pricingUnitOffer.offerDiscount,
    }),
  });
}
