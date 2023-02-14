import { CapabilityId, Product, ProductContent, ProductPricing, ProductQuestions } from "@octocloud/types";
import { OptionParser } from "./OptionParser";
import { ProductModel } from "../models/product/ProductModel";
import { ProductContentModel } from "../models/product/ProductContentModel";
import { ProductPricingModel } from "../models/product/ProductPricingModel";
import { ProductQuestionsModel } from "../models/product/ProductQuestionsModel";

export class ProductParser {
  private readonly optionParser = new OptionParser();

  public parsePOJOToModel(product: Product): ProductModel {
    return new ProductModel({
      id: product.id,
      internalName: product.internalName,
      reference: product.reference,
      locale: product.locale,
      timeZone: product.timeZone,
      allowFreesale: product.allowFreesale,
      instantConfirmation: product.instantConfirmation,
      instantDelivery: product.instantDelivery,
      availabilityRequired: product.availabilityRequired,
      availabilityType: product.availabilityType,
      deliveryFormats: product.deliveryFormats,
      deliveryMethods: product.deliveryMethods,
      redemptionMethod: product.redemptionMethod,
      optionModels: product.options.map((option) => this.optionParser.parsePOJOToModel(option)),
      productContentModel: this.parseContentPOJOToModel(product),
      productPricingModel: this.parsePricingPOJOToModel(product),
      productQuestionsModel: this.parseQuestionsPOJOToModel(product),
    });
  }

  public parseContentPOJOToModel(productContent: ProductContent): ProductContentModel | undefined {
    if (
      productContent.title === undefined ||
      productContent.country === undefined ||
      productContent.location === undefined ||
      productContent.subtitle === undefined ||
      productContent.shortDescription === undefined ||
      productContent.description === undefined ||
      productContent.highlights === undefined ||
      productContent.inclusions === undefined ||
      productContent.exclusions === undefined ||
      productContent.bookingTerms === undefined ||
      productContent.redemptionInstructions === undefined ||
      productContent.cancellationPolicy === undefined ||
      productContent.destination === undefined ||
      productContent.categories === undefined ||
      productContent.faqs === undefined ||
      productContent.coverImageUrl === undefined ||
      productContent.bannerImageUrl === undefined ||
      productContent.videoUrl === undefined ||
      productContent.galleryImages === undefined ||
      productContent.bannerImages === undefined
    ) {
      return undefined;
    }

    return new ProductContentModel({
      title: productContent.title,
      country: productContent.country,
      location: productContent.location,
      subtitle: productContent.subtitle,
      shortDescription: productContent.shortDescription,
      description: productContent.description,
      highlights: productContent.highlights,
      inclusions: productContent.inclusions,
      exclusions: productContent.exclusions,
      bookingTerms: productContent.bookingTerms,
      redemptionInstructions: productContent.redemptionInstructions,
      cancellationPolicy: productContent.cancellationPolicy,
      destination: productContent.destination,
      categories: productContent.categories,
      faqs: productContent.faqs,
      coverImageUrl: productContent.coverImageUrl,
      bannerImageUrl: productContent.bannerImageUrl,
      videoUrl: productContent.videoUrl,
      galleryImages: productContent.galleryImages,
      bannerImages: productContent.bannerImages,
    });
  }

  public parsePricingPOJOToModel(productPricing: ProductPricing): ProductPricingModel | undefined {
    if (
      productPricing.defaultCurrency === undefined ||
      productPricing.availableCurrencies === undefined ||
      productPricing.pricingPer === undefined
    ) {
      return undefined;
    }

    return new ProductPricingModel({
      defaultCurrency: productPricing.defaultCurrency,
      availableCurrencies: productPricing.availableCurrencies,
      pricingPer: productPricing.pricingPer,
    });
  }

  public parseQuestionsPOJOToModel(productQuestions: ProductQuestions): ProductQuestionsModel | undefined {
    if (productQuestions.questions === undefined) {
      return undefined;
    }

    return new ProductQuestionsModel({
      questions: productQuestions.questions,
    });
  }

