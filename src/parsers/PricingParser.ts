import { CapabilityId, Pricing, PricingOffer } from '@octocloud/types';
import { PricingModel } from '../models/pricing/PricingModel';
import { PricingOfferModel } from '../models/pricing/PricingOfferModel';

export class PricingParser {
	public parsePOJOToModel(pricing: Pricing): PricingModel {
		return new PricingModel({
			original: pricing.original,
			retail: pricing.retail,
			net: pricing.net,
			currency: pricing.currency,
			currencyPrecision: pricing.currencyPrecision,
			includedTaxes: pricing.includedTaxes,
			pricingOfferModel: this.parsePricingOfferPOJOToModel(pricing),
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

	public parseModelToPOJO(pricingModel: PricingModel): Pricing {
		return Object.assign(
			this.parseMainModelToPojo(pricingModel),
			this.parseOfferModelToPOJO(pricingModel.pricingOfferModel),
		);
	}

	public parseModelToPOJOWithSpecificCapabilities(pricingModel: PricingModel, capabilities: CapabilityId[]): Pricing {
		let pricingOffer: PricingOffer = {};

		if (capabilities?.includes(CapabilityId.Offers)) {
			pricingOffer = this.parseOfferModelToPOJO(pricingModel.pricingOfferModel);
		}

		return Object.assign(this.parseMainModelToPojo(pricingModel), pricingOffer);
	}

	private parseMainModelToPojo(pricingModel: PricingModel): Pricing {
		return {
			original: pricingModel.original,
			retail: pricingModel.retail,
			net: pricingModel.net,
			currency: pricingModel.currency,
			currencyPrecision: pricingModel.currencyPrecision,
			includedTaxes: pricingModel.includedTaxes,
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
