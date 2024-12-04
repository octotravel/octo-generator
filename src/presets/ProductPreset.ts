import { AvailabilityType, CapabilityId, Currency, PricingPer, Product } from '@octocloud/types';
import { ProductModelBuilder } from '../builders/ProductModelBuilder';
import { ProductModel } from '../models/product/ProductModel';
import { ProductParser } from '../parsers/ProductParser';
import { OptionModelBuilder } from '../builders/OptionModelBuilder';
import { OptionParser } from '../parsers/OptionParser';
import { OptionPreset } from './OptionPreset';

export abstract class ProductPreset {
  private static readonly productModelBuilder: ProductModelBuilder = new ProductModelBuilder();
  private static readonly productParser: ProductParser = new ProductParser();

  private static readonly optionModelBuilder = new OptionModelBuilder();
  private static readonly optionParser = new OptionParser();

  public static readonly OPENINGHOURS_PRODUCT_MODEL: ProductModel = this.productModelBuilder.build({
    productData: {
      id: 'openinghours_product',
      availabilityType: AvailabilityType.OPENING_HOURS,
      pricingPer: PricingPer.UNIT,
      options: [OptionPreset.OPTION_POJO],
      defaultCurrency: Currency.EUR,
      availableCurrencies: [Currency.EUR],
    },
    sourceModel: ProductModel,
    capabilities: [CapabilityId.Pricing],
  });

  public static readonly FIRST_PRODUCT_MODEL: ProductModel = this.productModelBuilder.build({
    productData: {
      id: 'firstProductId',
      availabilityType: AvailabilityType.OPENING_HOURS,
      options: [
        {
          id: 'firstOptionId',
        },
      ],
    },
  });

  public static readonly SECOND_PRODUCT_MODEL: ProductModel = this.productModelBuilder.build({
    productData: {
      id: 'secondProductId',
      availabilityType: AvailabilityType.OPENING_HOURS,
      location: undefined,
      description: undefined,
      options: [
        {
          id: 'firstOptionId',
        },
      ],
    },
  });

  public static readonly THIRD_PRODUCT_MODEL: ProductModel = this.productModelBuilder.build({
    productData: {
      id: 'thirdProductId',
      availabilityType: AvailabilityType.START_TIME,
      options: [
        {
          id: 'firstOptionId',
        },
      ],
    },
  });

  public static readonly OPENINGHOURS_PRODUCT_POJO: Product = this.productParser.parseModelToPOJO(
    this.OPENINGHOURS_PRODUCT_MODEL,
    { sourceModel: ProductModel },
  );

  public static readonly FIRST_PRODUCT_POJO: Product = this.productParser.parseModelToPOJO(this.FIRST_PRODUCT_MODEL);

  public static readonly SECOND_PRODUCT_POJO: Product = this.productParser.parseModelToPOJO(this.SECOND_PRODUCT_MODEL);

  public static readonly THIRD_PRODUCT_POJO: Product = this.productParser.parseModelToPOJO(this.THIRD_PRODUCT_MODEL);
}
