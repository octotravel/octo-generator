import { CapabilityId } from "@octocloud/types";
import { ProductModelBuilder } from "../ProductModelBuilder";
import { ProductDataProvider } from "../../dataProviders/ProductDataProvider";
import { ProductModel } from "../../models/Product/ProductModel";

describe("ProductModelBuilder", () => {
  const productModelBuilder = new ProductModelBuilder();
  describe("build", () => {
    it.concurrent("should build product model without any capabilities", async () => {
      const productModel = productModelBuilder.build({
        productData: ProductDataProvider.defaultProduct,
        capabilities: [],
      });

      expect(productModel).toBeInstanceOf(ProductModel);
      expect(productModel.productContentModel).toBeUndefined();
      expect(productModel.productPricingModel).toBeUndefined();
    });

    it.concurrent("should build product model with content capability", async () => {
      const productModel = productModelBuilder.build({
        productData: ProductDataProvider.defaultProduct,
        capabilities: [CapabilityId.Content],
      });

      expect(productModel).toBeInstanceOf(ProductModel);
      expect(productModel.productContentModel).toBeDefined();
      expect(productModel.productPricingModel).toBeUndefined();
    });

    it.concurrent("should build product model with pricing capability", async () => {
      const productModel = productModelBuilder.build({
        productData: ProductDataProvider.defaultProduct,
        capabilities: [CapabilityId.Pricing],
      });

      expect(productModel).toBeInstanceOf(ProductModel);
      expect(productModel.productContentModel).toBeUndefined();
      expect(productModel.productPricingModel).toBeDefined();
    });

    it.concurrent("should build product model with all capabilities", async () => {
      const productModel = productModelBuilder.build({
        productData: ProductDataProvider.defaultProduct,
        capabilities: [CapabilityId.Content, CapabilityId.Pricing],
      });

      expect(productModel).toBeInstanceOf(ProductModel);
      expect(productModel.productContentModel).toBeDefined();
      expect(productModel.productPricingModel).toBeDefined();
    });
  });
});
