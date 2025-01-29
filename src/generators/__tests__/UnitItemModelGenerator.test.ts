import { CapabilityId } from '@octocloud/types';
import { UnitItemValidator } from '@octocloud/validator/backend/src/common/validation/v1/validators/backendValidator/UnitItem/UnitItemValidator';
import { describe, expect, it } from 'vitest';
import { UuidFactory } from '../../factories/UuidFactory';
import { UnitItemParser } from '../../parsers/UnitItemParser';
import { UnitItemModelGenerator } from '../UnitItemModelGenerator';

describe('UnitItemModelGenerator', () => {
	const unitItemModelGenerator = new UnitItemModelGenerator();
	const unitItemParser = new UnitItemParser();
	const capabilities = [CapabilityId.Pricing];
	const unitItemValidator = new UnitItemValidator({
		path: '',
		capabilities,
	});

	describe('generate and validate unit item model', () => {
		it('should generate valid unit model', async () => {
			const unitItemModel = unitItemModelGenerator.generateUnitItem({
				unitItemData: {
					uuid: UuidFactory.create(),
					ticket: null,
				},
				capabilities,
			});
			const unitItem = unitItemParser.parseModelToPOJO(unitItemModel);
			const validationErrors = unitItemValidator.validate(unitItem);

			expect(validationErrors).toStrictEqual([]);
		});

		it('should generate invalid unit model', async () => {
			const unitItemModel = unitItemModelGenerator.generateUnitItem({
				unitItemData: {
					uuid: '',
					ticket: null,
				},
				capabilities,
			});
			const unitItem = unitItemParser.parseModelToPOJO(unitItemModel);
			const validationErrors = unitItemValidator.validate(unitItem);

			expect(validationErrors.length).toBeGreaterThan(0);
		});
	});
});
