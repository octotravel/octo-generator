import { BookingAvailability, BookingStatus, Cancellation, Contact, Ticket, DeliveryMethod } from "@octocloud/types";
import { OptionModel } from "../option/OptionModel";
import { ProductModel } from "../product/ProductModel";
import { BookingCartModel } from "./BookingCartModel";
import { BookingContentModel } from "./BookingContentModel";
import { BookingPickupsModel } from "./BookingPickupsModel";
import { BookingPricingModel } from "./BookingPricingModel";
import { UnitItemModel } from "../unitItem/UnitItemModel";
import { UndefinedModelError } from "../../errors/UndefinedModelError";
import { BookingOffersModel } from "./BookingOffersModel";
import { BookingQuestionsModel } from "./BookingQuestionsModel";

export class BookingModel {
  public readonly id: string;

  public readonly uuid: string;

  public readonly testMode: boolean;

  protected _resellerReference: Nullable<string>;

  public readonly supplierReference: Nullable<string>;

  protected _status: BookingStatus;

  public readonly utcCreatedAt: string;

  protected _utcUpdatedAt: Nullable<string>;

  protected _utcExpiresAt: Nullable<string>;

  protected _utcRedeemedAt: Nullable<string>;

  protected _utcConfirmedAt: Nullable<string>;

  protected _productModel: ProductModel;

  protected _optionModel: OptionModel;

  protected _cancellable: boolean;

  protected _cancellation: Nullable<Cancellation>;

  public readonly freesale: boolean;

  protected _availability: BookingAvailability;

  protected _contact: Contact;

  protected _notes: Nullable<string>;

  public readonly deliveryMethods: DeliveryMethod[];

  protected _voucher: Nullable<Ticket>;

  protected _unitItemModels: UnitItemModel[];

  protected _bookingCartModel?: BookingCartModel;

  public readonly bookingContentModel?: BookingContentModel;

  public readonly bookingOffersModel?: BookingOffersModel;

  public readonly bookingPickupsModel?: BookingPickupsModel;

  public readonly bookingPricingModel?: BookingPricingModel;

  public readonly bookingQuestionsModel?: BookingQuestionsModel;

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
    bookingOffersModel,
    bookingPickupsModel,
    bookingPricingModel,
    bookingQuestionsModel,
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
    bookingOffersModel?: BookingOffersModel;
    bookingPickupsModel?: BookingPickupsModel;
    bookingPricingModel?: BookingPricingModel;
    bookingQuestionsModel?: BookingQuestionsModel;
  }) {
    this.id = id;
    this.uuid = uuid;
    this.testMode = testMode;
    this._resellerReference = resellerReference;
    this.supplierReference = supplierReference;
    this._status = status;
    this.utcCreatedAt = utcCreatedAt;
    this._utcUpdatedAt = utcUpdatedAt;
    this._utcExpiresAt = utcExpiresAt;
    this._utcRedeemedAt = utcRedeemedAt;
    this._utcConfirmedAt = utcConfirmedAt;
    this._productModel = productModel;
    this._optionModel = optionModel;
    this._cancellable = cancellable;
    this._cancellation = cancellation;
    this.freesale = freesale;
    this._availability = availability;
    this._contact = contact;
    this._notes = notes;
    this.deliveryMethods = deliveryMethods;
    this._voucher = voucher;
    this._unitItemModels = unitItemModels;
    this._bookingCartModel = bookingCartModel;
    this.bookingContentModel = bookingContentModel;
    this.bookingOffersModel = bookingOffersModel;
    this.bookingPickupsModel = bookingPickupsModel;
    this.bookingPricingModel = bookingPricingModel;
    this.bookingQuestionsModel = bookingQuestionsModel;
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

  get utcExpiresAt(): Nullable<string> {
    return this._utcExpiresAt;
  }

  set utcExpiresAt(utcExpiresAt: Nullable<string>) {
    this._utcExpiresAt = utcExpiresAt;
  }

  get utcRedeemedAt(): Nullable<string> {
    return this._utcRedeemedAt;
  }

  set utcRedeemedAt(utcRedeemedAt: Nullable<string>) {
    this._utcRedeemedAt = utcRedeemedAt;
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

  get cancellable(): boolean {
    return this._cancellable;
  }

  set cancellable(cancellable: boolean) {
    this._cancellable = cancellable;
  }

  get cancellation(): Nullable<Cancellation> {
    return this._cancellation;
  }

  set cancellation(cancellation: Nullable<Cancellation>) {
    this._cancellation = cancellation;
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

  get bookingCartModel(): BookingCartModel | undefined {
    return this._bookingCartModel;
  }

  set bookingCartModel(bookingCartModel: BookingCartModel | undefined) {
    this._bookingCartModel = bookingCartModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingCartModel(): BookingCartModel {
    if (this.bookingCartModel === undefined) {
      throw UndefinedModelError.create("BookingCartModel", "BookingModel", this.id);
    }

    return this.bookingCartModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingContentModel(): BookingContentModel {
    if (this.bookingContentModel === undefined) {
      throw UndefinedModelError.create("BookingContentModel", "BookingModel", this.id);
    }

    return this.bookingContentModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingOffersModel(): BookingOffersModel {
    if (this.bookingOffersModel === undefined) {
      throw UndefinedModelError.create("BookingOffersModel", "BookingModel", this.id);
    }

    return this.bookingOffersModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingPickupsModel(): BookingPickupsModel {
    if (this.bookingPickupsModel === undefined) {
      throw UndefinedModelError.create("BookingPickupsModel", "BookingModel", this.id);
    }

    return this.bookingPickupsModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingPricingModel(): BookingPricingModel {
    if (this.bookingPricingModel === undefined) {
      throw UndefinedModelError.create("BookingPricingModel", "BookingModel", this.id);
    }

    return this.bookingPricingModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingQuestionsModel(): BookingQuestionsModel {
    if (this.bookingQuestionsModel === undefined) {
      throw UndefinedModelError.create("BookingPricingModel", "BookingModel", this.id);
    }

    return this.bookingQuestionsModel;
  }
}
