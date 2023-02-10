import { OfferModelBuilder } from "../builders/OfferModelBuilder";

export abstract class OfferPresets {
  private static readonly offerModelBuilder: OfferModelBuilder = new OfferModelBuilder();

  public static tenPercentOff = this.offerModelBuilder.build({
    offerData: {
      title: "10% OFF",
      description: "Winter Special 10% off",
      netDiscount: "COMMISSION",
      restrictions: {
        minUnits: 0,
        maxUnits: null,
        minTotal: 0,
        maxTotal: null,
        unitIds: [],
      },
    },
  });
}
