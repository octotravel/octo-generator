import { CapabilityId } from '@octocloud/types';
import { ProductModel } from '../models/product/ProductModel';
import { ProductModelBuilder } from '../builders/ProductModelBuilder';
import { PartialProduct } from '../types/PartialProduct';

interface ProductGeneratorData {
  productData: PartialProduct;
  capabilities?: CapabilityId[];
}
export class ProductModelGenerator {
  private readonly productModelBuilder = new ProductModelBuilder();

  public generateProduct(productGeneratorData: ProductGeneratorData): ProductModel {
    return this.productModelBuilder.build({
      productData: productGeneratorData.productData,
      capabilities: productGeneratorData.capabilities,
    });
  }

  public generateMultipleProducts(productsData: PartialProduct[], capabilities?: CapabilityId[]): ProductModel[] {
    return productsData.map((productData) => this.generateProduct({ productData, capabilities }));
  }
}
