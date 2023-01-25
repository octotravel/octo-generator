import OptionPricingModel from "../OptionPricingModel";

describe("OptionPricingModel", () => {
  describe("constructor", () => {
    it("should throw error", async () => {
      const optionPricingModel = () =>
        new OptionPricingModel({
          pricingFrom: [],
          pricing: [],
        });

      expect(optionPricingModel).toThrowError(Error);
    });
  });
});
