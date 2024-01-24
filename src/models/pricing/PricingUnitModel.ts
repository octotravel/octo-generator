import { Tax } from '@octocloud/types';
import { PricingOfferModel } from './PricingOfferModel';
import { PricingModel } from './PricingModel';

export class PricingUnitModel extends PricingModel {
  public readonly unitId: string;

  public constructor({
    unitId,
    original,
    retail,
    net,
    currency,
    currencyPrecision,
    includedTaxes,
    pricingOfferModel,
  }: {
    unitId: string;
    original: number;
    retail: number;
    net: Nullable<number>;
    currency: string;
    currencyPrecision: number;
    includedTaxes: Tax[];
    pricingOfferModel?: PricingOfferModel;
  }) {
    super({ original, retail, net, currency, currencyPrecision, includedTaxes, pricingOfferModel });

    this.unitId = unitId;
  }
}
