import { BookingStatus, Contact, Ticket } from '@octocloud/types';
import { UnitModel } from '../unit/UnitModel';
import { UnitItemPricingModel } from './UnitItemPricingModel';
import { UndefinedModelError } from '../../errors/UndefinedModelError';

export class UnitItemModel {
  public readonly uuid: string;

  public readonly id: string;

  public readonly resellerReference: Nullable<string>;

  public readonly supplierReference: Nullable<string>;

  public readonly unitModel: UnitModel;

  public readonly status: BookingStatus;

  public readonly utcRedeemedAt: Nullable<string>;

  public readonly contact: Contact;

  public readonly ticket: Nullable<Ticket>;

  protected _unitItemPricingModel?: UnitItemPricingModel;

  public constructor({
    uuid,
    id,
    resellerReference,
    supplierReference,
    unitModel,
    status,
    utcRedeemedAt,
    contact,
    ticket,
    unitItemPricingModel,
  }: {
    uuid: string;
    id: string;
    resellerReference: Nullable<string>;
    supplierReference: Nullable<string>;
    unitModel: UnitModel;
    status: BookingStatus;
    utcRedeemedAt: Nullable<string>;
    contact: Contact;
    ticket: Nullable<Ticket>;
    unitItemPricingModel?: UnitItemPricingModel;
  }) {
    this.uuid = uuid;
    this.id = id;
    this.resellerReference = resellerReference;
    this.supplierReference = supplierReference;
    this.unitModel = unitModel;
    this.status = status;
    this.utcRedeemedAt = utcRedeemedAt;
    this.contact = contact;
    this.ticket = ticket;
    this._unitItemPricingModel = unitItemPricingModel;
  }

  public get unitItemPricingModel(): UnitItemPricingModel | undefined {
    return this._unitItemPricingModel;
  }

  public set unitItemPricingModel(unitItemPricingModel: UnitItemPricingModel | undefined) {
    this._unitItemPricingModel = unitItemPricingModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getUnitItemPricingModel(): UnitItemPricingModel {
    if (this.unitItemPricingModel === undefined) {
      throw UndefinedModelError.create('UnitItemPricingModel', 'UnitItemModel', this.uuid);
    }

    return this.unitItemPricingModel;
  }
}
