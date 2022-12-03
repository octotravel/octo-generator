import * as R from "ramda";
import { Pricing } from "@octocloud/types";

export class UnitPricingModel {
  private readonly _pricingFrom?: Array<Pricing>;
  private readonly _pricing?: Array<Pricing>;

  constructor({
    pricingFrom,
    pricing,
  }: {
    pricingFrom?: Array<Pricing>;
    pricing?: Array<Pricing>;
  }) {
    if (R.isNil(pricingFrom) && R.isNil(pricing)) {
      throw new Error("Only one of pricingFrom and pricing should be set.");
    }

    this._pricingFrom = pricingFrom;
    this._pricing = pricing;
  }

  public get pricingFrom() {
    return this._pricingFrom;
  }

  public get pricing() {
    return this._pricing;
  }
}
