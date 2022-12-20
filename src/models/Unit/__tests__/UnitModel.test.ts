import { PricingDataProvider } from "../../../dataProviders/PricingDataProvider";
import { UnitModelGenerator } from "../../../generators/UnitModelGenerator";
import { PricingPer, UnitType } from "@octocloud/types";

describe("UnitModel", () => {
  const unitModelGenerator = new UnitModelGenerator();

  describe("isOnBooking", () => {
    it("should return true", async () => {
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

    it("should return false", async () => {
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
