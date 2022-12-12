import {
  AvailabilityType,
  CapabilityId,
  Currency,
  DeliveryFormat,
  PricingPer,
  RedemptionMethod,
} from "@octocloud/types";
import { ProductData } from "../data/ProductData";
import { OptionModel } from "../models/Option/OptionModel";
import { OptionModelBuilder } from "./OptionModelBuilder";
import { ProductModel } from "../models/Product/ProductModel";
import { TimeZoneDataProvider } from "../dataProviders/TimeZoneDataProvider";
import { LocaleDataProvider } from "../dataProviders/LocaleDataProvider";
import { ProductContentModel } from "../models/Product/ProductContentModel";
import { ProductPricingModel } from "../models/Product/ProductPricingModel";

interface ProductModelBuilderData {
  productData: ProductData;
  capabilities?: CapabilityId[];
}

const defaultCapabilities: CapabilityId[] = [CapabilityId.Content, CapabilityId.Pricing];

export class ProductModelBuilder {
  private optionModelBuilder = new OptionModelBuilder();

  public build(builderData: ProductModelBuilderData): ProductModel {
    builderData.capabilities ??= defaultCapabilities;

    const productData = builderData.productData;

    return new ProductModel({
      id: productData.id,
      internalName: productData.internalName,
      reference: productData.reference ?? null,
      locale: productData.locale ?? LocaleDataProvider.en,
      timeZone: productData.timeZone ?? TimeZoneDataProvider.europeLondon,
      allowFreesale: productData.allowFreesale ?? false,
      instantConfirmation: productData.instantConfirmation ?? true,
      instantDelivery: productData.instantDelivery ?? true,
      availabilityRequired: productData.availabilityRequired ?? true,
      availabilityType: productData.availabilityType ?? AvailabilityType.START_TIME,
      deliveryFormats: productData.deliveryFormats ?? [DeliveryFormat.PDF_URL, DeliveryFormat.QRCODE],
      deliveryMethods: productData.deliveryMethods,
      redemptionMethod: productData.redemptionMethod ?? RedemptionMethod.DIGITAL,
      optionModels: this.buildOptionModels(builderData),
      productContentModel: this.buildContentModel(builderData),
      productPricingModel: this.buildPricingModel(builderData),
    });
  }

  private buildOptionModels(builderData: ProductModelBuilderData): OptionModel[] {
    return builderData.productData.optionsData.map((optionData, index) => {
      optionData.isDefault ??= index === 0;

      return this.optionModelBuilder.build({
        optionData: optionData,
        pricingPer: builderData.productData.pricingPer,
        capabilities: builderData.capabilities,
        sourceModel: ProductModel,
      });
    }, builderData);
  }

  private buildContentModel(builderData: ProductModelBuilderData): ProductContentModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Content) === false) {
      return undefined;
    }

    const productData = builderData.productData;
    const destination = productData.destination ?? {
      id: "id",
      default: true,
      name: "name",
      country: "country",
      contact: {
        website: null,
        email: null,
        telephone: null,
        address: null,
      },
      latitude: 0.0,
      longitude: 0.0,
    };

    return new ProductContentModel({
      title: productData.title ?? "title",
      country: productData.country ?? "country",
      location: productData.location ?? "location",
      subtitle: productData.subtitle ?? "subtitle",
      shortDescription: productData.shortDescription ?? "shortDescription",
      description: productData.description ?? "description",
      highlights: productData.highlights ?? [],
      inclusions: productData.inclusions ?? [],
      exclusions: productData.exclusions ?? [],
      bookingTerms: productData.bookingTerms ?? null,
      redemptionInstructions: productData.redemptionInstructions ?? null,
      cancellationPolicy: productData.cancellationPolicy ?? null,
      destination: productData.destination ?? destination,
      categories: productData.categories ?? [],
      faqs: productData.faqs ?? [],
      coverImageUrl: productData.coverImageUrl ?? null,
      bannerImageUrl: productData.bannerImageUrl ?? null,
      videoUrl: productData.videoUrl ?? null,
      galleryImages: productData.galleryImages ?? [],
      bannerImages: productData.bannerImages ?? [],
    });
  }

  private buildPricingModel(builderData: ProductModelBuilderData): ProductPricingModel | undefined {
    if (builderData.capabilities?.includes(CapabilityId.Pricing) === false) {
      return undefined;
    }

    const productData = builderData.productData;

    return new ProductPricingModel({
      defaultCurrency: productData.defaultCurrency ?? Currency.EUR,
      availableCurrencies: productData.availableCurrencies ?? [Currency.EUR],
      pricingPer: productData.pricingPer ?? PricingPer.UNIT,
    });
  }
}
