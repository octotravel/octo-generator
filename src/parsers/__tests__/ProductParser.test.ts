import {
  AvailabilityType,
  Currency,
  DeliveryFormat,
  DeliveryMethod,
  PricingPer,
  RedemptionMethod,
} from "@octocloud/types";
import { ProductParser } from "../ProductParser";
import { LocaleDataProvider } from "../../dataProviders/LocaleDataProvider";
import { TimeZoneDataProvider } from "../../dataProviders/TimeZoneDataProvider";
import { ProductModel } from "../../models/Product/ProductModel";
import { OptionModel } from "../../models/Option/OptionModel";
import { UnitModel } from "../../models/Unit/UnitModel";
import { ProductContentModel } from "../../models/Product/ProductContentModel";
import { ProductPricingModel } from "../../models/Product/ProductPricingModel";

describe("ProductParser", () => {
  const productParser = new ProductParser();

  const product = {
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
    defaultCurrency: Currency.EUR,
    availableCurrencies: [Currency.EUR],
    pricingPer: PricingPer.UNIT,
  };

  const productModel = new ProductModel({
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
    optionModels: product.options.map(
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
    }),
    productPricingModel: new ProductPricingModel({
      defaultCurrency: product.defaultCurrency,
      availableCurrencies: product.availableCurrencies,
      pricingPer: product.pricingPer,
    }),
  });

  describe("parseModelToPOJO", () => {
    it.concurrent("should return product POJO", async () => {
      expect(productParser.parseModelToPOJO(productModel)).toStrictEqual(product);
    });
  });

  describe("parsePOJOToModel", () => {
    it.concurrent("should return option model", async () => {
      expect(productParser.parsePOJOToModel(product)).toStrictEqual(productModel);
    });
  });
});
