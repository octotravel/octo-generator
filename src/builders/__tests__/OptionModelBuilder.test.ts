import { CapabilityId, PricingPer } from "@octocloud/types";
import { OptionModelBuilder } from "../OptionModelBuilder";
import { OptionModel } from "../../models/Option/OptionModel";
import { OptionDataProvider } from "../../dataProviders/OptionDataProvider";

describe("OptionModelBuilder", () => {
  const optionModelBuilder = new OptionModelBuilder();
  describe("build", () => {
    it("should build option model without any capabilities", async () => {
      const generatedOptionModel = optionModelBuilder.build({
        optionData: OptionDataProvider.defaultOption,
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
        optionData: OptionDataProvider.defaultOption,
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
        optionData: OptionDataProvider.defaultOption,
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
        optionData: OptionDataProvider.defaultOption,
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
        optionData: OptionDataProvider.defaultOption,
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
