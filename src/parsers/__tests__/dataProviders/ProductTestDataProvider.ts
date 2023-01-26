import {
  AvailabilityType,
  Currency,
  DeliveryFormat,
  DeliveryMethod,
  PricingPer,
  RedemptionMethod,
} from "@octocloud/types";
import LocaleDataProvider from "../../../dataProviders/LocaleDataProvider";
import TimeZoneDataProvider from "../../../dataProviders/TimeZoneDataProvider";
import ProductModel from "../../../models/product/ProductModel";
import OptionModel from "../../../models/option/OptionModel";
import UnitModel from "../../../models/unit/UnitModel";
import ProductContentModel from "../../../models/product/ProductContentModel";
import ProductPricingModel from "../../../models/product/ProductPricingModel";

export default class ProductTestDataProvider {
  public static product = {
    id: "id",
    internalName: "internalName",
    reference: null,
    locale: LocaleDataProvider.en,
    timeZone: TimeZoneDataProvider.europeLondon,
    allowFreesale: false,
    instantConfirmation: true,
    instantDelivery: true,
    availabilityRequired: true,
    availabilityType: AvailabilityType.START_TIME,
    deliveryFormats: [DeliveryFormat.PDF_URL, DeliveryFormat.QRCODE],
    deliveryMethods: [DeliveryMethod.TICKET, DeliveryMethod.VOUCHER],
    redemptionMethod: RedemptionMethod.DIGITAL,
    options: [
      {
        id: "id",
        default: true,
        internalName: "internalName",
        reference: null,
        availabilityLocalStartTimes: [],
        cancellationCutoff: "cancellationCutoff",
        cancellationCutoffAmount: 0,
        cancellationCutoffUnit: "cancellationCutoffUnit",
        requiredContactFields: [],
        restrictions: {
          minUnits: 0,
          maxUnits: null,
        },
        units: [],
      },
    ],
  };

  public static productContent = {
    title: "title",
    country: "country",
    location: "location",
    subtitle: "subtitle",
    shortDescription: "shortDescription",
    description: "description",
    highlights: [],
    inclusions: [],
    exclusions: [],
    bookingTerms: null,
    redemptionInstructions: null,
    cancellationPolicy: null,
    destination: {
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
    },
    categories: [],
    faqs: [],
    coverImageUrl: null,
    bannerImageUrl: null,
    videoUrl: null,
    galleryImages: [],
    bannerImages: [],
  };

  public static productPricing = {
    defaultCurrency: Currency.EUR,
    availableCurrencies: [Currency.EUR],
    pricingPer: PricingPer.UNIT,
  };

  public static productPOJO = {
    ...this.product,
    ...this.productContent,
    ...this.productPricing,
  };

  public static productModel = new ProductModel({
    id: this.productPOJO.id,
    internalName: this.productPOJO.internalName,
    reference: this.productPOJO.reference,
    locale: this.productPOJO.locale,
    timeZone: this.productPOJO.timeZone,
    allowFreesale: this.productPOJO.allowFreesale,
    instantConfirmation: this.productPOJO.instantConfirmation,
    instantDelivery: this.productPOJO.instantDelivery,
    availabilityRequired: this.productPOJO.availabilityRequired,
    availabilityType: this.productPOJO.availabilityType,
    deliveryFormats: this.productPOJO.deliveryFormats,
    deliveryMethods: this.productPOJO.deliveryMethods,
    redemptionMethod: this.productPOJO.redemptionMethod,
    optionModels: this.productPOJO.options.map(
      (option) =>
        new OptionModel({
          id: option.id,
          isDefault: option.default,
          internalName: option.internalName,
          reference: option.reference,
          availabilityLocalStartTimes: option.availabilityLocalStartTimes,
          cancellationCutoff: option.cancellationCutoff,
          cancellationCutoffAmount: option.cancellationCutoffAmount,
          cancellationCutoffUnit: option.cancellationCutoffUnit,
          requiredContactFields: option.requiredContactFields,
          restrictions: option.restrictions,
          unitModels: option.units.map((unit) => new UnitModel(unit)),
        })
    ),
    productContentModel: new ProductContentModel({
      title: this.productPOJO.title,
      country: this.productPOJO.country,
      location: this.productPOJO.location,
      subtitle: this.productPOJO.subtitle,
      shortDescription: this.productPOJO.shortDescription,
      description: this.productPOJO.description,
      highlights: this.productPOJO.highlights,
      inclusions: this.productPOJO.inclusions,
      exclusions: this.productPOJO.exclusions,
      bookingTerms: this.productPOJO.bookingTerms,
      redemptionInstructions: this.productPOJO.redemptionInstructions,
      cancellationPolicy: this.productPOJO.cancellationPolicy,
      destination: this.productPOJO.destination,
      categories: this.productPOJO.categories,
      faqs: this.productPOJO.faqs,
      coverImageUrl: this.productPOJO.coverImageUrl,
      bannerImageUrl: this.productPOJO.bannerImageUrl,
      videoUrl: this.productPOJO.videoUrl,
      galleryImages: this.productPOJO.galleryImages,
      bannerImages: this.productPOJO.bannerImages,
    }),
    productPricingModel: new ProductPricingModel({
      defaultCurrency: this.productPOJO.defaultCurrency,
      availableCurrencies: this.productPOJO.availableCurrencies,
      pricingPer: this.productPOJO.pricingPer,
    }),
  });
}
