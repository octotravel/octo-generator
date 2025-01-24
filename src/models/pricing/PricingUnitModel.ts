import { Tax, UnitType } from '@octocloud/types';
import { PricingModel } from './PricingModel';
import { PricingOfferModel } from './PricingOfferModel';

export class PricingUnitModel extends PricingModel {
	public readonly unitId: string;
	public readonly unitType: UnitType;

	public constructor({
		unitId,
		unitType,
		original,
		retail,
		net,
		currency,
		currencyPrecision,
		includedTaxes,
		pricingOfferModel,
	}: {
		unitId: string;
		unitType: UnitType;
		original: number;
		retail: number;
		net: Nullable<number>;
		currency: string;
		currencyPrecision: number;
		includedTaxes: Tax[];
		pricingOfferModel?: PricingOfferModel;
	}) {
		super({ original, retail, net, currency, currencyPrecision, includedTaxes, pricingOfferModel });

		this.unitId = unitId;
		this.unitType = unitType;
	}
}
