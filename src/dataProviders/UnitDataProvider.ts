import { Restrictions } from "@octocloud/types";

export class UnitDataProvider {
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
