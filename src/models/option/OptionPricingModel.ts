import { Pricing } from '@octocloud/types';

export class OptionPricingModel {
  public readonly pricingFrom?: Pricing[];

  public readonly pricing?: Pricing[];

  public constructor({ pricingFrom, pricing }: { pricingFrom?: Pricing[]; pricing?: Pricing[] }) {
    if (pricingFrom !== undefined && pricing !== undefined) {
      throw new Error('Only one of pricingFrom and pricing should be set.');
    }

    this.pricingFrom = pricingFrom;
    this.pricing = pricing;
  }
}
