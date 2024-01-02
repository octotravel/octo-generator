import { CapabilityId } from "@octocloud/types";
import { PricingValidator } from "@octocloud/validators";
import { PricingModelGenerator } from "../PricingModelGenerator";
import { PricingParser } from "../../parsers/PricingParser";

describe("PricingModelGenerator", () => {
  const pricingModelGenerator = new PricingModelGenerator();
  const pricingParser = new PricingParser();
  const capabilities = [CapabilityId.Offers];
  const pricingValidator = new PricingValidator("");

  describe("generate and validate pricing model", () => {
    it("should generate valid pricing model", async () => {
      const pricingModel = pricingModelGenerator.generatePricing({
        pricingData: {},
        capabilities,
      });
      const pricing = pricingParser.parseModelToPOJO(pricingModel);
      const validationErrors = pricingValidator.validate(pricing);

      expect(validationErrors).toStrictEqual([]);
    });
  });
});
