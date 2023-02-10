import {
  Availability,
  AvailabilityContent,
  CapabilityId,
  AvailabilityOffers,
  AvailabilityPickup,
  AvailabilityPricing,
} from "@octocloud/types";
import { AvailabilityModel } from "../models/availability/AvailabilityModel";
import { AvailabilityContentModel } from "../models/availability/AvailabilityContentModel";
import { AvailabilityPickupsModel } from "../models/availability/AvailabilityPickupsModel";
import { AvailabilityPricingModel } from "../models/availability/AvailabilityPricingModel";
import { OfferParser } from "./OfferParser";
import { AvailabilityOffersModel } from "../models/availability/AvailabilityOffersModel";

export class AvailabilityParser {
  private readonly offerParser = new OfferParser();

  public parsePOJOToModel(availability: Availability): AvailabilityModel {
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
      availabilityOffersModel: this.parseOffersPOJOToModel(availability),
      availabilityPickupsModel: this.parsePickupPOJOToModel(availability),
      availabilityPricingModel: this.parsePricingPOJOToModel(availability),
    });
  }

  public parseContentPOJOToModel(availabilityContent: AvailabilityContent): AvailabilityContentModel | undefined {
    if (
      availabilityContent.meetingPoint === undefined ||
      availabilityContent.meetingPointCoordinates === undefined ||
      availabilityContent.meetingPointLatitude === undefined ||
      availabilityContent.meetingPointLongitude === undefined ||
      availabilityContent.meetingLocalDateTime === undefined
    ) {
      return undefined;
    }

    return new AvailabilityContentModel({
      meetingPoint: availabilityContent.meetingPoint,
      meetingPointCoordinates: availabilityContent.meetingPointCoordinates,
      meetingPointLatitude: availabilityContent.meetingPointLatitude,
      meetingPointLongitude: availabilityContent.meetingPointLongitude,
      meetingLocalDateTime: availabilityContent.meetingLocalDateTime,
    });
  }

  public parseOffersPOJOToModel(availabilityOffers: AvailabilityOffers): AvailabilityOffersModel | undefined {
    if (
      availabilityOffers.offerCode === undefined ||
      availabilityOffers.offerTitle === undefined ||
      availabilityOffers.offers === undefined ||
      availabilityOffers.offer === undefined
    ) {
      return undefined;
    }

    return new AvailabilityOffersModel({
      offerCode: availabilityOffers.offerCode,
      offerTitle: availabilityOffers.offerTitle,
      offerModels: availabilityOffers.offers.map((offer) => this.offerParser.parsePOJOToModel(offer)),
      offerModel: this.offerParser.parsePOJOToModel(availabilityOffers.offer),
    });
  }

  public parsePickupPOJOToModel(availabilityPickup: AvailabilityPickup): AvailabilityPickupsModel | undefined {
    if (
      availabilityPickup.pickupRequired === undefined ||
      availabilityPickup.pickupAvailable === undefined ||
      availabilityPickup.pickupPoints === undefined
    ) {
      return undefined;
    }

    return new AvailabilityPickupsModel({
      pickupRequired: availabilityPickup.pickupRequired,
      pickupAvailable: availabilityPickup.pickupAvailable,
      pickupPoints: availabilityPickup.pickupPoints,
    });
  }

  public parsePricingPOJOToModel(availabilityPricing: AvailabilityPricing): AvailabilityPricingModel | undefined {
    if (availabilityPricing.unitPricing === undefined || availabilityPricing.pricing === undefined) {
      return undefined;
    }

    return new AvailabilityPricingModel({
      unitPricing: availabilityPricing.unitPricing,
      pricing: availabilityPricing.pricing,
    });
  }

  public parseModelToPOJO(availabilityModel: AvailabilityModel): Availability {
    const availability = this.parseMainModelToPojo(availabilityModel);

    Object.assign(
      availability,
      this.parseContentModelToPOJO(availabilityModel.availabilityContentModel),
      this.parseOffersModelToPOJO(availabilityModel.availabilityOffersModel),
      this.parsePickupsModelToPOJO(availabilityModel.availabilityPickupsModel),
      this.parsePricingModelToPOJO(availabilityModel.availabilityPricingModel)
    );

    return availability;
  }

  public parseModelToPOJOWithSpecificCapabilities = (
    availabilityModel: AvailabilityModel,
    capabilities: CapabilityId[]
  ): Availability => {
    const availability = this.parseMainModelToPojo(availabilityModel);
    let availabilityContentModel;
    let availabilityOffersModel;
    let availabilityPickupsModel;
    let availabilityPricingModel;

    if (capabilities.includes(CapabilityId.Content)) {
      availabilityContentModel = this.parseContentModelToPOJO(availabilityModel.availabilityContentModel);
    }

    if (capabilities.includes(CapabilityId.Offers)) {
      availabilityOffersModel = this.parseOffersModelToPOJO(availabilityModel.availabilityOffersModel);
    }

    if (capabilities.includes(CapabilityId.Pickups)) {
      availabilityPickupsModel = this.parsePickupsModelToPOJO(availabilityModel.availabilityPickupsModel);
    }

    if (capabilities.includes(CapabilityId.Pricing)) {
      availabilityPricingModel = this.parsePricingModelToPOJO(availabilityModel.availabilityPricingModel);
    }

    Object.assign(
      availability,
      availabilityContentModel,
      availabilityOffersModel,
      availabilityPickupsModel,
      availabilityPricingModel
    );

    return availability;
  };

  private parseMainModelToPojo(availabilityModel: AvailabilityModel): Availability {
    return {
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
  }

  public parseContentModelToPOJO(availabilityContentModel?: AvailabilityContentModel): AvailabilityContent {
    if (availabilityContentModel === undefined) {
      return {};
    }

    return {
      meetingPoint: availabilityContentModel.meetingPoint,
      meetingPointCoordinates: availabilityContentModel.meetingPointCoordinates,
      meetingPointLatitude: availabilityContentModel.meetingPointLatitude,
      meetingPointLongitude: availabilityContentModel.meetingPointLongitude,
      meetingLocalDateTime: availabilityContentModel.meetingLocalDateTime,
    };
  }

  public parseOffersModelToPOJO(availabilityOffersModel?: AvailabilityOffersModel): AvailabilityOffers {
    if (availabilityOffersModel === undefined) {
      return {};
    }

    return {
      offerCode: availabilityOffersModel.offerCode,
      offerTitle: availabilityOffersModel.offerTitle,
      offers: availabilityOffersModel.offerModels.map((offerModel) => this.offerParser.parseModelToPOJO(offerModel)),
      offer: this.offerParser.parseModelToPOJO(availabilityOffersModel.offerModel),
    };
  }

  public parsePickupsModelToPOJO(availabilityPickupsModel?: AvailabilityPickupsModel): AvailabilityPickup {
    if (availabilityPickupsModel === undefined) {
      return {};
    }

    return {
      pickupRequired: availabilityPickupsModel.pickupRequired,
      pickupAvailable: availabilityPickupsModel.pickupAvailable,
      pickupPoints: availabilityPickupsModel.pickupPoints,
    };
  }

  public parsePricingModelToPOJO(availabilityPricingModel?: AvailabilityPricingModel): AvailabilityPricing {
    if (availabilityPricingModel === undefined) {
      return {};
    }

    return {
      unitPricing: availabilityPricingModel.unitPricing,
      pricing: availabilityPricingModel.pricing,
    };
  }
}
