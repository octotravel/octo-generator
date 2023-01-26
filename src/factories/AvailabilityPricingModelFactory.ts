import { Pricing, PricingPer, PricingUnit } from "@octocloud/types";
import AvailabilityPricingModel from "../models/availability/AvailabilityPricingModel";

interface AvailabilityPricingModelFactoryData {
  unitPricing?: PricingUnit[];
  pricing?: Pricing;
  pricingPer: PricingPer;
  containsUnits?: boolean;
}

export default abstract class AvailabilityPricingModelFactory {
  public static create(factoryData: AvailabilityPricingModelFactoryData): AvailabilityPricingModel {
    let unitPricing;
    let pricing;

    if (factoryData.pricingPer === PricingPer.BOOKING || factoryData.containsUnits === true) {
      pricing = factoryData.pricing;
    }

    if (factoryData.pricingPer === PricingPer.UNIT) {
      unitPricing = factoryData.unitPricing;
    }

    return new AvailabilityPricingModel({
      unitPricing,
      pricing,
    });
  }
}
