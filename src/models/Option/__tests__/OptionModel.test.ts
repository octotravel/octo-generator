import { UnitType } from "@octocloud/types/src/types/Unit";
import { PricingDataProvider } from "../../../dataProviders/PricingDataProvider";
import { UnitModelGenerator } from "../../../generators/UnitModelGenerator";

describe("OptionModel", () => {
  const unitModelGenerator = new UnitModelGenerator();

  describe("isOnBooking", () => {
    it("should return true", async () => {
      const unitId = "test";

      const optionModel = unitModelGenerator.generate({
        id: unitId,
        type: UnitType.ADULT,
        pricing: [PricingDataProvider.adultPricing],
      });

      expect(optionModel.isOnBooking()).toStrictEqual(false);
    });
  });
});
