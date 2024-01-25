import { CapabilityId, Currency } from '@octocloud/types';
import { PricingModel } from '../models/pricing/PricingModel';
import { PartialPricing } from '../types/PartialPricing';
import { PricingOfferModel } from '../models/pricing/PricingOfferModel';

interface PricingModelBuilderData {
  pricingData: PartialPricing;
  capabilities?: CapabilityId[];
}

const defaultCapabilities: CapabilityId[] = [CapabilityId.Offers];

export class PricingModelBuilder {
  public build(builderData: PricingModelBuilderData): PricingModel {
    builderData.capabilities ??= defaultCapabilities;

    const { pricingData } = builderData;

    return new PricingModel({
      original: pricingData.original ?? 1000,
      retail: pricingData.retail ?? 1000,
      net: pricingData.net ?? 1000,
      includedTaxes: pricingData.includedTaxes ?? [],
      currency: pricingData.currency ?? Currency.EUR,
      currencyPrecision: pricingData.currencyPrecision ?? 2,
      pricingOfferModel: this.buildOffersModel(builderData),
    });
  }

  private buildOffersModel(builderData: PricingModelBuilderData): PricingOfferModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Offers) === false) {
      return undefined;
    }

    const { pricingData } = builderData;

    return new PricingOfferModel({
      offerDiscount: pricingData.offerDiscount ?? {
        original: 500,
        retail: 500,
        includedTaxes: [],
      },
    });
  }
}
