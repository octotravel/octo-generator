import { CapabilityId } from "@octocloud/types";
import { BookingModelBuilder } from "../BookingModelBuilder";
import { BookingModel } from "../../models/booking/BookingModel";
import { AvailabilityDataProvider } from "../../dataProviders/AvailabilityDataProvider";

describe("BookingModelBuilder", () => {
  const bookingModelBuilder = new BookingModelBuilder();

  describe("build", () => {
    it("should build booking model without any capabilities", async () => {
      const generateBookingModel = bookingModelBuilder.build({
        bookingData: {
          availability: AvailabilityDataProvider.availability,
        },
        capabilities: [],
      });

      expect(generateBookingModel).toBeInstanceOf(BookingModel);
      expect(generateBookingModel.bookingCartModel).toBeUndefined();
      expect(generateBookingModel.bookingContentModel).toBeUndefined();
      expect(generateBookingModel.bookingPickupsModel).toBeUndefined();
      expect(generateBookingModel.bookingPricingModel).toBeUndefined();
    });

    it("should build booking model with cart capability", async () => {
      const generateBookingModel = bookingModelBuilder.build({
        bookingData: {
          availability: AvailabilityDataProvider.availability,
        },
        capabilities: [CapabilityId.Cart],
      });

      expect(generateBookingModel).toBeInstanceOf(BookingModel);
      expect(generateBookingModel.bookingCartModel).toBeDefined();
      expect(generateBookingModel.bookingContentModel).toBeUndefined();
      expect(generateBookingModel.bookingPickupsModel).toBeUndefined();
      expect(generateBookingModel.bookingPricingModel).toBeUndefined();
    });

    it("should build booking model with content capability", async () => {
      const generateBookingModel = bookingModelBuilder.build({
        bookingData: {
          availability: AvailabilityDataProvider.availability,
        },
        capabilities: [CapabilityId.Content],
      });

      expect(generateBookingModel).toBeInstanceOf(BookingModel);
      expect(generateBookingModel.bookingCartModel).toBeUndefined();
      expect(generateBookingModel.bookingContentModel).toBeDefined();
      expect(generateBookingModel.bookingPickupsModel).toBeUndefined();
      expect(generateBookingModel.bookingPricingModel).toBeUndefined();
    });

    it("should build booking model with pickups capability", async () => {
      const generateBookingModel = bookingModelBuilder.build({
        bookingData: {
          availability: AvailabilityDataProvider.availability,
        },
        capabilities: [CapabilityId.Pickups],
      });

      expect(generateBookingModel).toBeInstanceOf(BookingModel);
      expect(generateBookingModel.bookingCartModel).toBeUndefined();
      expect(generateBookingModel.bookingContentModel).toBeUndefined();
      expect(generateBookingModel.bookingPickupsModel).toBeDefined();
      expect(generateBookingModel.bookingPricingModel).toBeUndefined();
    });

    it("should build booking model with pricing capability", async () => {
      const generateBookingModel = bookingModelBuilder.build({
        bookingData: {
          availability: AvailabilityDataProvider.availability,
        },
        capabilities: [CapabilityId.Pricing],
      });

      expect(generateBookingModel).toBeInstanceOf(BookingModel);
      expect(generateBookingModel.bookingCartModel).toBeUndefined();
      expect(generateBookingModel.bookingContentModel).toBeUndefined();
      expect(generateBookingModel.bookingPickupsModel).toBeUndefined();
      expect(generateBookingModel.bookingPricingModel).toBeDefined();
    });

    it("should build booking model with all capabilities", async () => {
      const generateBookingModel = bookingModelBuilder.build({
        bookingData: {
          availability: AvailabilityDataProvider.availability,
        },
        capabilities: [CapabilityId.Cart, CapabilityId.Content, CapabilityId.Pickups, CapabilityId.Pricing],
      });

      expect(generateBookingModel).toBeInstanceOf(BookingModel);
      expect(generateBookingModel.bookingCartModel).toBeDefined();
      expect(generateBookingModel.bookingContentModel).toBeDefined();
      expect(generateBookingModel.bookingPickupsModel).toBeDefined();
      expect(generateBookingModel.bookingPricingModel).toBeDefined();
    });
  });
});
