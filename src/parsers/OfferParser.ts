import { Offer } from '@octocloud/types';
import { OfferModel } from '../models/offer/OfferModel';

export class OfferParser {
  public parsePOJOToModel(offer: Offer): OfferModel {
    return new OfferModel({
      title: offer.title,
      code: offer.code,
      description: offer.description,
      netDiscount: offer.netDiscount,
      restrictions: offer.restrictions,
    });
  }

  public parseModelToPOJO(offerModel: OfferModel): Offer {
    return {
      title: offerModel.title,
      code: offerModel.code,
      description: offerModel.description,
      netDiscount: offerModel.netDiscount,
      restrictions: offerModel.restrictions,
    };
  }
}
