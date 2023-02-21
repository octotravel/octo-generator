import { Currency, Pricing, PricingUnit } from "@octocloud/types";

export class PricingDataProvider {
  public static emptyPricing: Pricing = {
    original: 0,
    retail: 0,
    net: null,
    currency: Currency.EUR,
    currencyPrecision: 0,
    includedTaxes: [],
  };

  public static adultPricing: Pricing = {
    original: 1000,
    retail: 1000,
    net: 1000,
    includedTaxes: [],
    currency: Currency.EUR,
    currencyPrecision: 2,
  };

  public static childPricing: Pricing = {
    original: 800,
    retail: 800,
    net: 800,
    includedTaxes: [],
    currency: Currency.EUR,
    currencyPrecision: 2,
  };

  public static bookingPricing: Pricing = {
    original: 4000,
    retail: 4000,
    net: 4000,
    includedTaxes: [],
    currency: Currency.EUR,
    currencyPrecision: 2,
  };

  public static unitPricing: PricingUnit = {
    unitId: "unitId",
    original: 1000,
    retail: 1000,
    net: 1000,
    includedTaxes: [],
    currency: Currency.EUR,
    currencyPrecision: 2,
  };
}
