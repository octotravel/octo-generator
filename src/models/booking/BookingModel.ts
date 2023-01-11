import { OptionModel } from "../option/OptionModel";
import { ProductModel } from "../product/ProductModel";
import { BookingCartModel } from "./BookingCartModel";
import { BookingContentModel } from "./BookingContentModel";
import { BookingPickupsModel } from "./BookingPickupsModel";
import { BookingPricingModel } from "./BookingPricingModel";
import { BookingAvailability, BookingStatus, Cancellation, Contact, Ticket, DeliveryMethod } from "@octocloud/types";
import { UnitItemModel } from "../unitItem/UnitItemModel";

export class BookingModel {
  public readonly id: string;
  public readonly uuid: string;
  public readonly testMode: boolean;
  private _resellerReference: Nullable<string>;
  public readonly supplierReference: Nullable<string>;
  private _status: BookingStatus;
  public readonly utcCreatedAt: string;
  private _utcUpdatedAt: Nullable<string>;
  public readonly utcExpiresAt: Nullable<string>;
  public readonly utcRedeemedAt: Nullable<string>;
  private _utcConfirmedAt: Nullable<string>;
  private _productModel: ProductModel;
  private _optionModel: OptionModel;
  public readonly cancellable: boolean;
  public readonly cancellation: Nullable<Cancellation>;
  public readonly freesale: boolean;
  private _availability: BookingAvailability;
  private _contact: Contact;
  private _notes: Nullable<string>;
  public readonly deliveryMethods: DeliveryMethod[];
  private _voucher: Nullable<Ticket>;
  private _unitItemModels: UnitItemModel[];
  public readonly bookingCartModel?: BookingCartModel;
  public readonly bookingContentModel?: BookingContentModel;
  public readonly bookingPickupsModel?: BookingPickupsModel;
  public readonly bookingPricingModel?: BookingPricingModel;

  constructor({
    id,
    uuid,
    testMode,
    resellerReference,
    supplierReference,
    status,
    utcCreatedAt,
    utcUpdatedAt,
    utcExpiresAt,
    utcRedeemedAt,
    utcConfirmedAt,
    productModel,
    optionModel,
    cancellable,
    cancellation,
    freesale,
    availability,
    contact,
    notes,
    deliveryMethods,
    voucher,
    unitItemModels,
    bookingCartModel,
    bookingContentModel,
    bookingPickupsModel,
    bookingPricingModel
  }: {
    id: string;
    uuid: string;
    testMode: boolean;
    resellerReference: Nullable<string>;
    supplierReference: Nullable<string>;
    status: BookingStatus;
    utcCreatedAt: string;
    utcUpdatedAt: Nullable<string>;
    utcExpiresAt: Nullable<string>;
    utcRedeemedAt: Nullable<string>;
    utcConfirmedAt: Nullable<string>;
    productModel: ProductModel;
    optionModel: OptionModel;
    cancellable: boolean;
    cancellation: Nullable<Cancellation>;
    freesale: boolean;
    availability: BookingAvailability;
    contact: Contact;
    notes: Nullable<string>;
    deliveryMethods: DeliveryMethod[];
    voucher: Nullable<Ticket>;
    unitItemModels: UnitItemModel[];
    bookingCartModel?: BookingCartModel;
    bookingContentModel?: BookingContentModel;
    bookingPickupsModel?: BookingPickupsModel;
    bookingPricingModel?: BookingPricingModel;
  }) {
    this.id = id;
    this.uuid = uuid;
    this.testMode = testMode;
    this._resellerReference = resellerReference;
    this.supplierReference = supplierReference;
    this._status = status;
    this.utcCreatedAt = utcCreatedAt;
    this._utcUpdatedAt = utcUpdatedAt;
    this.utcExpiresAt = utcExpiresAt;
    this.utcRedeemedAt = utcRedeemedAt;
    this._utcConfirmedAt = utcConfirmedAt;
    this._productModel = productModel;
    this._optionModel = optionModel;
    this.cancellable = cancellable;
    this.cancellation = cancellation;
    this.freesale = freesale;
    this._availability = availability;
    this._contact = contact;
    this._notes = notes;
    this.deliveryMethods = deliveryMethods;
    this._voucher = voucher;
    this._unitItemModels = unitItemModels;
    this.bookingCartModel = bookingCartModel;
    this.bookingContentModel = bookingContentModel;
    this.bookingPickupsModel = bookingPickupsModel;
    this.bookingPricingModel = bookingPricingModel;
  }

  get resellerReference(): Nullable<string> {
    return this._resellerReference;
  }

  set resellerReference(resellerReference: Nullable<string>) {
    this._resellerReference = resellerReference;
  }

  get status(): BookingStatus {
    return this._status;
  }

  set status(status: BookingStatus) {
    this._status = status;
  }

  get utcUpdatedAt(): Nullable<string> {
    return this._utcUpdatedAt;
  }

  set utcUpdatedAt(utcUpdatedAt: Nullable<string>) {
    this._utcUpdatedAt = utcUpdatedAt;
  }

  get utcConfirmedAt(): Nullable<string> {
    return this._utcConfirmedAt;
  }

  set utcConfirmedAt(utcConfirmedAt: Nullable<string>) {
    this._utcConfirmedAt = utcConfirmedAt;
  }

  get productModel(): ProductModel {
    return this._productModel;
  }

  set productModel(productModel: ProductModel) {
    this._productModel = productModel;
  }

  get optionModel(): OptionModel {
    return this._optionModel;
  }

  set optionModel(optionModel: OptionModel) {
    this._optionModel = optionModel;
  }

  get availability(): BookingAvailability {
    return this._availability;
  }

  set availability(availability: BookingAvailability) {
    this._availability = availability;
  }

  get notes(): Nullable<string> {
    return this._notes;
  }

  set notes(notes: Nullable<string>) {
    this._notes = notes;
  }

  get contact(): Contact {
    return this._contact;
  }

  set contact(contact: Contact) {
    this._contact = contact;
  }

  get voucher(): Nullable<Ticket> {
    return this._voucher;
  }

  set voucher(voucher: Nullable<Ticket>) {
    this._voucher = voucher;
  }

  get unitItemModels(): UnitItemModel[] {
    return this._unitItemModels;
  }

  set unitItemModels(unitItemModels: UnitItemModel[]) {
    this._unitItemModels = unitItemModels;
  }
}
