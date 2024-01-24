import { AvailabilityType, DeliveryFormat, DeliveryMethod, RedemptionMethod } from '@octocloud/types';
import { OptionModel } from '../option/OptionModel';
import { ProductContentModel } from './ProductContentModel';
import { ProductPricingModel } from './ProductPricingModel';
import { UndefinedModelError } from '../../errors/UndefinedModelError';
import { ProductQuestionsModel } from './ProductQuestionsModel';
import { ProductGoogleModel } from './ProductGoogleModel';
import { ProductPackageModel } from './ProductPackageModel';

export class ProductModel {
  public readonly id: string;

  public readonly internalName: string;

  public readonly reference: Nullable<string>;

  public readonly locale: string;

  public readonly timeZone: string;

  public readonly allowFreesale: boolean;

  public readonly instantConfirmation: boolean;

  public readonly instantDelivery: boolean;

  public readonly availabilityRequired: boolean;

  public readonly availabilityType: AvailabilityType;

  public readonly deliveryFormats: DeliveryFormat[];

  public readonly deliveryMethods: DeliveryMethod[];

  public readonly redemptionMethod: RedemptionMethod;

  public readonly freesaleDurationAmount: number;

  public readonly freesaleDurationUnit: string;

  public readonly optionModels: OptionModel[];

  public readonly productContentModel?: ProductContentModel;

  public readonly productGoogleModel?: ProductGoogleModel;

  public readonly productPricingModel?: ProductPricingModel;

  public readonly productQuestionsModel?: ProductQuestionsModel;

  public readonly productPackageModel?: ProductPackageModel;

  public constructor({
    id,
    internalName,
    reference,
    locale,
    timeZone,
    allowFreesale,
    instantConfirmation,
    instantDelivery,
    availabilityRequired,
    availabilityType,
    deliveryFormats,
    deliveryMethods,
    redemptionMethod,
    freesaleDurationAmount,
    freesaleDurationUnit,
    optionModels,
    productContentModel,
    productGoogleModel,
    productPricingModel,
    productQuestionsModel,
    productPackageModel,
  }: {
    id: string;
    internalName: string;
    reference: Nullable<string>;
    locale: string;
    timeZone: string;
    allowFreesale: boolean;
    instantConfirmation: boolean;
    instantDelivery: boolean;
    availabilityRequired: boolean;
    availabilityType: AvailabilityType;
    deliveryFormats: DeliveryFormat[];
    deliveryMethods: DeliveryMethod[];
    redemptionMethod: RedemptionMethod;
    freesaleDurationAmount: number;
    freesaleDurationUnit: string;
    optionModels: OptionModel[];
    productContentModel?: ProductContentModel;
    productGoogleModel?: ProductGoogleModel;
    productPricingModel?: ProductPricingModel;
    productQuestionsModel?: ProductQuestionsModel;
    productPackageModel?: ProductPackageModel;
  }) {
    this.id = id;
    this.internalName = internalName;
    this.reference = reference;
    this.locale = locale;
    this.timeZone = timeZone;
    this.allowFreesale = allowFreesale;
    this.instantConfirmation = instantConfirmation;
    this.instantDelivery = instantDelivery;
    this.availabilityRequired = availabilityRequired;
    this.availabilityType = availabilityType;
    this.deliveryFormats = deliveryFormats;
    this.deliveryMethods = deliveryMethods;
    this.redemptionMethod = redemptionMethod;
    this.freesaleDurationAmount = freesaleDurationAmount;
    this.freesaleDurationUnit = freesaleDurationUnit;
    this.optionModels = optionModels;
    this.productContentModel = productContentModel;
    this.productGoogleModel = productGoogleModel;
    this.productPricingModel = productPricingModel;
    this.productQuestionsModel = productQuestionsModel;
    this.productPackageModel = productPackageModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getProductContentModel(): ProductContentModel {
    if (this.productContentModel === undefined) {
      throw UndefinedModelError.create('ProductContentModel', 'ProductModel', this.id);
    }

    return this.productContentModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getProductGoogleModel(): ProductGoogleModel {
    if (this.productGoogleModel === undefined) {
      throw UndefinedModelError.create('ProductGoogleModel', 'ProductModel', this.id);
    }

    return this.productGoogleModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getProductPricingModel(): ProductPricingModel {
    if (this.productPricingModel === undefined) {
      throw UndefinedModelError.create('ProductPricingModel', 'ProductModel', this.id);
    }

    return this.productPricingModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getProductQuestionsModel(): ProductQuestionsModel {
    if (this.productQuestionsModel === undefined) {
      throw UndefinedModelError.create('ProductQuestionsModel', 'ProductModel', this.id);
    }

    return this.productQuestionsModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getProductPackageModel(): ProductPackageModel {
    if (this.productPackageModel === undefined) {
      throw UndefinedModelError.create('ProductPackageModel', 'ProductModel', this.id);
    }

    return this.productPackageModel;
  }

  public findOptionModelByOptionId(optionId: string): Nullable<OptionModel> {
    return this.optionModels.find((optionModel) => optionModel.id === optionId) ?? null;
  }
}
