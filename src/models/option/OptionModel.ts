import { ContactField, UnitRestrictions } from "@octocloud/types/src/types/Option";
import { OptionContentModel } from "./OptionContentModel";
import { OptionPickupModel } from "./OptionPickupModel";
import { OptionPricingModel } from "./OptionPricingModel";
import { UnitModel } from "../unit/UnitModel";

export class OptionModel {
  public readonly id: string;
  public readonly isDefault: boolean;
  public readonly internalName: string;
  public readonly reference: Nullable<string>;
  public readonly availabilityLocalStartTimes: Array<string>;
  public readonly cancellationCutoff: string;
  public readonly cancellationCutoffAmount: number;
  public readonly cancellationCutoffUnit: string;
  public readonly requiredContactFields: Array<ContactField>;
  public readonly restrictions: UnitRestrictions;
  public readonly unitModels: Array<UnitModel>;
  public readonly optionContentModel?: OptionContentModel;
  public readonly optionPickupModel?: OptionPickupModel;
  public readonly optionPricingModel?: OptionPricingModel;

  constructor({
    id,
    isDefault,
    internalName,
    reference,
    availabilityLocalStartTimes,
    cancellationCutoff,
    cancellationCutoffAmount,
    cancellationCutoffUnit,
    requiredContactFields,
    restrictions,
    unitModels,
    optionContentModel,
    optionPickupModel,
    optionPricingModel,
  }: {
    id: string;
    isDefault: boolean;
    internalName: string;
    reference: Nullable<string>;
    availabilityLocalStartTimes: Array<string>;
    cancellationCutoff: string;
    cancellationCutoffAmount: number;
    cancellationCutoffUnit: string;
    requiredContactFields: Array<ContactField>;
    restrictions: UnitRestrictions;
    unitModels: Array<UnitModel>;
    optionContentModel?: OptionContentModel;
    optionPickupModel?: OptionPickupModel;
    optionPricingModel?: OptionPricingModel;
  }) {
    this.id = id;
    this.isDefault = isDefault;
    this.internalName = internalName;
    this.reference = reference;
    this.availabilityLocalStartTimes = availabilityLocalStartTimes;
    this.cancellationCutoff = cancellationCutoff;
    this.cancellationCutoffAmount = cancellationCutoffAmount;
    this.cancellationCutoffUnit = cancellationCutoffUnit;
    this.requiredContactFields = requiredContactFields;
    this.restrictions = restrictions;
    this.unitModels = unitModels;
    this.optionContentModel = optionContentModel;
    this.optionPickupModel = optionPickupModel;
    this.optionPricingModel = optionPricingModel;
  }

  public findUnitModelByUnitId(unitId: string): Nullable<UnitModel> {
    return this.unitModels.find((unitModel) => unitModel.id === unitId) ?? null;
  }
}
