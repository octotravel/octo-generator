import { ContactField, Restrictions, UnitType } from '@octocloud/types';
import { UndefinedModelError } from '../../errors/UndefinedModelError';
import { UnitContentModel } from './UnitContentModel';
import { UnitPricingModel } from './UnitPricingModel';

export class UnitModel {
  public readonly id: string;

  public readonly internalName: string;

  public readonly reference: string;

  public readonly type: UnitType;

  public readonly restrictions: Restrictions;

  public readonly requiredContactFields: ContactField[];

  public readonly visibleContactFields: ContactField[];

  public readonly unitContentModel?: UnitContentModel;

  protected _unitPricingModel?: UnitPricingModel;

  public constructor({
    id,
    internalName,
    reference,
    type,
    restrictions,
    requiredContactFields,
    visibleContactFields,
    unitContentModel,
    unitPricingModel,
  }: {
    id: string;
    internalName: string;
    reference: string;
    type: UnitType;
    restrictions: Restrictions;
    requiredContactFields: ContactField[];
    visibleContactFields: ContactField[];
    unitContentModel?: UnitContentModel;
    unitPricingModel?: UnitPricingModel;
  }) {
    this.id = id;
    this.internalName = internalName;
    this.reference = reference;
    this.type = type;
    this.restrictions = restrictions;
    this.requiredContactFields = requiredContactFields;
    this.visibleContactFields = visibleContactFields;
    this.unitContentModel = unitContentModel;
    this.unitPricingModel = unitPricingModel;
  }

  public get unitPricingModel(): UnitPricingModel | undefined {
    return this._unitPricingModel;
  }

  public set unitPricingModel(unitPricingModel: UnitPricingModel | undefined) {
    this._unitPricingModel = unitPricingModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getOptionContentModel(): UnitContentModel {
    if (this.unitContentModel === undefined) {
      throw UndefinedModelError.create('UnitContentModel', 'UnitModel', this.id);
    }

    return this.unitContentModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getUnitPricingModel(): UnitPricingModel {
    if (this.unitPricingModel === undefined) {
      throw UndefinedModelError.create('UnitPricingModel', 'UnitModel', this.id);
    }

    return this.unitPricingModel;
  }

  public isOnBooking(): boolean {
    return this.unitPricingModel?.pricing === undefined;
  }
}
