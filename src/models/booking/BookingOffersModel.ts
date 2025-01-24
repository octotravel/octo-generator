import { Offer, OfferComparison } from '@octocloud/types';
import { OfferModel } from '../offer/OfferModel';

export class BookingOffersModel {
	public readonly offerCode: string;

	public readonly offerTitle: string;

	public readonly offerComparisons: OfferComparison[];

	public readonly offerIsCombination: boolean;

	public readonly offerModels: Offer[];

	public readonly offerModel: Offer;

	public constructor({
		offerCode,
		offerTitle,
		offerComparisons,
		offerIsCombination,
		offerModels,
		offerModel,
	}: {
		offerCode: string;
		offerTitle: string;
		offerComparisons: OfferComparison[];
		offerIsCombination: boolean;
		offerModels: OfferModel[];
		offerModel: Offer;
	}) {
		this.offerCode = offerCode;
		this.offerTitle = offerTitle;
		this.offerComparisons = offerComparisons;
		this.offerIsCombination = offerIsCombination;
		this.offerModels = offerModels;
		this.offerModel = offerModel;
	}
}
