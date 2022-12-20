import { Availability, AvailabilityStatus, CapabilityId, PricingPer } from "@octocloud/types";
import { PricingDataProvider } from "../dataProviders/PricingDataProvider";
import { AvailabilityModel } from "../models/Availability/AvailabilityModel";
import { AvailabilityContentModel } from "../models/Availability/AvailabilityContentModel";
import { AvailabilityPricingModel } from "../models/Availability/AvailabilityPricingModel";
import { AvailabilityPickupModel } from "../models/Availability/AvailabilityPickupModel";
import { addDays } from "date-fns";
import { DateHelper } from "../helpers/DateHelper";
import { TimeZoneDataProvider } from "../dataProviders/TimeZoneDataProvider";
import { AvailabilityPricingModelFactory } from "../factories/AvailabilityPricingModelFactory";

interface AvailabilityModelBuilderData {
  availabilityData: Partial<Availability>;
  pricingPer?: PricingPer;
  capabilities?: CapabilityId[];
}

const defaultPricingPer: PricingPer = PricingPer.UNIT;
const defaultCapabilities: CapabilityId[] = [
  CapabilityId.Content,
  CapabilityId.Pricing,
  CapabilityId.Pickups,
];

export class AvailabilityModelBuilder {
  public build(builderData: AvailabilityModelBuilderData): AvailabilityModel {
    builderData.pricingPer ??= defaultPricingPer;
    builderData.capabilities ??= defaultCapabilities;

    const availabilityData = builderData.availabilityData;
    const date = new Date();
    const dateAsString = DateHelper.formatForAvailability(date);
    const time = "00:00:00";
    const datetime = new Date(`${dateAsString}T${time}`);

    const localDateTimeStart =
      availabilityData.localDateTimeStart ??
      DateHelper.formatAsAvailabilityId(datetime, TimeZoneDataProvider.europeLondon);
    const localDateTimeEnd =
      availabilityData.localDateTimeEnd ??
      DateHelper.formatAsAvailabilityId(addDays(datetime, 5), TimeZoneDataProvider.europeLondon);

    return new AvailabilityModel({
      id: availabilityData.id ?? localDateTimeStart,
      localDateTimeStart: localDateTimeStart,
      localDateTimeEnd: localDateTimeEnd,
      allDay: availabilityData.allDay ?? true,
      available: availabilityData.available ?? true,
      status: availabilityData.status ?? AvailabilityStatus.AVAILABLE,
      vacancies: availabilityData.vacancies ?? 10,
      capacity: availabilityData.capacity ?? 10,
      maxUnits: availabilityData.maxUnits ?? 5,
      utcCutoffAt: availabilityData.utcCutoffAt ?? DateHelper.formatToUtcDate(date),
      openingHours: availabilityData.openingHours ?? [],
      availabilityContentModel: this.buildContentModel(builderData),
      availabilityPricingModel: this.buildPricingModel(builderData),
      availabilityPickupModel: this.buildPickupModel(builderData),
    });
  }

  private buildContentModel(
    builderData: AvailabilityModelBuilderData
  ): AvailabilityContentModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Content) === false) {
      return undefined;
    }

    const availabilityData = builderData.availabilityData;

    return new AvailabilityContentModel({
      meetingPoint: availabilityData.meetingPoint ?? null,
      meetingPointCoordinates: availabilityData.meetingPointCoordinates ?? null,
      meetingPointLatitude: availabilityData.meetingPointLatitude ?? null,
      meetingPointLongitude: availabilityData.meetingPointLongitude ?? null,
      meetingLocalDateTime: availabilityData.meetingLocalDateTime ?? null,
    });
  }

  private buildPricingModel(
    builderData: AvailabilityModelBuilderData
  ): AvailabilityPricingModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pricing) === false) {
      return undefined;
    }

    return AvailabilityPricingModelFactory.create({
      unitPricing: builderData.availabilityData.unitPricing ?? [PricingDataProvider.unitPricing],
      pricing: builderData.availabilityData.pricing ?? PricingDataProvider.adultPricing,
      pricingPer: PricingPer.BOOKING,
    });
  }

  private buildPickupModel(
    builderData: AvailabilityModelBuilderData
  ): AvailabilityPickupModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pickups) === false) {
      return undefined;
    }

    const availabilityData = builderData.availabilityData;

    return new AvailabilityPickupModel({
      pickupRequired: availabilityData.pickupRequired ?? false,
      pickupAvailable: availabilityData.pickupAvailable ?? false,
      pickupPoints: availabilityData.pickupPoints ?? [],
    });
  }
}
