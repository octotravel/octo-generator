import { describe, expect, it } from 'vitest';
import { UnitDataProvider } from '../../../dataProviders/UnitDataProvider';
import { OptionModelGenerator } from '../../../generators/OptionModelGenerator';
import { UnitModel } from '../../unit/UnitModel';

describe('OptionModel', () => {
	const optionModelGenerator = new OptionModelGenerator();

	describe('findUnitModelByUnitId', () => {
		it('should return unit model', async () => {
			const optionModel = optionModelGenerator.generateOption({
				optionData: {
					restrictions: {
						minUnits: 0,
						maxUnits: null,
						minPaxCount: 0,
						maxPaxCount: null,
					},
					units: [UnitDataProvider.adultUnit],
				},
			});

			expect(optionModel.findUnitModelByUnitId(UnitDataProvider.adultUnit.id)).toBeInstanceOf(UnitModel);
		});

		it('should return null', async () => {
			const optionModel = optionModelGenerator.generateOption({
				optionData: {
					restrictions: {
						minUnits: 0,
						maxUnits: null,
						minPaxCount: 0,
						maxPaxCount: null,
					},
					units: [],
				},
			});

			expect(optionModel.findUnitModelByUnitId('nonExistingId')).toStrictEqual(null);
		});
	});
});
