import { AvailabilityStatus, CapabilityId } from "@octocloud/types";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";
import { AvailabilityCalendarModel } from "../../models/availability/AvailabilityCalendarModel";
import { AvailabilityCalendarPricingModel } from "../../models/availability/AvailabilityCalendarPricingModel";
import { AvailabilityCalendarParser } from "../AvailabilityCalendarParser";

describe("AvailabilityCalendarParser", () => {
  const availabilityCalendarParser = new AvailabilityCalendarParser();

  const availabilityCalendar = {
    localDate: "2022-12-11",
    available: false,
    status: AvailabilityStatus.CLOSED,
    vacancies: 0,
    capacity: 20,
    openingHours: [
      {
        from: "00:00",
        to: "23:59",
      },
    ],
  };
  const availabilityCalendarPricing = {
    unitPricingFrom: [PricingDataProvider.unitPricing],
    pricingFrom: PricingDataProvider.adultPricing,
  };
  const availabilityCalendarPOJO = {
    ...availabilityCalendar,
    ...availabilityCalendarPricing,
  };

  const availabilityCalendarModel = new AvailabilityCalendarModel({
    localDate: availabilityCalendarPOJO.localDate,
    available: availabilityCalendarPOJO.available,
    status: availabilityCalendarPOJO.status,
    vacancies: availabilityCalendarPOJO.vacancies,
    capacity: availabilityCalendarPOJO.capacity,
    openingHours: availabilityCalendarPOJO.openingHours,
    availabilityCalendarPricingModel: new AvailabilityCalendarPricingModel({
      unitPricingFrom: availabilityCalendarPOJO.unitPricingFrom,
      pricingFrom: availabilityCalendarPOJO.pricingFrom,
    }),
  });

  describe("parsePOJOToModel", () => {
    it("should return availability calendar model", async () => {
      expect(availabilityCalendarParser.parsePOJOToModel(availabilityCalendarPOJO)).toStrictEqual(
        availabilityCalendarModel
      );
    });
  });

  describe("parseModelToPOJO", () => {
    it("should return availability calendar POJO", async () => {
      expect(availabilityCalendarParser.parseModelToPOJO(availabilityCalendarModel)).toStrictEqual(
        availabilityCalendarPOJO
      );
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO without any capabilities", async () => {
      expect(
        availabilityCalendarParser.parseModelToPOJOWithSpecificCapabilities(availabilityCalendarModel, [])
      ).toStrictEqual(availabilityCalendar);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with pricing capability", async () => {
      expect(
        availabilityCalendarParser.parseModelToPOJOWithSpecificCapabilities(availabilityCalendarModel, [
          CapabilityId.Pricing,
        ])
      ).toStrictEqual({
        ...availabilityCalendar,
        ...availabilityCalendarPricing,
      });
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with all capabilities", async () => {
      expect(
        availabilityCalendarParser.parseModelToPOJOWithSpecificCapabilities(availabilityCalendarModel, [
          CapabilityId.Pricing,
        ])
      ).toStrictEqual(availabilityCalendarPOJO);
    });
  });
});
