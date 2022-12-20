import { Product } from "@octocloud/types";
import { OptionParser } from "./OptionParser";
import { ProductModel } from "../models/Product/ProductModel";

import { ProductContentModel } from "../models/Product/ProductContentModel";
import { ProductPricingModel } from "../models/Product/ProductPricingModel";

export class ProductParser {
  private readonly optionParser = new OptionParser();

  public parsePOJOToModel = (product: Product): ProductModel => {
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
    });
  };

  private parseContentPOJOToModel = (product: Product): ProductContentModel | undefined => {
    if (
      product.title === undefined ||
      product.country === undefined ||
      product.location === undefined ||
      product.subtitle === undefined ||
      product.shortDescription === undefined ||
      product.description === undefined ||
      product.highlights === undefined ||
      product.inclusions === undefined ||
      product.exclusions === undefined ||
      product.bookingTerms === undefined ||
      product.redemptionInstructions === undefined ||
      product.cancellationPolicy === undefined ||
      product.destination === undefined ||
      product.categories === undefined ||
      product.faqs === undefined ||
      product.coverImageUrl === undefined ||
      product.bannerImageUrl === undefined ||
      product.videoUrl === undefined ||
      product.galleryImages === undefined ||
      product.bannerImages === undefined
    ) {
      return undefined;
    }

    return new ProductContentModel({
      title: product.title,
      country: product.country,
      location: product.location,
      subtitle: product.subtitle,
      shortDescription: product.shortDescription,
      description: product.description,
      highlights: product.highlights,
      inclusions: product.inclusions,
      exclusions: product.exclusions,
      bookingTerms: product.bookingTerms,
      redemptionInstructions: product.redemptionInstructions,
      cancellationPolicy: product.cancellationPolicy,
      destination: product.destination,
      categories: product.categories,
      faqs: product.faqs,
      coverImageUrl: product.coverImageUrl,
      bannerImageUrl: product.bannerImageUrl,
      videoUrl: product.videoUrl,
      galleryImages: product.galleryImages,
      bannerImages: product.bannerImages,
    });
  };

  private parsePricingPOJOToModel = (product: Product): ProductPricingModel | undefined => {
    if (
      product.defaultCurrency === undefined ||
      product.availableCurrencies === undefined ||
      product.pricingPer === undefined
    ) {
      return undefined;
    }

    return new ProductPricingModel({
      defaultCurrency: product.defaultCurrency,
      availableCurrencies: product.availableCurrencies,
      pricingPer: product.pricingPer,
    });
  };

  public parseModelToPOJO = (productModel: ProductModel): Product => {
    const product: Product = {
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
      options: productModel.optionModels.map((optionModel) => this.optionParser.parseModelToPOJO(optionModel)),
    };

    if (productModel.productContentModel !== undefined) {
      const productContentModel = productModel.productContentModel;

      product.title = productContentModel.title;
      product.country = productContentModel.country;
      product.location = productContentModel.location;
      product.subtitle = productContentModel.subtitle;
      product.shortDescription = productContentModel.shortDescription;
      product.description = productContentModel.description;
      product.highlights = productContentModel.highlights;
      product.inclusions = productContentModel.inclusions;
      product.exclusions = productContentModel.exclusions;
      product.bookingTerms = productContentModel.bookingTerms;
      product.redemptionInstructions = productContentModel.redemptionInstructions;
      product.cancellationPolicy = productContentModel.cancellationPolicy;
      product.destination = productContentModel.destination;
      product.categories = productContentModel.categories;
      product.faqs = productContentModel.faqs;
      product.coverImageUrl = productContentModel.coverImageUrl;
      product.bannerImageUrl = productContentModel.bannerImageUrl;
      product.videoUrl = productContentModel.videoUrl;
      product.galleryImages = productContentModel.galleryImages;
      product.bannerImages = productContentModel.bannerImages;
    }

    if (productModel.productPricingModel !== undefined) {
      const productPricingModel = productModel.productPricingModel;

      product.defaultCurrency = productPricingModel.defaultCurrency;
      product.availableCurrencies = productPricingModel.availableCurrencies;
      product.pricingPer = productPricingModel.pricingPer;
    }

    return product;
  };
}
