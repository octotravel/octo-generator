import { ProductData } from "../data/ProductData";
import { ProductModel } from "../models/Product/ProductModel";
import { ProductModelBuilder } from "../builders/ProductModelBuilder";
import { CapabilityId } from "@octocloud/types";

interface ProductGeneratorData {
  productData: ProductData;
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

  public generateMultiple = (productsData: ProductData[]): ProductModel[] => {
    return productsData.map((productData) => {
      return this.productModelBuilder.build({
        productData: productData,
      });
    });
  };
}
