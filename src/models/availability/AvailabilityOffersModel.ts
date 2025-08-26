import { OfferModel } from '../offer/OfferModel';

export class AvailabilityOffersModel {
	public readonly offerCode: string | null;

	public readonly offerTitle: string | null;

	public readonly offerModels: OfferModel[];

	public readonly offerModel: OfferModel | null;

	public constructor({
		offerCode,
		offerTitle,
		offerModels,
		offerModel,
	}: {
		offerCode: string | null;
		offerTitle: string | null;
		offerModels: OfferModel[];
		offerModel: OfferModel | null;
	}) {
		this.offerCode = offerCode;
		this.offerTitle = offerTitle;
		this.offerModels = offerModels;
		this.offerModel = offerModel;
	}
}
