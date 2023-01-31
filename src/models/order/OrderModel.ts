import { Contact, OrderStatus, Pricing } from "@octocloud/types";
import { BookingModel } from "../booking/BookingModel";

export class OrderModel {
  public readonly id: string;

  public readonly testMode: boolean;

  public readonly supplierReference: string;

  public readonly settlementMethod: string;

  public readonly status: OrderStatus;

  public readonly utcExpiresAt: string;

  public readonly utcConfirmedAt: Nullable<string>;

  public readonly cancellable: boolean;

  public readonly bookingModels: Array<BookingModel>;

  public readonly contact: Contact;

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
    utcExpiresAt: string;
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
    this.status = status;
    this.utcExpiresAt = utcExpiresAt;
    this.utcConfirmedAt = utcConfirmedAt;
    this.cancellable = cancellable;
    this.bookingModels = bookingModels;
    this.contact = contact;
    this.termsAccepted = termsAccepted;
    this.pricing = pricing;
    this.offerCombinations = offerCombinations;
    this.cardPayment = cardPayment;
    this.returnUrl = returnUrl;
  }

  public findBookingModelByBookingId(bookingId: string): Nullable<BookingModel> {
    return this.bookingModels.find((bookingModel) => bookingModel.id === bookingId) ?? null;
  }
}
