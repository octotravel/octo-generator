import { CapabilityId } from "@octocloud/types";
import { PricingUnitParser } from "../PricingUnitParser";
import { PricingUnitTestDataProvider } from "./dataProviders/PricingUnitTestDataProvider";

describe("PricingUnitParser", () => {
  const pricingUnitParser = new PricingUnitParser();

  const { pricingUnit, pricingUnitOffer, pricingUnitPOJO, pricingUnitModel } = PricingUnitTestDataProvider;

  describe("parsePOJOToModel", () => {
    it("should return pricingUnit model", async () => {
      expect(pricingUnitParser.parsePOJOToModel(pricingUnitPOJO)).toStrictEqual(pricingUnitModel);
    });
  });

  describe("parseModelToPOJO", () => {
    it("should return pricingUnit POJO", async () => {
      expect(pricingUnitParser.parseModelToPOJO(pricingUnitModel)).toStrictEqual(pricingUnitPOJO);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return pricingUnit POJO without any capabilities", async () => {
      expect(pricingUnitParser.parseModelToPOJOWithSpecificCapabilities(pricingUnitModel, [])).toStrictEqual(
        pricingUnit
      );
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return pricingUnit POJO with offers capability", async () => {
      expect(
        pricingUnitParser.parseModelToPOJOWithSpecificCapabilities(pricingUnitModel, [CapabilityId.Offers])
      ).toStrictEqual({
        ...pricingUnit,
        ...pricingUnitOffer,
      });
    });
  });
});
