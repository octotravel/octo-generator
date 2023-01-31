import { Availability, CapabilityId } from "@octocloud/types";
import { AvailabilityModel } from "../models/availability/AvailabilityModel";
import { AvailabilityContentModel } from "../models/availability/AvailabilityContentModel";
import { AvailabilityPickupsModel } from "../models/availability/AvailabilityPickupsModel";
import { AvailabilityPricingModel } from "../models/availability/AvailabilityPricingModel";

export class AvailabilityParser {
  public parsePOJOToModel = (availability: Availability): AvailabilityModel =>
    new AvailabilityModel({
      id: availability.id,
      localDateTimeStart: availability.localDateTimeStart,
      localDateTimeEnd: availability.localDateTimeEnd,
      allDay: availability.allDay,
      available: availability.available,
      status: availability.status,
      vacancies: availability.vacancies,
      capacity: availability.capacity,
      maxUnits: availability.maxUnits,
      utcCutoffAt: availability.utcCutoffAt,
      openingHours: availability.openingHours,
      availabilityContentModel: this.parseContentPOJOToModel(availability),
      availabilityPickupsModel: this.parsePickupPOJOToModel(availability),
      availabilityPricingModel: this.parsePricingPOJOToModel(availability),
    });

  private parseContentPOJOToModel = (availability: Availability): AvailabilityContentModel | undefined => {
    if (
      availability.meetingPoint === undefined ||
      availability.meetingPointCoordinates === undefined ||
      availability.meetingPointLatitude === undefined ||
      availability.meetingPointLongitude === undefined ||
      availability.meetingLocalDateTime === undefined
    ) {
      return undefined;
    }

    return new AvailabilityContentModel({
      meetingPoint: availability.meetingPoint,
      meetingPointCoordinates: availability.meetingPointCoordinates,
      meetingPointLatitude: availability.meetingPointLatitude,
      meetingPointLongitude: availability.meetingPointLongitude,
      meetingLocalDateTime: availability.meetingLocalDateTime,
    });
  };

  private parsePickupPOJOToModel = (availability: Availability): AvailabilityPickupsModel | undefined => {
    if (
      availability.pickupRequired === undefined ||
      availability.pickupAvailable === undefined ||
      availability.pickupPoints === undefined
    ) {
      return undefined;
    }

    return new AvailabilityPickupsModel({
      pickupRequired: availability.pickupRequired,
      pickupAvailable: availability.pickupAvailable,
      pickupPoints: availability.pickupPoints,
    });
  };

  private parsePricingPOJOToModel = (availability: Availability): AvailabilityPricingModel | undefined => {
    if (availability.unitPricing === undefined || availability.pricing === undefined) {
      return undefined;
    }

    return new AvailabilityPricingModel({
      unitPricing: availability.unitPricing,
      pricing: availability.pricing,
    });
  };

  public parseModelToPOJO = (availabilityModel: AvailabilityModel): Availability => {
    const availability = this.parseMainModelToPojo(availabilityModel);

    this.parseContentModelToPOJO(availability, availabilityModel);
    this.parsePickupsModelToPOJO(availability, availabilityModel);
    this.parsePricingModelToPOJO(availability, availabilityModel);

    return availability;
  };

  public parseModelToPOJOWithSpecificCapabilities = (
    availabilityModel: AvailabilityModel,
    capabilities: CapabilityId[]
  ): Availability => {
    const availability = this.parseMainModelToPojo(availabilityModel);

    if (capabilities.includes(CapabilityId.Content)) {
      this.parseContentModelToPOJO(availability, availabilityModel);
    }

    if (capabilities.includes(CapabilityId.Pickups)) {
      this.parsePickupsModelToPOJO(availability, availabilityModel);
    }

    if (capabilities.includes(CapabilityId.Pricing)) {
      this.parsePricingModelToPOJO(availability, availabilityModel);
    }

    return availability;
  };

  private parseMainModelToPojo = (availabilityModel: AvailabilityModel): Availability => ({
    id: availabilityModel.id,
    localDateTimeStart: availabilityModel.localDateTimeStart,
    localDateTimeEnd: availabilityModel.localDateTimeEnd,
    allDay: availabilityModel.allDay,
    available: availabilityModel.available,
    status: availabilityModel.status,
    vacancies: availabilityModel.vacancies,
    capacity: availabilityModel.capacity,
    maxUnits: availabilityModel.maxUnits,
    utcCutoffAt: availabilityModel.utcCutoffAt,
    openingHours: availabilityModel.openingHours,
  });

  private parseContentModelToPOJO = (availability: Availability, availabilityModel: AvailabilityModel) => {
    if (availabilityModel.availabilityContentModel === undefined) {
      return;
    }

    const { availabilityContentModel } = availabilityModel;

    availability.meetingPoint = availabilityContentModel.meetingPoint;
    availability.meetingPointCoordinates = availabilityContentModel.meetingPointCoordinates;
    availability.meetingPointLatitude = availabilityContentModel.meetingPointLatitude;
    availability.meetingPointLongitude = availabilityContentModel.meetingPointLongitude;
    availability.meetingLocalDateTime = availabilityContentModel.meetingLocalDateTime;
  };

  private parsePickupsModelToPOJO = (availability: Availability, availabilityModel: AvailabilityModel) => {
    if (availabilityModel.availabilityPickupsModel === undefined) {
      return;
    }

    const { availabilityPickupsModel } = availabilityModel;

    availability.pickupRequired = availabilityPickupsModel.pickupRequired;
    availability.pickupAvailable = availabilityPickupsModel.pickupAvailable;
    availability.pickupPoints = availabilityPickupsModel.pickupPoints;
  };

  private parsePricingModelToPOJO = (availability: Availability, availabilityModel: AvailabilityModel) => {
    if (availabilityModel.availabilityPricingModel === undefined) {
      return;
    }

    const { availabilityPricingModel } = availabilityModel;

    availability.unitPricing = availabilityPricingModel.unitPricing;
    availability.pricing = availabilityPricingModel.pricing;
  };
}
