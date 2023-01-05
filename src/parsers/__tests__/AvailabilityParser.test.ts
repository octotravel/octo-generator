import { AvailabilityParser } from "../AvailabilityParser";
import { AvailabilityModel } from "../../models/availability/AvailabilityModel";
import { AvailabilityContentModel } from "../../models/availability/AvailabilityContentModel";
import { AvailabilityPricingModel } from "../../models/availability/AvailabilityPricingModel";
import { AvailabilityPickupsModel } from "../../models/availability/AvailabilityPickupsModel";
import { AvailabilityStatus, CapabilityId } from "@octocloud/types";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";

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
  };
  const availabilityContent = {
    meetingPoint: null,
    meetingPointCoordinates: null,
    meetingPointLatitude: null,
    meetingPointLongitude: null,
    meetingLocalDateTime: null,
  };
  const availabilityPickups = {
    pickupAvailable: false,
    pickupRequired: false,
    pickupPoints: [],
  };
  const availabilityPricing = {
    unitPricing: [PricingDataProvider.unitPricing],
    pricing: PricingDataProvider.adultPricing,
  };
  const availabilityPOJO = {
    ...availability,
    ...availabilityContent,
    ...availabilityPickups,
    ...availabilityPricing,
  };
  const availabilityModel = new AvailabilityModel({
    id: availabilityPOJO.id,
    localDateTimeStart: availabilityPOJO.localDateTimeStart,
    localDateTimeEnd: availabilityPOJO.localDateTimeEnd,
    allDay: availabilityPOJO.allDay,
    available: availabilityPOJO.available,
    status: availabilityPOJO.status,
    vacancies: availabilityPOJO.vacancies,
    capacity: availabilityPOJO.capacity,
    maxUnits: availabilityPOJO.maxUnits,
    utcCutoffAt: availabilityPOJO.utcCutoffAt,
    openingHours: availabilityPOJO.openingHours,
    availabilityContentModel: new AvailabilityContentModel({
      meetingPoint: availabilityPOJO.meetingPoint,
      meetingPointCoordinates: availabilityPOJO.meetingPointCoordinates,
      meetingPointLatitude: availabilityPOJO.meetingPointLatitude,
      meetingPointLongitude: availabilityPOJO.meetingPointLongitude,
      meetingLocalDateTime: availabilityPOJO.meetingLocalDateTime,
    }),
    availabilityPricingModel: new AvailabilityPricingModel({
      unitPricing: availabilityPOJO.unitPricing,
      pricing: availabilityPOJO.pricing,
    }),
    availabilityPickupsModel: new AvailabilityPickupsModel({
      pickupAvailable: availabilityPOJO.pickupAvailable,
      pickupRequired: availabilityPOJO.pickupRequired,
      pickupPoints: availabilityPOJO.pickupPoints,
    }),
  });

  describe("parsePOJOToModel", () => {
    it("should return availability model", async () => {
      expect(availabilityParser.parsePOJOToModel(availabilityPOJO)).toStrictEqual(availabilityModel);
    });
  });

  describe("parseModelToPOJO", () => {
    it("should return availability POJO", async () => {
      expect(availabilityParser.parseModelToPOJO(availabilityModel)).toStrictEqual(availabilityPOJO);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO without any capabilities", async () => {
      expect(availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [])).toStrictEqual(
        availability
      );
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with content capability", async () => {
      expect(
        availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [CapabilityId.Content])
      ).toStrictEqual({
        ...availability,
        ...availabilityContent,
      });
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with pickups capability", async () => {
      expect(
        availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [CapabilityId.Pickups])
      ).toStrictEqual({
        ...availability,
        ...availabilityPickups,
      });
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with pricing capability", async () => {
      expect(
        availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [CapabilityId.Pricing])
      ).toStrictEqual({
        ...availability,
        ...availabilityPricing,
      });
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with all capabilities", async () => {
      expect(
        availabilityParser.parseModelToPOJOWithSpecificCapabilities(availabilityModel, [
          CapabilityId.Content,
          CapabilityId.Pickups,
          CapabilityId.Pricing,
        ])
      ).toStrictEqual(availabilityPOJO);
    });
  });
});
