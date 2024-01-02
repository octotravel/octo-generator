import { Tax } from "@octocloud/types";
import { PricingOfferModel } from "./PricingOfferModel";

export class PricingModel {
  public readonly original: number;

  public readonly retail: number;

  public readonly net: number | null;

  public readonly currency: string;

  public readonly currencyPrecision: number;

  public readonly includedTaxes: Array<Tax>;

  public readonly pricingOfferModel?: PricingOfferModel;

  constructor({
    original,
    retail,
    net,
    currency,
    currencyPrecision,
    includedTaxes,
    pricingOfferModel,
  }: {
    original: number;
    retail: number;
    net: Nullable<number>;
    currency: string;
    currencyPrecision: number;
    includedTaxes: Array<Tax>;
    pricingOfferModel?: PricingOfferModel;
  }) {
    this.original = original;
    this.retail = retail;
    this.net = net;
    this.currency = currency;
    this.currencyPrecision = currencyPrecision;
    this.includedTaxes = includedTaxes;
    this.pricingOfferModel = pricingOfferModel;
  }
}
