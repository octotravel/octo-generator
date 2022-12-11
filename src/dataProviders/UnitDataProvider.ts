import { UnitData } from "../data/UnitData";
import { UnitType } from "@octocloud/types/src/types/Unit";
import { PricingDataProvider } from "./PricingDataProvider";
import { Restrictions } from "@octocloud/types";

export class UnitDataProvider {
  public static adultUnit: UnitData = {
    id: "adult",
    type: UnitType.ADULT,
    pricing: [PricingDataProvider.adultPricing],
  };

  public static childUnit: UnitData = {
    id: "child",
    type: UnitType.CHILD,
    pricing: [PricingDataProvider.childPricing],
  };

  public static commonRestrictions: Restrictions = {
    minAge: 18,
    maxAge: 100,
    idRequired: false,
    minQuantity: null,
    maxQuantity: null,
    paxCount: 1,
    accompaniedBy: [],
  };
}
