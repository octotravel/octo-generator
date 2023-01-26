import { CapabilityId, DeliveryMethod } from "@octocloud/types";
import { ProductValidator } from "@octocloud/validators";
import ProductModelGenerator from "../ProductModelGenerator";
import ProductParser from "../../parsers/ProductParser";
import OptionDataProvider from "../../dataProviders/OptionDataProvider";

describe("ProductModelGenerator", () => {
  const productModelGenerator = new ProductModelGenerator();
  const productParser = new ProductParser();
  const capabilities = [CapabilityId.Content, CapabilityId.Pricing];
  const productValidator = new ProductValidator({
    path: "",
    capabilities,
  });

  describe("generate and validate product model", () => {
    it("should generate valid product model", async () => {
      const productModel = productModelGenerator.generateProduct({
        productData: {
          id: "id",
          internalName: "internalName",
          deliveryMethods: [DeliveryMethod.VOUCHER, DeliveryMethod.TICKET],
          options: [OptionDataProvider.defaultOption],
        },
        capabilities,
      });
      const product = productParser.parseModelToPOJO(productModel);
      const validationErrors = productValidator.validate(product);

      expect(validationErrors).toStrictEqual([]);
    });

    it("should generate invalid model", async () => {
      const productModel = productModelGenerator.generateProduct({
        productData: {
          id: "",
          internalName: "",
          deliveryMethods: [DeliveryMethod.VOUCHER, DeliveryMethod.TICKET],
          options: [],
        },
        capabilities,
      });
      const product = productParser.parseModelToPOJO(productModel);
      const validationErrors = productValidator.validate(product);

      expect(validationErrors.length).toBeGreaterThan(0);
    });
  });
});
