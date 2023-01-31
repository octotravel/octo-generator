import { CapabilityId } from "@octocloud/types";
import { BookingValidator } from "@octocloud/validators";
import { BookingParser } from "../../parsers/BookingParser";
import { BookingModelGenerator } from "../BookingModelGenerator";
import { AvailabilityDataProvider } from "../../dataProviders/AvailabilityDataProvider";

describe("BookingModelGenerator", () => {
  const bookingModelGenerator = new BookingModelGenerator();
  const bookingParser = new BookingParser();
  const capabilities = [CapabilityId.Cart, CapabilityId.Content, CapabilityId.Pickups, CapabilityId.Pricing];
  const bookingValidator = new BookingValidator({
    capabilities,
  });

  describe("generate and validate booking model", () => {
    it("should generate valid booking model", async () => {
      const bookingModel = bookingModelGenerator.generateBooking({
        bookingData: {
          id: "id",
          availability: AvailabilityDataProvider.availability,
        },
        capabilities,
      });
      const unit = bookingParser.parseModelToPOJO(bookingModel);
      const validationErrors = bookingValidator.validate(unit);

      expect(validationErrors).toStrictEqual([]);
    });

    it("should generate invalid booking model", async () => {
      const unitModel = bookingModelGenerator.generateBooking({
        bookingData: {
          id: "",
          availability: AvailabilityDataProvider.availability,
        },
        capabilities,
      });
      const unit = bookingParser.parseModelToPOJO(unitModel);
      const validationErrors = bookingValidator.validate(unit);

      expect(validationErrors.length).toBeGreaterThan(0);
    });
  });
});
