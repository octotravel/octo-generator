import { UnitType } from "@octocloud/types/src/types/Unit";
import { PricingDataProvider } from "../../../dataProviders/PricingDataProvider";
import { UnitModelGenerator } from "../../../generators/UnitModelGenerator";

describe("UnitModel", () => {
  const unitModelGenerator = new UnitModelGenerator();

  describe("isOnBooking", () => {
    it("should return true", async () => {
      const optionModel = unitModelGenerator.generate({
        id: "id",
        type: UnitType.ADULT,
        pricing: [PricingDataProvider.adultPricing],
      });

      expect(optionModel.isOnBooking()).toStrictEqual(false);
    });
  });
});
