import { CapabilityId } from "@octocloud/types";
import { PricingTestDataProvider } from "./dataProviders/PricingTestDataProvider";
import { PricingParser } from "../PricingParser";

describe("PricingParser", () => {
  const pricingParser = new PricingParser();

  const { pricing, pricingOffer, pricingPOJO, pricingModel } = PricingTestDataProvider;

  describe("parsePOJOToModel", () => {
    it("should return pricing model", async () => {
      expect(pricingParser.parsePOJOToModel(pricingPOJO)).toStrictEqual(pricingModel);
    });
  });

  describe("parseModelToPOJO", () => {
    it("should return pricing POJO", async () => {
      expect(pricingParser.parseModelToPOJO(pricingModel)).toStrictEqual(pricingPOJO);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return pricing POJO without any capabilities", async () => {
      expect(pricingParser.parseModelToPOJOWithSpecificCapabilities(pricingModel, [])).toStrictEqual(pricing);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return pricing POJO with offers capability", async () => {
      expect(pricingParser.parseModelToPOJOWithSpecificCapabilities(pricingModel, [CapabilityId.Offers])).toStrictEqual(
        {
          ...pricing,
          ...pricingOffer,
        }
      );
    });
  });
});
