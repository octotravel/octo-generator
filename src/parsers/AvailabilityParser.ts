import { Availability } from "@octocloud/types";
import { AvailabilityModel } from "../models/availability/AvailabilityModel";
import { AvailabilityContentModel } from "../models/Availability/AvailabilityContentModel";
import { AvailabilityPickupModel } from "../models/Availability/AvailabilityPickupModel";
import { AvailabilityPricingModel } from "../models/Availability/AvailabilityPricingModel";

export class AvailabilityParser {
  public parsePOJOToModel = (availability: Availability): AvailabilityModel => {
    return new AvailabilityModel({
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
      availabilityPickupModel: this.parsePickupPOJOToModel(availability),
      availabilityPricingModel: this.parsePricingPOJOToModel(availability),
    });
  };

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

  private parsePickupPOJOToModel = (availability: Availability): AvailabilityPickupModel | undefined => {
    if (
      availability.pickupRequired === undefined ||
      availability.pickupAvailable === undefined ||
      availability.pickupPoints === undefined
    ) {
      return undefined;
    }

    return new AvailabilityPickupModel({
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
    const availability: Availability = {
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
    };

    if (availabilityModel.availabilityContentModel !== undefined) {
      const availabilityContentModel = availabilityModel.availabilityContentModel;

      availability.meetingPoint = availabilityContentModel.meetingPoint;
      availability.meetingPointCoordinates = availabilityContentModel.meetingPointCoordinates;
      availability.meetingPointLatitude = availabilityContentModel.meetingPointLatitude;
      availability.meetingPointLongitude = availabilityContentModel.meetingPointLongitude;
      availability.meetingLocalDateTime = availabilityContentModel.meetingLocalDateTime;
    }

    if (availabilityModel.availabilityPickupModel !== undefined) {
      const availabilityPickupModel = availabilityModel.availabilityPickupModel;

      availability.pickupRequired = availabilityPickupModel.pickupRequired;
      availability.pickupAvailable = availabilityPickupModel.pickupAvailable;
      availability.pickupPoints = availabilityPickupModel.pickupPoints;
    }

    if (availabilityModel.availabilityPricingModel !== undefined) {
      const availabilityPricingModel = availabilityModel.availabilityPricingModel;

      availability.unitPricing = availabilityPricingModel.unitPricing;
      availability.pricing = availabilityPricingModel.pricing;
    }

    return availability;
  };
}
