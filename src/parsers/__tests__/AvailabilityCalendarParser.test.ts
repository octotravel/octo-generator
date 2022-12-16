import { AvailabilityStatus } from "@octocloud/types";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";
import { AvailabilityCalendarModel } from "../../models/Availability/AvailabilityCalendarModel";
import { AvailabilityCalendarPricingModel } from "../../models/Availability/AvailabilityCalendarPricingModel";
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
    unitPricingFrom: [PricingDataProvider.unitPricing],
    pricingFrom: PricingDataProvider.adultPricing,
  };
  const availabilityCalendarModel = new AvailabilityCalendarModel({
    localDate: availabilityCalendar.localDate,
    available: availabilityCalendar.available,
    status: availabilityCalendar.status,
    vacancies: availabilityCalendar.vacancies,
    capacity: availabilityCalendar.capacity,
    openingHours: availabilityCalendar.openingHours,
    availabilityCalendarPricingModel: new AvailabilityCalendarPricingModel({
      unitPricingFrom: availabilityCalendar.unitPricingFrom,
      pricingFrom: availabilityCalendar.pricingFrom,
    }),
  });

  describe("parseModelToPOJO", () => {
    it("should return availability calendar POJO", async () => {
      expect(availabilityCalendarParser.parseModelToPOJO(availabilityCalendarModel)).toStrictEqual(
        availabilityCalendar
      );
    });
  });

  describe("parsePOJOToModel", () => {
    it("should return availability calendar model", async () => {
      expect(availabilityCalendarParser.parsePOJOToModel(availabilityCalendar)).toStrictEqual(
        availabilityCalendarModel
      );
    });
  });
});
