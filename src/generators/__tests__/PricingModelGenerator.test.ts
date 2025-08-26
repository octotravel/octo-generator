import { CapabilityId } from '@octocloud/types';
import { PricingValidator } from '@octocloud/validator/backend/src/common/validation/supplier/validators/backendValidator/Pricing/PricingValidator';
import { describe, expect, it } from 'vitest';
import { PricingParser } from '../../parsers/PricingParser';
import { PricingModelGenerator } from '../PricingModelGenerator';

describe('PricingModelGenerator', () => {
	const pricingModelGenerator = new PricingModelGenerator();
	const pricingParser = new PricingParser();
	const capabilities = [CapabilityId.Offers];
	const pricingValidator = new PricingValidator('');

	describe('generate and validate pricing model', () => {
		it('should generate valid pricing model', async () => {
			const pricingModel = pricingModelGenerator.generatePricing({
				pricingData: {},
				capabilities,
			});
			const pricing = pricingParser.parseModelToPOJO(pricingModel);
			const validationErrors = pricingValidator.validate(pricing);

			expect(validationErrors).toStrictEqual([]);
		});
	});
});
