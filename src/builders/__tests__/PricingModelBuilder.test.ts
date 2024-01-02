import { CapabilityId } from "@octocloud/types";
import { PricingModelBuilder } from "../PricingModelBuilder";
import { PricingModel } from "../../models/pricing/PricingModel";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";

describe("PricingModelBuilder", () => {
  const pricingModelBuilder = new PricingModelBuilder();

  describe("build", () => {
    it("should build pricing model without any capabilities", async () => {
      const generatedPricingModel = pricingModelBuilder.build({
        pricingData: PricingDataProvider.adultPricing,
        capabilities: [],
      });

      expect(generatedPricingModel).toBeInstanceOf(PricingModel);
      expect(generatedPricingModel.pricingOfferModel).toBeUndefined();
    });

    it("should build pricing model with offers capability", async () => {
      const generatedPricingModel = pricingModelBuilder.build({
        pricingData: PricingDataProvider.adultPricing,
        capabilities: [CapabilityId.Offers],
      });

      expect(generatedPricingModel).toBeInstanceOf(PricingModel);
      expect(generatedPricingModel.pricingOfferModel).toBeUndefined();
    });
  });
});
