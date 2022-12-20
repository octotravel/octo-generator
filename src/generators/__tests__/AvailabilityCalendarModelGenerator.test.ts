import { AvailabilityType, CapabilityId } from "@octocloud/types";
import { AvailabilityCalendarValidator } from "@octocloud/validators";
import { AvailabilityCalendarParser } from "../../parsers/AvailabilityCalendarParser";
import { AvailabilityCalendarModelGenerator } from "../AvailabilityCalendarModelGenerator";

describe("AvailabilityCalendarModelGenerator", () => {
  const availabilityCalendarModelGenerator = new AvailabilityCalendarModelGenerator();
  const availabilityCalendarParser = new AvailabilityCalendarParser();
  const capabilities = [CapabilityId.Pricing];
  const availabilityCalendarValidator = new AvailabilityCalendarValidator({
    path: "",
    capabilities: capabilities,
    availabilityType: AvailabilityType.START_TIME,
  });

  describe("generate and validate availability model", () => {
    it("should generate valid availability model", async () => {
      const availabilityCalendarModel = availabilityCalendarModelGenerator.generate({
        availabilityCalendarData: {
          localDate: "2022-12-11",
        },
        capabilities: capabilities,
      });
      const availabilityCalendar = availabilityCalendarParser.parseModelToPOJO(availabilityCalendarModel);
      const validationErrors = availabilityCalendarValidator.validate(availabilityCalendar);

      expect(validationErrors).toStrictEqual([]);
    });

    it("should generate invalid availability model", async () => {
      const availabilityCalendarModel = availabilityCalendarModelGenerator.generate({
        availabilityCalendarData: {
          localDate: "",
        },
        capabilities: capabilities,
      });
      const availabilityCalendar = availabilityCalendarParser.parseModelToPOJO(availabilityCalendarModel);
      const validationErrors = availabilityCalendarValidator.validate(availabilityCalendar);

      expect(validationErrors.length).toBeGreaterThan(0);
    });
  });
});
