import { Restrictions, Unit, UnitType } from "@octocloud/types";
import PricingDataProvider from "./PricingDataProvider";
import { PartialUnit } from "../types/PartialUnit";

export default class UnitDataProvider {
  public static commonRestrictions: Restrictions = {
    minAge: 18,
    maxAge: 100,
    idRequired: false,
    minQuantity: null,
    maxQuantity: null,
    paxCount: 1,
    accompaniedBy: [],
  };

  public static adultUnit: Unit = {
    id: "unit_c1709f42-297e-4f7e-bd6b-3e77d4622d8a",
    internalName: "Adult",
    reference: "reference",
    type: UnitType.ADULT,
    requiredContactFields: [],
    restrictions: UnitDataProvider.commonRestrictions,
    title: "Adult",
    titlePlural: "Adults",
    subtitle: "Aged 16 - 59",
    pricingFrom: [PricingDataProvider.adultPricing],
  };

  public static childUnit: PartialUnit = {
    id: "child",
    type: UnitType.CHILD,
    pricing: [PricingDataProvider.childPricing],
  };
}
