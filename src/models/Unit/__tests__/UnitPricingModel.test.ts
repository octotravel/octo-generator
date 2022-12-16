import { UnitPricingModel } from "../UnitPricingModel";

describe("UnitPricingModel", () => {
  describe("constructor", () => {
    it.concurrent("should throw error", async () => {
      const optionPricingModel = () =>
        new UnitPricingModel({
          pricingFrom: [],
          pricing: [],
        });

      expect(optionPricingModel).toThrowError(Error);
    });
  });
});
