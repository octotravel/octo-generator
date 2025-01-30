import { CapabilityId, PricingPer, UnitType } from '@octocloud/types';
import { UnitDataProvider } from '../dataProviders/UnitDataProvider';
import { UnitContentModel } from '../models/unit/UnitContentModel';
import { UnitModel } from '../models/unit/UnitModel';
import { UnitPricingModel } from '../models/unit/UnitPricingModel';
import { PartialUnit } from '../types/PartialUnit';

interface UnitModelBuilderData {
	unitData: PartialUnit;
	pricingPer?: PricingPer;
	capabilities?: CapabilityId[];
	sourceModel?: object;
}

const defaultPricingPer: PricingPer = PricingPer.UNIT;
const defaultCapabilities: CapabilityId[] = [CapabilityId.Content, CapabilityId.Pricing];

export class UnitModelBuilder {
	public build(builderData: UnitModelBuilderData): UnitModel {
		builderData.pricingPer ??= defaultPricingPer;
		builderData.capabilities ??= defaultCapabilities;

		const { unitData } = builderData;

		return new UnitModel({
			id: unitData.id ?? 'id',
			internalName: unitData.internalName ?? 'internalName',
			reference: unitData.reference ?? 'reference',
			type: unitData.type ?? UnitType.ADULT,
			restrictions: unitData.restrictions ?? UnitDataProvider.commonRestrictions,
			requiredContactFields: unitData.requiredContactFields ?? [],
			visibleContactFields: unitData.visibleContactFields ?? [],
			unitContentModel: this.buildContentModel(builderData),
			unitPricingModel: this.buildPricingModel(builderData),
		});
	}

	private buildContentModel(builderData: UnitModelBuilderData): UnitContentModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Content) === false) {
			return undefined;
		}

		const { unitData } = builderData;

		return new UnitContentModel({
			title: unitData.title ?? 'title',
			titlePlural: unitData.titlePlural ?? 'titles',
			subtitle: unitData.subtitle ?? 'subtitle',
		});
	}

	private buildPricingModel(builderData: UnitModelBuilderData): UnitPricingModel | undefined {
		if (
			builderData.capabilities?.includes(CapabilityId.Pricing) === false ||
			builderData.pricingPer === PricingPer.BOOKING
		) {
			console.log('undefined');
			return undefined;
		}

		const { unitData } = builderData;
		return new UnitPricingModel({
			pricing: unitData.pricing ?? unitData.pricingFrom,
		});
	}
}
