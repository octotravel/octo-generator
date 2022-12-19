import { DeliveryMethod } from "@octocloud/types/src/types/Product";
import {
  BookingAvailability,
  BookingStatus,
  Cancellation,
  Contact,
  Ticket,
} from "@octocloud/types/src/types/Booking";
import { OptionModel } from "../option/OptionModel";
import { ProductModel } from "../product/ProductModel";
import { BookingCartModel } from "./BookingCartModel";
import { BookingContentModel } from "./BookingContentModel";
import { BookingPickupModel } from "./BookingPickupModel";
import { BookingPricingModel } from "./BookingPricingModel";

export class UnitModel {
  public readonly id: string;
  public readonly uuid: string;
  public readonly testMode: boolean;
  public readonly resellerReference: Nullable<string>;
  public readonly supplierReference: Nullable<string>;
  public readonly status: BookingStatus;
  public readonly utcCreatedAt: string;
  public readonly utcUpdatedAt: Nullable<string>;
  public readonly utcExpiresAt: Nullable<string>;
  public readonly utcRedeemedAt: Nullable<string>;
  public readonly utcConfirmedAt: Nullable<string>;
  public readonly productId: string;
  public readonly productModel: ProductModel;
  public readonly optionId: string;
  public readonly optionModel: OptionModel;
  public readonly cancellable: boolean;
  public readonly cancellation: Nullable<Cancellation>;
  public readonly freesale: boolean;
  public readonly availabilityId: string;
  public readonly availability: BookingAvailability;
  public readonly contact: Contact;
  public readonly notes: Nullable<string>;
  public readonly deliveryMethods: DeliveryMethod[];
  public readonly voucher: Nullable<Ticket>;
  public readonly unitModels: UnitModel[];
  public readonly bookingCartModel?: BookingCartModel;
  public readonly bookingContentModel?: BookingContentModel;
  public readonly bookingPickupModel?: BookingPickupModel;
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
    productId,
    productModel,
    optionId,
    optionModel,
    cancellable,
    cancellation,
    freesale,
    availabilityId,
    availability,
    contact,
    notes,
    deliveryMethods,
    voucher,
    unitModels,
    bookingCartModel,
    bookingContentModel,
    bookingPickupModel,
    bookingPricingModel,
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
    productId: string;
    productModel: ProductModel;
    optionId: string;
    optionModel: OptionModel;
    cancellable: boolean;
    cancellation: Nullable<Cancellation>;
    freesale: boolean;
    availabilityId: string;
    availability: BookingAvailability;
    contact: Contact;
    notes: Nullable<string>;
    deliveryMethods: DeliveryMethod[];
    voucher: Nullable<Ticket>;
    unitModels: UnitModel[];
    bookingCartModel?: BookingCartModel;
    bookingContentModel?: BookingContentModel;
    bookingPickupModel?: BookingPickupModel;
    bookingPricingModel?: BookingPricingModel;
  }) {
    this.id = id;
    this.uuid = uuid;
    this.testMode = testMode;
    this.resellerReference = resellerReference;
    this.supplierReference = supplierReference;
    this.status = status;
    this.utcCreatedAt = utcCreatedAt;
    this.utcUpdatedAt = utcUpdatedAt;
    this.utcExpiresAt = utcExpiresAt;
    this.utcRedeemedAt = utcRedeemedAt;
    this.utcConfirmedAt = utcConfirmedAt;
    this.productId = productId;
    this.productModel = productModel;
    this.optionId = optionId;
    this.optionModel = optionModel;
    this.cancellable = cancellable;
    this.cancellation = cancellation;
    this.freesale = freesale;
    this.availabilityId = availabilityId;
    this.availability = availability;
    this.contact = contact;
    this.notes = notes;
    this.deliveryMethods = deliveryMethods;
    this.voucher = voucher;
    this.unitModels = unitModels;
    this.bookingCartModel = bookingCartModel;
    this.bookingContentModel = bookingContentModel;
    this.bookingPickupModel = bookingPickupModel;
    this.bookingPricingModel = bookingPricingModel;
  }
}
