import { PricingPer, UnitType } from '@octocloud/types';
import { describe, expect, it } from 'vitest';
import { PricingDataProvider } from '../../../dataProviders/PricingDataProvider';
import { UnitModelGenerator } from '../../../generators/UnitModelGenerator';

describe('UnitModel', () => {
	const unitModelGenerator = new UnitModelGenerator();

	describe('isOnBooking', () => {
		it('should return true', async () => {
			const optionModel = unitModelGenerator.generateUnit({
				unitData: {
					id: 'id',
					type: UnitType.ADULT,
					pricing: [PricingDataProvider.adultPricing],
				},
				pricingPer: PricingPer.BOOKING,
			});

			expect(optionModel.isOnBooking()).toStrictEqual(true);
		});

		it('should return false', async () => {
			const optionModel = unitModelGenerator.generateUnit({
				unitData: {
					id: 'id',
					type: UnitType.ADULT,
					pricing: [PricingDataProvider.adultPricing],
				},
				pricingPer: PricingPer.UNIT,
			});

			expect(optionModel.isOnBooking()).toStrictEqual(false);
		});
	});
});
