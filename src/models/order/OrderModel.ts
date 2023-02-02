import { Contact, OrderStatus, Pricing } from "@octocloud/types";
import { BookingModel } from "../booking/BookingModel";

export class OrderModel {
  public readonly id: string;

  public readonly testMode: boolean;

  public readonly supplierReference: string;

  public readonly settlementMethod: string;

  protected _status: OrderStatus;

  protected _utcExpiresAt: Nullable<string>;

  protected _utcConfirmedAt: Nullable<string>;

  protected _cancellable: boolean;

  protected _bookingModels: Array<BookingModel>;

  protected _contact: Contact;

  public readonly termsAccepted?: boolean;

  public readonly pricing?: Pricing;

  public readonly offerCombinations?: any[];

  public readonly cardPayment?: any;

  public readonly returnUrl?: string;

  constructor({
    id,
    testMode,
    supplierReference,
    settlementMethod,
    status,
    utcExpiresAt,
    utcConfirmedAt,
    cancellable,
    bookingModels,
    contact,
    termsAccepted,
    pricing,
    offerCombinations,
    cardPayment,
    returnUrl,
  }: {
    id: string;
    testMode: boolean;
    supplierReference: string;
    settlementMethod: string;
    status: OrderStatus;
    utcExpiresAt: Nullable<string>;
    utcConfirmedAt: Nullable<string>;
    cancellable: boolean;
    bookingModels: Array<BookingModel>;
    contact: Contact;
    termsAccepted?: boolean;
    pricing?: Pricing;
    offerCombinations?: any[];
    cardPayment?: any;
    returnUrl?: string;
  }) {
    this.id = id;
    this.testMode = testMode;
    this.supplierReference = supplierReference;
    this.settlementMethod = settlementMethod;
    this._status = status;
    this._utcExpiresAt = utcExpiresAt;
    this._utcConfirmedAt = utcConfirmedAt;
    this._cancellable = cancellable;
    this._bookingModels = bookingModels;
    this._contact = contact;
    this.termsAccepted = termsAccepted;
    this.pricing = pricing;
    this.offerCombinations = offerCombinations;
    this.cardPayment = cardPayment;
    this.returnUrl = returnUrl;
  }

  get status(): OrderStatus {
    return this._status;
  }

  set status(status: OrderStatus) {
    this._status = status;
  }

  get utcExpiresAt(): Nullable<string> {
    return this._utcExpiresAt;
  }

  set utcExpiresAt(utcExpiresAt: Nullable<string>) {
    this._utcExpiresAt = utcExpiresAt;
  }

  get utcConfirmedAt(): Nullable<string> {
    return this._utcConfirmedAt;
  }

  set utcConfirmedAt(utcConfirmedAt: Nullable<string>) {
    this._utcConfirmedAt = utcConfirmedAt;
  }

  get cancellable(): boolean {
    return this._cancellable;
  }

  set cancellable(cancellable: boolean) {
    this._cancellable = cancellable;
  }

  get contact(): Contact {
    return this._contact;
  }

  set contact(contact: Contact) {
    this._contact = contact;
  }

  get bookingModels(): Array<BookingModel> {
    return this._bookingModels;
  }

  set bookingModels(bookingModels: Array<BookingModel>) {
    this._bookingModels = bookingModels;
  }

  public findBookingModelByBookingId(bookingId: string): Nullable<BookingModel> {
    return this.bookingModels.find((bookingModel) => bookingModel.id === bookingId) ?? null;
  }
}
