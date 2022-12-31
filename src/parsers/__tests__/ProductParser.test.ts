import { ProductParser } from "../ProductParser";
import { ProductTestDataProvider } from "./dataProviders/ProductTestDataProvider";

describe("ProductParser", () => {
  const productParser = new ProductParser();
  const product = ProductTestDataProvider.product;
  const productModel = ProductTestDataProvider.productModel;

  describe("parseModelToPOJO", () => {
    it("should return product POJO", async () => {
      expect(productParser.parseModelToPOJO(productModel)).toStrictEqual(product);
    });
  });

  describe("parsePOJOToModel", () => {
    it("should return option model", async () => {
      expect(productParser.parsePOJOToModel(product)).toStrictEqual(productModel);
    });
  });
});
