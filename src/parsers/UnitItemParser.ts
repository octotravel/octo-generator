import { CapabilityId, Unit, UnitItem, UnitItemPricing } from '@octocloud/types';
import { BookingModel } from '../models/booking/BookingModel';
import { UnitItemModel } from '../models/unitItem/UnitItemModel';
import { UnitItemPricingModel } from '../models/unitItem/UnitItemPricingModel';
import { UnitParser } from './UnitParser';

export class UnitItemParser {
	private readonly unitParser: UnitParser = new UnitParser();

	public parsePOJOToModel(unitItem: UnitItem): UnitItemModel {
		return new UnitItemModel({
			uuid: unitItem.uuid,
			id: unitItem.id,
			resellerReference: unitItem.resellerReference,
			supplierReference: unitItem.supplierReference,
			unitModel: this.unitParser.parsePOJOToModel(unitItem.unit!),
			status: unitItem.status,
			utcRedeemedAt: unitItem.utcRedeemedAt,
			contact: unitItem.contact,
			ticket: unitItem.ticket,
			unitItemPricingModel: this.parseUnitItemPricingPOJOToModel(unitItem),
		});
	}

	public parseUnitItemPricingPOJOToModel(unitItemPricing: UnitItemPricing): UnitItemPricingModel | undefined {
		if (unitItemPricing.pricing === undefined) {
			return undefined;
		}

		return new UnitItemPricingModel({
			pricing: unitItemPricing.pricing,
		});
	}

	public parseModelToPOJO(unitItemModel: UnitItemModel): UnitItem {
		return Object.assign(
			this.parseMainModelToPojo(unitItemModel),
			this.parsePricingModelToPOJO(unitItemModel.unitItemPricingModel),
		);
	}

	public parseModelToPOJOWithSpecificCapabilities(
		unitItemModel: UnitItemModel,
		capabilities: CapabilityId[],
	): UnitItem {
		let unitItemPricing: UnitItemPricing = {};

		if (capabilities.includes(CapabilityId.Pricing)) {
			unitItemPricing = this.parsePricingModelToPOJO(unitItemModel.unitItemPricingModel);
		}

		return Object.assign(this.parseMainModelToPojo(unitItemModel, capabilities), unitItemPricing);
	}

	private parseMainModelToPojo(unitItemModel: UnitItemModel, capabilities?: CapabilityId[]): UnitItem {
		let unit: Unit;

		if (capabilities === undefined) {
			unit = this.unitParser.parseModelToPOJO(unitItemModel.unitModel, { sourceModel: BookingModel });
		} else {
			unit = this.unitParser.parseModelToPOJOWithSpecificCapabilities(unitItemModel.unitModel, capabilities, {
				sourceModel: BookingModel,
			});
		}

		return {
			uuid: unitItemModel.uuid,
			id: unitItemModel.id,
			resellerReference: unitItemModel.resellerReference,
			supplierReference: unitItemModel.supplierReference,
			unitId: unitItemModel.unitModel.id,
			unit,
			status: unitItemModel.status,
			utcRedeemedAt: unitItemModel.utcRedeemedAt,
			contact: unitItemModel.contact,
			ticket: unitItemModel.ticket,
		};
	}

	public parsePricingModelToPOJO(unitItemPricingModel?: UnitItemPricingModel): UnitItemPricing {
		if (unitItemPricingModel === undefined) {
			return {};
		}

		return {
			pricing: unitItemPricingModel.pricing,
		};
	}
}
