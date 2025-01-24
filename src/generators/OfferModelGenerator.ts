import { OfferModelBuilder } from '../builders/OfferModelBuilder';
import { OfferModel } from '../models/offer/OfferModel';
import { PartialOffer } from '../types/PartialOffer';

interface OfferGenerateData {
	offerData: PartialOffer;
}

export class OfferModelGenerator {
	private readonly offerModelBuilder = new OfferModelBuilder();

	public generateOffer(offerGenerateData: OfferGenerateData): OfferModel {
		return this.offerModelBuilder.build({
			offerData: offerGenerateData.offerData,
		});
	}

	public generateMultipleOptions(offersData: PartialOffer[]): OfferModel[] {
		return offersData.map((offerData) => this.generateOffer({ offerData }));
	}
}
