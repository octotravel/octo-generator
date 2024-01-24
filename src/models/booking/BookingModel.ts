import { BookingStatus, Cancellation, Contact, Ticket, DeliveryMethod, Availability } from '@octocloud/types';
import { OptionModel } from '../option/OptionModel';
import { ProductModel } from '../product/ProductModel';
import { BookingCartModel } from './BookingCartModel';
import { BookingContentModel } from './BookingContentModel';
import { BookingPickupsModel } from './BookingPickupsModel';
import { BookingPricingModel } from './BookingPricingModel';
import { UnitItemModel } from '../unitItem/UnitItemModel';
import { UndefinedModelError } from '../../errors/UndefinedModelError';
import { BookingOffersModel } from './BookingOffersModel';
import { BookingQuestionsModel } from './BookingQuestionsModel';

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

  protected _availability: Nullable<Availability>;

  protected _contact: Contact;

  protected _notes: Nullable<string>;

  public readonly deliveryMethods: DeliveryMethod[];

  protected _voucher: Nullable<Ticket>;

  protected _unitItemModels: UnitItemModel[];

  protected _bookingCartModel?: BookingCartModel;

  public readonly bookingContentModel?: BookingContentModel;

  protected _bookingOffersModel?: BookingOffersModel;

  public readonly bookingPickupsModel?: BookingPickupsModel;

  protected _bookingPricingModel?: BookingPricingModel;

  public readonly bookingQuestionsModel?: BookingQuestionsModel;

  public constructor({
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
    availability: Nullable<Availability>;
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
    this._bookingOffersModel = bookingOffersModel;
    this.bookingPickupsModel = bookingPickupsModel;
    this._bookingPricingModel = bookingPricingModel;
    this.bookingQuestionsModel = bookingQuestionsModel;
  }

  public get resellerReference(): Nullable<string> {
    return this._resellerReference;
  }

  public set resellerReference(resellerReference: Nullable<string>) {
    this._resellerReference = resellerReference;
  }

  public get status(): BookingStatus {
    return this._status;
  }

  public set status(status: BookingStatus) {
    this._status = status;
  }

  public get utcUpdatedAt(): Nullable<string> {
    return this._utcUpdatedAt;
  }

  public set utcUpdatedAt(utcUpdatedAt: Nullable<string>) {
    this._utcUpdatedAt = utcUpdatedAt;
  }

  public get utcExpiresAt(): Nullable<string> {
    return this._utcExpiresAt;
  }

  public set utcExpiresAt(utcExpiresAt: Nullable<string>) {
    this._utcExpiresAt = utcExpiresAt;
  }

  public get utcRedeemedAt(): Nullable<string> {
    return this._utcRedeemedAt;
  }

  public set utcRedeemedAt(utcRedeemedAt: Nullable<string>) {
    this._utcRedeemedAt = utcRedeemedAt;
  }

  public get utcConfirmedAt(): Nullable<string> {
    return this._utcConfirmedAt;
  }

  public set utcConfirmedAt(utcConfirmedAt: Nullable<string>) {
    this._utcConfirmedAt = utcConfirmedAt;
  }

  public get productModel(): ProductModel {
    return this._productModel;
  }

  public set productModel(productModel: ProductModel) {
    this._productModel = productModel;
  }

  public get optionModel(): OptionModel {
    return this._optionModel;
  }

  public set optionModel(optionModel: OptionModel) {
    this._optionModel = optionModel;
  }

  public get cancellable(): boolean {
    return this._cancellable;
  }

  public set cancellable(cancellable: boolean) {
    this._cancellable = cancellable;
  }

  public get cancellation(): Nullable<Cancellation> {
    return this._cancellation;
  }

  public set cancellation(cancellation: Nullable<Cancellation>) {
    this._cancellation = cancellation;
  }

  public get availability(): Nullable<Availability> {
    return this._availability;
  }

  public set availability(availability: Nullable<Availability>) {
    this._availability = availability;
  }

  public get notes(): Nullable<string> {
    return this._notes;
  }

  public set notes(notes: Nullable<string>) {
    this._notes = notes;
  }

  public get contact(): Contact {
    return this._contact;
  }

  public set contact(contact: Contact) {
    this._contact = contact;
  }

  public get voucher(): Nullable<Ticket> {
    return this._voucher;
  }

  public set voucher(voucher: Nullable<Ticket>) {
    this._voucher = voucher;
  }

  public get unitItemModels(): UnitItemModel[] {
    return this._unitItemModels;
  }

  public set unitItemModels(unitItemModels: UnitItemModel[]) {
    this._unitItemModels = unitItemModels;
  }

  public get bookingCartModel(): BookingCartModel | undefined {
    return this._bookingCartModel;
  }

  public set bookingCartModel(bookingCartModel: BookingCartModel | undefined) {
    this._bookingCartModel = bookingCartModel;
  }

  public get bookingOffersModel(): BookingOffersModel | undefined {
    return this._bookingOffersModel;
  }

  public set bookingOffersModel(bookingOffersModel: BookingOffersModel | undefined) {
    this._bookingOffersModel = bookingOffersModel;
  }

  public get bookingPricingModel(): BookingPricingModel | undefined {
    return this._bookingPricingModel;
  }

  public set bookingPricingModel(bookingPricingModel: BookingPricingModel | undefined) {
    this._bookingPricingModel = bookingPricingModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingCartModel(): BookingCartModel {
    if (this.bookingCartModel === undefined) {
      throw UndefinedModelError.create('BookingCartModel', 'BookingModel', this.id);
    }

    return this.bookingCartModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingContentModel(): BookingContentModel {
    if (this.bookingContentModel === undefined) {
      throw UndefinedModelError.create('BookingContentModel', 'BookingModel', this.id);
    }

    return this.bookingContentModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingOffersModel(): BookingOffersModel {
    if (this.bookingOffersModel === undefined) {
      throw UndefinedModelError.create('BookingOffersModel', 'BookingModel', this.id);
    }

    return this.bookingOffersModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingPickupsModel(): BookingPickupsModel {
    if (this.bookingPickupsModel === undefined) {
      throw UndefinedModelError.create('BookingPickupsModel', 'BookingModel', this.id);
    }

    return this.bookingPickupsModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingPricingModel(): BookingPricingModel {
    if (this.bookingPricingModel === undefined) {
      throw UndefinedModelError.create('BookingPricingModel', 'BookingModel', this.id);
    }

    return this.bookingPricingModel;
  }

  /**
   * @throws UndefinedModelError
   */
  public getBookingQuestionsModel(): BookingQuestionsModel {
    if (this.bookingQuestionsModel === undefined) {
      throw UndefinedModelError.create('BookingPricingModel', 'BookingModel', this.id);
    }

    return this.bookingQuestionsModel;
  }
}
