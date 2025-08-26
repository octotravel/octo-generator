import { CapabilityId, PricingOffer, PricingUnit } from '@octocloud/types';
import { PricingOfferModel } from '../models/pricing/PricingOfferModel';
import { PricingUnitModel } from '../models/pricing/PricingUnitModel';

export class PricingUnitParser {
	public parsePOJOToModel(pricingUnit: PricingUnit): PricingUnitModel {
		return new PricingUnitModel({
			unitId: pricingUnit.unitId,
			unitType: pricingUnit.unitType,
			original: pricingUnit.original,
			retail: pricingUnit.retail,
			net: pricingUnit.net,
			currency: pricingUnit.currency,
			currencyPrecision: pricingUnit.currencyPrecision,
			includedTaxes: pricingUnit.includedTaxes,
			pricingOfferModel: this.parsePricingOfferPOJOToModel(pricingUnit),
		});
	}

	public parsePricingOfferPOJOToModel(pricingOffer: PricingOffer): PricingOfferModel | undefined {
		if (pricingOffer.offerDiscount === undefined) {
			return undefined;
		}

		return new PricingOfferModel({
			offerDiscount: pricingOffer.offerDiscount,
		});
	}

	public parseModelToPOJO(pricingUnitModel: PricingUnitModel): PricingUnit {
		return Object.assign(
			this.parseMainModelToPojo(pricingUnitModel),
			this.parseOfferModelToPOJO(pricingUnitModel.pricingOfferModel),
		);
	}

	public parseModelToPOJOWithSpecificCapabilities(
		pricingModel: PricingUnitModel,
		capabilities: CapabilityId[],
	): PricingUnit {
		let pricingOffer: PricingOffer = {};

		if (capabilities?.includes(CapabilityId.Offers)) {
			pricingOffer = this.parseOfferModelToPOJO(pricingModel.pricingOfferModel);
		}

		return Object.assign(this.parseMainModelToPojo(pricingModel), pricingOffer);
	}

	private parseMainModelToPojo(pricingUnitModel: PricingUnitModel): PricingUnit {
		return {
			unitId: pricingUnitModel.unitId,
			unitType: pricingUnitModel.unitType,
			original: pricingUnitModel.original,
			retail: pricingUnitModel.retail,
			net: pricingUnitModel.net,
			currency: pricingUnitModel.currency,
			currencyPrecision: pricingUnitModel.currencyPrecision,
			includedTaxes: pricingUnitModel.includedTaxes,
		};
	}

	public parseOfferModelToPOJO(pricingOfferModel?: PricingOfferModel): PricingOffer {
		if (pricingOfferModel === undefined) {
			return {};
		}

		return {
			offerDiscount: pricingOfferModel.offerDiscount,
		};
	}
}
