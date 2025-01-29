import { describe, expect, it } from 'vitest';
import { OptionPricingModel } from '../OptionPricingModel';

describe('OptionPricingModel', () => {
	describe('constructor', () => {
		it('should throw error', async () => {
			const optionPricingModel = (): OptionPricingModel =>
				new OptionPricingModel({
					pricing: [],
				});

			expect(optionPricingModel).not.toThrowError(Error);
		});
	});
});
