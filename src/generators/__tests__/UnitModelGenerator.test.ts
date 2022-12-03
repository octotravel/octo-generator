import { UnitModelGenerator } from "../UnitModelGenerator";
import { UnitType } from "@octocloud/types/src/types/Unit";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";
import { UnitModel } from "../../models/UnitModel";

describe("UnitModelGenerator", () => {
  const unitModelGenerator = new UnitModelGenerator();

  describe("generate", () => {
    it("should generate unit model", async () => {
      const generatedUnitModel = unitModelGenerator.generate({
        id: "test",
        type: UnitType.ADULT,
        pricing: [PricingDataProvider.adultPricing],
      });

      expect(generatedUnitModel).toBeInstanceOf(UnitModel);
    });
  });
});
