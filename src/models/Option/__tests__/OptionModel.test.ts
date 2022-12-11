import { UnitType } from "@octocloud/types/src/types/Unit";
import { PricingDataProvider } from "../../../dataProviders/PricingDataProvider";
import { OptionModelGenerator } from "../../../generators/OptionModelGenerator";
import { UnitModel } from "../../Unit/UnitModel";
describe("OptionModel", () => {
  const optionModelGenerator = new OptionModelGenerator();

  describe("findUnitModelByUnitId", () => {
    it("should return unit model", async () => {
      const unitId = "test";

      const optionModel = optionModelGenerator.generate({
        restrictions: {
          minUnits: 0,
          maxUnits: null,
        },
        unitsData: [
          {
            id: unitId,
            type: UnitType.ADULT,
            pricing: [PricingDataProvider.adultPricing],
          },
        ],
      });

      expect(optionModel.findUnitModelByUnitId(unitId)).toBeInstanceOf(UnitModel);
    });

    it("should return null", async () => {
      const optionModel = optionModelGenerator.generate({
        restrictions: {
          minUnits: 0,
          maxUnits: null,
        },
        unitsData: [],
      });

      expect(optionModel.findUnitModelByUnitId("test")).toStrictEqual(null);
    });
  });
});
