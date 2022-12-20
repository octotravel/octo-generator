import { AvailabilityStatus } from "@octocloud/types";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";
import { AvailabilityParser } from "../AvailabilityParser";
import { AvailabilityModel } from "../../models/Availability/AvailabilityModel";
import { AvailabilityContentModel } from "../../models/Availability/AvailabilityContentModel";
import { AvailabilityPricingModel } from "../../models/Availability/AvailabilityPricingModel";
import { AvailabilityPickupModel } from "../../models/Availability/AvailabilityPickupModel";

describe("AvailabilityParser", () => {
  const availabilityParser = new AvailabilityParser();
  const availability = {
    id: "2023-12-01T00:00:00+01:00",
    localDateTimeStart: "2023-12-01T00:00:00+01:00",
    localDateTimeEnd: "2023-12-01T00:00:00+01:00",
    allDay: true,
    available: false,
    status: AvailabilityStatus.SOLD_OUT,
    vacancies: 0,
    capacity: 0,
    maxUnits: 0,
    utcCutoffAt: "2023-11-30T23:00:00Z",
    openingHours: [
      {
        from: "09:00",
        to: "17:00",
      },
    ],
    meetingPoint: null,
    meetingPointCoordinates: null,
    meetingPointLatitude: null,
    meetingPointLongitude: null,
    meetingLocalDateTime: null,
    unitPricing: [PricingDataProvider.unitPricing],
    pricing: PricingDataProvider.adultPricing,
    pickupAvailable: false,
    pickupRequired: false,
    pickupPoints: [],
  };
  const availabilityModel = new AvailabilityModel({
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
    availabilityContentModel: new AvailabilityContentModel({
      meetingPoint: availability.meetingPoint,
      meetingPointCoordinates: availability.meetingPointCoordinates,
      meetingPointLatitude: availability.meetingPointLatitude,
      meetingPointLongitude: availability.meetingPointLongitude,
      meetingLocalDateTime: availability.meetingLocalDateTime,
    }),
    availabilityPricingModel: new AvailabilityPricingModel({
      unitPricing: availability.unitPricing,
      pricing: availability.pricing,
    }),
    availabilityPickupModel: new AvailabilityPickupModel({
      pickupAvailable: availability.pickupAvailable,
      pickupRequired: availability.pickupRequired,
      pickupPoints: availability.pickupPoints,
    }),
  });

  describe("parseModelToPOJO", () => {
    it("should return availability POJO", async () => {
      expect(availabilityParser.parseModelToPOJO(availabilityModel)).toStrictEqual(availability);
    });
  });

  describe("parsePOJOToModel", () => {
    it("should return availability model", async () => {
      expect(availabilityParser.parsePOJOToModel(availability)).toStrictEqual(availabilityModel);
    });
  });
});
