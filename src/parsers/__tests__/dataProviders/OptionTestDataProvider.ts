import {
  DurationUnit,
  UnitType,
  Option,
  OptionContent,
  OptionPickup,
  OptionPricing,
  OptionGoogle,
} from "@octocloud/types";
import { UnitDataProvider } from "../../../dataProviders/UnitDataProvider";
import { PricingDataProvider } from "../../../dataProviders/PricingDataProvider";
import { OptionModel } from "../../../models/option/OptionModel";
import { UnitModel } from "../../../models/unit/UnitModel";
import { OptionContentModel } from "../../../models/option/OptionContentModel";
import { OptionPickupsModel } from "../../../models/option/OptionPickupsModel";
import { OptionPricingModel } from "../../../models/option/OptionPricingModel";
import { OptionGoogleModel } from "../../../models/option/OptionGoogleModel";

export class OptionTestDataProvider {
  public static option: Option = {
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
    units: [
      {
        id: "id",
        internalName: "internalName",
        reference: "reference",
        type: UnitType.CHILD,
        restrictions: UnitDataProvider.commonRestrictions,
        requiredContactFields: [],
      },
    ],
  };

  public static optionContent: Required<OptionContent> = {
    title: "title",
    subtitle: "subtitle",
    language: "language",
    shortDescription: "shortDescription",
    duration: "duration",
    durationAmount: "durationAmount",
    durationUnit: DurationUnit.HOUR,
    itinerary: null,
  };

  public static optionGoogle: Required<OptionGoogle> = {
    googleOptions: {
      landing_page: {
        url: "",
      },
      option_categories: [],
      related_locations: [],
    },
  };

  public static optionPickups: Required<OptionPickup> = {
    pickupRequired: false,
    pickupAvailable: false,
    pickupPoints: [],
  };

  public static optionPricing: OptionPricing = {
    pricing: [PricingDataProvider.adultPricing],
    pricingFrom: undefined,
  };

  public static optionPOJO: Option = {
    ...this.option,
    ...this.optionContent,
    ...this.optionGoogle,
    ...this.optionPickups,
    ...this.optionPricing,
  };

  public static optionModel = new OptionModel({
    id: this.optionPOJO.id,
    isDefault: this.optionPOJO.default,
    internalName: this.optionPOJO.internalName,
    reference: this.optionPOJO.reference,
    availabilityLocalStartTimes: this.optionPOJO.availabilityLocalStartTimes,
    cancellationCutoff: this.optionPOJO.cancellationCutoff,
    cancellationCutoffAmount: this.optionPOJO.cancellationCutoffAmount,
    cancellationCutoffUnit: this.optionPOJO.cancellationCutoffUnit,
    requiredContactFields: this.optionPOJO.requiredContactFields,
    restrictions: this.optionPOJO.restrictions,
    unitModels: this.optionPOJO.units.map((unit) => new UnitModel(unit)),
    optionContentModel: new OptionContentModel({
      title: this.optionContent.title,
      subtitle: this.optionContent.subtitle,
      language: this.optionContent.language,
      shortDescription: this.optionContent.shortDescription,
      duration: this.optionContent.duration,
      durationAmount: this.optionContent.durationAmount,
      durationUnit: this.optionContent.durationUnit,
      itinerary: this.optionContent.itinerary,
    }),
    optionGoogleModel: new OptionGoogleModel({
      googleOptions: this.optionGoogle.googleOptions,
    }),
    optionPickupsModel: new OptionPickupsModel({
      pickupRequired: this.optionPickups.pickupRequired,
      pickupAvailable: this.optionPickups.pickupAvailable,
      pickupPoints: this.optionPickups.pickupPoints,
    }),
    optionPricingModel: new OptionPricingModel({
      pricing: this.optionPricing.pricing,
      pricingFrom: this.optionPricing.pricingFrom,
    }),
  });
}
