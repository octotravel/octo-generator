import { AvailabilityType, DeliveryFormat, DeliveryMethod, RedemptionMethod } from "@octocloud/types";
import OptionModel from "../option/OptionModel";
import ProductContentModel from "./ProductContentModel";
import ProductPricingModel from "./ProductPricingModel";
import UndefinedModelError from "../../errors/UndefinedModelError";
import ProductQuestionsModel from "./ProductQuestionsModel";

export default class ProductModel {
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

  public readonly deliveryFormats: Array<DeliveryFormat>;

  public readonly deliveryMethods: Array<DeliveryMethod>;

  public readonly redemptionMethod: RedemptionMethod;

  public readonly optionModels: Array<OptionModel>;

  public readonly productContentModel?: ProductContentModel;

  public readonly productPricingModel?: ProductPricingModel;

  public readonly productQuestionsModel?: ProductQuestionsModel;

  constructor({
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
    optionModels,
    productContentModel,
    productPricingModel,
    productQuestionsModel,
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
    deliveryFormats: Array<DeliveryFormat>;
    deliveryMethods: Array<DeliveryMethod>;
    redemptionMethod: RedemptionMethod;
    optionModels: Array<OptionModel>;
    productContentModel?: ProductContentModel;
    productPricingModel?: ProductPricingModel;
    productQuestionsModel?: ProductQuestionsModel;
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
    this.redemptionMethod = redemptionMethod;
    this.optionModels = optionModels;
    this.productContentModel = productContentModel;
    this.productPricingModel = productPricingModel;
    this.productQuestionsModel = productQuestionsModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getProductContentModel(): ProductContentModel {
    if (this.productContentModel === undefined) {
      throw UndefinedModelError.create("ProductContentModel", "ProductModel", this.id);
    }

    return this.productContentModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getProductPricingModel(): ProductPricingModel {
    if (this.productPricingModel === undefined) {
      throw UndefinedModelError.create("ProductPricingModel", "ProductModel", this.id);
    }

    return this.productPricingModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getProductQuestionsModel(): ProductQuestionsModel {
    if (this.productQuestionsModel === undefined) {
      throw UndefinedModelError.create("ProductQuestionsModel", "ProductModel", this.id);
    }

    return this.productQuestionsModel;
  }

  public findOptionModelByOptionId(optionId: string): Nullable<OptionModel> {
    return this.optionModels.find((optionModel) => optionModel.id === optionId) ?? null;
  }
}
