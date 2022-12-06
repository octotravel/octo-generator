import { UnitType } from "@octocloud/types/src/types/Unit";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";
import { UnitData } from "../../data/UnitData";
import { CapabilityId, DurationUnit, PricingPer } from "@octocloud/types";
import { OptionModelBuilder } from "../OptionModelBuilder";
import { OptionModel } from "../../models/Option/OptionModel";
import { OptionData } from "../../data/OptionData";

describe("OptionModelBuilder", () => {
  const optionModelBuilder = new OptionModelBuilder();
  const unitData: UnitData = {
    id: "test",
    type: UnitType.ADULT,
    pricing: [PricingDataProvider.adultPricing],
  };
  const optionData: OptionData = {
    restrictions: {
      minUnits: 0,
      maxUnits: null,
    },
    unitsData: [unitData],
    title: "title",
    subtitle: "subtitle",
    language: "language",
    shortDescription: "shortDescription",
    duration: "duration",
    durationAmount: "durationAmount",
    durationUnit: DurationUnit.HOUR,
    itinerary: null,
    pickupRequired: false,
    pickupAvailable: false,
    pickupPoints: [],
    pricing: [PricingDataProvider.adultPricing],
  };

  describe("build", () => {
    it("should build option model without any capabilities", async () => {
      const generatedOptionModel = optionModelBuilder.build({
        optionData: optionData,
        pricingPer: PricingPer.UNIT,
        capabilities: [],
      });

      expect(generatedOptionModel).toBeInstanceOf(OptionModel);
      expect(generatedOptionModel.optionContentModel).toBeUndefined();
      expect(generatedOptionModel.optionPickupModel).toBeUndefined();
      expect(generatedOptionModel.optionPricingModel).toBeUndefined();
    });

    it("should build option model with content capability", async () => {
      const generatedOptionModel = optionModelBuilder.build({
        optionData: optionData,
        pricingPer: PricingPer.UNIT,
        capabilities: [CapabilityId.Content],
      });

      expect(generatedOptionModel).toBeInstanceOf(OptionModel);
      expect(generatedOptionModel.optionContentModel).toBeDefined();
      expect(generatedOptionModel.optionPickupModel).toBeUndefined();
      expect(generatedOptionModel.optionPricingModel).toBeUndefined();
    });

    it("should build option model with pickup capability", async () => {
      const generatedOptionModel = optionModelBuilder.build({
        optionData: optionData,
        pricingPer: PricingPer.UNIT,
        capabilities: [CapabilityId.Pickups],
      });

      expect(generatedOptionModel).toBeInstanceOf(OptionModel);
      expect(generatedOptionModel.optionContentModel).toBeUndefined();
      expect(generatedOptionModel.optionPickupModel).toBeDefined();
      expect(generatedOptionModel.optionPricingModel).toBeUndefined();
    });

    it("should build option model with pricing capability", async () => {
      const generatedOptionModel = optionModelBuilder.build({
        optionData: optionData,
        pricingPer: PricingPer.UNIT,
        capabilities: [CapabilityId.Pricing],
      });

      expect(generatedOptionModel).toBeInstanceOf(OptionModel);
      expect(generatedOptionModel.optionContentModel).toBeUndefined();
      expect(generatedOptionModel.optionPickupModel).toBeUndefined();
      expect(generatedOptionModel.optionPricingModel).toBeDefined();
    });

    it("should build option model with all capabilities", async () => {
      const generatedOptionModel = optionModelBuilder.build({
        optionData: optionData,
        pricingPer: PricingPer.UNIT,
        capabilities: [CapabilityId.Content, CapabilityId.Pickups, CapabilityId.Pricing],
      });

      expect(generatedOptionModel).toBeInstanceOf(OptionModel);
      expect(generatedOptionModel.optionContentModel).toBeDefined();
      expect(generatedOptionModel.optionPickupModel).toBeDefined();
      expect(generatedOptionModel.optionPricingModel).toBeDefined();
    });
  });
});
