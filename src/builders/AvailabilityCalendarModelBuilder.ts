import { AvailabilityCalendar, AvailabilityStatus, CapabilityId, PricingPer } from "@octocloud/types";
import { PricingDataProvider } from "../dataProviders/PricingDataProvider";
import { DateHelper } from "../helpers/DateHelper";
import { AvailabilityCalendarModel } from "../models/Availability/AvailabilityCalendarModel";
import { AvailabilityCalendarPricingModel } from "../models/Availability/AvailabilityCalendarPricingModel";
import { AvailabilityCalendarPricingModelFactory } from "../factories/AvailabilityCalendarPricingModelFactory";

interface AvailabilityCalendarModelBuilderData {
  availabilityCalendarData: Partial<AvailabilityCalendar>;
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
      openingHours: availabilityCalendarData.openingHours ?? [],
      availabilityCalendarPricingModel: this.buildPricingModel(builderData),
    });
  }

  private buildPricingModel(
    builderData: AvailabilityCalendarModelBuilderData
  ): AvailabilityCalendarPricingModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pricing) === false) {
      return undefined;
    }

    return AvailabilityCalendarPricingModelFactory.create({
      unitPricing: builderData.availabilityCalendarData.unitPricingFrom ?? [PricingDataProvider.unitPricing],
      pricing: builderData.availabilityCalendarData.pricingFrom ?? PricingDataProvider.adultPricing,
      pricingPer: PricingPer.BOOKING,
    });
  }
}
