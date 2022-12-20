import { PricingPer } from "@octocloud/types";

export class ProductPricingModel {
  public readonly defaultCurrency: string;
  public readonly availableCurrencies: Array<string>;
  public readonly pricingPer: PricingPer;

  constructor({
    defaultCurrency,
    availableCurrencies,
    pricingPer,
  }: {
    defaultCurrency: string;
    availableCurrencies: Array<string>;
    pricingPer: PricingPer;
  }) {
    this.defaultCurrency = defaultCurrency;
    this.availableCurrencies = availableCurrencies;
    this.pricingPer = pricingPer;
  }
}
