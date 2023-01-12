import { Pricing, PricingPer, PricingUnit } from "@octocloud/types";
import { AvailabilityPricingModel } from "../models/availability/AvailabilityPricingModel";

interface AvailabilityPricingModelFactoryData {
  unitPricing?: PricingUnit[];
  pricing?: Pricing;
  pricingPer: PricingPer;
  containsUnits?: boolean;
}

export abstract class AvailabilityPricingModelFactory {
  public static create(factoryData: AvailabilityPricingModelFactoryData): AvailabilityPricingModel {
    let unitPricing = undefined;
    let pricing = undefined;

    if (factoryData.pricingPer === PricingPer.BOOKING || factoryData.containsUnits === true) {
      pricing = factoryData.pricing;
    }

    if (factoryData.pricingPer === PricingPer.UNIT) {
      unitPricing = factoryData.unitPricing;
    }

    return new AvailabilityPricingModel({
      unitPricing: unitPricing,
      pricing: pricing,
    });
  }
}
