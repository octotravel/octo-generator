import { UnitType } from "@octocloud/types/src/types/Unit";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";
import { UnitModel } from "../../models/Unit/UnitModel";
import { UnitModelBuilder } from "../UnitModelBuilder";
import { UnitData } from "../../data/UnitData";
import { CapabilityId, PricingPer } from "@octocloud/types";

describe("UnitModelBuilder", () => {
  const unitModelBuilder = new UnitModelBuilder();

  describe("build", () => {
    const unitData: UnitData = {
      id: "test",
      type: UnitType.ADULT,
      pricing: [PricingDataProvider.adultPricing],
    };

    it("should build unit model without any capabilities", async () => {
      const generatedUnitModel = unitModelBuilder.build({
        unitData,
        pricingPer: PricingPer.UNIT,
        capabilities: [],
      });

      expect(generatedUnitModel).toBeInstanceOf(UnitModel);
      expect(generatedUnitModel.unitContentModel).toBeUndefined();
      expect(generatedUnitModel.unitPricingModel).toBeUndefined();
    });

    it("should build unit model with content capability", async () => {
      const generatedUnitModel = unitModelBuilder.build({
        unitData,
        pricingPer: PricingPer.UNIT,
        capabilities: [CapabilityId.Content],
      });

      expect(generatedUnitModel).toBeInstanceOf(UnitModel);
      expect(generatedUnitModel.unitContentModel).toBeDefined();
      expect(generatedUnitModel.unitPricingModel).toBeUndefined();
    });

    it("should build unit model with pricing capability", async () => {
      const generatedUnitModel = unitModelBuilder.build({
        unitData,
        pricingPer: PricingPer.UNIT,
        capabilities: [CapabilityId.Pricing],
      });

      expect(generatedUnitModel).toBeInstanceOf(UnitModel);
      expect(generatedUnitModel.unitContentModel).toBeUndefined();
      expect(generatedUnitModel.unitPricingModel).toBeDefined();
    });

    it("should build unit model with all capabilities", async () => {
      const generatedUnitModel = unitModelBuilder.build({
        unitData,
        pricingPer: PricingPer.UNIT,
        capabilities: [CapabilityId.Content, CapabilityId.Pricing],
      });

      expect(generatedUnitModel).toBeInstanceOf(UnitModel);
      expect(generatedUnitModel.unitContentModel).toBeDefined();
      expect(generatedUnitModel.unitPricingModel).toBeDefined();
    });

    it("should build unit model with pricing per unit", async () => {
      const generatedUnitModel = unitModelBuilder.build({
        unitData,
        pricingPer: PricingPer.UNIT,
      });

      // TODO this will be changed based on the source model
      expect(generatedUnitModel).toBeInstanceOf(UnitModel);
      //expect(generatedUnitModel.unitPricingModel?.pricingFrom).toBeDefined();
      //expect(generatedUnitModel.unitPricingModel?.pricing).toBeUndefined();
    });

    it("should build unit model with pricing per booking", async () => {
      const generatedUnitModel = unitModelBuilder.build({
        unitData,
        pricingPer: PricingPer.BOOKING,
      });

      expect(generatedUnitModel).toBeInstanceOf(UnitModel);
      // TODO this will be changed based on the source model
      //expect(generatedUnitModel.unitPricingModel?.pricingFrom).toBeUndefined();
      //expect(generatedUnitModel.unitPricingModel?.pricing).toBeDefined();
    });
  });
});
