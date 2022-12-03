import { Restrictions, UnitType } from "@octocloud/types";
import { UnitContentModel } from "./UnitContentModel";
import { UnitPricingModel } from "./UnitPricingModel";

export class UnitModel {
  private readonly _id: string;
  private readonly _internalName: string;
  private readonly _reference: string;
  private readonly _type: UnitType;
  private readonly _restrictions: Restrictions;
  private readonly _requiredContactFields: string[];
  private readonly _unitContentModel?: UnitContentModel;
  private readonly _unitPricingModel?: UnitPricingModel;

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
    this._id = id;
    this._internalName = internalName;
    this._reference = reference;
    this._type = type;
    this._restrictions = restrictions;
    this._requiredContactFields = requiredContactFields;
    this._unitContentModel = unitContentModel;
    this._unitPricingModel = unitPricingModel;
  }

  public get id() {
    return this._id;
  }

  public get internalName() {
    return this._internalName;
  }

  public get reference() {
    return this._reference;
  }

  public get type() {
    return this._type;
  }

  public get restrictions() {
    return this._restrictions;
  }

  public get requiredContactFields() {
    return this._requiredContactFields;
  }

  public get unitContentModel() {
    return this._unitContentModel;
  }

  public get unitPricingModel() {
    return this._unitPricingModel;
  }

  public isOnBooking(): boolean {
    return this.unitPricingModel?.pricingFrom == undefined;
  }
}
