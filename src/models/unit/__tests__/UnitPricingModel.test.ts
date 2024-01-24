import { UnitPricingModel } from '../UnitPricingModel';

describe('UnitPricingModel', () => {
  describe('constructor', () => {
    it('should throw error', async () => {
      const optionPricingModel = (): UnitPricingModel =>
        new UnitPricingModel({
          pricingFrom: [],
          pricing: [],
        });

      expect(optionPricingModel).toThrowError(Error);
    });
  });
});
