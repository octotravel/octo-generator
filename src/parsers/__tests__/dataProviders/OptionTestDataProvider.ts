import { DurationUnit, UnitType } from "@octocloud/types";
import { UnitDataProvider } from "../../../dataProviders/UnitDataProvider";
import { PricingDataProvider } from "../../../dataProviders/PricingDataProvider";
import { OptionModel } from "../../../models/option/OptionModel";
import { UnitModel } from "../../../models/unit/UnitModel";
import { OptionContentModel } from "../../../models/option/OptionContentModel";
import { OptionPickupsModel } from "../../../models/option/./OptionPickupsModel";
import { OptionPricingModel } from "../../../models/option/OptionPricingModel";

export class OptionTestDataProvider {
  public static option = {
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
  public static optionContent = {
    title: "title",
    subtitle: "subtitle",
    language: "language",
    shortDescription: "shortDescription",
    duration: "duration",
    durationAmount: "durationAmount",
    durationUnit: DurationUnit.HOUR,
    itinerary: null,
  };
  public static optionPickups = {
    pickupRequired: false,
    pickupAvailable: false,
    pickupPoints: [],
  };
  public static optionPricing = {
    pricing: [PricingDataProvider.adultPricing],
    pricingFrom: undefined,
  };
  public static optionPOJO = {
    ...this.option,
    ...this.optionContent,
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
      title: this.optionPOJO.title,
      subtitle: this.optionPOJO.subtitle,
      language: this.optionPOJO.language,
      shortDescription: this.optionPOJO.shortDescription,
      duration: this.optionPOJO.duration,
      durationAmount: this.optionPOJO.durationAmount,
      durationUnit: this.optionPOJO.durationUnit,
      itinerary: this.optionPOJO.itinerary,
    }),
    optionPickupsModel: new OptionPickupsModel({
      pickupRequired: this.optionPOJO.pickupRequired,
      pickupAvailable: this.optionPOJO.pickupAvailable,
      pickupPoints: this.optionPOJO.pickupPoints,
    }),
    optionPricingModel: new OptionPricingModel({
      pricing: this.optionPOJO.pricing,
      pricingFrom: this.optionPOJO.pricingFrom,
    }),
  });
}
