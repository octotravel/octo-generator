import { BookingStatus, Contact, Ticket } from "@octocloud/types";
import UnitModel from "../unit/UnitModel";
import UnitItemPricingModel from "./UnitItemPricingModel";
import UndefinedModelError from "../../errors/UndefinedModelError";

export default class UnitItemModel {
  public readonly uuid: string;

  public readonly resellerReference: Nullable<string>;

  public readonly supplierReference: Nullable<string>;

  public readonly unitModel: UnitModel;

  public readonly status: BookingStatus;

  public readonly utcRedeemedAt: Nullable<string>;

  public readonly contact: Contact;

  public readonly ticket: Nullable<Ticket>;

  public readonly unitItemPricingModel?: UnitItemPricingModel;

  constructor({
    uuid,
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
    this.resellerReference = resellerReference;
    this.supplierReference = supplierReference;
    this.unitModel = unitModel;
    this.status = status;
    this.utcRedeemedAt = utcRedeemedAt;
    this.contact = contact;
    this.ticket = ticket;
    this.unitItemPricingModel = unitItemPricingModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getUnitItemPricingModel(): UnitItemPricingModel {
    if (this.unitItemPricingModel === undefined) {
      throw UndefinedModelError.create("UnitItemPricingModel", "UnitItemModel", this.uuid);
    }

    return this.unitItemPricingModel;
  }
}
