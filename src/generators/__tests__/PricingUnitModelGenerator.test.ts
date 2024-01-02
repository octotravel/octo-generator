import { CapabilityId } from "@octocloud/types";
import { PricingValidator } from "@octocloud/validators";
import { PricingUnitModelGenerator } from "../PricingUnitModelGenerator";
import { PricingUnitParser } from "../../parsers/PricingUnitParser";

describe("PricingUnitModelGenerator", () => {
  const pricingUnitModelGenerator = new PricingUnitModelGenerator();
  const pricingUnitParser = new PricingUnitParser();
  const capabilities = [CapabilityId.Offers];
  const pricingValidator = new PricingValidator("");

  describe("generate and validate pricingUnit model", () => {
    it("should generate valid pricingUnit model", async () => {
      const pricingUnitModel = pricingUnitModelGenerator.generatePricing({
        pricingUnitData: {},
        capabilities,
      });
      const pricingUnit = pricingUnitParser.parseModelToPOJO(pricingUnitModel);
      const validationErrors = pricingValidator.validate(pricingUnit);

      expect(validationErrors).toStrictEqual([]);
    });
  });
});
