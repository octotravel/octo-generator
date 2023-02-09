import { OfferModel } from "../../../models/offer/OfferModel";

export class OfferTestDataProvider {
  public static offerPOJO = {
    title: "offerTitle",
    code: "offerCode",
    description: null,
    netDiscount: null,
    restrictions: {
      minUnits: null,
      maxUnits: null,
      minTotal: null,
      maxTotal: null,
      unitIds: [],
    },
  };

  public static offerModel = new OfferModel({
    title: this.offerPOJO.title,
    code: this.offerPOJO.code,
    description: this.offerPOJO.description,
    netDiscount: this.offerPOJO.netDiscount,
    restrictions: this.offerPOJO.restrictions,
  });
}
