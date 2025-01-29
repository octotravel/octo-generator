import { CapabilityId } from '@octocloud/types';
import { PricingModelBuilder } from '../builders/PricingModelBuilder';
import { PricingModel } from '../models/pricing/PricingModel';
import { PartialPricing } from '../types/PartialPricing';

interface PricingGenerateData {
	pricingData: PartialPricing;
	capabilities?: CapabilityId[];
}

export class PricingModelGenerator {
	private readonly pricingModelBuilder = new PricingModelBuilder();

	public generatePricing(pricingGenerateData: PricingGenerateData): PricingModel {
		return this.pricingModelBuilder.build({
			pricingData: pricingGenerateData.pricingData,
			capabilities: pricingGenerateData.capabilities,
		});
	}
}
