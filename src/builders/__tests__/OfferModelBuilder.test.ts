import { OfferModelBuilder } from "../OfferModelBuilder";
import { OfferModel } from "../../models/offer/OfferModel";

describe("OfferModelBuilder", () => {
  const offerModelBuilder = new OfferModelBuilder();

  describe("build", () => {
    it("should build offer model", async () => {
      const generatedOfferModel = offerModelBuilder.build({
        offerData: {},
      });

      expect(generatedOfferModel).toBeInstanceOf(OfferModel);
    });
  });
});
