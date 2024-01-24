import { OfferModel } from '../offer/OfferModel';

export class AvailabilityOffersModel {
  public readonly offerCode: string;

  public readonly offerTitle: string;

  public readonly offerModels: OfferModel[];

  public readonly offerModel: OfferModel;

  public constructor({
    offerCode,
    offerTitle,
    offerModels,
    offerModel,
  }: {
    offerCode: string;
    offerTitle: string;
    offerModels: OfferModel[];
    offerModel: OfferModel;
  }) {
    this.offerCode = offerCode;
    this.offerTitle = offerTitle;
    this.offerModels = offerModels;
    this.offerModel = offerModel;
  }
}
