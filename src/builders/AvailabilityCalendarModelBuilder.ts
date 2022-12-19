import { AvailabilityStatus, CapabilityId, PricingPer } from "@octocloud/types";
import { PricingDataProvider } from "../dataProviders/PricingDataProvider";
import { DateHelper } from "../helpers/DateHelper";
import { AvailabilityCalendarData } from "../data/AvailabilityCalendarData";
import { AvailabilityCalendarModel } from "../models/availability/AvailabilityCalendarModel";
import { AvailabilityCalendarPricingModel } from "../models/availability/AvailabilityCalendarPricingModel";
import { AvailabilityCalendarPricingModelFactory } from "../factories/AvailabilityCalendarPricingModelFactory";

interface AvailabilityCalendarModelBuilderData {
  availabilityCalendarData: AvailabilityCalendarData;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

const defaultPricingPer: PricingPer = PricingPer.UNIT;
const defaultCapabilities: CapabilityId[] = [CapabilityId.Pricing];

export class AvailabilityCalendarModelBuilder {
  public build(builderData: AvailabilityCalendarModelBuilderData): AvailabilityCalendarModel {
    builderData.pricingPer ??= defaultPricingPer;
    builderData.capabilities ??= defaultCapabilities;

    const availabilityCalendarData = builderData.availabilityCalendarData;
    const date = new Date();

    return new AvailabilityCalendarModel({
      localDate: availabilityCalendarData.localDate ?? DateHelper.formatForAvailability(date),
      available: availabilityCalendarData.available ?? false,
      status: availabilityCalendarData.status ?? AvailabilityStatus.CLOSED,
      vacancies: availabilityCalendarData.vacancies ?? 0,
      capacity: availabilityCalendarData.capacity ?? 20,
      openingHours: availabilityCalendarData.openingHours ?? [
        {
          from: "00:00",
          to: "23:59",
        },
      ],
      availabilityCalendarPricingModel: this.buildPricingModel(builderData),
    });
  }

  private buildPricingModel(
    builderData: AvailabilityCalendarModelBuilderData
  ): AvailabilityCalendarPricingModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pricing) === false) {
      return undefined;
    }

    const availabilityCalendarData = builderData.availabilityCalendarData;

    return AvailabilityCalendarPricingModelFactory.create({
      unitPricing: availabilityCalendarData.unitPricingFrom ?? [PricingDataProvider.unitPricing],
      pricing: availabilityCalendarData.pricingFrom ?? PricingDataProvider.adultPricing,
      pricingPer: PricingPer.BOOKING,
    });
  }
}
