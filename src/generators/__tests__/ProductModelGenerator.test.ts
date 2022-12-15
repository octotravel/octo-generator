import { CapabilityId, DeliveryMethod } from "@octocloud/types";
import { ProductValidator } from "@octocloud/validators";
import { ProductModelGenerator } from "../ProductModelGenerator";
import { ProductParser } from "../../parsers/ProductParser";

describe("ProductModelGenerator", () => {
  const productModelGenerator = new ProductModelGenerator();
  const productParser = new ProductParser();
  const capabilities = [CapabilityId.Content, CapabilityId.Pricing];
  const productValidator = new ProductValidator({
    path: "",
    capabilities: capabilities,
  });

  describe("generate and validate product model", () => {
    it("should generate valid product model", async () => {
      const productModel = productModelGenerator.generate({
        productData: {
          id: "id",
          internalName: "internalName",
          deliveryMethods: [DeliveryMethod.VOUCHER, DeliveryMethod.TICKET],
          optionsData: [
            {
              restrictions: {
                minUnits: 0,
                maxUnits: null,
              },
              unitsData: [],
            },
          ],
        },
        capabilities: capabilities,
      });
      const product = productParser.parseModelToPOJO(productModel);
      const validationErrors = productValidator.validate(product);

      expect(validationErrors).toStrictEqual([]);
    });

    it("should generate invalid model", async () => {
      const productModel = productModelGenerator.generate({
        productData: {
          id: "",
          internalName: "",
          deliveryMethods: [DeliveryMethod.VOUCHER, DeliveryMethod.TICKET],
          optionsData: [],
        },
        capabilities: capabilities,
      });
      const product = productParser.parseModelToPOJO(productModel);
      const validationErrors = productValidator.validate(product);

      expect(validationErrors.length).toBeGreaterThan(0);
    });
  });
});
