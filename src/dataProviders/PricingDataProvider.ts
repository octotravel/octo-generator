import { Currency, Pricing } from "@octocloud/types";

export class PricingDataProvider {
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
}
