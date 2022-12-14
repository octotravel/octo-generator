import { ProductModelGenerator } from "../../../generators/ProductModelGenerator";
import { OptionModel } from "../../Option/OptionModel";

describe("ProductModel", () => {
  const productModelGenerator = new ProductModelGenerator();

  describe("findOptionModelByOptionId", () => {
    it("should return option model", async () => {
      const optionId = "optionId";

      const productModel = productModelGenerator.generate({
        productData: {
          id: "id",
          internalName: "internalName",
          deliveryMethods: [],
          optionsData: [
            {
              id: optionId,
              restrictions: {
                minUnits: 0,
                maxUnits: null,
              },
              unitsData: [],
            },
          ],
        },
      });

      expect(productModel.findOptionModelByOptionId(optionId)).toBeInstanceOf(OptionModel);
    });

    it("should return null", async () => {
      const productModel = productModelGenerator.generate({
        productData: {
          id: "id",
          internalName: "internalName",
          deliveryMethods: [],
          optionsData: [],
        },
      });

      expect(productModel.findOptionModelByOptionId("invalidOptionId")).toStrictEqual(null);
    });
  });
});
