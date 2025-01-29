import { CapabilityId } from '@octocloud/types';
import { UnitItemModelBuilder } from '../builders/UnitItemModelBuilder';
import { UnitItemModel } from '../models/unitItem/UnitItemModel';
import { PartialUnitItem } from '../types/PartialUnitItem';

interface UnitItemGenerateData {
	unitItemData: PartialUnitItem;
	capabilities?: CapabilityId[];
}

export class UnitItemModelGenerator {
	private readonly unitItemModelBuilder = new UnitItemModelBuilder();

	public generateUnitItem(unitItemGenerateData: UnitItemGenerateData): UnitItemModel {
		return this.unitItemModelBuilder.build({
			unitItemData: unitItemGenerateData.unitItemData,
			capabilities: unitItemGenerateData.capabilities,
		});
	}

	public generateMultipleUnitItems(unitItemsData: PartialUnitItem[], capabilities?: CapabilityId[]): UnitItemModel[] {
		return unitItemsData.map((unitItemData) =>
			this.unitItemModelBuilder.build({
				unitItemData,
				capabilities,
			}),
		);
	}
}
