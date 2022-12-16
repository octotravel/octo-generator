import { OptionPricingModel } from "../OptionPricingModel";

describe("OptionPricingModel", () => {
  describe("constructor", () => {
    it.concurrent("should throw error", async () => {
      const optionPricingModel = () =>
        new OptionPricingModel({
          pricingFrom: [],
          pricing: [],
        });

      expect(optionPricingModel).toThrowError(Error);
    });
  });
});
