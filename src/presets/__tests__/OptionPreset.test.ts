/* eslint-disable @typescript-eslint/dot-notation */
import { OptionPreset } from '../OptionPreset';
import { PricingPreset } from '../PricingPreset';

describe('OptionPreset', () => {
  describe('OPTION_MODEL', () => {
    it('should build OPTION_MODEL', async () => {
      expect(OptionPreset.OPTION_POJO.id).toBe('DEFAULT');
      expect(OptionPreset.OPTION_POJO.units.length).toBe(3);
      expect(OptionPreset.OPTION_POJO.pricingFrom).toBe(undefined);
    });
  });
  describe('OPTION_PRICING_PER_BOOKING_MODEL', () => {
    it('should build OPTION_PRICING_PER_BOOKING_MODEL', async () => {
      expect(OptionPreset.OPTION_PRICING_PER_BOOKING_POJO.id).toBe('DEFAULT');
      expect(OptionPreset.OPTION_PRICING_PER_BOOKING_POJO.units.length).toBe(3);
      expect(OptionPreset.OPTION_PRICING_PER_BOOKING_POJO.pricingFrom).toEqual([PricingPreset.PRICING_10_EUR_POJO]);
    });
  });
});
