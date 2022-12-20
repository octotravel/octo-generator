import { ProductModel } from "../models/product/ProductModel";
import { ProductModelBuilder } from "../builders/ProductModelBuilder";
import { CapabilityId, Product } from "@octocloud/types";

interface ProductGeneratorData {
  productData: Partial<Product>;
  capabilities?: CapabilityId[];
}
export class ProductModelGenerator {
  private readonly productModelBuilder = new ProductModelBuilder();

  public generate = (productGeneratorData: ProductGeneratorData): ProductModel => {
    return this.productModelBuilder.build({
      productData: productGeneratorData.productData,
      capabilities: productGeneratorData.capabilities,
    });
  };

  public generateMultiple = (productsGenerateData: ProductGeneratorData[]): ProductModel[] => {
    return productsGenerateData.map((productGenerateData) => {
      return this.generate(productGenerateData);
    });
  };
}
