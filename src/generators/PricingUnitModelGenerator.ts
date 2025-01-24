import { CapabilityId } from '@octocloud/types';
import { PricingUnitModelBuilder } from '../builders/PricingUnitModelBuilder';
import { PricingUnitModel } from '../models/pricing/PricingUnitModel';
import { PartialPricingUnit } from '../types/PartialPricingUnit';

interface PricingUnitGenerateData {
	pricingUnitData: PartialPricingUnit;
	capabilities?: CapabilityId[];
}

export class PricingUnitModelGenerator {
	private readonly pricingUnitModelBuilder = new PricingUnitModelBuilder();

	public generatePricing(pricingUnitGenerateData: PricingUnitGenerateData): PricingUnitModel {
		return this.pricingUnitModelBuilder.build({
			pricingUnitData: pricingUnitGenerateData.pricingUnitData,
			capabilities: pricingUnitGenerateData.capabilities,
		});
	}
}
