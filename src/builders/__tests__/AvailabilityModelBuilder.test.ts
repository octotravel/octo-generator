import { CapabilityId, PricingPer } from "@octocloud/types";
import { AvailabilityModelBuilder } from "../AvailabilityModelBuilder";
import { AvailabilityModel } from "../../models/availability/AvailabilityModel";

describe("AvailabilityModelBuilder", () => {
  const availabilityModelBuilder = new AvailabilityModelBuilder();

  describe("build", () => {
    it("should build availability model without any capabilities", async () => {
      const availabilityModel = availabilityModelBuilder.build({
        availabilityData: {},
        pricingPer: PricingPer.BOOKING,
        capabilities: [],
      });

      expect(availabilityModel).toBeInstanceOf(AvailabilityModel);
      expect(availabilityModel.availabilityContentModel).toBeUndefined();
      expect(availabilityModel.availabilityOffersModel).toBeUndefined();
      expect(availabilityModel.availabilityPickupsModel).toBeUndefined();
      expect(availabilityModel.availabilityPricingModel).toBeUndefined();
    });

    it("should build availability model with content capability", async () => {
      const availabilityModel = availabilityModelBuilder.build({
        availabilityData: {},
        pricingPer: PricingPer.BOOKING,
        capabilities: [CapabilityId.Content],
      });

      expect(availabilityModel).toBeInstanceOf(AvailabilityModel);
      expect(availabilityModel.availabilityContentModel).toBeDefined();
      expect(availabilityModel.availabilityOffersModel).toBeUndefined();
      expect(availabilityModel.availabilityPickupsModel).toBeUndefined();
      expect(availabilityModel.availabilityPricingModel).toBeUndefined();
    });

    it("should build availability model with offers capability", async () => {
      const availabilityModel = availabilityModelBuilder.build({
        availabilityData: {},
        pricingPer: PricingPer.BOOKING,
        capabilities: [CapabilityId.Offers],
      });

      expect(availabilityModel).toBeInstanceOf(AvailabilityModel);
      expect(availabilityModel.availabilityContentModel).toBeUndefined();
      expect(availabilityModel.availabilityOffersModel).toBeDefined();
      expect(availabilityModel.availabilityPickupsModel).toBeUndefined();
      expect(availabilityModel.availabilityPricingModel).toBeUndefined();
    });

    it("should build availability model with pickups capability", async () => {
      const availabilityModel = availabilityModelBuilder.build({
        availabilityData: {},
        pricingPer: PricingPer.BOOKING,
        capabilities: [CapabilityId.Pickups],
      });

      expect(availabilityModel).toBeInstanceOf(AvailabilityModel);
      expect(availabilityModel.availabilityContentModel).toBeUndefined();
      expect(availabilityModel.availabilityOffersModel).toBeUndefined();
      expect(availabilityModel.availabilityPickupsModel).toBeDefined();
      expect(availabilityModel.availabilityPricingModel).toBeUndefined();
    });

    it("should build availability model with pricing capability", async () => {
      const availabilityModel = availabilityModelBuilder.build({
        availabilityData: {},
        pricingPer: PricingPer.BOOKING,
        capabilities: [CapabilityId.Pricing],
      });

      expect(availabilityModel).toBeInstanceOf(AvailabilityModel);
      expect(availabilityModel.availabilityContentModel).toBeUndefined();
      expect(availabilityModel.availabilityOffersModel).toBeUndefined();
      expect(availabilityModel.availabilityPickupsModel).toBeUndefined();
      expect(availabilityModel.availabilityPricingModel).toBeDefined();
    });

    it("should build availability model with all capabilities", async () => {
      const availabilityModel = availabilityModelBuilder.build({
        availabilityData: {},
        pricingPer: PricingPer.BOOKING,
        capabilities: [CapabilityId.Content, CapabilityId.Pickups, CapabilityId.Offers, CapabilityId.Pricing],
      });

      expect(availabilityModel).toBeInstanceOf(AvailabilityModel);
      expect(availabilityModel.availabilityContentModel).toBeDefined();
      expect(availabilityModel.availabilityOffersModel).toBeDefined();
      expect(availabilityModel.availabilityPickupsModel).toBeDefined();
      expect(availabilityModel.availabilityPricingModel).toBeDefined();
    });
  });
});
