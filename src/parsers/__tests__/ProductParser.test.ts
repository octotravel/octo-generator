import { ProductParser } from "../ProductParser";
import { ProductTestDataProvider } from "./dataProviders/ProductTestDataProvider";
import { CapabilityId } from "@octocloud/types";

describe("ProductParser", () => {
  const productParser = new ProductParser();
  const product = ProductTestDataProvider.product;
  const productContent = ProductTestDataProvider.productContent;
  const productPricing = ProductTestDataProvider.productPricing;
  const productPOJO = ProductTestDataProvider.productPOJO;
  const productModel = ProductTestDataProvider.productModel;

  describe("parsePOJOToModel", () => {
    it("should return option model", async () => {
      expect(productParser.parsePOJOToModel(productPOJO)).toStrictEqual(productModel);
    });
  });

  describe("parseModelToPOJO", () => {
    it("should return product POJO", async () => {
      expect(productParser.parseModelToPOJO(productModel)).toStrictEqual(productPOJO);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO without any capabilities", async () => {
      expect(productParser.parseModelToPOJOWithSpecificCapabilities(productModel, [])).toStrictEqual(product);
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with content capability", async () => {
      expect(
        productParser.parseModelToPOJOWithSpecificCapabilities(productModel, [CapabilityId.Content])
      ).toStrictEqual({
        ...product,
        ...productContent,
      });
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with pricing capability", async () => {
      expect(
        productParser.parseModelToPOJOWithSpecificCapabilities(productModel, [CapabilityId.Pricing])
      ).toStrictEqual({
        ...product,
        ...productPricing,
      });
    });
  });

  describe("parseModelToPOJOWithSpecificCapabilities", () => {
    it("should return unit POJO with all capabilities", async () => {
      expect(
        productParser.parseModelToPOJOWithSpecificCapabilities(productModel, [
          CapabilityId.Content,
          CapabilityId.Pricing,
        ])
      ).toStrictEqual(productPOJO);
    });
  });
});
