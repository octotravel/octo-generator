import { CapabilityId } from '@octocloud/types';
import { describe, expect, it } from 'vitest';
import { PricingDataProvider } from '../../dataProviders/PricingDataProvider';
import { PricingModel } from '../../models/pricing/PricingModel';
import { PricingModelBuilder } from '../PricingModelBuilder';

describe('PricingModelBuilder', () => {
	const pricingModelBuilder = new PricingModelBuilder();

	describe('build', () => {
		it('should build pricing model without any capabilities', async () => {
			const generatedPricingModel = pricingModelBuilder.build({
				pricingData: PricingDataProvider.adultPricing,
				capabilities: [],
			});

			expect(generatedPricingModel).toBeInstanceOf(PricingModel);
			expect(generatedPricingModel.pricingOfferModel).toBeUndefined();
		});

		it('should build pricing model with offers capability', async () => {
			const generatedPricingModel = pricingModelBuilder.build({
				pricingData: PricingDataProvider.adultPricing,
				capabilities: [CapabilityId.Offers],
			});

			expect(generatedPricingModel).toBeInstanceOf(PricingModel);
			expect(generatedPricingModel.pricingOfferModel).toBeDefined();
		});
	});
});
