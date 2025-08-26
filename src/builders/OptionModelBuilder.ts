import { CapabilityId, DurationUnit, PricingPer } from '@octocloud/types';
import { LocaleDataProvider } from '../dataProviders/LocaleDataProvider';
import { OptionContentModel } from '../models/option/OptionContentModel';
import { OptionModel } from '../models/option/OptionModel';
import { OptionPickupsModel } from '../models/option/OptionPickupsModel';
import { OptionPricingModel } from '../models/option/OptionPricingModel';
import { UnitModel } from '../models/unit/UnitModel';
import { PartialOption } from '../types/PartialOption';
import { UnitModelBuilder } from './UnitModelBuilder';

interface OptionModelBuilderData {
	optionData: PartialOption;
	pricingPer?: PricingPer;
	capabilities?: CapabilityId[];
	sourceModel?: object;
}

const defaultPricingPer: PricingPer = PricingPer.UNIT;
const defaultCapabilities: CapabilityId[] = [CapabilityId.Content, CapabilityId.Pickups, CapabilityId.Pricing];

export class OptionModelBuilder {
	private readonly unitModelBuilder = new UnitModelBuilder();

	public build(builderData: OptionModelBuilderData): OptionModel {
		builderData.pricingPer ??= defaultPricingPer;
		builderData.capabilities ??= defaultCapabilities;

		const { optionData } = builderData;
		return new OptionModel({
			id: optionData.id ?? 'DEFAULT',
			isDefault: optionData.default ?? true,
			internalName: optionData.internalName ?? 'DEFAULT',
			reference: optionData.reference ?? null,
			availabilityLocalStartTimes: optionData.availabilityLocalStartTimes ?? ['00:00'],
			cancellationCutoff: optionData.cancellationCutoff ?? '0 hours',
			cancellationCutoffAmount: optionData.cancellationCutoffAmount ?? 0,
			cancellationCutoffUnit: optionData.cancellationCutoffUnit ?? 'hour',
			availabilityCutoff: optionData.availabilityCutoff ?? '0 hours',
			availabilityCutoffAmount: optionData.availabilityCutoffAmount ?? 0,
			availabilityCutoffUnit: optionData.availabilityCutoffUnit ?? 'hour',
			requiredContactFields: optionData.requiredContactFields ?? [],
			visibleContactFields: optionData.visibleContactFields ?? [],
			restrictions: optionData.restrictions ?? {
				minUnits: 1,
				maxUnits: null,
				minPaxCount: 1,
				maxPaxCount: null,
			},
			unitModels: this.buildUnitModels(builderData),
			optionContentModel: this.buildContentModel(builderData),
			optionPickupsModel: this.buildPickupsModel(builderData),
			optionPricingModel: this.buildPricingModel(builderData),
		});
	}

	private buildUnitModels(builderData: OptionModelBuilderData): UnitModel[] {
		if (builderData.optionData.units === undefined) {
			return [];
		}

		return builderData.optionData.units.map(
			(unitData) =>
				this.unitModelBuilder.build({
					unitData,
					pricingPer: builderData.pricingPer,
					capabilities: builderData.capabilities,
					sourceModel: builderData.sourceModel,
				}),
			builderData,
		);
	}

	private buildContentModel(builderData: OptionModelBuilderData): OptionContentModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Content) === false) {
			return undefined;
		}

		const { optionData } = builderData;
		const durationUnit = optionData.durationUnit ?? DurationUnit.HOUR;
		const durationAmount = optionData.durationAmount ?? '0';

		return new OptionContentModel({
			title: optionData.title ?? 'title',
			subtitle: optionData.subtitle ?? 'subtitle',
			language: optionData.language ?? LocaleDataProvider.en,
			shortDescription: optionData.shortDescription ?? 'shortDescription',
			durationUnit: optionData.durationUnit ?? DurationUnit.HOUR,
			durationAmount: optionData.durationAmount ?? '0',
			duration: optionData.duration ?? `${durationAmount} ${durationUnit}`,
			itinerary: optionData.itinerary ?? [],
			coverImageUrl: optionData.coverImageUrl ?? null,
			fromPoint: optionData.fromPoint ?? null,
			toPoint: optionData.toPoint ?? null,
		});
	}

	private buildPickupsModel(builderData: OptionModelBuilderData): OptionPickupsModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Pickups) === false) {
			return undefined;
		}

		const { optionData } = builderData;

		return new OptionPickupsModel({
			pickupRequired: optionData.pickupRequired ?? false,
			pickupAvailable: optionData.pickupAvailable ?? false,
			pickupPoints: optionData.pickupPoints ?? [],
		});
	}

	private buildPricingModel(builderData: OptionModelBuilderData): OptionPricingModel | undefined {
		if (
			builderData.capabilities?.includes(CapabilityId.Pricing) === false ||
			builderData.pricingPer === PricingPer.UNIT
		) {
			return undefined;
		}

		const { optionData } = builderData;

		return new OptionPricingModel({
			pricing: optionData.pricing ?? optionData.pricingFrom,
		});
	}
}
