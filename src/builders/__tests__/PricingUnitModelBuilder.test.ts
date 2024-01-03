import { CapabilityId } from "@octocloud/types";
import { PricingDataProvider } from "../../dataProviders/PricingDataProvider";
import { PricingUnitModel } from "../../models/pricing/PricingUnitModel";
import { PricingUnitModelBuilder } from "../PricingUnitModelBuilder";

describe("PricingUnitModelBuilder", () => {
  const pricingUnitModelBuilder = new PricingUnitModelBuilder();

  describe("build", () => {
    it("should build pricing model without any capabilities", async () => {
      const generatedPricingUnitModel = pricingUnitModelBuilder.build({
        pricingUnitData: PricingDataProvider.unitPricing,
        capabilities: [],
      });

      expect(generatedPricingUnitModel).toBeInstanceOf(PricingUnitModel);
      expect(generatedPricingUnitModel.pricingOfferModel).toBeUndefined();
    });

    it("should build pricing model with offers capability", async () => {
      const generatedPricingUnitModel = pricingUnitModelBuilder.build({
        pricingUnitData: PricingDataProvider.unitPricing,
        capabilities: [CapabilityId.Offers],
      });

      expect(generatedPricingUnitModel).toBeInstanceOf(PricingUnitModel);
      expect(generatedPricingUnitModel.pricingOfferModel).toBeDefined();
    });
  });
});
