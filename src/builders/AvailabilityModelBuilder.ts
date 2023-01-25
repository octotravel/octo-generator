import { AvailabilityStatus, CapabilityId, PricingPer } from "@octocloud/types";
import { addDays } from "date-fns";
import PricingDataProvider from "../dataProviders/PricingDataProvider";
import AvailabilityModel from "../models/availability/AvailabilityModel";
import AvailabilityContentModel from "../models/availability/AvailabilityContentModel";
import AvailabilityPricingModel from "../models/availability/AvailabilityPricingModel";
import AvailabilityPickupsModel from "../models/availability/AvailabilityPickupsModel";
import DateFormatter from "../common/DateFormatter";
import TimeZoneDataProvider from "../dataProviders/TimeZoneDataProvider";
import AvailabilityPricingModelFactory from "../factories/AvailabilityPricingModelFactory";
import { PartialAvailability } from "../types/PartialAvailability";

interface AvailabilityModelBuilderData {
  availabilityData: PartialAvailability;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

const defaultPricingPer: PricingPer = PricingPer.UNIT;
const defaultCapabilities: CapabilityId[] = [CapabilityId.Content, CapabilityId.Pricing, CapabilityId.Pickups];

export default class AvailabilityModelBuilder {
  public build(builderData: AvailabilityModelBuilderData): AvailabilityModel {
    builderData.pricingPer ??= defaultPricingPer;
    builderData.capabilities ??= defaultCapabilities;

    const { availabilityData } = builderData;
    const date = new Date();
    const dateAsString = DateFormatter.formatForAvailability(date);
    const time = "00:00:00";
    const datetime = new Date(`${dateAsString}T${time}`);

    const localDateTimeStart =
      availabilityData.localDateTimeStart ??
      DateFormatter.formatAsAvailabilityId(datetime, TimeZoneDataProvider.europeLondon);
    const localDateTimeEnd =
      availabilityData.localDateTimeEnd ??
      DateFormatter.formatAsAvailabilityId(addDays(datetime, 5), TimeZoneDataProvider.europeLondon);

    return new AvailabilityModel({
      id: availabilityData.id ?? localDateTimeStart,
      localDateTimeStart,
      localDateTimeEnd,
      allDay: availabilityData.allDay ?? true,
      available: availabilityData.available ?? true,
      status: availabilityData.status ?? AvailabilityStatus.AVAILABLE,
      vacancies: availabilityData.vacancies ?? 10,
      capacity: availabilityData.capacity ?? 10,
      maxUnits: availabilityData.maxUnits ?? 5,
      utcCutoffAt: availabilityData.utcCutoffAt ?? DateFormatter.formatToUtcDate(date),
      openingHours: availabilityData.openingHours ?? [],
      availabilityContentModel: this.buildContentModel(builderData),
      availabilityPricingModel: this.buildPricingModel(builderData),
      availabilityPickupsModel: this.buildPickupModel(builderData),
    });
  }

  private buildContentModel(builderData: AvailabilityModelBuilderData): AvailabilityContentModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Content) === false) {
      return undefined;
    }

    const { availabilityData } = builderData;

    return new AvailabilityContentModel({
      meetingPoint: availabilityData.meetingPoint ?? null,
      meetingPointCoordinates: availabilityData.meetingPointCoordinates ?? null,
      meetingPointLatitude: availabilityData.meetingPointLatitude ?? null,
      meetingPointLongitude: availabilityData.meetingPointLongitude ?? null,
      meetingLocalDateTime: availabilityData.meetingLocalDateTime ?? null,
    });
  }

  private buildPricingModel(builderData: AvailabilityModelBuilderData): AvailabilityPricingModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pricing) === false) {
      return undefined;
    }

    return AvailabilityPricingModelFactory.create({
      unitPricing: builderData.availabilityData.unitPricing ?? [PricingDataProvider.unitPricing],
      pricing: builderData.availabilityData.pricing ?? PricingDataProvider.adultPricing,
      pricingPer: PricingPer.BOOKING,
    });
  }

  private buildPickupModel(builderData: AvailabilityModelBuilderData): AvailabilityPickupsModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pickups) === false) {
      return undefined;
    }

    const { availabilityData } = builderData;

    return new AvailabilityPickupsModel({
      pickupRequired: availabilityData.pickupRequired ?? false,
      pickupAvailable: availabilityData.pickupAvailable ?? false,
      pickupPoints: availabilityData.pickupPoints ?? [],
    });
  }
}
