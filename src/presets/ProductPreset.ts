import { AvailabilityType, Product } from "@octocloud/types";
import { ProductModelBuilder } from "../builders/ProductModelBuilder";
import { ProductModel } from "../models/product/ProductModel";
import { ProductParser } from "../parsers/ProductParser";

export abstract class ProductPreset {
  private static readonly productModelBuilder: ProductModelBuilder = new ProductModelBuilder();

  private static readonly productParser: ProductParser = new ProductParser();

  public static readonly FIRST_PRODUCT_MODEL: ProductModel = this.productModelBuilder.build({
    productData: {
      id: "firstProductId",
      availabilityType: AvailabilityType.OPENING_HOURS,
      options: [
        {
          id: "firstOptionId",
        },
      ],
    },
  });

  public static readonly SECOND_PRODUCT_MODEL: ProductModel = this.productModelBuilder.build({
    productData: {
      id: "secondProductId",
      availabilityType: AvailabilityType.OPENING_HOURS,
      location: undefined,
      description: undefined,
      options: [
        {
          id: "firstOptionId",
        },
      ],
    },
  });

  public static readonly THIRD_PRODUCT_MODEL: ProductModel = this.productModelBuilder.build({
    productData: {
      id: "thirdProductId",
      availabilityType: AvailabilityType.START_TIME,
      options: [
        {
          id: "firstOptionId",
        },
      ],
    },
  });

  public static readonly FIRST_PRODUCT: Product = this.productParser.parseModelToPOJO(this.FIRST_PRODUCT_MODEL);

  public static readonly SECOND_PRODUCT: Product = this.productParser.parseModelToPOJO(this.SECOND_PRODUCT_MODEL);

  public static readonly THIRD_PRODUCT: Product = this.productParser.parseModelToPOJO(this.THIRD_PRODUCT_MODEL);
}