  public parseModelToPOJO(productModel: ProductModel): Product {
    return Object.assign(
      this.parseMainModelToPojo(productModel),
      this.parseContentModelToPOJO(productModel.productContentModel),
      this.parsePricingModelToPOJO(productModel.productPricingModel),
      this.parseQuestionsModelToPOJO(productModel.productQuestionsModel)
    );
  }

  public parseModelToPOJOWithSpecificCapabilities(productModel: ProductModel, capabilities: CapabilityId[]): Product {
    let productContent;
    let productPricing;
    let productQuestion;

    if (capabilities?.includes(CapabilityId.Content)) {
      productContent = this.parseContentModelToPOJO(productModel.productContentModel);
    }

    if (capabilities?.includes(CapabilityId.Pricing)) {
      productPricing = this.parsePricingModelToPOJO(productModel.productPricingModel);
    }

    if (capabilities?.includes(CapabilityId.Questions)) {
      productQuestion = this.parseQuestionsModelToPOJO(productModel.productQuestionsModel);
    }

    return Object.assign(
      this.parseMainModelToPojo(productModel, capabilities),
      productContent,
      productPricing,
      productQuestion
    );
  }

  private parseMainModelToPojo(productModel: ProductModel, capabilities?: CapabilityId[]): Product {
    const options = productModel.optionModels.map((optionModel) => {
      if (capabilities === undefined) {
        return this.optionParser.parseModelToPOJO(optionModel);
      }
      return this.optionParser.parseModelToPOJOWithSpecificCapabilities(optionModel, capabilities);
    });

    return {
      id: productModel.id,
      internalName: productModel.internalName,
      reference: productModel.reference,
      locale: productModel.locale,
      timeZone: productModel.timeZone,
      allowFreesale: productModel.allowFreesale,
      instantConfirmation: productModel.instantConfirmation,
      instantDelivery: productModel.instantDelivery,
      availabilityRequired: productModel.availabilityRequired,
      availabilityType: productModel.availabilityType,
      deliveryFormats: productModel.deliveryFormats,
      deliveryMethods: productModel.deliveryMethods,
      redemptionMethod: productModel.redemptionMethod,
      options,
    };
  }

  public parseContentModelToPOJO(productContentModel?: ProductContentModel): ProductContent {
    if (productContentModel === undefined) {
      return {};
    }

    return {
      title: productContentModel.title,
      country: productContentModel.country,
      location: productContentModel.location,
      subtitle: productContentModel.subtitle,
      shortDescription: productContentModel.shortDescription,
      description: productContentModel.description,
      highlights: productContentModel.highlights,
      inclusions: productContentModel.inclusions,
      exclusions: productContentModel.exclusions,
      bookingTerms: productContentModel.bookingTerms,
      redemptionInstructions: productContentModel.redemptionInstructions,
      cancellationPolicy: productContentModel.cancellationPolicy,
      destination: productContentModel.destination,
      categories: productContentModel.categories,
      faqs: productContentModel.faqs,
      coverImageUrl: productContentModel.coverImageUrl,
      bannerImageUrl: productContentModel.bannerImageUrl,
      videoUrl: productContentModel.videoUrl,
      galleryImages: productContentModel.galleryImages,
      bannerImages: productContentModel.bannerImages,
    };
  }

  public parsePricingModelToPOJO(productPricingModel?: ProductPricingModel): ProductPricing {
    if (productPricingModel === undefined) {
      return {};
    }

    return {
      defaultCurrency: productPricingModel.defaultCurrency,
      availableCurrencies: productPricingModel.availableCurrencies,
      pricingPer: productPricingModel.pricingPer,
    };
  }

  private parseQuestionsModelToPOJO(productQuestionsModel?: ProductQuestionsModel): ProductQuestions {
    if (productQuestionsModel === undefined) {
      return {};
    }

    return {
      questions: productQuestionsModel?.questions,
    };
  }
}
