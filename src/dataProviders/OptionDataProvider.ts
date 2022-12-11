import { DurationUnit } from "@octocloud/types";
import { PricingDataProvider } from "./PricingDataProvider";
import { UnitDataProvider } from "./UnitDataProvider";
import { OptionData } from "../data/OptionData";

export class OptionDataProvider {
  public static defaultOption: OptionData = {
    restrictions: {
      minUnits: 0,
      maxUnits: null,
    },
    unitsData: [UnitDataProvider.adultUnit],
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
