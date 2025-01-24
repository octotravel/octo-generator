import { CapabilityId, Option, PricingPer } from '@octocloud/types';
import { OptionModelBuilder } from '../builders/OptionModelBuilder';
import { OptionModel } from '../models/option/OptionModel';
import { ProductModel } from '../models/product/ProductModel';
import { OptionParser } from '../parsers/OptionParser';
import { PricingPreset } from './PricingPreset';
import { UnitPreset } from './UnitPreset';

export abstract class OptionPreset {
	private static readonly builder = new OptionModelBuilder();
	private static readonly parser = new OptionParser();

	public static readonly OPTION_MODEL: OptionModel = this.builder.build({
		optionData: {
			id: 'DEFAULT',
			units: [UnitPreset.ADULT_UNIT_POJO, UnitPreset.CHILD_UNIT_POJO, UnitPreset.INFANT_UNIT_POJO],
		},
		pricingPer: PricingPer.UNIT,
		capabilities: [CapabilityId.Pricing],
		sourceModel: ProductModel,
	});

	public static readonly OPTION_PRICING_PER_BOOKING_MODEL: OptionModel = this.builder.build({
		optionData: {
			id: 'DEFAULT',
			units: [UnitPreset.ADULT_UNIT_POJO, UnitPreset.CHILD_UNIT_POJO, UnitPreset.INFANT_UNIT_POJO],
			pricing: [PricingPreset.PRICING_10_EUR_POJO],
			pricingFrom: [PricingPreset.PRICING_10_EUR_POJO],
		},
		pricingPer: PricingPer.BOOKING,
		capabilities: [CapabilityId.Pricing],
		sourceModel: ProductModel,
	});

	public static readonly OPTION_POJO: Option = this.parser.parseModelToPOJO(this.OPTION_MODEL, {
		sourceModel: ProductModel,
	});

	public static readonly OPTION_PRICING_PER_BOOKING_POJO: Option = this.parser.parseModelToPOJO(
		this.OPTION_PRICING_PER_BOOKING_MODEL,
		{ sourceModel: ProductModel },
	);
}
