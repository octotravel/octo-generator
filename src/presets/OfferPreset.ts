import { NetDiscount, Offer } from '@octocloud/types';
import { OfferModelBuilder } from '../builders/OfferModelBuilder';
import { OfferModel } from '../models/offer/OfferModel';
import { OfferParser } from '../parsers/OfferParser';

export abstract class OfferPreset {
	private static readonly offerModelBuilder: OfferModelBuilder = new OfferModelBuilder();

	private static readonly offerParser: OfferParser = new OfferParser();

	public static readonly TEN_PERCENT_OFF_MODEL: OfferModel = this.offerModelBuilder.build({
		offerData: {
			code: 'promotion_395fa759-8c9b-467b-9914-603d0d533405',
			title: '10% OFF',
			description: 'Winter Special 10% off',
			netDiscount: NetDiscount.FULL,
			restrictions: {
				minUnits: 0,
				maxUnits: null,
				minTotal: 0,
				maxTotal: null,
				unitIds: [],
			},
		},
	});

	public static readonly TEN_PERCENT_OFF_POJO: Offer = this.offerParser.parseModelToPOJO(this.TEN_PERCENT_OFF_MODEL);
}
