import { Pricing, PricingPer, PricingUnit } from "@octocloud/types";
import { AvailabilityCalendarPricingModel } from "../models/availability/AvailabilityCalendarPricingModel";

interface AvailabilityCalendarPricingModelFactoryData {
  unitPricing?: PricingUnit[];
  pricing?: Pricing;
  pricingPer: PricingPer;
  containsUnits?: boolean;
}

export abstract class AvailabilityCalendarPricingModelFactory {
  public static create(factoryData: AvailabilityCalendarPricingModelFactoryData): AvailabilityCalendarPricingModel {
    let unitPricingFrom = undefined;
    let pricingFrom = undefined;

    if (factoryData.pricingPer === PricingPer.UNIT) {
      unitPricingFrom = factoryData.unitPricing;
    }

    if (factoryData.pricingPer === PricingPer.BOOKING || factoryData.containsUnits === true) {
      pricingFrom = factoryData.pricing;
    }

    return new AvailabilityCalendarPricingModel({
      unitPricingFrom: unitPricingFrom,
      pricingFrom: pricingFrom,
    });
  }
}
