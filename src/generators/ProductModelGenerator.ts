import { ProductData } from "../data/ProductData";
import { ProductModel } from "../models/Product/ProductModel";
import { ProductModelBuilder } from "../builders/ProductModelBuilder";

export class ProductModelGenerator {
  private readonly productModelBuilder = new ProductModelBuilder();

  public generate = (productData: ProductData): ProductModel => {
    return this.productModelBuilder.build({
      productData: productData,
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
