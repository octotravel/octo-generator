import {
  AvailabilityType,
  Category,
  DeliveryFormat,
  DeliveryMethod,
  Destination,
  FAQ,
  Image,
  PricingPer,
  RedemptionMethod,
} from "@octocloud/types";
import { OptionData } from "./OptionData";

export interface ProductData {
  id: string;
  internalName: string;
  reference?: Nullable<string>;
  locale?: string;
  timeZone?: string;
  allowFreesale?: boolean;
  instantConfirmation?: boolean;
  instantDelivery?: boolean;
  availabilityRequired?: boolean;
  availabilityType?: AvailabilityType;
  deliveryFormats?: Array<DeliveryFormat>;
  deliveryMethods: Array<DeliveryMethod>;
  redemptionMethod?: RedemptionMethod;
  optionsData: Array<OptionData>;
  title?: string;
  country?: string;
  location?: Nullable<string>;
  subtitle?: Nullable<string>;
  shortDescription?: Nullable<string>;
  description?: Nullable<string>;
  highlights?: Array<string>;
  inclusions?: Array<string>;
  exclusions?: Array<string>;
  bookingTerms?: Nullable<string>;
  redemptionInstructions?: Nullable<string>;
  cancellationPolicy?: Nullable<string>;
  destination?: Destination;
  categories?: Array<Category>;
  faqs?: Array<FAQ>;
  coverImageUrl?: Nullable<string>;
  bannerImageUrl?: Nullable<string>;
  videoUrl?: Nullable<string>;
  galleryImages?: Array<Image>;
  bannerImages?: Array<Image>;
  defaultCurrency?: string;
  availableCurrencies?: Array<string>;
  pricingPer?: PricingPer;
}
