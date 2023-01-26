import { ContactField, UnitRestrictions } from "@octocloud/types";
import OptionContentModel from "./OptionContentModel";
import OptionPickupsModel from "./OptionPickupsModel";
import OptionPricingModel from "./OptionPricingModel";
import UnitModel from "../unit/UnitModel";
import UndefinedModelError from "../../errors/UndefinedModelError";

export default class OptionModel {
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

  public readonly optionPickupsModel?: OptionPickupsModel;

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
    optionPickupsModel,
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
    optionPickupsModel?: OptionPickupsModel;
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
    this.optionPickupsModel = optionPickupsModel;
    this.optionPricingModel = optionPricingModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getOptionContentModel(): OptionContentModel {
    if (this.optionContentModel === undefined) {
      throw UndefinedModelError.create("OptionContentModel", "OptionModel", this.id);
    }

    return this.optionContentModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getOptionPickupsModel(): OptionPickupsModel {
    if (this.optionPickupsModel === undefined) {
      throw UndefinedModelError.create("OptionPickupsModel", "OptionModel", this.id);
    }

    return this.optionPickupsModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getOptionPricingModel(): OptionPricingModel {
    if (this.optionPricingModel === undefined) {
      throw UndefinedModelError.create("OptionPricingModel", "OptionModel", this.id);
    }

    return this.optionPricingModel;
  }

  public findUnitModelByUnitId(unitId: string): Nullable<UnitModel> {
    return this.unitModels.find((unitModel) => unitModel.id === unitId) ?? null;
  }
}
