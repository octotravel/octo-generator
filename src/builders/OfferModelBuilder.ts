import { OfferModel } from "../models/offer/OfferModel";
import { PartialOffer } from "../types/PartialOffer";

interface OfferModelBuilderData {
  offerData: PartialOffer;
}

export class OfferModelBuilder {
  public build(builderData: OfferModelBuilderData): OfferModel {
    const { offerData } = builderData;

    return new OfferModel({
      title: offerData.title ?? "offerTitle",
      code: offerData.code ?? "offerCode",
      description: offerData.description ?? null,
      netDiscount: offerData.netDiscount ?? null,
      restrictions: offerData.restrictions ?? {
        minUnits: null,
        maxUnits: null,
        minTotal: null,
        maxTotal: null,
        unitIds: [],
      },
    });
  }
}
