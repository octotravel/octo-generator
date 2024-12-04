/* eslint-disable @typescript-eslint/dot-notation */
import { PricingPreset } from '../PricingPreset';
import { ADULT_UNIT, CHILD_UNIT, INFANT_UNIT, UnitPreset } from '../UnitPreset';

describe('UnitPreset', () => {
  describe('ADULT_UNIT_MODEL', () => {
    it('should build ADULT_UNIT_MODEL', async () => {
      expect(UnitPreset.ADULT_UNIT_POJO.id).toBe(ADULT_UNIT.id);
      expect(UnitPreset.ADULT_UNIT_POJO.internalName).toBe(ADULT_UNIT.internalName);
      expect(UnitPreset.ADULT_UNIT_POJO.type).toBe(ADULT_UNIT.type);
      expect(UnitPreset.ADULT_UNIT_POJO.reference).toBe(ADULT_UNIT.reference);
      expect(UnitPreset.ADULT_UNIT_POJO.restrictions).toEqual(ADULT_UNIT.restrictions);
      expect(UnitPreset.ADULT_UNIT_POJO.pricingFrom).toEqual([PricingPreset.PRICING_10_EUR_POJO]);
    });
  });
  describe('CHILD_UNIT_MODEL', () => {
    it('should build CHILD_UNIT_MODEL', async () => {
      expect(UnitPreset.CHILD_UNIT_POJO.id).toBe(CHILD_UNIT.id);
      expect(UnitPreset.CHILD_UNIT_POJO.internalName).toBe(CHILD_UNIT.internalName);
      expect(UnitPreset.CHILD_UNIT_POJO.type).toBe(CHILD_UNIT.type);
      expect(UnitPreset.CHILD_UNIT_POJO.reference).toBe(CHILD_UNIT.reference);
      expect(UnitPreset.CHILD_UNIT_POJO.restrictions).toEqual(CHILD_UNIT.restrictions);
      expect(UnitPreset.CHILD_UNIT_POJO.pricingFrom).toEqual([PricingPreset.PRICING_8_EUR_POJO]);
    });
  });
  describe('INFANT_UNIT_MODEL', () => {
    it('should build INFANT_UNIT_MODEL', async () => {
      expect(UnitPreset.INFANT_UNIT_POJO.id).toBe(INFANT_UNIT.id);
      expect(UnitPreset.INFANT_UNIT_POJO.internalName).toBe(INFANT_UNIT.internalName);
      expect(UnitPreset.INFANT_UNIT_POJO.type).toBe(INFANT_UNIT.type);
      expect(UnitPreset.INFANT_UNIT_POJO.reference).toBe(INFANT_UNIT.reference);
      expect(UnitPreset.INFANT_UNIT_POJO.restrictions).toEqual(INFANT_UNIT.restrictions);
      expect(UnitPreset.INFANT_UNIT_POJO.pricingFrom).toEqual([PricingPreset.PRICING_0_EUR_POJO]);
    });
  });
});
