import { CapabilityId, Currency, UnitType } from '@octocloud/types';
import { PricingOfferModel } from '../models/pricing/PricingOfferModel';
import { PricingUnitModel } from '../models/pricing/PricingUnitModel';
import { PartialPricingUnit } from '../types/PartialPricingUnit';

interface PricingUnitModelBuilderData {
	pricingUnitData: PartialPricingUnit;
	capabilities?: CapabilityId[];
}

const defaultCapabilities: CapabilityId[] = [CapabilityId.Offers];

export class PricingUnitModelBuilder {
	public build(builderData: PricingUnitModelBuilderData): PricingUnitModel {
		builderData.capabilities ??= defaultCapabilities;

		const { pricingUnitData } = builderData;

		return new PricingUnitModel({
			unitId: 'unitId',
			unitType: pricingUnitData.unitType ?? UnitType.ADULT,
			original: pricingUnitData.original ?? 1000,
			retail: pricingUnitData.retail ?? 1000,
			net: pricingUnitData.net ?? 1000,
			includedTaxes: pricingUnitData.includedTaxes ?? [],
			currency: pricingUnitData.currency ?? Currency.EUR,
			currencyPrecision: pricingUnitData.currencyPrecision ?? 2,
			pricingOfferModel: this.buildOffersModel(builderData),
		});
	}

	private buildOffersModel(builderData: PricingUnitModelBuilderData): PricingOfferModel | undefined {
		if (builderData.capabilities?.includes(CapabilityId.Offers) === false) {
			return undefined;
		}

		const { pricingUnitData } = builderData;

		return new PricingOfferModel({
			offerDiscount: pricingUnitData.offerDiscount ?? {
				net: 500,
				retail: 500,
				includedTaxes: [],
			},
		});
	}
}
