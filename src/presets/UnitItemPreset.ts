import { RedemptionMethod, UnitType } from '@octocloud/types';
import { UnitItemModelBuilder } from '../builders/UnitItemModelBuilder';
import { UnitItemParser } from '../parsers/UnitItemParser';
import { DeliveryOptionPreset } from './DeliveryOptionPreset';

export abstract class UnitItemPreset {
	private static readonly unitItemModelBuilder: UnitItemModelBuilder = new UnitItemModelBuilder();
	private static readonly unitItemParser: UnitItemParser = new UnitItemParser();

	public static readonly UNIT_ITEM_ADULT_QRCODE_MODEL = this.unitItemModelBuilder.build({
		unitItemData: {
			id: UnitType.ADULT,
			unitId: UnitType.ADULT,
			unit: {
				id: UnitType.ADULT,
				type: UnitType.ADULT,
				internalName: '',
				reference: '',
				restrictions: {
					minAge: 0,
					maxAge: 99,
					idRequired: false,
					minQuantity: null,
					maxQuantity: null,
					paxCount: 0,
					accompaniedBy: [],
				},
				requiredContactFields: [],
				visibleContactFields: [],
			},
			ticket: {
				redemptionMethod: RedemptionMethod.DIGITAL,
				utcRedeemedAt: null,
				deliveryOptions: [DeliveryOptionPreset.DELIVERY_OPTION_QRCODE],
			},
		},
	});

	public static readonly UNIT_ITEM_ADULT_QRCODE_POJO = this.unitItemParser.parseModelToPOJO(
		this.UNIT_ITEM_ADULT_QRCODE_MODEL,
	);

	public static readonly UNIT_ITEM_ADULT_PKPASS_MODEL = this.unitItemModelBuilder.build({
		unitItemData: {
			id: UnitType.ADULT,
			unitId: UnitType.ADULT,
			unit: {
				id: UnitType.ADULT,
				type: UnitType.ADULT,
				internalName: '',
				reference: '',
				restrictions: {
					minAge: 0,
					maxAge: 99,
					idRequired: false,
					minQuantity: null,
					maxQuantity: null,
					paxCount: 0,
					accompaniedBy: [],
				},
				requiredContactFields: [],
				visibleContactFields: [],
			},
			ticket: {
				redemptionMethod: RedemptionMethod.DIGITAL,
				utcRedeemedAt: null,
				deliveryOptions: [DeliveryOptionPreset.DELIVERY_OPTION_PKPASS],
			},
		},
	});

	public static readonly UNIT_ITEM_ADULT_PKPASS_POJO = this.unitItemParser.parseModelToPOJO(
		this.UNIT_ITEM_ADULT_PKPASS_MODEL,
	);

	public static readonly UNIT_ITEM_ADULT_PDF_MODEL = this.unitItemModelBuilder.build({
		unitItemData: {
			id: UnitType.ADULT,
			unitId: UnitType.ADULT,
			unit: {
				id: UnitType.ADULT,
				type: UnitType.ADULT,
				internalName: '',
				reference: '',
				restrictions: {
					minAge: 0,
					maxAge: 99,
					idRequired: false,
					minQuantity: null,
					maxQuantity: null,
					paxCount: 0,
					accompaniedBy: [],
				},
				requiredContactFields: [],
				visibleContactFields: [],
			},
			ticket: {
				redemptionMethod: RedemptionMethod.DIGITAL,
				utcRedeemedAt: null,
				deliveryOptions: [DeliveryOptionPreset.DELIVERY_OPTION_PDF],
			},
		},
	});

	public static readonly UNIT_ITEM_ADULT_PDF_POJO = this.unitItemParser.parseModelToPOJO(
		this.UNIT_ITEM_ADULT_PDF_MODEL,
	);
}
