import { Restrictions, UnitType } from "@octocloud/types";
import { UndefinedModelError } from "../../errors/UndefinedModelError";
import { UnitContentModel } from "./UnitContentModel";
import { UnitPricingModel } from "./UnitPricingModel";

export class UnitModel {
  public readonly id: string;

  public readonly internalName: string;

  public readonly reference: string;

  public readonly type: UnitType;

  public readonly restrictions: Restrictions;

  public readonly requiredContactFields: string[];

  public readonly unitContentModel?: UnitContentModel;

  public readonly unitPricingModel?: UnitPricingModel;

  constructor({
    id,
    internalName,
    reference,
    type,
    restrictions,
    requiredContactFields,
    unitContentModel,
    unitPricingModel,
  }: {
    id: string;
    internalName: string;
    reference: string;
    type: UnitType;
    restrictions: Restrictions;
    requiredContactFields: string[];
    unitContentModel?: UnitContentModel;
    unitPricingModel?: UnitPricingModel;
  }) {
    this.id = id;
    this.internalName = internalName;
    this.reference = reference;
    this.type = type;
    this.restrictions = restrictions;
    this.requiredContactFields = requiredContactFields;
    this.unitContentModel = unitContentModel;
    this.unitPricingModel = unitPricingModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getOptionContentModel(): UnitContentModel {
    if (this.unitContentModel === undefined) {
      throw UndefinedModelError.create("UnitContentModel", "UnitModel", this.id);
    }

    return this.unitContentModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getUnitPricingModel(): UnitPricingModel {
    if (this.unitPricingModel === undefined) {
      throw UndefinedModelError.create("UnitPricingModel", "UnitModel", this.id);
    }

    return this.unitPricingModel;
  }

  public isOnBooking(): boolean {
    return this.unitPricingModel?.pricing === undefined;
  }
}
