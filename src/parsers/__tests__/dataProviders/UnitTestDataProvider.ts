import { Unit, UnitContent, UnitPricing, UnitType } from '@octocloud/types';
import { PricingDataProvider } from '../../../dataProviders/PricingDataProvider';
import { UnitDataProvider } from '../../../dataProviders/UnitDataProvider';
import { UnitContentModel } from '../../../models/unit/UnitContentModel';
import { UnitModel } from '../../../models/unit/UnitModel';
import { UnitPricingModel } from '../../../models/unit/UnitPricingModel';

export class UnitTestDataProvider {
	public static unit: Unit = {
		id: 'id',
		internalName: 'internalName',
		reference: 'reference',
		type: UnitType.CHILD,
		restrictions: UnitDataProvider.commonRestrictions,
		requiredContactFields: [],
		visibleContactFields: [],
	};

	public static unitContent: Required<UnitContent> = {
		title: 'title',
		titlePlural: 'titlePlural',
		subtitle: 'subtitle',
	};

	public static unitPricing: UnitPricing = {
		pricing: [PricingDataProvider.adultPricing],
	};

	public static unitPricingFrom: UnitPricing = {
		pricingFrom: [PricingDataProvider.adultPricing],
	};

	public static unitPOJO: Unit = { ...this.unit, ...this.unitContent, ...this.unitPricingFrom };
	public static unitPOJOonBooking: Unit = { ...this.unit, ...this.unitContent, ...this.unitPricing };

	public static unitModel = new UnitModel({
		id: this.unitPOJO.id,
		internalName: this.unitPOJO.internalName,
		reference: this.unitPOJO.reference,
		type: this.unitPOJO.type,
		restrictions: this.unitPOJO.restrictions,
		requiredContactFields: this.unitPOJO.requiredContactFields,
		visibleContactFields: this.unitPOJO.visibleContactFields,
		unitContentModel: new UnitContentModel({
			title: this.unitContent.title,
			titlePlural: this.unitContent.titlePlural,
			subtitle: this.unitContent.subtitle,
		}),
		unitPricingModel: new UnitPricingModel({
			pricing: this.unitPOJO.pricingFrom,
		}),
	});
}
