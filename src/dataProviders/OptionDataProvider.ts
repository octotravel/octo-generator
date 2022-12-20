import { DurationUnit, Option } from "@octocloud/types";
import { PricingDataProvider } from "./PricingDataProvider";
//import { UnitDataProvider } from "./UnitDataProvider";

export class OptionDataProvider {
  public static defaultOption: Option = {
    id: "DEFAULT",
    default: true,
    internalName: "DEFAULT",
    reference: null,
    availabilityLocalStartTimes: ["00:00"],
    cancellationCutoff: "1 hour",
    cancellationCutoffAmount: 1,
    cancellationCutoffUnit: "hour",
    requiredContactFields: [],
    restrictions: {
      minUnits: 0,
      maxUnits: 9,
    },
    units: [], //[UnitDataProvider.adultUnit],
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
  };
}
