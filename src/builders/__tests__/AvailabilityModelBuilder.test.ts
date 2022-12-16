import { CapabilityId, PricingPer } from "@octocloud/types";
import { AvailabilityModelBuilder } from "../AvailabilityModelBuilder";
import { AvailabilityModel } from "../../models/Availability/AvailabilityModel";

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
      expect(availabilityModel.availabilityPickupModel).toBeUndefined();
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
      expect(availabilityModel.availabilityPickupModel).toBeUndefined();
      expect(availabilityModel.availabilityPricingModel).toBeUndefined();
    });

    it("should build availability model with pickup capability", async () => {
      const availabilityModel = availabilityModelBuilder.build({
        availabilityData: {},
        pricingPer: PricingPer.BOOKING,
        capabilities: [CapabilityId.Pickups],
      });

      expect(availabilityModel).toBeInstanceOf(AvailabilityModel);
      expect(availabilityModel.availabilityContentModel).toBeUndefined();
      expect(availabilityModel.availabilityPickupModel).toBeDefined();
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
      expect(availabilityModel.availabilityPickupModel).toBeUndefined();
      expect(availabilityModel.availabilityPricingModel).toBeDefined();
    });

    it("should build availability model with all capabilities", async () => {
      const availabilityModel = availabilityModelBuilder.build({
        availabilityData: {},
        pricingPer: PricingPer.BOOKING,
        capabilities: [CapabilityId.Content, CapabilityId.Pickups, CapabilityId.Pricing],
      });

      expect(availabilityModel).toBeInstanceOf(AvailabilityModel);
      expect(availabilityModel.availabilityContentModel).toBeDefined();
      expect(availabilityModel.availabilityPickupModel).toBeDefined();
      expect(availabilityModel.availabilityPricingModel).toBeDefined();
    });
  });
});
