import { Booking } from "@octocloud/types";
import { BookingModel } from "../models/booking/BookingModel";
import { ProductParser } from "./ProductParser";
import { OptionParser } from "./OptionParser";
import { BookingCartModel } from "../models/booking/BookingCartModel";
import { BookingContentModel } from "../models/booking/BookingContentModel";
import { BookingPickupModel } from "../models/booking/BookingPickupModel";
import { BookingPricingModel } from "../models/booking/BookingPricingModel";

export class BookingParser {
  private readonly productParser = new ProductParser();
  private readonly optionParser = new OptionParser();
  public parsePOJOToModel = (booking: Booking): BookingModel => {
    return new BookingModel({
      id: booking.id,
      uuid: booking.uuid,
      testMode: booking.testMode,
      resellerReference: booking.resellerReference,
      supplierReference: booking.supplierReference,
      status: booking.status,
      utcCreatedAt: booking.utcCreatedAt,
      utcUpdatedAt: booking.utcUpdatedAt,
      utcExpiresAt: booking.utcExpiresAt,
      utcRedeemedAt: booking.utcRedeemedAt,
      utcConfirmedAt: booking.utcConfirmedAt,
      productId: booking.productId,
      productModel: this.productParser.parsePOJOToModel(booking.product),
      optionId: booking.optionId,
      optionModel: this.optionParser.parsePOJOToModel(booking.option),
      cancellable: booking.cancellable,
      cancellation: booking.cancellation,
      freesale: booking.freesale,
      availabilityId: booking.availabilityId,
      availability: booking.availability,
      contact: booking.contact,
      notes: booking.notes,
      deliveryMethods: booking.deliveryMethods,
      voucher: booking.voucher,
      unitItems: booking.unitItems,
      bookingCartModel: this.parseCartPOJOToModel(booking),
      bookingContentModel: this.parseContentPOJOToModel(booking),
      bookingPickupModel: this.parsePickupPOJOToModel(booking),
      bookingPricingModel: this.parsePricingPOJOToModel(booking),
    });
  };

  private parseCartPOJOToModel = (booking: Booking): BookingCartModel | undefined => {
    if (booking.orderId === undefined || booking.orderReference === undefined || booking.primary === undefined) {
      return undefined;
    }

    return new BookingCartModel({
      orderId: booking.orderId,
      orderReference: booking.orderReference,
      primary: booking.primary,
    });
  };

  private parseContentPOJOToModel = (booking: Booking): BookingContentModel | undefined => {
    if (
      booking.meetingPoint === undefined ||
      booking.meetingPointCoordinates === undefined ||
      booking.meetingLocalDateTime === undefined ||
      booking.duration === undefined ||
      booking.durationAmount === undefined ||
      booking.durationUnit === undefined
    ) {
      return undefined;
    }

    return new BookingContentModel({
      meetingPoint: booking.meetingPoint,
      meetingPointCoordinates: booking.meetingPointCoordinates,
      meetingLocalDateTime: booking.meetingLocalDateTime,
      duration: booking.duration,
      durationAmount: booking.durationAmount,
      durationUnit: booking.durationUnit,
    });
  };

  private parsePickupPOJOToModel = (booking: Booking): BookingPickupModel | undefined => {
    if (
      booking.pickupRequested === undefined ||
      booking.pickupPointId === undefined ||
      booking.pickupHotel === undefined ||
      booking.pickupHotelRoom === undefined ||
      booking.pickupPoint === undefined
    ) {
      return undefined;
    }

    return new BookingPickupModel({
      pickupRequested: booking.pickupRequested,
      pickupPointId: booking.pickupPointId,
      pickupHotel: booking.pickupHotel,
      pickupHotelRoom: booking.pickupHotelRoom,
      pickupPoint: booking.pickupPoint,
    });
  };

  private parsePricingPOJOToModel = (booking: Booking): BookingPricingModel | undefined => {
    if (booking.pricing === undefined) {
      return undefined;
    }

    return new BookingPricingModel({
      pricing: booking.pricing,
    });
  };

  public parseModelToPOJO = (bookingModel: BookingModel): Booking => {
    const booking: Booking = {
      id: bookingModel.id,
      uuid: bookingModel.uuid,
      testMode: bookingModel.testMode,
      resellerReference: bookingModel.resellerReference,
      supplierReference: bookingModel.supplierReference,
      status: bookingModel.status,
      utcCreatedAt: bookingModel.utcCreatedAt,
      utcUpdatedAt: bookingModel.utcUpdatedAt,
      utcExpiresAt: bookingModel.utcExpiresAt,
      utcRedeemedAt: bookingModel.utcRedeemedAt,
      utcConfirmedAt: bookingModel.utcConfirmedAt,
      productId: bookingModel.productId,
      product: this.productParser.parseModelToPOJO(bookingModel.productModel),
      optionId: bookingModel.optionId,
      option: this.optionParser.parseModelToPOJO(bookingModel.optionModel),
      cancellable: bookingModel.cancellable,
      cancellation: bookingModel.cancellation,
      freesale: bookingModel.freesale,
      availabilityId: bookingModel.availabilityId,
      availability: bookingModel.availability,
      contact: bookingModel.contact,
      notes: bookingModel.notes,
      deliveryMethods: bookingModel.deliveryMethods,
      voucher: bookingModel.voucher,
      unitItems: bookingModel.unitItems,
    };

    if (bookingModel.bookingCartModel !== undefined) {
      booking.orderId = bookingModel.bookingCartModel.orderId;
      booking.orderReference = bookingModel.bookingCartModel.orderReference;
      booking.primary = bookingModel.bookingCartModel.primary;
    }

    if (bookingModel.bookingContentModel !== undefined) {
      booking.meetingPoint = bookingModel.bookingContentModel.meetingPoint;
      booking.meetingPointCoordinates = bookingModel.bookingContentModel.meetingPointCoordinates;
      booking.meetingLocalDateTime = bookingModel.bookingContentModel.meetingLocalDateTime;
      booking.duration = bookingModel.bookingContentModel.duration;
      booking.durationAmount = bookingModel.bookingContentModel.durationAmount;
      booking.durationUnit = bookingModel.bookingContentModel.durationUnit;
    }

    if (bookingModel.bookingPickupModel !== undefined) {
      booking.pickupRequested = bookingModel.bookingPickupModel.pickupRequested;
      booking.pickupPointId = bookingModel.bookingPickupModel.pickupPointId;
      booking.pickupHotel = bookingModel.bookingPickupModel.pickupHotel;
      booking.pickupHotelRoom = bookingModel.bookingPickupModel.pickupHotelRoom;
      booking.pickupHotelRoom = bookingModel.bookingPickupModel.pickupHotelRoom;
      booking.pickupPoint = bookingModel.bookingPickupModel.pickupPoint;
    }

    if (bookingModel.bookingPricingModel !== undefined) {
      booking.pricing = bookingModel.bookingPricingModel.pricing;
    }

    return booking;
  };
}
