import {
  ContactField,
  DurationUnit,
  Itinerary,
  PickupPoint,
  Pricing,
  UnitRestrictions,
} from "@octocloud/types";
import { UnitData } from "./UnitData";

export interface OptionData {
  id?: string;
  isDefault?: boolean;
  internalName?: string;
  reference?: Nullable<string>;
  availabilityLocalStartTimes?: Array<string>;
  cancellationCutoff?: string;
  cancellationCutoffAmount?: number;
  cancellationCutoffUnit?: string;
  requiredContactFields?: Array<ContactField>;
  restrictions: UnitRestrictions;
  unitsData: Array<UnitData>;
  title?: string;
  subtitle?: Nullable<string>;
  language?: string;
  shortDescription?: Nullable<string>;
  duration?: string;
  durationAmount?: string;
  durationUnit?: DurationUnit;
  itinerary?: Nullable<Itinerary[]>;
  pickupRequired?: boolean;
  pickupAvailable?: boolean;
  pickupPoints?: Array<PickupPoint>;
  pricing?: Array<Pricing>;
}
