import { PricingPer } from '@octocloud/types';

export class ProductPricingModel {
  public readonly defaultCurrency: string;

  public readonly availableCurrencies: string[];

  public readonly pricingPer: PricingPer;

  public readonly includeTax: boolean;

  public constructor({
    defaultCurrency,
    availableCurrencies,
    pricingPer,
    includeTax,
  }: {
    defaultCurrency: string;
    availableCurrencies: string[];
    pricingPer: PricingPer;
    includeTax: boolean;
  }) {
    this.defaultCurrency = defaultCurrency;
    this.availableCurrencies = availableCurrencies;
    this.pricingPer = pricingPer;
    this.includeTax = includeTax;
  }
}
