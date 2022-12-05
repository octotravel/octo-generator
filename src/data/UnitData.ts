import { Pricing, Restrictions, UnitType } from "@octocloud/types";

export interface UnitData {
  id: string;
  internalName?: string;
  reference?: string;
  type: UnitType;
  restrictions?: Restrictions;
  requiredContactFields?: string[];
  title?: string;
  titlePlural?: string;
  subtitle?: Nullable<string>;
  pricing?: Array<Pricing>;
}
