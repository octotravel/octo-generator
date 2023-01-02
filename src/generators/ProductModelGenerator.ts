import { ProductModel } from "../models/product/ProductModel";
import { ProductModelBuilder } from "../builders/ProductModelBuilder";
import { CapabilityId } from "@octocloud/types";
import { PartialProduct } from "../global";

interface ProductGeneratorData {
  productData: PartialProduct;
  capabilities?: CapabilityId[];
}
export class ProductModelGenerator {
  private readonly productModelBuilder = new ProductModelBuilder();

  public generateProduct = (productGeneratorData: ProductGeneratorData): ProductModel => {
    return this.productModelBuilder.build({
      productData: productGeneratorData.productData,
      capabilities: productGeneratorData.capabilities,
    });
  };

  public generateMultipleProducts = (productsGenerateData: ProductGeneratorData[]): ProductModel[] => {
    return productsGenerateData.map((productGenerateData) => {
      return this.generateProduct(productGenerateData);
    });
  };
}
