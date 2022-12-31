import { DurationUnit, UnitType } from "@octocloud/types";
import { UnitDataProvider } from "../../../dataProviders/UnitDataProvider";
import { PricingDataProvider } from "../../../dataProviders/PricingDataProvider";
import { OptionModel } from "../../../models/option/OptionModel";
import { UnitModel } from "../../../models/unit/UnitModel";
import { OptionContentModel } from "../../../models/option/OptionContentModel";
import { OptionPickupModel } from "../../../models/option/OptionPickupModel";
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
    title: "title",
    subtitle: "subtitle",
    language: "language",
    shortDescription: "shortDescription",
    duration: "duration",
    durationAmount: "durationAmount",
    durationUnit: DurationUnit.HOUR,
    itinerary: null,
    pickupRequired: false,
    pickupAvailable: false,
    pickupPoints: [],
    pricing: [PricingDataProvider.adultPricing],
    pricingFrom: undefined,
  };

  public static optionModel = new OptionModel({
    id: this.option.id,
    isDefault: this.option.default,
    internalName: this.option.internalName,
    reference: this.option.reference,
    availabilityLocalStartTimes: this.option.availabilityLocalStartTimes,
    cancellationCutoff: this.option.cancellationCutoff,
    cancellationCutoffAmount: this.option.cancellationCutoffAmount,
    cancellationCutoffUnit: this.option.cancellationCutoffUnit,
    requiredContactFields: this.option.requiredContactFields,
    restrictions: this.option.restrictions,
    unitModels: this.option.units.map((unit) => new UnitModel(unit)),
    optionContentModel: new OptionContentModel({
      title: this.option.title,
      subtitle: this.option.subtitle,
      language: this.option.language,
      shortDescription: this.option.shortDescription,
      duration: this.option.duration,
      durationAmount: this.option.durationAmount,
      durationUnit: this.option.durationUnit,
      itinerary: this.option.itinerary,
    }),
    optionPickupModel: new OptionPickupModel({
      pickupRequired: this.option.pickupRequired,
      pickupAvailable: this.option.pickupAvailable,
      pickupPoints: this.option.pickupPoints,
    }),
    optionPricingModel: new OptionPricingModel({
      pricing: this.option.pricing,
      pricingFrom: this.option.pricingFrom,
    }),
  });
}
