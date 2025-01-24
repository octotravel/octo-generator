import { CapabilityId, PricingPer } from '@octocloud/types';
import { OptionModelBuilder } from '../builders/OptionModelBuilder';
import { OptionModel } from '../models/option/OptionModel';
import { PartialOption } from '../types/PartialOption';

interface OptionGenerateData {
	optionData: PartialOption;
	pricingPer?: PricingPer;
	capabilities?: CapabilityId[];
}

export class OptionModelGenerator {
	private readonly optionModelBuilder = new OptionModelBuilder();

	public generateOption(optionGenerateData: OptionGenerateData): OptionModel {
		return this.optionModelBuilder.build({
			optionData: optionGenerateData.optionData,
			pricingPer: optionGenerateData.pricingPer,
			capabilities: optionGenerateData.capabilities,
		});
	}

	public generateMultipleOptions(
		optionsData: PartialOption[],
		pricingPer?: PricingPer,
		capabilities?: CapabilityId[],
	): OptionModel[] {
		return optionsData.map((optionData) => this.generateOption({ optionData, pricingPer, capabilities }));
	}
}
