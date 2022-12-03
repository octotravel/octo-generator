import { UnitType } from "@octocloud/types/src/types/Unit";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";
import { UnitModel } from "../../models/UnitModel";
import { UnitModelBuilder } from "../UnitModelBuilder";
import { UnitData } from "../../data/UnitData";
import { PricingPer } from "@octocloud/types";

describe("UnitModelBuilder", () => {
  const unitModelBuilder = new UnitModelBuilder();

  describe("build", () => {
    const unitData: UnitData = {
      id: "test",
      type: UnitType.ADULT,
      pricing: [PricingDataProvider.adultPricing],
    };

    it("should build unit model with pricing per unit", async () => {
      const generatedUnitModel = unitModelBuilder.build({
        unitData,
        pricingPer: PricingPer.UNIT,
      });

      expect(generatedUnitModel).toBeInstanceOf(UnitModel);
      expect(generatedUnitModel.unitPricingModel?.pricingFrom).toBeDefined();
      expect(generatedUnitModel.unitPricingModel?.pricing).toBeUndefined();
    });

    it("should build unit model with pricing per booking", async () => {
      const generatedUnitModel = unitModelBuilder.build({
        unitData,
        pricingPer: PricingPer.BOOKING,
      });

      expect(generatedUnitModel).toBeInstanceOf(UnitModel);
      expect(generatedUnitModel.unitPricingModel?.pricingFrom).toBeUndefined();
      expect(generatedUnitModel.unitPricingModel?.pricing).toBeDefined();
    });
  });
});
