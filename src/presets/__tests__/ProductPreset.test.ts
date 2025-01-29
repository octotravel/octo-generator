import { AvailabilityType, PricingPer } from '@octocloud/types';
import { describe, expect, it } from 'vitest';
import { ProductPreset } from '../ProductPreset';

describe('ProductPreset', () => {
	describe('OPENINGHOURS_PRODUCT_MODEL', () => {
		it('should build OPENINGHOURS_PRODUCT_MODEL', async () => {
			expect(ProductPreset.OPENINGHOURS_PRODUCT_POJO.id).toBe('openinghours_product');
			expect(ProductPreset.OPENINGHOURS_PRODUCT_POJO.availabilityType).toBe(AvailabilityType.OPENING_HOURS);
			expect(ProductPreset.OPENINGHOURS_PRODUCT_POJO.options.length).toBe(1);
			expect(ProductPreset.OPENINGHOURS_PRODUCT_POJO.pricingPer).toBe(PricingPer.UNIT);
		});
	});
});
