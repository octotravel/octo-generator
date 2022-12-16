import { UnitType } from "@octocloud/types/src/types/Unit";
import { PricingDataProvider } from "../../../dataProviders/PricingDataProvider";
import { UnitModelGenerator } from "../../../generators/UnitModelGenerator";
import { PricingPer } from "@octocloud/types";

describe("UnitModel", () => {
  const unitModelGenerator = new UnitModelGenerator();

  describe("isOnBooking", () => {
    it.concurrent("should return true", async () => {
      const optionModel = unitModelGenerator.generate({
        unitData: {
          id: "id",
          type: UnitType.ADULT,
          pricing: [PricingDataProvider.adultPricing],
        },
        pricingPer: PricingPer.BOOKING,
      });

      expect(optionModel.isOnBooking()).toStrictEqual(true);
    });

    it.concurrent("should return false", async () => {
      const optionModel = unitModelGenerator.generate({
        unitData: {
          id: "id",
          type: UnitType.ADULT,
          pricing: [PricingDataProvider.adultPricing],
        },
        pricingPer: PricingPer.UNIT,
      });

      expect(optionModel.isOnBooking()).toStrictEqual(false);
    });
  });
});
