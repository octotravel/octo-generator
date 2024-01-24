import { CapabilityId, Currency, Pricing } from '@octocloud/types';
import { PricingModelBuilder } from '../builders/PricingModelBuilder';
import { PricingParser } from '../parsers/PricingParser';

export abstract class PricingPreset {
  private static readonly pricingModelBuilder = new PricingModelBuilder();

  private static readonly pricingParser = new PricingParser();

  public static readonly PRICING_MODEL = this.pricingModelBuilder.build({
    pricingData: {
      original: 1000,
      retail: 1000,
      net: 1000,
      includedTaxes: [],
      currency: Currency.EUR,
      currencyPrecision: 2,
    },
  });

  public static readonly PRICING_WITH_DISCOUNT_MODEL = this.pricingModelBuilder.build({
    pricingData: {
      original: 1000,
      retail: 1000,
      net: 1000,
      includedTaxes: [],
      currency: Currency.EUR,
      currencyPrecision: 2,
      offerDiscount: {
        original: 500,
        retail: 500,
        includedTaxes: [],
      },
    },
    capabilities: [CapabilityId.Offers],
  });

  public static readonly PRICING_FREE_MODEL = this.pricingModelBuilder.build({
    pricingData: {
      original: 0,
      retail: 0,
      net: 1000,
      includedTaxes: [],
      currency: Currency.EUR,
      currencyPrecision: 2,
    },
  });

  public static readonly PRICING_POJO: Pricing = this.pricingParser.parseModelToPOJO(this.PRICING_MODEL);

  public static readonly PRICING_WITH_DISCOUNT_POJO: Pricing = this.pricingParser.parseModelToPOJO(
    this.PRICING_WITH_DISCOUNT_MODEL,
  );

  public static readonly PRICING_FREE_POJO: Pricing = this.pricingParser.parseModelToPOJO(this.PRICING_FREE_MODEL);
}
